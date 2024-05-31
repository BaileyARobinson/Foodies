from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import Dish, Comment, db
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_a_comment(comment_id):

    comment_to_edit = Comment.query.get(comment_id)
    
    if comment_to_edit.user_id == current_user.id:
       
        comment_form = CommentForm()
        comment_form['csrf_token'].data = request.cookies['csrf_token']
        if comment_form.validate_on_submit():
            comment_to_edit.comment = comment_form.comment.data

            db.session.commit()

            return jsonify(comment_to_edit.to_dict())
        

    abort(401, description='Unauthorized')

    
