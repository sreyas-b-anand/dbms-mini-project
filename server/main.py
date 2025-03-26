from flask import Flask
from flask_cors import CORS
from config.db import init_db
from routes import auth, profile, items, wallet
from sockets import socketio, init_sockets  # Import from socket module

def create_app(config=None):
    app = Flask(__name__)

    if config:
        app.config.from_object(config)

    init_db(app)

    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "Content_Type"],
            "supports_credentials": True
        }
    })

    init_sockets(app)  # Initialize WebSockets

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(profile, url_prefix='/profile')
    app.register_blueprint(items, url_prefix="/items")
    app.register_blueprint(wallet, url_prefix="/wallet")

    return app

app = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True)  # Start with socketio
