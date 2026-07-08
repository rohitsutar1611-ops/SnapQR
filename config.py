import os

class Config:
    SECRET_KEY = "snapqr-secret-key"

    UPLOAD_FOLDER = os.path.join("app", "uploads")

    MAX_CONTENT_LENGTH = 5 * 1024 * 1024

    ALLOWED_EXTENSIONS = {
        "png",
        "jpg",
        "jpeg",
        "webp"
    }