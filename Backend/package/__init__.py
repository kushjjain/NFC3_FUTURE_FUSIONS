from flask_cors import CORS
from flask import Flask
import os
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


db = SQLAlchemy()
load_dotenv()
loginManager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.secret_key = os.urandom(24)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"]=os.environ.get("SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS")
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Adjust based on your setup
    app.config['SESSION_COOKIE_SECURE'] = True  # Required if using 'None' for SameSite
    app.config['LOGIN_VIEW'] = 'login'
    db.init_app(app)
    loginManager.init_app(app)
    bcrypt.init_app(app)
    with app.app_context():
        db.create_all()
        db.session.commit()
    from package.users.routes import user_bp
    from package.pets.routes import pets_bp
    from package.adoption.routes import adopt_bp
    from package.shelter.routes import shelter_bp
    from package.events.routes import events_bp
    app.register_blueprint(pets_bp, url_prefix='/pets')
    app.register_blueprint(user_bp)
    app.register_blueprint(adopt_bp)
    app.register_blueprint(shelter_bp, url_prefix='/shelter')
    app.register_blueprint(events_bp, url_prefix="/events")
    return app