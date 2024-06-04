from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Dish, Comment, db
from ..forms import CommentForm, DishForm, DishNoAWSForm
from .helper_functions import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

    return jsonify(dishes_to_dict)

# Get dish by Dish Id 

@dish_routes.route('/<int:id>')
def get_dish_by_id(id):

    dish = Dish.query.get(id)

    if not dish:
        return jsonify({'error': 'Dish not found'})
    
    return dish.to_dict(include_comments=True)


# Get dishes by current user

@dish_routes.route('/current')
@login_required
def dishes_by_user():

    dishes = Dish.query.filter_by(user_id=current_user.id).all()
    dishes_by_user = []
    for dish in dishes:
        dish_by_user = dish.to_dict()
        dish_by_user['num_of_comments'] = len(dish.comments)
        dishes_by_user.append(dish_by_user)
        
    return jsonify(dishes_by_user)


# Create dish 

@dish_routes.route('/new', methods=['POST'])
@login_required
def create_dish():
    dish_form = DishForm()
    dish_form['csrf_token'].data = request.cookies['csrf_token']
    
    if dish_form.validate_on_submit():
    
        image = dish_form.data['img']
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
            home_cooked = dish_form.home_cooked.data,
        )
        db.session.add(new_dish)
        db.session.commit()

        return jsonify(new_dish.to_dict())

    abort(403, description="Form failed validation.")

# Update Dish with AWS 
    
@dish_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_dish(id):
    dish_form = DishForm()
    dish_form['csrf_token'].data = request.cookies['csrf_token']
    
    dish_to_edit = Dish.query.get(id)

    if dish_form.validate_on_submit():
    
        image = dish_form.data['img']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload: 
            return jsonify({"message": upload})
        
        url = upload['url']
        
        
        dish_to_edit.name = dish_form.name.data
        dish_to_edit.description = dish_form.description.data
        dish_to_edit.img = url
        dish_to_edit.home_cooked = dish_form.home_cooked.data
    
        db.session.commit()

        return jsonify(dish_to_edit.to_dict())

    abort(403, description="Form failed validation.")


#Update dish no AWS 
    
@dish_routes.route('/<int:id>/noaws/update', methods=['PUT'])
@login_required
def update_dish_noaws(id):
    dish_form = DishNoAWSForm()
    dish_form['csrf_token'].data = request.cookies['csrf_token']
    
    dish_to_be_edited = Dish.query.get(id)

    if dish_form.validate_on_submit():
        
        dish_to_be_edited.name = dish_form.name.data
        dish_to_be_edited.description = dish_form.description.data 
        dish_to_be_edited.home_cooked = dish_form.home_cooked.data
    
        db.session.commit()

        return jsonify(dish_to_be_edited.to_dict())

    abort(403, description="Form failed validation.")


# Delete Dish 
    
@dish_routes.route('/<int:dishId>', methods=['DELETE'])
@login_required
def delete_dish(dishId):

    dish = Dish.query.get(dishId)

    if not dish:
        return jsonify({'message': 'Dish could not be found'}), 404

    if dish.user_id == current_user.id: 
        
        # Delete image from AWS
        remove_file_from_s3(dish.img)

        db.session.delete(dish)
        db.session.commit()
        return jsonify({'message': 'Dish successfully deleted'})
    abort(401, description='Unauthorized')



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
