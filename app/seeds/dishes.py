from app.models import db, Dish, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds some demo dishes, you can add other dishes here if you want
def seed_dishes():
    dishes = [
        Dish(name='Spaghetti Bolognese', user_id=1, img='spaghetti_bolognese.jpg', description='A classic Italian pasta dish with a rich, meaty sauce.', home_cooked=True),
        Dish(name='Chicken Curry', user_id=2, img='chicken_curry.jpg', description='A spicy and flavorful dish with tender chicken pieces.', home_cooked=True),
        Dish(name='Beef Stroganoff', user_id=3, img='beef_stroganoff.jpg', description='A Russian dish of sautéed beef served in a sauce with smetana (sour cream).', home_cooked=True),
        Dish(name='Vegetable Stir Fry', user_id=4, img='vegetable_stir_fry.jpg', description='A quick and healthy dish with a variety of fresh vegetables.', home_cooked=True),
        Dish(name='Tacos', user_id=5, img='tacos.jpg', description='A traditional Mexican dish with various fillings inside a folded tortilla.', home_cooked=False),
        Dish(name='Sushi', user_id=6, img='sushi.jpg', description='A Japanese dish consisting of vinegared rice, seafood, and vegetables.', home_cooked=False),
        Dish(name='Lasagna', user_id=7, img='lasagna.jpg', description='An Italian dish made of stacked layers of pasta alternated with sauces and ingredients.', home_cooked=True),
        Dish(name='Pad Thai', user_id=8, img='pad_thai.jpg', description='A stir-fried rice noodle dish commonly served as street food in Thailand.', home_cooked=True),
        Dish(name='Hamburger', user_id=9, img='hamburger.jpg', description='A sandwich consisting of one or more cooked patties of ground meat.', home_cooked=False),
        Dish(name='Caesar Salad', user_id=10, img='caesar_salad.jpg', description='A green salad with romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper.', home_cooked=True),
        Dish(name='Pancakes', user_id=11, img='pancakes.jpg', description='A flat cake, often thin and round, prepared from a starch-based batter.', home_cooked=True),
        # Additional dishes with user_id = 1
        Dish(name='Grilled Cheese Sandwich', user_id=1, img='grilled_cheese.jpg', description='A hot sandwich made with one or more varieties of cheese on bread.', home_cooked=True),
        Dish(name='Tomato Soup', user_id=1, img='tomato_soup.jpg', description='A soup made with tomatoes as the primary ingredient.', home_cooked=True),
        Dish(name='Fried Rice', user_id=1, img='fried_rice.jpg', description='A dish of cooked rice that has been stir-fried in a wok or a frying pan.', home_cooked=True),
        Dish(name='Chicken Parmesan', user_id=1, img='chicken_parmesan.jpg', description='A breaded chicken breast topped with tomato sauce and mozzarella, parmesan, or provolone cheese.', home_cooked=True),
        Dish(name='Minestrone Soup', user_id=1, img='minestrone_soup.jpg', description='A thick soup of Italian origin made with vegetables, often with the addition of pasta or rice.', home_cooked=True)
    ]

    db.session.add_all(dishes)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the dishes table. SQLAlchemy doesn't
# have a built-in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dishes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dishes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dishes"))

    db.session.commit()
