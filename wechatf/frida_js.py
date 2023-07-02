"""
处理frida脚本交互：消息接收、js脚本执行
"""
import queue

from .frida_session import FridaSession
from . import _debug_print


class FridaJS:
    def __init__(self):
        # frida 连接
        self._frida_session = FridaSession()

        # frida on_message 消息队列
        self._api_message = {}

        # 消息回调函数
        self._api_on_message = self._gen_on_message_callback()

        # 回调js
        recv_js = [
            "recv_login_qrcode",
            "recv_friend_list",
            "recv_message",
        ]

        # 加载所有回调js
        for js in recv_js:
            # 为每个js建立消息队列
            self._api_message[js] = queue.Queue()

            # 加载脚本
            self._frida_session.load_script(js, self._api_on_message)

    def _gen_on_message_callback(self):
        """
        生成消息回调函数
        """

        def _on_message(message, data):
            if message["type"] == 'send':
                if _debug_print:
                    print("来自Frida的消息：\n", message["payload"])
                    print("---------------------")

                # 获取api 类型和数据
                api = message["payload"]["api"]
                data = message["payload"]["data"]

                # 判断是否存在队列
                if api in self._api_message.keys():
                    # 加入到特定的消息队列
                    self._api_message.get(api).put(data)

        return _on_message

    def get_js_msg_queue(self, api_name):
        """
        获取frida返回的消息
        """
        # 获取一条队列消息
        if api_name in self._api_message.keys():
            return self._api_message.get(api_name)
        else:
            raise Exception("无API调用消息队列：", api_name)

    def get_js_msg(self, api_name):
        """
        获取frida返回的消息
        """
        # 获取一条队列消息
        if api_name in self._api_message.keys():
            return self._api_message.get(api_name).get()
        else:
            raise Exception("无API调用消息队列：", api_name)

    def __getattr__(self, func_name):
        """
        调用js功能
        """
        # 加载脚本
        script = self._frida_session.load_script(func_name)

        # 判断是否加载成功
        if not script:
            raise Exception('该功能未实现')

        def sync_call(*args, **kwargs):
            # 根据名称获取方法
            _func = getattr(script.exports_sync, func_name.replace("_", ""))

            # 调用方法
            result = _func(*args, **kwargs)

            # 卸载脚本
            script.unload()

            return result

        return sync_call


fj = FridaJS()
