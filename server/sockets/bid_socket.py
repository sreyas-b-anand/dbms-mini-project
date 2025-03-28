from . import socketio
from flask_socketio import emit, disconnect
from flask import request
import logging, os, jwt
from dotenv import load_dotenv
from models import Item

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

@socketio.on("connect")
def handle_connect(auth=None):  # Fix: Added `auth=None`
    logging.info("Client connected")
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        logging.warning("Unauthorized connection attempt: No token provided")
        disconnect()
        return

    token = auth_header.split(" ")[1]  # Extract token

    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        logging.info(f"User {decoded_token['user_id']} connected via socket")
    except jwt.ExpiredSignatureError:
        logging.warning("Unauthorized connection attempt: Token expired")
        disconnect()
        return
    except jwt.InvalidTokenError:
        logging.warning("Unauthorized connection attempt: Invalid token")
        disconnect()
        return

    # Fetch items and their prices
    items = Item.query.with_entities(Item.id, Item.current_price).all()
    
    # Fix: Convert list of tuples into a dictionary
    items_prices = {item_id: price for item_id, price in items}

    # Emit item prices to the client
    emit("message", {"msg": "Connected to server", "item_prices": items_prices})

@socketio.on("bid received")
def bid_request(data):
    logging.info(f"Bid received: {data}")
    #delete the previous bid of an item done by the same user , so table will only have clean values
    #write to tables BIDS -> new_price , bidder_id , item_id , item_name
    #emit "bid placed" message on success
    #emit the new price of the item
    

@socketio.on("disconnect")
def handle_disconnect():
    logging.info("Client disconnected")
