from flask import *
from flask_sqlalchemy import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:shubh@123@localhost/exeplore"
db = SQLAlchemy(app)
app.secret_key = ""