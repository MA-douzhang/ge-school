from datetime import datetime

from db import db
from models.cast import Cast
from models.director import Director
from models.imdb import Imdb


class QuestionThumb(db.Document):
    question_id=db.StringField() # 问题id
    create_user_name=db.StringField() #作者账户
    update_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})
    create_time = db.DateTimeField(default=datetime.utcnow)
