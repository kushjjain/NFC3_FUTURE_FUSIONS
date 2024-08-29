from flask_cors import CORS
from flask import Flask
import os
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
db = SQLAlchemy()
load_dotenv()
loginManager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"]=os.environ.get("SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS")
    db.init_app(app)
    loginManager.init_app(app)
    bcrypt.init_app(app)
    from package.users.routes import user_bp
    app.register_blueprint(user_bp)
    return app