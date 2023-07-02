# wechat-frida PC微信机器人python框架 （支持chatgpt聊天、自动回复好友消息)

wechat-frida 是一款使用frida框架hook微信PC端的聊天机器人框架。该框架使用frida js脚本动态hook程序，便于调试和快速开发最新适配脚本。

* 仓库地址：[https://github.com/luoyeah/wechat-frida](https://github.com/luoyeah/wechat-frida)

## 1、快速开始

```
# 获取机器人
wf = wechatf

# 发送消息
wf.send_message(wxid, msg)

# 获取消息 以阻塞模式获取
msg = wechatf.get_message()

# 获取联系人
contacts = wechatf.get_contacts()
```

## 2、支持版本

* 微信客户端可自行百度下载，注意查看数字签名是否完整。

#### v3_2_1_154

* ✅ 获取登录状态
* ✅ 获取登录二维码
* ✅ 获取联系人列表
* ✅ 接收文本消息
* ✅ 发送文本消息

#### v3_9_5_80(x86)

* ✅ 接收文本消息
* ✅ 发送文本消息
* ⬜ 获取联系人列表（🚧施工中）
* ⬜ 获取登录二维码🚧
* ⬜ 获取个人信息、登录状态🚧
*

## 3、例子：ChatGPT聊天、自动回复好友消息

### 3.1 使用方法：

1. 获取chatgpt api
   key，免费获取地址 [https://github.com/chatanywhere/GPT_API_free](https://github.com/chatanywhere/GPT_API_free)。
2. 将api key保存到openai.key 文件内。
3. 运行auto_repeat.py。在手机端给文件传输助手发送```/h```获取帮助。

```
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
 ```

## 4、更多例子

* wechatf_fastapi_demo.py 网页访问wechatf机器人

-----------------------------------
注：该程序仅用于学习交流，禁止商用或其他非法用途。