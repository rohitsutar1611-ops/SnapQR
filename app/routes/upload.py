from flask import Blueprint, request, jsonify

from app.services.image_service import save_uploaded_image

upload = Blueprint("upload", __name__)


@upload.route("/upload", methods=["POST"])
def upload_image():

    print("===== DEBUG =====")
    print("request.files :", request.files)
    print("request.form  :", request.form)
    print("=================")

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "Image not found."
        }), 400

    file = request.files["image"]

    success, result = save_uploaded_image(file)

    if not success:
        return jsonify({
            "success": False,
            "message": result
        }), 400

    return jsonify({
        "success": True,
        "filename": result,
        "message": "Image uploaded successfully."
    })