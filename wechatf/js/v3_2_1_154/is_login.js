// 判断登录状态

// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// HOOK地址
	offset: 0x1AD4858,
}


rpc.exports.islogin = function () {
    try{
        let ModAddress = Module.findBaseAddress(hook_info.moduleName);

        // 获取偏移地址
        let flag = ModAddress.add(hook_info.offset).readU32()
//        console.log(flag)

        return flag
    }catch(error){
        console.error(error.stack)
    }
}
