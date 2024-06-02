from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, BooleanField
from ..api.helper_functions import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired

class DishForm(FlaskForm):
    
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    home_cooked = BooleanField('Home-Cooked')
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")

