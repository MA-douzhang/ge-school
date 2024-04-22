from datetime import datetime

from db import db

#问题评论
class QuestionComment(db.Document):
    question_id=db.StringField() # 问题id
    create_user_name=db.StringField() #作者账户
    content = db.StringField()# 评论内容
    statue = db.IntField(default=0) # 为0时正常启用 1为禁用
    update_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})
    create_time = db.DateTimeField(default=datetime.utcnow)
