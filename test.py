"""
测试
"""
import time

import wechatf


def test_recv_friend_list():
    """
    测试获取通讯录
    """
    time.sleep(5)
    contacts = wechatf.get_contacts()

    print(contacts, len(contacts))
    assert len(contacts) > 0


def test_receive_send_message_getremarkname():
    """
    测试发送接收消息、获取昵称
    """

    # 发生消息
    wechatf.send_message("weixin", "如何卸载微信")

    # 获取消息
    msg = wechatf.get_message()

    count = 2
    while count > 0:
        if "长按微信图标" in msg["message"]:
            assert wechatf.get_remark_or_nick_name(msg["wxid"]) == "微信团队"
            break
        else:
            count -= 1
            continue

    assert (count > 0)


if __name__ == '__main__':
    # test_send_msg()
    print(wechatf.is_login())
    pass
