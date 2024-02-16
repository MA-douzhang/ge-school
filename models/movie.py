
from db import db
from models.cast import Cast
from models.director import Director
from models.imdb import Imdb


class Movie(db.Document):
    title = db.StringField(primary_key=True)
    year = db.IntField()
    rated = db.StringField()
    director = db.ReferenceField(Director)
    cast = db.EmbeddedDocumentListField(Cast)
    poster = db.FileField()
    imdb = db.EmbeddedDocumentField(Imdb)
