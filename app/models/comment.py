from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm.attributes import instance_state
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

    commenter = db.relationship('User', back_populates='comments')
    dish = db.relationship('Dish', back_populates='comments')


    def to_dict(self):
        state = instance_state(self)

        comment_dict = {
            'id': self.id,
            'dish': {
                'name': self.dish.name,
                'dish_id': self.dish.id
            },
            'user': {
                'username': self.commenter.username,
                'user_id': self.commenter.id
            },
            'comment': self.comment,
            'updated_at': self.updated_at,
        }   

        return comment_dict 
            