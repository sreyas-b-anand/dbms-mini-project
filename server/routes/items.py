from flask import Blueprint, request, jsonify
from models.items import Item
from services import get_items
from middlewares import token_required

items = Blueprint("items", __name__)

@items.route('/get-items', methods=['GET'])
@token_required  # ✅ Apply middleware here
def fetch_items(user):
    try:
        #user = request.user  # ✅ This should now work!
        #print("Authenticated User:", user.username)
        if not user:
            return jsonify({"message": "Authorization error", "success": False}), 401
        data = get_items()
        if not data:
            return jsonify({"message": "No items found", "success": False}), 404

        return jsonify({"response": data}), 200

    except Exception as e:
        return jsonify({"message": str(e), "success": False, "error": str(e)}), 400

#route GET fetch an 1 item

#route POST add an item

#route DELETE hehehe

