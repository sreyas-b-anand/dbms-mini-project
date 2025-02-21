from flask import Flask
from models import init_models #tables
from routes.auth import auth #auth routes

app = Flask(__name__)

init_models()

app.register_blueprint(auth , url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True , port=4000)