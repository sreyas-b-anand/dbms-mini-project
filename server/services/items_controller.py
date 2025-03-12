from models import Item
from config.db import db
import datetime
def get_items():
    try:
        items = Item.query.all()

        if not items:
            return {"success": False, "message": "No items available"}

        return {"success": True,"message": "Items fetched successfully", "items": [item.to_dict() for item in items]}

    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}

#fetch an item
def get_an_item(id):
    try:
        item = Item.query.filter_by(id=id).first()
        #print(item)

        if not item:
             return {"success": False, "message": "No items available"}
        return {"success": True,"message": "Items fetched successfully", "item": item.to_dict()}
    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}
    

#add item ()
def add_an_item(data , user_id):
    try:
       
        required_fields = ["title", "description", "image_url", "starting_price", "category", "condition", "auction_end"]
        for field in required_fields:
            if field not in data:
                return {"success": False, "message": f"Missing field: {field}"}

       
        new_item = Item(
            title=data["title"],
            description=data["description"],
            image_url=data["image_url"],
            starting_price=float(data["starting_price"]),
            current_price=float(data["starting_price"]), 
            category=data["category"],
            condition=data["condition"],
            seller_id=int(user_id),
            auction_end=datetime.datetime.strptime(data["auction_end"], "%Y-%m-%d"),
            status="active",
            created_at=datetime.datetime.now()
            )
        

        # Add item to database
        db.session.add(new_item)
        db.session.commit()


        return {"message" : "Item added successfully" , "success" : True , "id" :new_item.id , "item":new_item.to_dict()}
    except Exception as e:
        return {"message" :f'An error occured {str(e)}' , "success" : False}
   

def get_listed_items(user):
    try:
        items = Item.query.filter_by(seller_id=user.id).all()
        
        if not items:
            return {"success": False, "message": "No items available"}
        
        return {
            "success": True,
            "message": "Items fetched successfully",
            "items": [item.to_dict() for item in items],
        }

    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}

def delete_item(item_id, user):
    try:
        item = Item.query.filter_by(id=item_id, seller_id=user.id).first()
        
        if not item:
            return {"success": False, "message": "Item not found or not authorized to delete"}
        
        db.session.delete(item)
        db.session.commit()
        
        return {"success": True, "message": "Item deleted successfully"}

    except Exception as e:
        return {"success": False, "message": str(e)}


#    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     title = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     image_url = db.Column(db.String(500), nullable=True)
#     starting_price = db.Column(db.Float, nullable=False)
#     current_price = db.Column(db.Float, nullable=False)
#     category = db.Column(db.String(100), nullable=True)
#     condition = db.Column(db.String(50), nullable=True)  # Example: 'new', 'used'
#     seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     auction_end = db.Column(db.DateTime, nullable=False)
#     status = db.Column(db.String(50), default="active", nullable=False)
#     created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
