```
// Executable modules, 条目 9
//  基址=64D50000
//  大小=01D8F000 (30994432.)
//  入口=65DC85E1 WeChatWi.<ModuleEntryPoint>
//  名称=WeChatWi
//  文件版本=3.2.1.154
//  路径=C:\Program Files (x86)\Tencent\WeChat\WeChatWin.dll
//  
// 64E5CCC0    0FB70450        movzx eax,word ptr ds:[eax+edx*2]
// 64E5CCC4    83F8 20         cmp eax,0x20
// 64E5CCC7    74 0F           je short WeChatWi.64E5CCD8
// 64E5CCC9    83F8 0A         cmp eax,0xA
// 64E5CCCC    74 0A           je short WeChatWi.64E5CCD8
// 64E5CCCE    83F8 09         cmp eax,0x9
// 64E5CCD1    74 05           je short WeChatWi.64E5CCD8
// 64E5CCD3    83F8 0D         cmp eax,0xD
// 64E5CCD6    75 0E           jnz short WeChatWi.64E5CCE6
// 64E5CCD8    42              inc edx
// 64E5CCD9    3BD1            cmp edx,ecx
// 64E5CCDB    0F8D C3000000   jge WeChatWi.64E5CDA4
// 64E5CCE1    8B45 BC         mov eax,dword ptr ss:[ebp-0x44]
// 64E5CCE4  ^ EB DA           jmp short WeChatWi.64E5CCC0
// 64E5CCE6    E8 056DF5FF     call WeChatWi.64DB39F0
// 64E5CCEB    6A 01           push 0x1
// 64E5CCED    57              push edi
// 64E5CCEE    53              push ebx
// 64E5CCEF    8D95 78FFFFFF   lea edx,dword ptr ss:[ebp-0x88]
// 64E5CCF5    8D8D 58FAFFFF   lea ecx,dword ptr ss:[ebp-0x5A8]
// 64E5CCFB    E8 B0962A00     call WeChatWi.651063B0                       <=======发送消息
// 64E5CD00    83C4 0C         add esp,0xC
// 64E5CD03    50              push eax                                 ; WeChatWi.66822078
// 64E5CD04    8D8D B0FCFFFF   lea ecx,dword ptr ss:[ebp-0x350]
// 64E5CD0A    C645 FC 06      mov byte ptr ss:[ebp-0x4],0x6
// 64E5CD0E    E8 ADEBF4FF     call WeChatWi.64DAB8C0
// 64E5CD13    8D8D 58FAFFFF   lea ecx,dword ptr ss:[ebp-0x5A8]
// 64E5CD19    C645 FC 08      mov byte ptr ss:[ebp-0x4],0x8
// 64E5CD1D    E8 2E10F5FF     call WeChatWi.64DADD50
// 64E5CD22    E8 99F61D00     call WeChatWi.6503C3C0
// 64E5CD27    8BC8            mov ecx,eax                              ; WeChatWi.66822078
// 64E5CD29    E8 02B33F00     call WeChatWi.65258030
// 64E5CD2E    8D8D B0FCFFFF   lea ecx,dword ptr ss:[ebp-0x350]
// 64E5CD34    8955 BC         mov dword ptr ss:[ebp-0x44],edx
// 64E5CD37    8BF8            mov edi,eax                              ; WeChatWi.66822078
// 64E5CD39    E8 F2B23F00     call WeChatWi.65258030
// 64E5CD3E    3BC7            cmp eax,edi
// 64E5CD40    75 05           jnz short WeChatWi.64E5CD47
// 64E5CD42    3B55 BC         cmp edx,dword ptr ss:[ebp-0x44]
// 64E5CD45    74 45           je short WeChatWi.64E5CD8C
// 64E5CD47    8B7D B4         mov edi,dword ptr ss:[ebp-0x4C]
// 64E5CD4A    8BCF            mov ecx,edi
// 64E5CD4C    E8 2F270000     call WeChatWi.64E5F480
// 64E5CD51    84C0            test al,al
// 64E5CD53    74 37           je short WeChatWi.64E5CD8C
// 64E5CD55    8D45 0C         lea eax,dword ptr ss:[ebp+0xC]
// 64E5CD58    50              push eax                                 ; WeChatWi.66822078
// 64E5CD59    8D4F 18         lea ecx,dword ptr ds:[edi+0x18]
// 64E5CD5C    E8 5F144800     call WeChatWi.652DE1C0
// 64E5CD61    84C0            test al,al
// 64E5CD63    74 27           je short WeChatWi.64E5CD8C
// 64E5CD65    6A 01           push 0x1
// 64E5CD67    8D85 B0FCFFFF   lea eax,dword ptr ss:[ebp-0x350]
// 
// 
// 	__asm {
// 		push 0x1;
// 		lea edi, buff2;
// 		push edi;
// 		mov ebx, pWxmsg;
// 		push ebx;
// 		lea ecx, buff;
// 		mov edx, pWxid;
// 		call dwSendCallAddr;  参数：GeneralStruct(MSG),nullbuf,1  ecx=nullbuf, edx=GeneralStruct(wxid)
// 		add esp, 0xC;
// 	}
// 	
// 		//取出微信ID和消息的地址
// 	char* pWxid = (char*)&id.pstr;
// 	char* pWxmsg = (char*)&text.pstr;
// 
// 	char buff[0x81C] = { 0 };
// 	char buff2[0x81C] = { 0 };
// 	
// 	//微信通用结构体
// struct GeneralStruct
// {
// 	wchar_t* pstr;
// 	int iLen;
// 	int iMaxLen;
// 	int full1;
// 	int full2;
// 	GeneralStruct(wchar_t* pString)
// 	{
// 		pstr = pString;
// 		iLen = wcslen(pString);
// 		iMaxLen = iLen * 2;
// 		full1 = 0;
// 		full2 = 0;
// 	}
// };
// 
```