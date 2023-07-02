"""
fastapi 使用 wechatf 例子
"""
import io
import time
import random
import functools

import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

import wechatf


def check_is_login(func):
    """
    检查是否登录
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not wechatf.is_login():
            return {"msg": "微信未登录", "code": -1}
        else:
            return func(*args, **kwargs)

    return wrapper


@app.get("/is_login")
def is_login():
    """
    是否登录
    :return:
    """
    return {"msg": "", "data": {"code": wechatf.is_login()}}


@app.get("/get_login_qrcode")
def get_login_qrcode():
    """
    获取二维码
    :return:
    """
    if not wechatf.is_login():
        # 获取二维码
        png_byte = bytes.fromhex(wechatf.get_login_qrcode())

        return StreamingResponse(io.BytesIO(png_byte), media_type="image/png")
    else:
        return {"msg": "微信已登录", "code": -1}


@app.get("/logout")
@check_is_login
def logout():
    """
    退出微信
    :return:
    """
    wechatf.logout()
    return {"msg": "", "code": 0}


@app.get("/get_contacts")
@check_is_login
def get_contacts():
    """
    获取联系人
    :return:
    """
    return {"msg": "", "code": 0, "data": wechatf.get_contacts()}


@app.get("/get_message")
@check_is_login
def get_msg():
    """
    获取消息
    :return:
    """
    return {"msg": "", "code": 0, "data": wechatf.get_message(False)}


@app.get("/send_message/{wxid}/{content}")
@check_is_login
def send_message(wxid: str, content: str):
    """
    发送消息
    :param wxid:
    :param content:
    :return:
    """
    # 延迟3-5秒
    time.sleep(random.randint(2, 6))
    wechatf.send_message(wxid, content)
    return {"msg": "OK", "code": 0}


if __name__ == '__main__':
    uvicorn.run('wechatf_fastapi:app',
                host='127.0.0.1', port=8000,
                reload=True, workers=1)

# uvicorn wechatf_fastapi_demo:app --reload
