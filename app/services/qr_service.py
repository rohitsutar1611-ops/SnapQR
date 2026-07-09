import os
import uuid

import qrcode
from flask import current_app


def generate_qr(data):

    filename = f"{uuid.uuid4()}.png"

    qr_folder = os.path.join(
        current_app.root_path,
        "static",
        "qr_codes"
    )

    os.makedirs(qr_folder, exist_ok=True)

    filepath = os.path.join(qr_folder, filename)

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4
    )

    qr.add_data(data)
    qr.make(fit=True)

    image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    image.save(filepath)

    return filename