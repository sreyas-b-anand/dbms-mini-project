from flask_socketio import SocketIO

# Initialize SocketIO globally
socketio = SocketIO(cors_allowed_origins="http://localhost:5173")

def init_sockets(app):
    """Attach the app instance to SocketIO and import events."""
    socketio.init_app(app)
    
    # Import events to bind event handlers
    from . import bid_socket
