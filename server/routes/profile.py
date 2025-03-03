from flask import Blueprint, jsonify, request
from models.user import User, db

profile = Blueprint("profile", __name__)

@profile.route("", methods=['POST'])
def fetchUser():
    try:
        data = request.get_json()
        print("Received JSON:", data)  # Debugging

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
            "address": user.address if user.address else "",
            "role": user.role if user.role else "",
            "wallet": user.wallet if user.wallet is not None else 0.0,
            "createdAt" : user.created_at,
            "img":user.img
        }

        return jsonify({"success": True, "message": "Data fetched successfully", "profile": user_data}), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500


@profile.route("/update-profile", methods=['POST'])
def updateUser():
    try:
        data = request.get_json()
        print("Update request received:", data)  # Debugging

        email = data.get('email')
        profileData = data.get('profile')

        if not email or not profileData:
            return jsonify({"success": False, "message": "Email or profile data missing"}), 400
        
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Update user fields dynamically while ignoring None values
        for key, value in profileData.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)

        db.session.commit()

        return jsonify({"success": True, "message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
