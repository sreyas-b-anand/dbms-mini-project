# models/user.py
from config.db import db
from sqlalchemy import Column, Integer, String, Float, Text, TIMESTAMP, DECIMAL
from sqlalchemy.sql import func

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)
    role = db.Column(db.String(20), nullable=False, default="user")
    wallet = db.Column(db.Float, default=0.0, nullable=False)
    img=db.Column(db.String(1000) , nullable=True)
    # These were causing the error - fix with server_default
    created_at = db.Column(db.TIMESTAMP, server_default=func.now())
    updated_at = db.Column(db.TIMESTAMP, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<User {self.username} ({self.role})>"