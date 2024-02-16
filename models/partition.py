
from db import db


class Partition(db.Document):
    pid_id = db.IntField(default=0)# 分区id
    name = db.StringField()# 分区名称
