from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, BooleanField
from wtforms.validators import DataRequired

class DishNoAWSForm(FlaskForm):
    
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    home_cooked = BooleanField('Home-Cooked')
    submit = SubmitField("Create Post")