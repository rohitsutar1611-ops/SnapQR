import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "snapqr-secret-key"
)

    UPLOAD_FOLDER = os.path.join("app", "static", "uploads")

    MAX_CONTENT_LENGTH = 5 * 1024 * 1024

    ALLOWED_EXTENSIONS = {
        "png",
        "jpg",
        "jpeg",
        "webp"
    }

    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")

    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")

    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")

    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")