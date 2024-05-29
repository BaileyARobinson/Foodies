from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Dish

dishes_routes = Blueprint('dishes', __name__)

@dishes_routes.route('/')
def get_all_dishes():

    dishes = Dish.query.all 
    print(dishes)