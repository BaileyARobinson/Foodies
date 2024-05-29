from .db import db, environment, SCHEMA, add_prefix_for_prod





class Tag(db.Model):
    __tablename__='tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25))


# Selected-Categories join table between categories and dishes
selected_categories = db.Table (
    'selected_categories',
    db.Column('dish_id', db.Integer, db.ForeignKey(add_prefix_for_prod('dishes.id'), ondelete='CASCADE'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id'), ondelete='CASCADE'), primary_key=True) 
)

if environment == "production":
    selected_categories.schema = SCHEMA