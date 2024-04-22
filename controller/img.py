import base64
from datetime import datetime

import oss2
from flask import Blueprint, jsonify, request

from config import ossConfig
from models.img import Img
from utils.code_enum import Code
from utils.common import SAVE_FAILED, FIND_FAILED, construct_page_data, UPDATE_FAILED
# 图片接口
img = Blueprint('img', __name__)


@img.route('/upload', methods=['post'])
def uploadImg():  # put application's code here

    img = request.files.get('file', None)
    auth = ossConfig.auth
    bucket = oss2.Bucket(auth, 'oss-cn-chengdu.aliyuncs.com', 'geschool-bucket')
    name = img.filename
    bucket.put_object(img.filename, img)
    fileurl = "https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/" + name
    try:
        imgs = Img()
        imgs.name = name
        imgs.url = fileurl
        imgs.update_time = datetime.utcnow
        imgs.save()
    except Exception as e:
        return SAVE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": fileurl,  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@img.route('/upload/edit', methods=['post'])
def uploadEditImg():  # put application's code here

    img = request.files.get('file', None)
    auth = ossConfig.auth
    bucket = oss2.Bucket(auth, 'oss-cn-chengdu.aliyuncs.com', 'geschool-bucket')
    name = img.filename
    bucket.put_object(img.filename, img)
    fileurl = "https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/" + name
    resData = {
        "code": 0,  # 非0即错误 1
        "data": fileurl,  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@img.route('/list', methods=['get'])
def getImgList():  # put application's code here
    try:
        paged = Img.objects(statue=0)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": paged,  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)

@img.route('/admin/list', methods=['get'])
def getAdminImgList():  # put application's code here
    current = int(request.args.get('current', 0))
    pageSize = int(request.args.get('pageSize', 10))
    if not all([current, pageSize]):
        return jsonify(code=Code.NOT_NULL.value, msg="数量不能为空")
    try:
        paged = Img.objects()
        imgList = Img.objects().skip((current - 1) * pageSize).limit(pageSize)
    except Exception as e:
        return FIND_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": {"records": imgList, "total": len(paged)},  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)


@img.route('/updateStatue', methods=['post'])
def uploadImgStatue():  # put application's code here
    id = request.json.get('id', None)
    if not all([id]):
        return jsonify(code=Code.NOT_NULL.value, msg="参数不能为空")
    try:
        img = Img.objects(id=id).first()
        if img.statue == 0:
            img.statue = 1
        else:
            img.statue = 0
        img.save()
    except Exception as e:
        return UPDATE_FAILED()
    resData = {
        "code": 0,  # 非0即错误 1
        "data": "更新成功",  # 数据位置，一般为数组
        "msg": 'success'
    }
    return jsonify(resData)
