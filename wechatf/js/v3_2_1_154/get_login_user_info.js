// 获取登录者信息

// hook信息
let hook_info = {
	// 模块名称
	moduleName: "WeChatWin.dll",

	// 个人信息基地址
	WxSelfInfoBase: 0x1AD1AF0,

    // 微信id
	WxID_offset: 0x44,
	// 微信号
	WxCount: 0x220,
	// 昵称
	wxNickNameType: 0xBC+0x14,
	WxNickName: 0xBC,
	// 手机号
	WxPhoneNumber: 0xF0,
	// 登录设备
	WxDevice: 0x510,
}

function get_info(){
    let ModAddress = Module.findBaseAddress(hook_info.moduleName);

    // 获取信息基地址
    let info_base = ModAddress.add(hook_info.WxSelfInfoBase)

    // 获取wxid 可能直接存放（旧版）、或者可能是指针
    let wxid = ""
    try{
        wxid = info_base.add(hook_info.WxID_offset).readPointer().readUtf8String()
    }catch(error){
        wxid = info_base.add(hook_info.WxID_offset).readUtf8String()
    }

    // 获取昵称
    let nick_name = ""
    if(info_base.add(hook_info.wxNickNameType).readU32()==0xF){
        nick_name = info_base.add(hook_info.WxNickName).readUtf8String()
    }else{
        nick_name = info_base.add(hook_info.WxNickName).readPointer().readUtf8String()
    }

    // 返回值
    let result = {
        "wxid": wxid,
        "nick_name": nick_name,
        "number": info_base.add(hook_info.WxCount).readUtf8String(),
        "phone_number": info_base.add(hook_info.WxPhoneNumber).readUtf8String(),
        "device": info_base.add(hook_info.WxDevice).readUtf8String(),
    }

//    console.log(wxid)
    return result
}

rpc.exports.getloginuserinfo = function () {
    try{
        return get_info()
    }catch(error){
        console.error(error.stack)
    }
}
