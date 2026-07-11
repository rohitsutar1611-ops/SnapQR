import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import current_app


def send_contact_email(name, email, subject, message):

    sender = current_app.config["EMAIL_ADDRESS"]

    password = current_app.config["EMAIL_PASSWORD"]

    receiver = sender

    mail = MIMEMultipart()

    mail["From"] = sender
    mail["To"] = receiver
    mail["Subject"] = f"SnapQR Contact : {subject}"

    body = f"""
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

    mail.attach(MIMEText(body, "plain"))

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(sender, password)

        server.send_message(mail)

        server.quit()

        return True

    except Exception as e:

        print(e)

        return False