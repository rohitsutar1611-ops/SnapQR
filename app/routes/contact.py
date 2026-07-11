from flask import Blueprint, request, jsonify

from app.services.mail_service import send_contact_email

contact = Blueprint("contact", __name__)


@contact.route("/api/contact", methods=["POST"])
def submit_contact():

    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    # Validation
    if not name or not email or not subject or not message:

        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    sent = send_contact_email(
        name,
        email,
        subject,
        message
    )

    if sent:

        return jsonify({
            "success": True,
            "message": "Message sent successfully."
        })

    return jsonify({
        "success": False,
        "message": "Unable to send email."
    }), 500