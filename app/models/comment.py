from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__='comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey (add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    dish_id = db.Column(db.Integer, db.ForeignKey (add_prefix_for_prod('dishes.id'), ondelete='CASCADE'), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='commenter')
    dish = db.relationship('Dish', back_populates='commented_on_dish')