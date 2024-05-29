from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Demo', email='demo@aa.io', password='password'),
        User(username='Marnie', email='marnie@aa.io', password='password'), 
        User(username='Bobbie', email='bobbie@aa.io', password='password'), 
        User(username='Alex', email='alex@aa.io', password='password'),
        User(username='Jordan', email='jordan@aa.io', password='password'),
        User(username='Taylor', email='taylor@aa.io', password='password'),
        User(username='Casey', email='casey@aa.io', password='password'),
        User(username='Ryan', email='ryan@aa.io', password='password'),
        User(username='Morgan', email='morgan@aa.io', password='password'),
        User(username='Pat', email='pat@aa.io', password='password'),
        User(username='Blake', email='blake@aa.io', password='password'),User(username='Sam', email='sam@aa.io', password='password'),
        User(username='Chris', email='chris@aa.io', password='password'),
        User(username='Kerry', email='kerry@aa.io', password='password'),
        User(username='Jamie', email='jamie@aa.io', password='password'),
        User(username='Kelly', email='kelly@aa.io', password='password'),
        User(username='Jessie', email='jessie@aa.io', password='password'),
        User(username='Quinn', email='quinn@aa.io', password='password'),
    ]

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
