from flask import Flask, render_template

from config import Config

from app.logger import setup_logger
from app.cloudinary_config import configure_cloudinary

from app.routes.home import home
from app.routes.upload import upload
from app.routes.pages import pages


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    setup_logger()

    with app.app_context():
        configure_cloudinary()

    app.register_blueprint(home)
    app.register_blueprint(upload)
    app.register_blueprint(pages)
    

    @app.errorhandler(404)
    def page_not_found(error):

        return render_template("404.html"), 404

    return app