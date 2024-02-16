from datetime import datetime

from flask import jsonify, Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models.post import Post
from utils.code_enum import Code
from utils.common import SAVE_FAILED, UPDATE_FAILED, FIND_FAILED

post = Blueprint('post', __name__)


@post.route('/list', methods=['GET'])
def getPostList():
    partition_id = int(request.args.get('partitionId', 0))
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = Post.objects(partition_id=partition_id,statue=0)
        if partition_id > 0:
            imgList = Post.objects(partition_id=partition_id, statue=0).skip((current - 1) * pageSize).limit(pageSize)
        else:
            imgList = Post.objects(partition_id=partition_id, statue=0).skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": imgList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@post.route('/admin/list', methods=['get'])
def getAdminPostList():  # put application's code here
    partition_id = int(request.args.get('partitionId', 0))
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = Post.objects()
        if partition_id > 0:
            imgList = Post.objects(partition_id=partition_id).skip((current - 1) * pageSize).limit(pageSize)
        else:
            imgList = Post.objects().skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": imgList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@post.route('/save', methods=['POST'])
@jwt_required()
def save_post():
    title = request.json.get('title', None)
    content = request.json.get('content', None)
    partition_id = request.json.get('partitionId', None)
    username = get_jwt_identity()
    print(username)
    try:
        post = Post()
        post.title = title
        post.content = content
        post.partition_id = partition_id
        post.create_user_name = username
        post.update_time = datetime.utcnow
        post.save()
    except Exception as e:
        return SAVE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@post.route('/update', methods=['POST'])
@jwt_required()
def update_post():
    id = request.json.get('id', None)
    title = request.json.get('title', None)
    content = request.json.get('content', None)
    partition_id = request.json.get('partitionId', None)

    try:
        post = Post.objects(id=id).first()
        post.title = title
        post.content = content
        post.partition_id = partition_id
        post.create_user_name = get_jwt_identity()
        post.update_time = datetime.utcnow
        post.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@post.route('/updateStatue', methods=['post'])
@jwt_required()
def uploadPostStatue():  # put application's code here
    id = request.json.get('id', None)
    if not all([id]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        post = Post.objects(id=id).first()
        if post.statue == 0:
            post.statue = 1
        else:
            post.statue = 0
        post.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "更新成功",  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@post.route('/getPost', methods=['get'])
def getPostById():  # put application's code here
    id = request.args.get('id', "0")
    if request.method == 'GET':
        post = Post.objects(id=id).first()
        result = {
            "title": post.title,
            "content": post.content,
            "partitionId": post.partition_id,
            "statue": post.statue,
        }
        resData = {
            "code": 0,  # 非0即错误 1
            "data": post,  # 数据位置，一般为数组
            "message": 'success'
        }
    return jsonify(resData)
