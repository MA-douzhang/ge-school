from flask import jsonify, Blueprint, request

from models.movie import Movie
from models.partition import Partition
from models.some import Some
from utils.common import SAVE_FAILED

# 分区接口
partition = Blueprint('partition', __name__)


@partition.route('/list', methods=['GET'])
def get_partition():
    partitionList = Partition.objects()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": partitionList,  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@partition.route('/', methods=['POST'])
def save_partition():
    name = request.json.get('name', None)
    id = request.json.get('id', None)


    try:
        partition = Partition()
        partition.name = name
        partition.pid_id = id
        partition.save()
    except Exception as e:
        return SAVE_FAILED()

    resData = {
        "code": 0,  # 非0即错误 1
        "data": "成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200

@partition.route('/getPartition', methods=['get'])
def getPartitionById():  # put application's code here
    id = request.args.get('id', 0)
    if request.method == 'GET':
        partition = Partition.objects(pid_id=id).first()
        resData = {
            "code": 0,  # 非0即错误 1
            "data": partition,  # 数据位置，一般为数组
            "message": 'success'
        }
    return jsonify(resData)
