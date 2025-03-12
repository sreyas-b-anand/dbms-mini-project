from flask import Blueprint, jsonify, request
from middlewares.auth_middleware import token_required
from services import add_wallet ,get_wallet 

wallet = Blueprint("wallet", __name__)

@wallet.route("/add-wallet", methods=['POST'])  # Ensure POST is allowed
@token_required
def add_to_wallet(user):  
    try:
        if not user:
            return jsonify({"message": "Authorization error", "success": False}), 401
        
        body = request.get_json()
        amount = body.get("amount")

        if amount is None:
            return jsonify({"message": "Amount is required", "success": False}), 400

        result = add_wallet(user.id, amount)  # ✅ Use user.id

        return jsonify(result), 200 if result["success"] else 400

    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}", "success": False}), 500

@wallet.route("/get-wallet" , methods=['GET'])
@token_required
def fetch_amount(user):
    try:
        if not user:
            return jsonify({"message": "Authorization error", "success": False}), 401
        
        result = get_wallet(user.id)

        return jsonify(result)
    
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}", "success": False}), 500

