from datetime import datetime

from flask import jsonify, Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models.questionComment import QuestionComment
from utils.code_enum import Code
from utils.common import SAVE_FAILED, UPDATE_FAILED, FIND_FAILED

questionComment = Blueprint('questionComment', __name__)


@questionComment.route('/list', methods=['GET'])
@jwt_required()
def getQuestionCommentList():
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    questionId = request.args.get('questionId', "")
    if not all([current, pageSize,questionId]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        paged = QuestionComment.objects(statue=0,question_id=questionId)
        questionCommentList = QuestionComment.objects(statue=0,question_id=questionId).skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": questionCommentList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@questionComment.route('/admin/list', methods=['get'])
def getAdminQuestionCommentList():  # put application's code here
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = QuestionComment.objects()
        questionCommentList = QuestionComment.objects().skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": questionCommentList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@questionComment.route('/save', methods=['POST'])
@jwt_required()
def save_questionComment():
    content = request.json.get('content', None)
    questionId = request.json.get('questionId', "")
    username = get_jwt_identity()
    try:
        questionComment = QuestionComment()
        questionComment.content = content
        questionComment.question_id=questionId
        questionComment.create_user_name = username
        questionComment.update_time = datetime.utcnow
        questionComment.save()
    except Exception as e:
        return SAVE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@questionComment.route('/update', methods=['POST'])
@jwt_required()
def update_questionComment():
    id = request.json.get('id', None)
    content = request.json.get('content', None)

    try:
        questionComment = QuestionComment.objects(id=id).first()
        questionComment.content = content
        questionComment.create_user_name = get_jwt_identity()
        questionComment.update_time = datetime.utcnow
        questionComment.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@questionComment.route('/updateStatue', methods=['POST'])
@jwt_required()
def uploadQuestionCommentStatue():  # put application's code here
    id = request.json.get('id', None)
    if not all([id]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        questionComment = QuestionComment.objects(id=id).first()
        if questionComment.statue == 0:
            questionComment.statue = 1
        else:
            questionComment.statue = 0
        questionComment.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "更新成功",  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@questionComment.route('/getQuestionComment', methods=['get'])
def getQuestionCommentById():  # put application's code here
    id = request.args.get('id', "0")
    if request.method == 'GET':
        questionComment = QuestionComment.objects(id=id).first()
        resData = {
            "code": 0,  # 非0即错误 1
            "data": questionComment,  # 数据位置，一般为数组
            "message": 'success'
        }
    return jsonify(resData)

