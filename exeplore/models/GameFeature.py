from config import *

class GameFeature(db.Model):
	__tablename__ = "game_features"
	game_id = db.Column(db.Integer, primary_key = True, unique = True, nullable = False)
	game_name = db.Column(db.String(255), nullable = False)
	game_high_score = db.Column(db.Integer, nullable = False)
