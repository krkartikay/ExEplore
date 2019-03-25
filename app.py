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
	return render_template("index.html", user=user)

@app.route("/login/")
def login():
	return render_template("index.html", user=user)

@app.route("/leaderboard/")
def leaderboard():
	return render_template("index.html", user=user)

@app.route("/profile/")
def profile():
	return render_template("index.html", user=user)

@app.route("/game/<int:game_id>")
def game(game_id):
	game_feature = GameFeature.query.filter_by(game_id=game_id).first()
	return render_template("game"+str(game_id)+".html", game_feature=game_feature)
