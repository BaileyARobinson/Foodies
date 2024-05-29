from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Follower(db.Model):
    __tablename__='followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates ='followee')
    follower = db.relationship('User', back_populates='follower')