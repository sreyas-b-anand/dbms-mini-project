from models.user import create_users_table

def init_models():
    """Initialize tables"""
    """Call all create table functions here as shown below"""
    """for that create a file for each table and call that create table function at the last line in that file"""
    """for reference see user.py"""
    create_users_table()
    #create_items_table()
    #create_bids-table()
    #create_transactions_tables()
    #create_purchased_tables()