// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	hook_offset: 0x266AAC,

	// 寄存器
	register: "ecx",

	// 数据偏移
	offset_image_start: 0, 
	offset_image_len: 0x4, 
}

function hook_qrcode() {
	// 获取基地值
	let baseAddress = Module.findBaseAddress(hook_info.moduleName);

	// hook地址
	let addr = baseAddress.add(hook_info.hook_offset)

    // console.log(addr)
    // 在函数内部进行 hook
    Interceptor.attach(addr, {
        onEnter: function (args) {
			try{
				// 动态获取基地址指针
				let base_pointer = this.context[hook_info.register];
				
				// 获取图片开始地址指针
				let image_start = base_pointer.add(hook_info.offset_image_start).readPointer()
				
				// 获取图片长度
				let image_len = base_pointer.add(hook_info.offset_image_len).readU32();
				//console.log("图片长度:", image_len)

				//打印数据
				// console.log(hexdump(image_start, {
				//     offset: 0,
				//     length: image_len,
				//    header: true,
				//    ansi: true
				//}));

				// 写入文件
				let data = image_start.readByteArray(image_len)
				
				// 读取视图
				let view = new Uint8Array(data)

				//格式化二进制输出
				let hex_data = ""
				for (let i = 0; i < view.length; i++) {
					hex_data += ('0' + view[i].toString(16)).slice(-2);
				}
				
				// 发生消息
				send({ api: 'recv_login_qrcode', data: hex_data });

				//console.log(eax.add(0x08).readPointer().readUtf16String())
				// console.log("---------------------")
			} catch (error) {
				console.error("error:", error.stack)
			}
        }
    });
}


try {
	hook_qrcode()
} catch (error) {
	console.error("error:", error.stack)
}
