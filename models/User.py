from config import db

class User(db.Model):
	__tablename__ = "users"
	user_id = db.Column(db.Integer, primary_key = True, unique = True, nullable = False)
	roll_number = db.Column(db.String(255), unique = True, nullable = False)
	password = db.Column(db.String(255), nullable = False)
	first_name = db.Column(db.String(255), nullable = False)
	last_name = db.Column(db.String(255))
	phone_number = db.Column(db.String(10), nullable = False)