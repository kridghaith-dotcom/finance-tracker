from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finance.db"
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    with app.app_context():
        from app.models.transactions import Transaction
        db.create_all()
    return app