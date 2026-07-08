from werkzeug.utils import secure_filename
from app import create_app
app = create_app()
if __name__ == "__main__":
    app.run(debug=True,)