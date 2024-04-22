from datetime import datetime

from db import db
from models.cast import Cast
from models.director import Director
from models.imdb import Imdb

#图片
class Img(db.Document):
    name = db.StringField()
    url = db.StringField()
    statue = db.IntField(default=0) # 为0时正常启用 1为禁用
    update_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})
    create_time = db.DateTimeField(default=datetime.utcnow)


