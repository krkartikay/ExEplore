from flask import *
from flask_sqlalchemy import *
from config import *
from models.User import *
from models.Game import *
from models.GameFeature import *
from passlib.hash import sha256_crypt
from functools import wraps
import os
import base64
import datetime
import time
import random

ALLOWED_TIME_SECONDS = 3 * 60 * 60 # 3 hours

def get_time_rem():
	return int(ALLOWED_TIME_SECONDS - (time.time() - session['time']))

def authorise(f):
	@wraps(f)
	def decorated_f(*args, **kwargs):
		if "user_id" in session and session["user_id"] != None:
			if "time" not in session:
				user = User.query.filter_by(user_id=session["user_id"]).first()
				session['time'] = user.initial_login
			if session['time'] != 0:
				if time.time() - session['time'] > ALLOWED_TIME_SECONDS:
					# session.pop("user_id")
					abort(504)
			return f(*args, **kwargs)
		else:
			abort(401)
	return decorated_f

@app.route("/")
def welcome():
	return render_template("index.html")

@app.route("/dashboard/")
@authorise
def dashboard():
	user = User.query.filter_by(user_id = session['user_id']).first()
	games = GameFeature.query.all()
	# print(session["start"])
	return render_template("dashboard.html", user = user, games = games, timer=get_time_rem())

@app.route("/register/", methods = ["GET", "POST"])
def register():
	if request.method == "GET":
		if "user_id" in session:
			flash("You are already logged in!")
			return redirect(url_for("dashboard"))
		else:
			return render_template("register.html")
	else:
		roll_number = request.form["roll_number"]
		password = request.form["password"]
		hashed_password = sha256_crypt.hash(password)
		first_name = request.form["first_name"]
		last_name = request.form["last_name"]
		phone_number = request.form["phone_number"]
		user = User.query.filter_by(roll_number = roll_number).first()
		if not user:
			if len(phone_number) != 10:
				flash("Phone number must be of 10 digits!")
				return redirect(url_for("register"))
			for dig in phone_number:
				if not dig.isdigit():
					flash("Invalid Phone number!")
					return redirect(url_for("register"))
			user = User(
						roll_number = roll_number,
						password = hashed_password,
						phone_number = phone_number,
						first_name = first_name,
						last_name = last_name
					)
			db.session.add(user)
			for game in GameFeature.query.all():
				user_game = Game(
					user_id = user.user_id,
					game_id = game.game_id,
					high_score = 0
				)
				db.session.add(user_game)
			db.session.commit()
			db.session.close()
			flash("Successfully registered!")
			return redirect(url_for("login"))
		else:
			flash("This roll number is already registered!")
			return redirect(url_for("register"))

@app.route("/login/", methods = ["GET", "POST"])
def login():
	if request.method == "GET":
		if "user_id" in session:
			flash("You are already logged in!")
			return redirect(url_for("dashboard"))
		else:
			return render_template("login.html")
	else:
		roll_number = request.form["roll_number"]
		password = request.form["password"]
		user = User.query.filter_by(roll_number = roll_number).first()
		if not user:
			flash("This Roll Number doesn't exists!")
			return redirect(url_for("login"))
		else:
			password_correct = sha256_crypt.verify(password, user.password)
			if not(password_correct):
				flash("Wrong password entered!")
				return redirect(url_for("login"))
			else:
				flash("Logged in successfully:)")
				session["roll_number"] = user.roll_number
				session["user_id"] = user.user_id
				session["logged_in"] = True
				session["type"] = "user"
				if user.initial_login == 0:
					user.initial_login = int(time.time())
					session["time"] = user.initial_login
					db.session.commit()
				else:
					session["time"] = user.initial_login
				# session["start"] = False
		flash("Successfully logged in!")
		return redirect(url_for("dashboard"))


# @app.route("/api/start", methods=["GET"])
# def start_game():
# 	user = User.query.filter_by(user_id = session['user_id'])
# 	print(user)
# 	user.start_time = str(datetime.datetime.now())
# 	# if user.date_time != '0':
# 	# 	abort(401)
# 	# else:
# 	# db.session.commit()
# 	session["start"] = True
# 	return redirect(url_for("dashboard"))
@app.route("/logout/")
def logout():
	session.pop("roll_number", None)
	session.pop("user_id", None)
	session.pop("logged_in", False)
	session.pop("type", None)
	return redirect(url_for("welcome"))

@app.route("/profile/")
@authorise
def profile():
	user_id = session["user_id"]
	user = User.query.filter_by(user_id = user_id).first()
	record = Game.query.filter_by(user_id = user_id).join(GameFeature).order_by(Game.game_id.asc()).all()
	return render_template("profile.html", user=user, record=record, timer=get_time_rem())
	
@app.route("/api/leaderboard/")
def leaderboard():
	# highscores = Game.query.all()
	finaldata = list()
	data = dict()
	with db.engine.connect() as con:
		topusers = con.execute(
			"select user_id, first_name, last_name, sum(high_score*100/game_high_score) as total from games natural join game_features natural join users group by user_id order by total desc;")
		users = con.execute("select games.user_id, roll_number , game_name, high_score as relative from games natural join game_features natural join users")
		rollnos = dict()
		for userid, rollno, game, relative in users:
			if userid not in data:
				data[userid] = {}
			# print(userid,rollno,game,relative)
			if relative is not None:
				data[userid][game] = relative
			else:
				data[userid][game] = 0
			rollnos[userid] = rollno
		for user, first_name, last_name, total in topusers:
			finaldata.append((user, first_name+" "+last_name, total, data[user]))
		games = con.execute("select game_name from game_features")
	return jsonify({'games': [x[0] for x in games], 'rollnos': rollnos , 'leader_data': finaldata},)

@app.route("/leaderboard/")
def leaderboard_page():
	logged_in = True
	if 'user_id' not in session:
		logged_in = False
	elif session['user_id'] == None:
		logged_in = False
	else:
		if "time" not in session:
			user = User.query.filter_by(user_id=session["user_id"]).first()
			session['time'] = user.initial_login
		if session['time'] != 0:
			if time.time() - session['time'] > ALLOWED_TIME_SECONDS:
				logged_in = False
	print(logged_in)
	return render_template("leaderboard.html", timer=get_time_rem(), logged_in = logged_in)


@app.route("/game_frame/<int:game_id>")
@authorise
def game_help(game_id):
	if time.time() - session['time_page'] > 2:
		abort(401)
	if game_id in [2, 3, 4, 6, 7]:
		return redirect("/game_actual/"+str(game_id))
	return render_template("game_rules"+str(game_id)+".html")

@app.route("/game_actual/<int:game_id>")
@authorise
def game_frame(game_id):
	user_id = session['user_id']
	# print user_id,game_id
	# print len(Game.query.filter_by(user_id = user_id , game_id =game_id).all())
	if len(Game.query.filter_by(user_id=user_id, game_id=game_id).all()) != 0:
		game = Game.query.filter_by(user_id=user_id, game_id=game_id).first()
	else:
		game = Game(user_id = user_id,
					game_id = game_id,
					high_score = 0
					)
		db.session.add(game)
		db.session.commit()
	token = os.urandom(16)
	token = base64.b64encode(token)
	token = token.decode()
	session["sid"]=game.s_id
	session["token"] = token
	print(session["token"])
	print(session["sid"])
	# print game.s_id, game.user_id, game.game_id
	return render_template("game"+str(game.game_id)+".html", game=game, token = token)


@app.route("/game/<int:game_id>")
@authorise
def game(game_id):
	session['time_page'] = time.time()
	name = GameFeature.query.filter_by(game_id=game_id).first().game_name
	return render_template("gamepage.html", game_id=game_id, name=name, timer=get_time_rem())

@app.route("/api/newscore", methods=["POST"])
@authorise
def new_score():
	try:
		tokens = request.json['tokens']
	except:
		print(request.data)
		tokens = request.form['tokens']
	if tokens != session["token"]:
		abort(401)
	s_id = session["sid"]
	game = Game.query.filter_by(s_id=s_id).first()
	game_features = GameFeature.query.filter_by(game_id= game.game_id).first()
	try:
		user_score = request.json['score']
	except:
		user_score = int(float(request.form['score']))
	if game.game_id == 3:
		user_score = max(60 - user_score, 0)
	if game.game_id == 7:
		user_score = max(200 - user_score, 0)
	if game.high_score < user_score:
		game.high_score = user_score
	if game_features.game_high_score<user_score:
		game_features.game_high_score = user_score
	db.session.commit()
	# session.pop("sid")
	return jsonify({'success': True})


@app.errorhandler(504)
def page_not_found(e):
    return render_template('timeout.html'), 504
