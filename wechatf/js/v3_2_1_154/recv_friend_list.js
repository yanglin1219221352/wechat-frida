// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	hook_offset: 0x5244A7,

	// 寄存器
	register: "esi",

	// 数据偏移
	offset_wxid: 0x8, 
	offset_user_number: 0x1C,
	offset_nick_name: 0x64,
	offset_user_remark: 0x50,
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


				// 组件返回结构
				let result = {
					wxid: base_pointer.add(hook_info.offset_wxid).readPointer().readUtf16String(),
					user_number: base_pointer.add(hook_info.offset_user_number).readPointer().readUtf16String(),
					nick_name: base_pointer.add(hook_info.offset_nick_name).readPointer().readUtf16String(),
					user_remark: base_pointer.add(hook_info.offset_user_remark).readPointer().readUtf16String(),
				}

				// 发送到python
				send({ api: "recv_friend_list", data: result })
				
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


function entry() {
	try {
		hook_recv_message()
	} catch (error) {
		console.error("error:", error.stack)
	}
}

entry()