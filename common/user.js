import $http from "./request.js"
export default {
	//+Sync  为同步接口
	// uni.getStorage	获取本地数据缓存
	// uni.getStorageSync	获取本地数据缓存
	// uni.setStorage	设置本地数据缓存
	// uni.setStorageSync	设置本地数据缓存
	// uni.getStorageInfo	获取本地缓存的相关信息
	// uni.getStorageInfoSync	获取本地缓存的相关信息
	// uni.removeStorage	删除本地缓存内容
	// uni.removeStorageSync	删除本地缓存内容
	// uni.clearStorage	清理本地数据缓存
	// uni.clearStorageSync	清理本地数据缓存
	
	// 用户token
	token:'',
	// 用户
	username:'',
	// 用户实名状态
	isAuthentication:'',
	role:'',
	// 初始化
	__init(){
		// 获取用户信息
		try{
			this.username = uni.getStorageSync("dian_username");
			this.token = uni.getStorageSync("dian_token");
			this.isAuthentication = uni.getStorageSync("dian_isAuthentication");
			this.role = uni.getStorageSync("dian_role");
		}catch(e){
			console.log("用户来登陆");
		}
	},
	//登录页更新用户实名状态  这里用的同步
	upUserAu(isAuthentication){
		uni.setStorageSync({
			key: "dian_isAuthentication",
			data: isAuthentication
		})
		this.isAuthentication =isAuthentication;
	}
	// 登录
	// async login(options ={}){
	// 	uni.showLoading({ title: '登录中...', mask: true });
	// 	// 请求登录
	// 	let [err,res] = await $http.post(options.url,options.data);
	// 	// 登录失败
	// 	if (!$http.errorCheck(err,res)){
	// 		uni.hideLoading();
	// 		return false;
	// 	}
	// 	// 登录成功 保存状态
	// 	this.token = res.data.data.token;
	// 	this.userinfo = this.__formatUserinfo(res.data.data);
	// 	// 本地存储
	// 	uni.setStorageSync("userinfo",this.userinfo);
	// 	uni.setStorageSync("token", this.token);
	// 	// 获取用户相关统计
	// 	await this.getCounts();
	// 	// 连接socket
	// 	// 成功提示
	// 	uni.hideLoading();
	// 	uni.showToast({ title: '登录成功' });
	// 	// 返回上一步
	// 	if (!options.Noback) {
	// 		uni.navigateBack({ delta: 1 });
	// 	}
	// 	return true;
	// },
	// 退出登录
	// async logout(showToast = true){
	// 	// 退出登录
	// 	await $http.post('/user/logout',{},{ 
	// 		token:true,
	// 		checkToken:true ,
	// 	});
	// 	// 清除缓存
	// 	uni.removeStorageSync('userinfo');
	// 	uni.removeStorageSync('token');
	// 	uni.removeStorageSync('counts');
	// 	// 清除状态
	// 	this.token = false;
	// 	this.userinfo = false;
	// 	this.userbind = false;
	// 	this.counts = {};
	// 	// 关闭socket
	// 	// 返回home页面
	// 	uni.switchTab({ url:"/pages/home/home" })
	// 	// 退出成功
	// 	if (showToast) {
	// 		return uni.showToast({ title: '退出登录成功' });
	// 	}
	// },


	
	// // userinfo格式转换
	// __formatUserinfo(obj){
	// 	// 手机/邮箱/账号登录
	// 	if (obj.logintype == "username" || obj.logintype == "email" || obj.logintype == "phone") {
	// 		// 设置默认头像
	// 		obj.userpic = obj.userpic || "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120";
	// 		return obj;
	// 	}


	
}
