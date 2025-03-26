from . import socketio
from flask_socketio import emit
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

@socketio.on('connect')
def handle_connect():
    logging.info("Client connected")
    emit('message', {'msg': 'Connected to server'})  # Sends a message to the client

@socketio.on('bid received')
def bid_request(data):
    logging.info(f"Bid received: {data}")
    print(f"Received bid data: {data}")  # Print full bid data for debugging

@socketio.on('disconnect')
def handle_disconnect():
    logging.info("Client disconnected")
