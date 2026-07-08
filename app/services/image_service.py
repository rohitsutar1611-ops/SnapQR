import os
import uuid

from flask import current_app
from werkzeug.utils import secure_filename

from app.utils.helpers import allowed_file


def save_uploaded_image(file):

    if file.filename == "":
        return False, "No file selected."

    allowed_extensions = current_app.config["ALLOWED_EXTENSIONS"]

    if not allowed_file(file.filename, allowed_extensions):
        return False, "Invalid file type."

    extension = secure_filename(file.filename).rsplit(".", 1)[1].lower()

    filename = f"{uuid.uuid4()}.{extension}"

    upload_folder = current_app.config["UPLOAD_FOLDER"]

    os.makedirs(upload_folder, exist_ok=True)

    filepath = os.path.join(upload_folder, filename)

    file.save(filepath)

    return True, filename