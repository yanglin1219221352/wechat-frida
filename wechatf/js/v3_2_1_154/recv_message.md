```
// 逆向信息
// Executable modules, 条目 9
//  基址=64510000
//  大小=01D8F000 (30994432.)
//  入口=655885E1 WeChatWi.<ModuleEntryPoint>
//  名称=WeChatWi
//  文件版本=3.2.1.154
//  路径=C:\Program Files (x86)\Tencent\WeChat\WeChatWin.dll
//
// at 64510000 + 0x3DF42C
//
// 648EF414    8D8D D8F2FFFF   lea ecx,dword ptr ss:[ebp-0xD28]
// 648EF41A    51              push ecx
// 648EF41B    8D48 0C         lea ecx,dword ptr ds:[eax+0xC]
// 648EF41E    E8 CDBEE3FF     call WeChatWi.6472B2F0
// 648EF423    8D85 ECF3FFFF   lea eax,dword ptr ss:[ebp-0xC14]
// 648EF429    8BCF            mov ecx,edi
// 648EF42B    50              push eax                              ;eax指向消息数据结构
// 648EF42C    E8 3F86CAFF     call WeChatWi.64597A70
// 648EF431    8D8D A4F6FFFF   lea ecx,dword ptr ss:[ebp-0x95C]
// 648EF437    E8 84E81A00     call WeChatWi.64A9DCC0
// 648EF43C    8D4D 90         lea ecx,dword ptr ss:[ebp-0x70]
// 648EF43F    E8 DC83C7FF     call WeChatWi.64567820
// 648EF444    8D8D ECF3FFFF   lea ecx,dword ptr ss:[ebp-0xC14]
// 648EF44A    E8 01E9C7FF     call WeChatWi.6456DD50
//
//
// [eax]数据：
// $ ==>    > 019CBAE0
// $+4      > 00000189
// $+8      > 00000000
// $+C      > 00000000
// $+10     > 3155652F
// $+14     > 00000000
// $+18     > 00000000
// $+1C     > 00000000
// $+20     > 00000000
// $+24     > 00000000
// $+28     > CE22FACC
// $+2C     > 681B611A          qbcore.681B611A
// $+30     > 00000001
// $+34     > 00000000
// $+38     > 00000002
// $+3C     > 649C0F8C         WeChatWi.649C0F8C
// $+40     > 0D71BC30       UNICODE "wxid_4ek7qe9sdrm822"
// $+44     > 00000013
// $+48     > 00000013
// $+4C     > 00000000
// $+50     > 00000000
// $+54     > 00000000
// $+58     > 00000000
// $+5C     > 00000000
// $+60     > 00000000
// $+64     > 00000000
// $+68     > 0D72C690       UNICODE "你好"  内容
// $+6C     > 00000002
// $+70     > 00000002
// $+74     > 00000000
// $+78     > 00000000
// 
```