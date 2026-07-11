import resend

from flask import current_app


def send_contact_email(name, email, subject, message):

    resend.api_key = current_app.config["RESEND_API_KEY"]

    try:

        resend.Emails.send({

            "from": "SnapQR <onboarding@resend.dev>",

            "to": current_app.config["EMAIL_ADDRESS"],

            "subject": f"SnapQR Contact : {subject}",

            "text": f"""
New Contact Form Submission

Name:
{name}

Email:
{email}

Subject:
{subject}

Message:
{message}
"""

        })

        return True

    except Exception as e:

        print(e)

        return False