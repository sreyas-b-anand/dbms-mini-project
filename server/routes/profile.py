from flask import Blueprint, jsonify, request
from models.user import User

profile = Blueprint("profile", __name__)

@profile.route("", methods=['POST'])
def fetchUser():
    try:
        print("Received Data:", request.data)  # Debugging line
        data = request.get_json()
        email = data.get("email")

        if not email:
            return jsonify({"success": False, "message": "Email not provided"}), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Convert SQLAlchemy object to dictionary for JSON response
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "address": user.address,
            "role": user.role,
            "wallet": user.wallet
        }

        return jsonify({"success": True, "message": "Data fetched successfully", "profile": user_data}), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
