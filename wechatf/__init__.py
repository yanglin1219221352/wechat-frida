"""
对外接口
"""
# 打开调试模式
_debug_print = False

# frida js 对象
from .frida_js import fj

# 好友列表
from .deal_recv_friend_list import friend_list


def get_message(block=True):
    """
    获取一条好友消息
    :param block: 是否阻塞
    """
    q = fj.get_js_msg_queue("recv_message")
    if not q.empty():
        return q.get(block=block)
    return None


def send_message(wxid, msg):
    """
    发生消息
    """
    fj.send_message(wxid, msg)


def get_contacts():
    """
    获取联系人列表
    """
    return friend_list


def get_remark_or_nick_name(wxid):
    """
    获取备注名
    """
    if wxid in friend_list:
        remark_name = friend_list[wxid]["user_remark"]
        nick_name = friend_list[wxid]["nick_name"]
        # 默认返回备注，备注没有就返回昵称
        return remark_name if remark_name else nick_name
    else:
        return None

# uvicorn wechatf_fastapi_demo:app --reload