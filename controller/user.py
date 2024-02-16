from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from models.user import User
from utils.common import DUPLICATE_NAME, create_passwd, SAVE_FAILED, UPDATE_FAILED, FIND_FAILED
from utils.code_enum import Code

user = Blueprint('user', __name__)


@user.route('/getUser', methods=['get'])
@jwt_required()
def getUserById():  # put application's code here
    username = get_jwt_identity()
    if request.method == 'GET':
        user = User.objects(username=username).first()
        sql_data = {'id': user.id, 'username': user.username, 'email': user.email,
                    'loginTime': user.login_time,
                    'registerTime': user.register_time}
        resData = {
            "code": 0,  # 非0即错误 1
            "data": sql_data,  # 数据位置，一般为数组
            "message": 'success'
        }
    return jsonify(resData)


@user.route('/token', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not all([username, password]):
        return jsonify(code=Code.NOT_NULL.value, message="用户名和密码不能为空")
    try:
        user = User.objects(username=username).first()
    except Exception as e:
        return jsonify(code=Code.SUCCEED_REQUEST_FAILED_RESULT.value, message="获取信息失败")
    if user is None or not user.check_password(password):
        return jsonify(code=Code.ERR_PWD.value, message="用户名或密码错误")
    access_token = create_access_token(identity=username)
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {'username': username, 'token': access_token, 'email': user.email},  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData)


@user.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    jobNumber = request.json.get('jobNumber', None)
    email = request.json.get('email', None)
    if not all([username, password, jobNumber]):
        return jsonify(code=Code.NOT_NULL.value, message="用户名和密码工号不能为空")
    try:
        user = User.objects(username=username).first()
        if user:
            return DUPLICATE_NAME()
    except Exception as e:
        return jsonify(code=Code.SUCCEED_REQUEST_FAILED_RESULT.value, message="获取信息失败")
    try:
        model = User()
        model.username = username
        model.email = email
        model.password = create_passwd(password)
        model.job_number = jobNumber
        model.save()
    except Exception as e:
        return SAVE_FAILED()
    print("==> Create Account<{}> Id<{}>".format(model.username, model.id))
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {'name': username, 'email': model.email},  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData)


@user.route('', methods=['Patch'])
@jwt_required()
def update():
    username = request.json.get('username', None)
    if not all([username]):
        return jsonify(code=Code.NOT_NULL.value, message="用户名和单词数量不能为空")
    try:
        user = User.objects(username=username).first()
        if not user:
            return DUPLICATE_NAME()
    except Exception as e:
        return jsonify(code=Code.SUCCEED_REQUEST_FAILED_RESULT.value, message="获取信息失败")
    try:
        model = User()
        model.id = user.id
        model.update()
    except Exception as e:
        return UPDATE_FAILED()
    print("==> Create Account<{}> Id<{}>".format(model.name, model.id))
    resData = {
        "code": 200,  # 非0即错误 1
        "data": {},  # 数据位置，一般为数组
        "message": 'success'
    }
    return jsonify(resData)


@user.route('/list', methods=['GET'])
def getUserList():
    jobNumber = request.args.get('jobNumber', 0)
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = User.objects()
        if len(jobNumber) > 0:
            userList = User.objects(job_number=jobNumber).skip((current - 1) * pageSize).limit(pageSize)
        else:
            userList = User.objects().skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": userList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)
