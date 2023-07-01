"""
fastapi 使用 wechatf 例子
"""
import time
import random

import uvicorn
from fastapi import FastAPI

app = FastAPI()

import wechatf


@app.get("/get_message")
def get_msg():
    return wechatf.get_message(False)


@app.get("/")
def get_contacts():
    return wechatf.get_contacts()


@app.get("/get_remark_name/{wxid}")
def get_remark_name(wxid: str):
    return wechatf.get_remark_or_nick_name(wxid)


@app.get("/send_message/{wxid}/{content}")
def send_message(wxid: str, content: str):
    # 延迟3-5秒
    time.sleep(random.randint(2, 6))
    wechatf.send_message(wxid, content)
    return {"msg": "OK"}


if __name__ == '__main__':
    uvicorn.run('wechatf_fastapi_demo:app',
                host='127.0.0.1', port=8000,
                reload=True, workers=1)
