from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds some demo comments
def seed_comments():
    comments = [
        Comment(user_id=2, dish_id=1, comment='The Spaghetti Bolognese looks amazing! Can you share the recipe and the cooking time?'),
        Comment(user_id=3, dish_id=5, comment='The Tacos look delicious! Which restaurant did you get them from?'),
        Comment(user_id=4, dish_id=7, comment='Lasagna is my favorite! How long does it take to prepare and bake this dish?'),
        Comment(user_id=5, dish_id=2, comment='Chicken Curry looks so flavorful! Can you share the spice blend you used?'),
        Comment(user_id=6, dish_id=3, comment='Beef Stroganoff looks very creamy. How long does it take to cook this dish?'),
        Comment(user_id=7, dish_id=6, comment='Sushi looks so fresh! Which restaurant did you order it from?'),
        Comment(user_id=8, dish_id=8, comment='Pad Thai looks delicious! Is it difficult to make at home?'),
        Comment(user_id=9, dish_id=9, comment='That Hamburger looks juicy! Where did you get it from?'),
        Comment(user_id=10, dish_id=10, comment='Caesar Salad looks so crisp and fresh. Can you share the dressing recipe?'),
        Comment(user_id=11, dish_id=11, comment='Pancakes look so fluffy! What is the secret to getting them just right?'),
        Comment(user_id=5, dish_id=1, comment="What herbs did you put in the spaghetti bolognese? I'm always trying to figure out which herbs to use.")
    ]

    db.session.add_all(comments)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the comments table. SQLAlchemy doesn't
# have a built-in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
