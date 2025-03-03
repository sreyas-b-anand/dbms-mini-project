from flask import Flask
from flask_cors import CORS
from config.db import init_db, db
from models import User  
from routes.auth import auth
from routes.profile import profile

def create_app(config=None):
    app = Flask(__name__)
    
    # Load configuration
    if config:
        app.config.from_object(config)
    
    # Initialize database
    init_db(app)

    # Enable CORS for all routes and methods
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],  # Allow only your frontend origin
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow all necessary methods
            "allow_headers": ["Content-Type", "Authorization"],  # Allow necessary headers
            "supports_credentials": True
        }
    })

    # Register blueprints
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(profile, url_prefix="/profile")
    
    return app

# This makes the app available for Flask CLI commands
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)