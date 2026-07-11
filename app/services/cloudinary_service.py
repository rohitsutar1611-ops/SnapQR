import cloudinary
import cloudinary.uploader

from flask import current_app


def configure_cloudinary():

    cloudinary.config(
        cloud_name=current_app.config["CLOUDINARY_CLOUD_NAME"],
        api_key=current_app.config["CLOUDINARY_API_KEY"],
        api_secret=current_app.config["CLOUDINARY_API_SECRET"],
        secure=True
    )


def upload_to_cloudinary(file):

    try:

        configure_cloudinary()

        result = cloudinary.uploader.upload(
            file,
            folder="snapqr"
        )

        return True, result["secure_url"]

    except Exception as e:

        return False, str(e)