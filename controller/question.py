from datetime import datetime

from flask import jsonify, Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models.question import Question
from models.questionComment import QuestionComment
from models.questionDO import QuestionDO
from models.questionThumb import QuestionThumb
from utils.code_enum import Code
from utils.common import SAVE_FAILED, UPDATE_FAILED, FIND_FAILED, DELETE_FAILED

question = Blueprint('question', __name__)


@question.route('/list', methods=['GET'])
@jwt_required()
def getQuestionList():
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = Question.objects(statue=0)
        questionList = Question.objects(statue=0).skip((current - 1) * pageSize).limit(pageSize)
        username = get_jwt_identity()
        questionListDO = []
        for item in questionList:
            hasThumb = getHasThumb(item.id, username)
            pageds = QuestionComment.objects(statue=0,question_id=str(item.id))
            questionDO= QuestionDO(item.id,item.title, item.create_user_name, item.content, item.thumb_num, item.statue, item.update_time, item.create_time, hasThumb,len(pageds))
            questionListDO.append(questionDO.to_json())
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": questionListDO, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@question.route('/admin/list', methods=['get'])
def getAdminQuestionList():  # put application's code here
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = Question.objects()
        questionList = Question.objects().skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": questionList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@question.route('/save', methods=['POST'])
@jwt_required()
def save_question():
    title = request.json.get('title', None)
    content = request.json.get('content', None)
    username = get_jwt_identity()
    try:
        question = Question()
        question.title = title
        question.content = content
        question.create_user_name = username
        question.update_time = datetime.utcnow
        question.thumb_num = 0
        question.save()
    except Exception as e:
        return SAVE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@question.route('/update', methods=['POST'])
@jwt_required()
def update_question():
    id = request.json.get('id', None)
    title = request.json.get('title', None)
    content = request.json.get('content', None)

    try:
        question = Question.objects(id=id).first()
        question.title = title
        question.content = content
        question.create_user_name = get_jwt_identity()
        question.update_time = datetime.utcnow
        question.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "保存成功",  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData), 200


@question.route('/updateStatue', methods=['POST'])
@jwt_required()
def uploadQuestionStatue():  # put application's code here
    id = request.json.get('id', None)
    if not all([id]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        question = Question.objects(id=id).first()
        if question.statue == 0:
            question.statue = 1
        else:
            question.statue = 0
        question.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "更新成功",  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)

@question.route('/admin/delete', methods=['POST'])
@jwt_required()
def deleteQuestion():  # put application's code here
    id = request.json.get('id', None)
    if not all([id]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        question = Question.objects(id=id).first()
        question.delete()
        QuestionComment.objects(question_id=str(id)).delete()
        QuestionThumb.objects(question_id=str(id)).delete()
    except Exception as e:
        return DELETE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "删除成功",  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)



@question.route('/getQuestion', methods=['get'])
def getQuestionById():  # put application's code here
    id = request.args.get('id', "0")
    if request.method == 'GET':
        question = Question.objects(id=id).first()
        resData = {
            "code": 0,  # 非0即错误 1
            "data": question,  # 数据位置，一般为数组
            "message": 'success'
        }
    return jsonify(resData)


@question.route('/doThumb', methods=['POST'])
@jwt_required()
def uploadQuestionDoThumb():  # put application's code here
    questionId = request.json.get('id', None)
    if not all([questionId]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        question = Question.objects(id=questionId).first()
        username = get_jwt_identity()
        questionThumb = QuestionThumb.objects(question_id=questionId, create_user_name=username).first()
        hasThumb=0
        if not questionThumb:
            questionThumb = QuestionThumb()
            questionThumb.create_user_name = username
            questionThumb.question_id = questionId
            questionThumb.save()
            # 保存点赞数
            question.update(thumb_num=question.thumb_num + 1, update_time=datetime.utcnow)
            hasThumb=1
        else:
            questionThumb.delete()
            # 减少点赞数
            question.update(thumb_num=question.thumb_num - 1, update_time=datetime.utcnow)
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": hasThumb,  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


# 查询当前题目是否被该用户点赞
def getHasThumb(questionId, username):
    id = str(questionId)
    questionThumb = QuestionThumb.objects(question_id=id, create_user_name=username).first()
    if questionThumb:
        return 1
    return 0
