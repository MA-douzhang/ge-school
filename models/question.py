from datetime import datetime

from db import db


class Question(db.Document):
    title = db.StringField()  # 文章题目
    create_user_name = db.StringField()  # 作者账户
    content = db.StringField()  # 文章内容
    thumb_num = db.IntField(default=0)  # 点赞数
    statue = db.IntField(default=0)  # 为0时正常启用 1为禁用
    update_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})
    create_time = db.DateTimeField(default=datetime.utcnow)
