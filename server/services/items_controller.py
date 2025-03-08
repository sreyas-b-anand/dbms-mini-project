from models.items import Item

def get_items():
    try:
        items = Item.query.all()

        if not items:
            return {"success": False, "message": "No items available"}

        return {"success": True,"message": "Items fetched successfully", "items": [item.to_dict() for item in items]}

    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}

#add item ()

# delete item()
