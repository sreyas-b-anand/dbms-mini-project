from config.db import get_db_connection

def create_users_table():
    """Creates the users table if it doesn't exist"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            wallet_balance DECIMAL(10,2) DEFAULT 10000.00,
            profile_pic VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cursor.close()
    conn.close()

# Run this when the model is imported
create_users_table()
