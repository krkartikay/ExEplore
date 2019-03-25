from config import *

class Game(db.Model):
	__tablename__ = "games"
	s_id = db.Column(db.Integer, primary_key = True, unique = True, nullable = False)
	game_id = db.Column(db.Integer, db.ForeignKey("game_features.game_id"), unique = True, nullable = False)
	user_id = db.Column(db.Integer, unique = True, nullable = False)
	high_score = db.Column(db.Integer, nullable = False)
	game_f = db.relationship("GameFeature", foreign_keys = [game_id])
