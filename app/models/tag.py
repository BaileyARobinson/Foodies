from .db import db, environment, SCHEMA, add_prefix_for_prod





class Tag(db.Model):
    __tablename__= 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25))

    dishes = db.relationship('Dish', secondary='selected_tags', back_populates='tags')


# Selected-Categories join table between categories and dishes
selected_tags = db.Table (
    'selected_tags',
    db.Column('dish_id', db.Integer, db.ForeignKey(add_prefix_for_prod('dishes.id'), ondelete='CASCADE'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id'), ondelete='CASCADE'), primary_key=True) 
)

if environment == "production":
    selected_tags.schema = SCHEMA