---
title: token认证
category: django
date: 2022-09-23 11:34:49
tags:
---



# token

token适用于前后端分离项目

```python
import time
from django.core import signing
import hashlib

HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = "jie220622-fd%HG56Fsgy-fdsM4&%ghNh44da64"
SALT = "jieshenai"


def encrypt(obj):
    """加密：signing 加密 and Base64 编码"""
    value = signing.dumps(obj, key=KEY, salt=SALT)
    value = signing.b64_encode(value.encode()).decode()
    return value


def decrypt(src):
    """解密：Base64 解码 and signing 解密"""
    src = signing.b64_decode(src.encode()).decode()
    raw = signing.loads(src, key=KEY, salt=SALT)
    return raw


def create_token(username):
    """生成token信息"""
    # 1. 加密头信息
    header = encrypt(HEADER)
    # 2. 构造Payload(有效期28天)
    payload = {"username": username, "iat": time.time(),
               "exp": time.time() + 2419200.0}
    payload = encrypt(payload)
    # 3. MD5 生成签名
    md5 = hashlib.md5()
    md5.update(("%s.%s" % (header, payload)).encode())
    signature = md5.hexdigest()
    token = "%s.%s.%s" % (header, payload, signature)
    return token


def get_payload(token):
    """解析 token 获取 payload 数据"""
    payload = str(token).split('.')[1]
    payload = decrypt(payload)
    return payload


def get_username(token):
    """解析 token 获取 username"""
    payload = get_payload(token)
    return payload['username']


def get_exp_time(token):
    """解析 token 获取过期时间"""
    payload = get_payload(token)
    return payload['exp']


def check_token(username, token):
    """验证 token：检查 username 和 token 是否一致且未过期"""
    return get_username(token) == username and get_exp_time(token) > time.time()

```



用户在登录时，服务器端检查用户的账号和密码无误后:

根据用户名创建token，token中设定了token的有效期,  将token返回给用户

```python
return JsonResponse({"code": 200, "data": {"token": _token, "nickName": username}})
```



用户的浏览器接收到token后，将token存到内存中，以后发起请求时，将token带上。(这一步不是浏览器自动完成，由前端程序员，使用js编码实现)

后端在`app/middleware/auth.py` 中间件中，对用户的每一次请求进行token验证。

前端的请求会将token, username放置到request.headers中，

使用`request.headers.get("token")` 即可拿到token值。

