
from db import db


class Some(db.Document):
    name = db.StringField()
    email = db.StringField()
    desc = db.StringField()

