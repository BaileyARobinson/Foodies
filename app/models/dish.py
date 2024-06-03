from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm.attributes import instance_state
from datetime import datetime

class Dish(db.Model):
    __tablename__='dishes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey (add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    img = db.Column(db.String)
    description = db.Column(db.String(1000))
    home_cooked = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    creator = db.relationship('User', back_populates='dishes')
    comments = db.relationship('Comment', back_populates='dish', cascade='all, delete-orphan')
    tags = db.relationship('Tag', secondary='selected_tags', back_populates='dishes')


    def to_dict(self, include_categories=False, include_comments=False):
        state = instance_state(self)

        dish_dict = {
            'id': self.id,
            'name': self.name,
            'user_id': {
                'username': self.creator.username,
                'id': self.creator.id
            },
            'img': self.img,
            'description': self.description,
            'home_cooked': self.home_cooked,
            'updated_at': self.updated_at,
        }

        if include_comments: 
            dish_dict['comments'] = [
                comment.to_dict() for comment in self.comments
            ]

        return dish_dict 
    

# Likes join table between dishes and users

likes = db.Table (
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True),
    db.Column('dish_id', db.Integer, db.ForeignKey(add_prefix_for_prod('dishes.id'), ondelete='CASCADE'), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA
