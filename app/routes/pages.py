from flask import Blueprint, render_template

pages = Blueprint("pages", __name__)


@pages.route("/features")
def features():
    return render_template("features.html")


@pages.route("/about")
def about():
    return render_template("about.html")


@pages.route("/contact", methods=["GET", "POST"])
def contact():
    return render_template("contact.html")


@pages.route("/upload")
def upload_page():
    return render_template("upload.html")