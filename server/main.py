from flask import Flask
from flask_cors import CORS
from config.db import init_db, db
from models import User  
from routes.auth import auth

def create_app(config=None):
    app = Flask(__name__)
    
    # Load configuration
    if config:
        app.config.from_object(config)
    
    # Initialize database
    init_db(app)

    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(auth, url_prefix='/auth')
    
    return app

# This makes the app available for Flask CLI commands
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
