from flask import Blueprint, request, jsonify, url_for
import logging

from app.services.image_service import save_uploaded_image

upload = Blueprint("upload", __name__)

logger = logging.getLogger(__name__)


@upload.route("/upload", methods=["POST"])
def upload_image():

    logger.info("Upload request received.")

    if "image" not in request.files:

        logger.warning("No image found in request.")

        return jsonify({
            "success": False,
            "message": "Image not found."
        }), 400

    file = request.files["image"]

    logger.info(f"Filename: {file.filename}")

    success, result = save_uploaded_image(file)

    if not success:

        logger.error(f"Upload failed: {result}")

        return jsonify({
            "success": False,
            "message": result
        }), 400

    logger.info("QR Generated Successfully.")

    return jsonify({
        "success": True,
        "filename": result["filename"],
        "image_url": result["image_url"],
        "qr_filename": result["qr_filename"],
        "qr_url": url_for(
            "static",
            filename=f"qr_codes/{result['qr_filename']}"
        ),
        "message": "QR Generated Successfully!"
    })