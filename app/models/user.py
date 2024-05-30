from .db import db, environment, SCHEMA, add_prefix_for_prod
#from ..models import Follower
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Follower(db.Model):
    __tablename__='followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)

    followed = db.relationship('User', foreign_keys=[user_id],back_populates ='followee')
    following = db.relationship('User', foreign_keys=[follower_id],back_populates='follower')

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    
    dish = db.relationship('Dish', back_populates='creator', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='commenter')
    followee = db.relationship('Follower', foreign_keys=[Follower.user_id],back_populates='followed', cascade='all, delete-orphan')
    follower = db.relationship ('Follower', foreign_keys=[Follower.follower_id], back_populates='following', cascade='all, delete-orphan')

  


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    
