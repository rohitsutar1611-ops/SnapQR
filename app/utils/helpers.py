import os

def allowed_file(filename, allowed_extensions):

    if "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in allowed_extensions