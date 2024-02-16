from flask import jsonify, Blueprint, request
from flask_jwt_extended import get_current_user, jwt_required, get_jwt_identity

from models.movie import Movie
from models.partition import Partition
from models.some import Some
from utils.common import SAVE_FAILED

some = Blueprint('some', __name__)


@some.route('/', methods=['GET'])
@jwt_required()
def get_some():
    some = Some.objects()
    resData = {
        "resCode": 0,  # 非0即错误 1
        "data": {"user": get_jwt_identity()},  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@some.route('/', methods=['POST'])
def save_some():
    name = request.json.get('name', None)
    id = request.json.get('id', None)

    try:
        some = Partition()
        some.name = name
        some.pid_id = id
        some.save()
    except Exception as e:
        return SAVE_FAILED()

    print("==> Create Account<{}> Id<{}>".format(some.name, some.id))
    resData = {
        "resCode": 0,  # 非0即错误 1
        "data": "成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200
