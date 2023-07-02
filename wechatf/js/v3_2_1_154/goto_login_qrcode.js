// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// call地址
	call_offset_1: 0x264830,
	call_offset_2: 0x3ADE40,
	
}


function build_call() {
	// 获取基地值
	let baseAddress = Module.findBaseAddress(hook_info.moduleName);

	// 获取call
    let callAddress1 = baseAddress.add(hook_info.call_offset_1);
    let callAddress2 = baseAddress.add(hook_info.call_offset_2);

    // 写入汇编
    let code_region = Memory.alloc(Process.pageSize);
	
	// 
    Memory.patchCode(code_region, Process.pageSize, (code) => {
        let asm = new X86Writer(code);
		
        // 调用函数
        asm.putCallAddress(callAddress1);
		
		asm.putMovRegReg("ecx", "eax");
		
        asm.putCallAddress(callAddress2);

        asm.putRet();
        asm.flush();
    });
    // show_asm(code_region);
    // 调用函数, 第一个是地址，第二个是返回值类型，第三个是参数列表
    let sendmsg_call = new NativeFunction(code_region, "void", []);
    sendmsg_call();

}

rpc.exports.gotologinqrcode = function () {
    try{
        build_call()
    }catch(error){
        console.error(error.stack)
    }
}