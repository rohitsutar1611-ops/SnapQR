from flask import Flask 
from config import Config
from .routes import main, upload
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(main)
    app.register_blueprint(upload)
    return app