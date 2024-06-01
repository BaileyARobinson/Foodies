from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import Dish, Comment, db
from ..forms import CommentForm, DishForm
from .helper_functions import get_unique_filename, upload_file_to_s3

dish_routes = Blueprint('dishes', __name__)

#######################################

# Get all dishes 

@dish_routes.route('/')
def get_all_dishes():

    dishes = Dish.query.all()

    dishes_to_dict = []
    
    for dish in dishes:
        dish_dict = dish.to_dict() 
        dish_dict['num_of_comments'] = len(dish.comments)
        dishes_to_dict.append(dish_dict)

    return dishes_to_dict

# Get dish by Dish Id 

@dish_routes.route('/<int:id>')
def get_dish_by_id(id):

    dish = Dish.query.get(id)

    if not dish:
        return jsonify({'error': 'Dish not found'})
    
    return dish.to_dict(include_comments=True)


# Create dish 

@dish_routes.route('/new', methods=['POST'])
@login_required
def create_dish():

    dish_form = DishForm()
    dish_form['csrf_token'].data = request.cookies['csrf_token']
    
    if dish_form.validate_on_submit():
        image = dish_form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload: 
            return jsonify({"message": upload})
        
        url = upload['url']
        
        new_dish = Dish(
            name = dish_form.name.data,
            description = dish_form.description.data,
            img = url,
            user_id = current_user.id, 
            home_cooked = dish_form.home_cooked.data
        )
        db.session.add(new_dish)
        db.session.commit()

        return jsonify(new_dish.to_dict())

    abort(403, description="Form failed validation.")

################# COMMENT ROUTES #####################

# Create comment from shop id 

@dish_routes.route('/<int:dishId>/comments/new', methods=['POST'])
@login_required
def create_comment_from_shop(dishId):

    comment_form = CommentForm()
    comment_form['csrf_token'].data = request.cookies['csrf_token']
    if comment_form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            dish_id = dishId,
            comment = comment_form.comment.data
        )
        db.session.add(new_comment)
        db.session.commit()

        comment = Comment.query.filter_by(id=new_comment.id).first()
       
        return jsonify(comment.to_dict())
    
    else:
        
        return jsonify({'errors': comment_form.errors})
