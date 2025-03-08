from flask import Blueprint, request, jsonify
from models.items import Item
from services import get_items ,get_an_item
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
        result = get_items()
        return jsonify(result), 200 if result["success"] else 400

    except Exception as e:
        return jsonify({"message": str(e), "success": False, "error": str(e)}), 400

#route GET fetch an 1 item

@items.route('/get-item/<id>', methods=['GET'])
@token_required  # ✅ Apply middleware here
def fetch_an_item(user, id):
    print(id)
    try:
        if not user:
            return jsonify({"message": "Authorization error", "success": False}), 401

        result = get_an_item(id)  # Fetch the item

        return jsonify(result), 200 if result["success"] else 400
    except Exception as e:
        return jsonify({"message": "An error occurred", "success": False, "error": str(e)}), 500
#route POST add an item

#route DELETE hehehe

