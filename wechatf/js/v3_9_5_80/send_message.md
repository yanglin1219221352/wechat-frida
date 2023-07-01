# 寻找发送消息call

## 关键点
* 分析：没有输入内容时，点击发生按钮，会提示“不能发送空白消息”，可以根据这一点找到关键代码，使用Cheat engine 搜索 “不能发送空白消息” 字符串，勾选UTF-16。
* 然后将搜到的字符串地址地址设置内存访问断点，再次不输入内容点击发生按钮键，程序将会短下来。
* 分析调用堆栈，反复尝试可以发现关键函数，无论发布发生消息都会段下来：
```
6634A9E0                    53              push ebx
6634A9E1                    8BDC            mov ebx,esp
6634A9E3                    83EC 08         sub esp,0x8
6634A9E6                    83E4 F8         and esp,-0x8
6634A9E9                    83C4 04         add esp,0x4
6634A9EC                    55              push ebp
6634A9ED                    8B6B 04         mov ebp,dword ptr ds:[ebx+0x4]
6634A9F0                    896C24 04       mov dword ptr ss:[esp+0x4],ebp
6634A9F4                    8BEC            mov ebp,esp
6634A9F6                    6A FF           push -0x1
...
```

## call调用现场
发送消息call


```
577EF4BE     68 36030000     push 0x336
577EF4C3     8BC8            mov ecx,eax
577EF4C5     E8 164A4500     call WeChatWi.57C43EE0
577EF4CA     8B3D FC025F59   mov edi,dword ptr ds:[<&mmtcmalloc.mm_fr>; mmtcmall.mm_free
577EF4D0     E9 A7000000     jmp WeChatWi.577EF57C
577EF4D5     E8 D6D1E4FF     call WeChatWi.5763C6B0
577EF4DA     6A 00           push 0x0                                 ; 构建参数
577EF4DC     FF76 04         push dword ptr ds:[esi+0x4]              ; push 0
577EF4DF     8D46 38         lea eax,dword ptr ds:[esi+0x38]          ; 未知内存地址
577EF4E2     6A 01           push 0x1
577EF4E4     6A 01           push 0x1
577EF4E6     50              push eax
577EF4E7     8D46 08         lea eax,dword ptr ds:[esi+0x8]
577EF4EA     50              push eax                                 ; eax->WXStruct("abcd") 消息内容
577EF4EB     8D95 78FFFFFF   lea edx,dword ptr ss:[ebp-0x88]          ; edx->WXStruct("filehelper") 接受者wxid
577EF4F1     8D8D A8F8FFFF   lea ecx,dword ptr ss:[ebp-0x758]         ; ecx 指向未知内存地址
577EF4F7     E8 44B03D00     call WeChatWi.57BCA540                   ; 发送消息
577EF4FC     83C4 18         add esp,0x18                             ; 清理参数
577EF4FF     8D8D A8F8FFFF   lea ecx,dword ptr ss:[ebp-0x758]
577EF505     C645 FC 07      mov byte ptr ss:[ebp-0x4],0x7
577EF509     E8 C2A65600     call WeChatWi.57D59BD0
577EF50E     0BC2            or eax,edx
577EF510     74 5F           je short WeChatWi.577EF571
...
Executable modules, 条目 10
 基址=56ED0000
 大小=0354A000 (55877632.)
 入口=592C1654 WeChatWi.<ModuleEntryPoint>
 名称=WeChatWi
 文件版本=3.9.5.80
 路径=C:\Program Files\Tencent\WeChat\[3.9.5.80]\WeChatWin.dll

```