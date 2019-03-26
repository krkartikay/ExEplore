from flask import *
from flask_sqlalchemy import *
from config import *
from models.User import *
from models.Game import *
from models.GameFeature import *
from passlib.hash import sha256_crypt

@app.route("/")
def welcome():
	return render_template("index.html")

@app.route("/dashboard")
def dashboard():
	user = User.query.filter_by(user_id = session['user_id']).first()
	games = GameFeature.query.all()
	return render_template("dashboard.html", user = user, games = games)

@app.route("/register/", methods = ["GET", "POST"])
def register():
	if request.method == "GET":
		return render_template("register.html")
	else:
		roll_number = request.form["roll_number"]
		password = request.form["password"]
		hashed_password = sha256_crypt.hash(password)
		first_name = request.form["first_name"]
		last_name = request.form["last_name"]
		phone_number = request.form["phone_number"]
		if len(phone_number) != 10:
			flash("Invalid Phone number!")
			return redirect(url_for("register"))
		for dig in phone_number:
			if not dig.isdigit():
				flash("Invalid Phone number!")
				return redirect(url_for("register"))
		user = User (roll_number = roll_number,
					password = hashed_password,
					phone_number = phone_number,
					first_name = first_name,
					last_name = last_name)
		db.session.add(user)
		db.session.commit()
		db.session.close()
		flash("Successfully registered!")
		return redirect(url_for("login"))

@app.route("/login/", methods = ["GET", "POST"])
def login():
	if request.method == "GET":
		return render_template("login.html")
	else:
		roll_number = request.form["roll_number"]
		password = request.form["password"]
		user = User.query.filter_by(roll_number = roll_number).first()
		if not(user):
			flash("This Roll Number doesn't exists!")
			return redirect(url_for("login"))
		else:
			password_correct = sha256_crypt.verify(password, user.password)
			if not(password_correct):
				flash("Wrong password entered!")
				return redirect(url_for("userlogin"))
			else:
				flash("Logged in successfully:)")
				session["roll_number"] = roll_number
				session["user_id"] = user.user_id
				session["logged_in"] = True
				session["type"] = "user";
		return redirect(url_for("dashboard"))

@app.route("/logout/")
def logout():
    session.pop("roll_number", None)
    session.pop("user_id", None)
    session.pop("logged_in", False)
    return redirect("/")

@app.route("/profile/<int:user_id>")
def profile(user_id):
	user = User.query.filter_by(user_id = user_id).first()
	record = Game.query.filter_by(user_id = user_id).join(GameFeature).order_by(Game.game_id.asc()).all()
	return render_template("profile.html", user = user, record = record)
	
@app.route("/api/leaderboard/")
def leaderboard():
	# highscores = Game.query.all()
	finaldata = list()
	data = dict()
	with db.engine.connect() as con:
		topusers = con.execute("select user_id, sum(high_score/game_high_score) as total from games natural join game_features group by user_id order by total desc;")
		users = con.execute("select games.user_id, roll_number , game_name, high_score/game_high_score as relative from games natural join game_features natural join users")
		rollnos = dict()
		for userid, rollno, game, relative in users:
			if userid not in data:
				data[userid] = {}
			data[userid][game] = relative
			rollnos[userid] = rollno
		for user, total in topusers:
			finaldata.append((user, total, data[user]))
		games = con.execute("select game_name from game_features")
	return jsonify({'games': [x[0] for x in games], 'rollnos': rollnos , 'leader_data': finaldata}) #render_template("") 

@app.route("/leaderboard/")
def leaderboard_page():
	# if "sid" in session:
	# 	session.pop("sid") 
	return render_template("leaderboard.html")

@app.route("/api/getsid")
def get_sid():
	if "sid" in session:
		return jsonify({"sid": session['sid']})
	else:
		return jsonify({"sid": None})

@app.route("/game/<int:user_id>/<int:game_id>")
def game(user_id ,  game_id ):
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
	session["sid"]=game.s_id
	print(session["sid"])
	# print game.s_id, game.user_id, game.game_id
	return render_template("game"+str(game.game_id)+".html", game=game)


@app.route("/api/newscore/<int:s_id>", methods=["POST"])
def new_score(s_id):
	# print s_id
	game = Game.query.filter_by(s_id=s_id).first()
	# print game.s_id
	# print request.json['score']
	game_features = GameFeature.query.filter_by(game_id= game.game_id).first()
	if game.high_score < request.json['score']:
		game.high_score = request.json['score']
	if game_features.game_high_score<request.json['score']:
		game_features.game_high_score = request.json['score']
	db.session.commit()
	return jsonify({'success': True})
