from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Dish, Comment

dish_routes = Blueprint('dishes', __name__)

@dish_routes.route('/')
def get_all_dishes():

    dishes = Dish.query.all()

    dishes_to_dict = []
    
    for dish in dishes:
        dish_dict = dish.to_dict() 
        dish_dict['num_of_comments'] = len(dish.comments)
        dishes_to_dict.append(dish_dict)

    return dishes_to_dict


@dish_routes.route('/<int:id>')
def get_dish_by_id(id):

    dish = Dish.query.get(id)

    if not dish:
        return jsonify({'error': 'Dish not found'})
    
    return dish.to_dict(include_comments=True)