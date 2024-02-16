# -*- coding: utf-8 -*-
import oss2

# 填写RAM用户的访问密钥（AccessKey ID和AccessKey Secret）。
accessKeyId = 'LTAI5tDV944dtJkyvXi4S7kT'
accessKeySecret = '9iZKHG64c2VMNEk1apRvwqO5F4O8m0'
# 使用代码嵌入的RAM用户的访问密钥配置访问凭证。
auth = oss2.Auth(accessKeyId, accessKeySecret)
