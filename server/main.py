from flask import Flask
from models import init_models #tables
from routes.auth import auth #auth routes
from flask_cors import CORS
app = Flask(__name__)
#cors
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

init_models()

app.register_blueprint(auth , url_prefix="/auth")
if __name__ == "__main__":
    app.run(debug=True , port=4000)