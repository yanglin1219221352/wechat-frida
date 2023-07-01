"""
去除 recv_friend_list 重复消息
"""
import threading

from .frida_js import fj

# 联系人列表
friend_list = {}


class HandleFriendListMsg(threading.Thread):

    def run(self) -> None:
        while True:
            # 获取回调函数消息
            msg = fj.get_js_msg("recv_friend_list")

            if msg:
                # 加入到friend list
                if msg["wxid"] not in friend_list:
                    friend_list[msg["wxid"]] = msg


HandleFriendListMsg().start()
