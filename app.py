from cgitb import handler
from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import settings
from config.settings import SECRET_KEY
from controller.questionComment import questionComment
from controller.img import img
from controller.movie import movies
from controller.partiton import partition
from controller.post import post
from controller.question import question
from controller.some import some
from controller.user import user
from db import db
from utils.CustomJSONEncoder import CustomJSONEncoder

app = Flask(__name__)



@app.route('/',methods=['GET'])
def hello_world():  # put application's code here
    return 'Hello World!'


def init_db(app):
    '''
    加载数据库
    :param app:
    :return:
    '''
    app.config['MONGODB_SETTINGS'] = {
        'host': settings.MONGODB['HOST']
    }
    db.init_app(app)

def register_blueprints(app):
    '''
    创建蓝图
    :param app:
    :return:
    '''
    app.register_blueprint(movies, url_prefix='/movie')
    app.register_blueprint(some, url_prefix='/some')
    app.register_blueprint(user, url_prefix='/user')
    app.register_blueprint(img, url_prefix='/img')
    app.register_blueprint(partition, url_prefix='/partition')
    app.register_blueprint(post, url_prefix='/post')
    app.register_blueprint(question, url_prefix='/question')
    app.register_blueprint(questionComment, url_prefix='/questionComment')
def create_app():
    app = Flask(__name__)

    # 设置返回jsonify方法返回dict不排序
    app.config['JSON_SORT_KEYS'] = False
    # 设置返回jsonify方法返回中文不转为Unicode格式
    app.config['JSON_AS_ASCII'] = False
    app.json_encoder = CustomJSONEncoder
    # 配置跨域
    CORS(app)

    # 注册蓝图
    register_blueprints(app)
    #加载jwt配置token
    init_jwt(app)

    # 加载数据库
    init_db(app)
    #
    # # 加载redis配置
    # init_redis(app)

    # 加载日志
    app.logger.addHandler(handler)
    return app

def init_jwt(app):
    app.config["JWT_SECRET_KEY"] = SECRET_KEY  # 设置 jwt 的秘钥
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=15)
    # 设置刷新JWT过期时间
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9093)
