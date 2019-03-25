from flask import *
from flask_sqlalchemy import *
from config import *
from models.User import *
from models.Game import *
from models.GameFeature import *

@app.route("/")
def home_page():
	user = User.query.filter_by(user_id = 1).first()
	return render_template("index.html", user = user)

@app.route("/register/")
def register():
	return pass

@app.route("/login/")
def login():
	return pass

@app.route("/leaderboard/")
def leaderboard():
	return pass

@app.route("/profile/")
def profile():
	return pass

@app.route("/profile/")
def profile():
	return pass