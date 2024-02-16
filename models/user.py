import hashlib

from db import db


class User(db.Document):
    username = db.StringField()
    email = db.StringField()
    password = db.StringField()
    job_number = db.StringField()
    login_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})
    register_time = db.DateTimeField(wtf_options={"render_kw": {"step": "60"}})

    def check_password(self, passwd):
        '''
        检查密码
        :param passwd:
        :return: 0/1
        '''
        # 创建md5对象
        m = hashlib.md5()
        b = passwd.encode(encoding='utf-8')
        m.update(b)
        str_md5 = m.hexdigest()
        if self.password == str_md5:
            return 1
        else:
            return 0
