// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	hook_offset: 0x3DF42b,

	// 寄存器
	register: "eax",

	// 消息偏移
	offset_wxid: 0x40,
	offset_msg: 0x68,
	offset_nickName: null,
	offset_type: 0x30,
	msg_type: { 1: "text", 3: "image" },
}


// hook接受地址
function hook_recv_message() {
	// 获取基地值
	let baseAddress = Module.findBaseAddress(hook_info.moduleName);

	// hook地址
	let addr = baseAddress.add(hook_info.hook_offset)

	// console.log(addr)
	// 在函数内部进行 hook
	Interceptor.attach(addr, {
		onEnter: function (args) {
			try {
				// let eax= this.context.eax;

				// 动态获取基地址指针
				let base_pointer = this.context[hook_info.register];
				// console.log(base_pointer)

				// 消息类型
				// let msg_type = { 1: "text", 3: "image" }
				// 获取消息类型
				let _msg_type_int = base_pointer.add(hook_info.offset_type).readU32()
				let _msg_type_str = ""

				// 转换消息类型
				if(_msg_type_int in hook_info.msg_type){
					_msg_type_str = hook_info.msg_type[_msg_type_int]
				}else{
					_msg_type_str = "" + _msg_type_int
				}

				// 组件返回结构
				let result = {
					wxid: base_pointer.add(hook_info.offset_wxid).readPointer().readUtf16String(),
					message: base_pointer.add(hook_info.offset_msg).readPointer().readUtf16String(),
					nick_name: "",
					type: _msg_type_str,
				}

				// 发送到python
				send({ api: "recv_message", data: result })
				// for(let i=0;i<0x60;i=i+4){
				//     console.log("offset: 0x" + i.toString(16) +": 0x"+ base_pointer.add(i).readU32().toString(16))
				// }
				// console.log("---------------------")
			} catch (error) {
				// 打印堆栈信息
				console.error(error.stack)
			}
		}
	})
}

// 安全调用
function entry() {
	try {
		hook_recv_message()
	} catch (error) {
		console.error("error:", error.stack)
	}
}

entry()