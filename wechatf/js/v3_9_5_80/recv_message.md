# 接受消息hook点
## 关键点
```
Executable modules, 条目 10
 基址=66600000
 大小=0354A000 (55877632.)
 入口=689F1654 WeChatWi.<ModuleEntryPoint>
 名称=WeChatWi
 文件版本=3.9.5.80
 路径=C:\Program Files (x86)\Tencent\WeChat\[3.9.5.80]\WeChatWin.dll

offset_base = 0x67502881 - 0x66600000

67502868    FFD7            call edi                                 ; mmtcmall.mm_free
6750286A    83C4 04         add esp,0x4
6750286D    8B45 A8         mov eax,dword ptr ss:[ebp-0x58]
67502870    85C0            test eax,eax
67502872    74 06           je short WeChatWi.6750287A
67502874    50              push eax
67502875    FFD7            call edi                                 ; mmtcmall.mm_free
67502877    83C4 04         add esp,0x4
6750287A    807D EF 00      cmp byte ptr ss:[ebp-0x11],0x0
6750287E    8B4D E8         mov ecx,dword ptr ss:[ebp-0x18]
67502881    56              push esi                                 ; <--------------esi指向消息结构体
67502882    74 46           je short WeChatWi.675028CA
67502884    E8 F7E9FFFF     call WeChatWi.67501280                  
67502889    0F57C0          xorps xmm0,xmm0
6750288C    C745 AC 0000000>mov dword ptr ss:[ebp-0x54],0x0
67502893    0F1145 9C       movups dqword ptr ss:[ebp-0x64],xmm0
67502897    6A FF           push -0x1
67502899    C645 FC 08      mov byte ptr ss:[ebp-0x4],0x8
6750289D    8D4D 9C         lea ecx,dword ptr ss:[ebp-0x64]
675028A0    FF76 08         push dword ptr ds:[esi+0x8]
675028A3    E8 08C30300     call WeChatWi.6753EBB0
675028A8    C645 FC 09      mov byte ptr ss:[ebp-0x4],0x9
//
//
[esi]数据：
$ ==>    >68FAABB4  WeChatWi.68FAABB4
$+4      >00000000
$+8      >181C7258  UNICODE "wxid_4ek7qe9sdrm822" wxid
$+C      >00000013
$+10     >00000013
$+14     >00000000
$+18     >00000000
$+1C     >134C1188  UNICODE "你是谁" nickname
$+20     >00000003
$+24     >00000003
$+28     >00000000
$+2C     >00000000
$+30     >00000000
$+34     >00000000
$+38     >00000001  0-接收消息 1-自己发生出去的消息
$+3C     >649ECE69
$+40     >134C1108  UNICODE "3" 消息内容
$+44     >00000001
$+48     >00000001
$+4C     >00000000
$+50     >00000000
```