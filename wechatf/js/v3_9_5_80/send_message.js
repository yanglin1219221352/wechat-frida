// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	hook_offset: 0x57BCA540-0x56ED0000,

}

// 构造微信通用结构体
function build_struct(content, length) {
    let struct_address = Memory.alloc(20);
    struct_address.writePointer(content);
    struct_address.add(0x4).writeU32(length);
    struct_address.add(0x8).writeU32(length * 2);
    struct_address.add(0xC).writeU32(0);
    struct_address.add(0x10).writeU32(0);
    // console.log(hexdump(struct_address));
    return struct_address;
}


function build_send_message(wxid, msg) {
    let wxNull = Memory.alloc(0x1000);
    let buffer = Memory.alloc(0x1000);

    // 构建wxid结构体
    // let wxid = "filehelper";
    let U16Wxid = Memory.allocUtf16String(wxid);
    let wxid_struct_address = build_struct(U16Wxid, wxid.length);

    // 构造消息结构体
    // let msg = (new Date()).toJSON();
    // console.log("当前发送消息内容: ", wxid, msg);
    let U16Msg = Memory.allocUtf16String(msg);
    let msg_struct_address = build_struct(U16Msg, msg.length);


    let ModAddress = Module.findBaseAddress(hook_info.moduleName);

    let callAddress = ModAddress.add(hook_info.hook_offset);

    // 写入汇编
    let m2 = Memory.alloc(Process.pageSize);
    Memory.patchCode(m2, Process.pageSize, (code) => {
        // console.log("code", code);
        let asm = new X86Writer(code);
		
        // 压入
        asm.putPushU32(0x0);
        asm.putPushU32(0x0);
        asm.putPushU32(0x1);
        asm.putPushU32(0x1);

        // 压入wxnull
        asm.putMovRegAddress("eax", wxNull);
        asm.putPushReg('eax');

        // 压入消息
        asm.putMovRegAddress("eax", msg_struct_address);
        asm.putPushReg('eax');

        // 设置buf
        asm.putMovRegAddress('ecx', buffer);
        // 设置目标用户
        asm.putMovRegAddress('edx', wxid_struct_address);

        // 调用函数
        asm.putCallAddress(callAddress);
        // 堆栈平衡
        asm.putAddRegImm("esp", 0x18);
        //asm.putPopReg("edi");
        asm.putRet();
        asm.flush();
    });
    // show_asm(m2);
    // 调用函数, 第一个是地址，第二个是返回值类型，第三个是参数列表
    let sendmsg_call = new NativeFunction(m2, "void", []);
    sendmsg_call();

}

// send_message("filehelper", "你好呀");

rpc.exports.sendmessage = function (wxid, msg) {
    try{
        build_send_message(wxid, msg)
    }catch(error){
        console.error(error.stack)
    }
}