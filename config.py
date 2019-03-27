from flask import *
from flask_sqlalchemy import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:150871@localhost/exeplore"
db = SQLAlchemy(app)
app.secret_key = "random"