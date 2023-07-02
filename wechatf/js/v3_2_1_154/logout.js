// 退出微信登录

// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	offset: 0x4E7210,
}


rpc.exports.logout = function () {
    try{
        let ModAddress = Module.findBaseAddress(hook_info.moduleName);

        // 获取地址
        let callAddr = ModAddress.add(hook_info.offset)

        let logout_call = new NativeFunction(callAddr, "void", []);

        // 调用退出
        logout_call();
    }catch(error){
        console.error(error.stack)
    }
}
