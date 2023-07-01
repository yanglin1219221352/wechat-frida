"""
wechatf 例子
自动回复
"""
import time
import random

import openai

import wechatf


# 处理消息
class DealMessage:
    def __init__(self):
        # 上次回复消息时间
        self._last_repeat_time = time.time()

        # 自动回复开关
        self._auto_repeat_flag = False

        # 自动回复消息内容
        self._auto_repeat_msg_def = "[自动回复]现在不方便回复，请留言或手机联系。"
        self._auto_repeat_msg = self._auto_repeat_msg_def

        # ai回复开关
        self._auto_repeat_ai_flag = True

        # gpt 聊天记录
        self._ai_message_list = []

        # 免费API获取地址
        # https://github.com/chatanywhere/GPT_API_free
        # openai.log = "debug"

        # 国内可直接访问
        openai.api_base = "https://api.chatanywhere.com.cn/v1"
        # 需要梯子才能访问
        # openai.api_base = "https://api.chatanywhere.cn/v1/"

        openai.api_key = open("openai.key", 'r').read()

    def _deal_filehelper_msg(self, msg):
        """
        处理文件助手消息
        """
        result = None
        if msg == '/h':
            # 打印帮助
            result = """
/h
打印帮助消息。

/sa msg
开启自动回复并设置内容。

/ea
取消自动回复。

/sai
开启ai聊天。

/cai
清除ai聊天上下文

/eai
取消ai聊天。
                """
        elif msg.startswith('/sa '):
            # 开启自动回复
            if len(msg) > 4:
                self._auto_repeat_msg = msg[4:]
            else:
                self._auto_repeat_msg = self._auto_repeat_msg_def

            self._auto_repeat_flag = True

            result = f"已开启自动回复：{self._auto_repeat_msg}"

        elif msg == '/ea':
            # 关闭自动回复
            self._auto_repeat_flag = False
            result = "已关闭自动回复"

        elif msg == '/sai':
            # 开启ai
            self._auto_repeat_ai_flag = True
            result = "已开启ai聊天"

        elif msg == '/cai':
            self._ai_message_list.clear()
            result = "已清除ai聊天上下文"

        elif msg == '/eai':
            # 关闭ai聊天
            self._auto_repeat_ai_flag = False
            result = "已关闭ai聊天"

        elif self._auto_repeat_ai_flag:
            result = self._gpt(msg)

        return result

    def _get_repeat_msg(self, wxid, msg):
        """
        获取返回消息
        """
        # 判断是否为空
        if not msg:
            return None

        result = None

        if wxid == 'filehelper':
            # 文件传输助手消息
            result = self._deal_filehelper_msg(msg)
        else:
            # 自动回复
            if self._auto_repeat_flag:
                result = self._auto_repeat_msg

        return result

    def deal_message(self, data):
        # 获取消息内容
        msg_type = data["type"]
        wxid = data["wxid"]
        msg = data["message"]

        # 过滤空消息
        if msg.strip() == '':
            return

        # 过滤非文本
        if msg_type != "text":
            return

        # 过滤非个人微信号但不过滤filehelper
        if not wxid.startswith("wxid_") and wxid != 'filehelper':
            return

        remark_name = wechatf.get_remark_or_nick_name(wxid)
        if remark_name:
            print("接收到消息", wxid, remark_name, msg)
        else:
            print("接收到消息", wxid, "", msg)

        # 处理消息
        repeat_msg = self._get_repeat_msg(wxid, msg.strip())

        # 判断是否有消息
        if repeat_msg:
            # 计算等待时间最少等待3-5秒
            waiting_time = int(random.randint(3, 5))  # - (time.time() - self._last_repeat_time))
            if waiting_time > 0:
                time.sleep(waiting_time)

            # 发送消息
            wechatf.send_message(wxid, repeat_msg)

            # 设置时间
            self._last_repeat_time = time.time()
            print("发送消息：", wxid, repeat_msg)

    def _gpt(self, msg):
        """
        发起chatgtp请求
        """
        # 判断是否是空内容
        if msg is None or msg.strip() == "":
            return None

        # 非流式响应
        self._ai_message_list.append(
            {
                "role": "user",
                "content": msg.strip()
            }
        )

        # 发生请求
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=self._ai_message_list)

        # 获取消息
        return completion.choices[0].message.content


# 消息处理实例
deal_message = DealMessage()


def main():
    while True:
        # 取消息
        data = wechatf.get_message()
        if data:
            # 微信好友发来的消息
            deal_message.deal_message(data)


if __name__ == '__main__':
    main()
    # 阻塞进程
    input()
