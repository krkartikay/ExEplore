from flask import *
from flask_sqlalchemy import *
from config import *
from models.User import *
from models.Game import *
from models.GameFeature import *
from passlib.hash import sha256_crypt

@app.route("/")
def home_page():
	user = User.query.filter_by(user_id = 1).first()
	return render_template("index.html", user = user)

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
		user = User(roll_number = roll_number,
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
		return redirect(url_for("profile", user_id = session["user_id"]))

@app.route("/leaderboard/")
def leaderboard():
	return

@app.route("/profile/<int:user_id>")
def profile(user_id):
	user = User.query.filter_by(user_id = user_id).first()
	return render_template("profile.html", user = user)