from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Dish, Comment, db
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)

## Get comments by current user

@comment_routes.route('/current')
@login_required
def comments_by_user():

    comments = Comment.query.filter_by(user_id = current_user.id)

    return jsonify([comment.to_dict() for comment in comments])


## edit comment 

@comment_routes.route('/<int:comment_id>/update', methods=['PUT'])
@login_required
def update_a_comment(comment_id):

    comment_to_edit = Comment.query.get(comment_id)

    if not comment_to_edit:
        abort(404, description='Comment not found')
        
    if comment_to_edit.user_id == current_user.id:
    
        comment_form = CommentForm()
        comment_form['csrf_token'].data = request.cookies['csrf_token']
       
        if comment_form.validate_on_submit():
            
            comment_to_edit.comment = comment_form.comment.data

            db.session.commit()

            return jsonify(comment_to_edit.to_dict())
        else: abort(403, description='Comment data failed to validate.')

    abort(401, description='Unauthorized')

## delete comment 
    
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_a_comment(comment_id):

    comment_to_delete = Comment.query.get(comment_id)
    if not comment_to_delete:
        return jsonify({'message': "Comment couldn't be found."}), 404
    
    if comment_to_delete.user_id == current_user.id:
        db.session.delete(comment_to_delete)
        db.session.commit()
        return jsonify({'message': 'Comment successfully deleted'})
    abort(401, description='Unauthorized')