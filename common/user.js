export default {
	//+Sync  为同步接口  需要加  try 
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
	token: '',
	// 用户
	username: '',
	// 用户实名状态
	isAuthentication: '',
	role: '',
	// 初始化
	__init() {
		// 获取用户信息
		try {
			this.username = uni.getStorageSync("dian_username");
			this.token = uni.getStorageSync("dian_token");
			this.isAuthentication = uni.getStorageSync("dian_isAuthentication");
			this.role = uni.getStorageSync("dian_role");
		} catch (e) {
			console.log("用户来登陆");
		}
	},
	//登录页更新用户实名状态  这里用的同步
	upUserAu(isAuthentication) {
		try {
			uni.setStorageSync("dian_isAuthentication", isAuthentication);
			this.isAuthentication = isAuthentication;
		} catch (e) {
			this.isAuthentication = isAuthentication;
		}
		
	},
	/*处理登陆操作*/
	// 网络错误处理
	eck(err, msg) {
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({
				title: msg === true ? '验证码获取失败请重启app' : '请求失败请重试',
				icon: "none"
			});
			return false;
		}
		return true;
	},
	//处理登陆注册返回业务
	checkLog(res, reg) {
		let dataRes = res.data;
		//业务成功 只能用  异步存储   setStorage
		if (dataRes.status === 0) {
			try {
				uni.setStorageSync("dian_token", dataRes.data.dian_token);
				uni.setStorageSync("dian_username", dataRes.data.user.username);
				uni.setStorageSync("dian_isAuthentication", dataRes.data.user.isAuthentication);
				uni.setStorageSync("dian_role", dataRes.data.user.role);
				
				this.username = dataRes.data.user.username;
				this.token = dataRes.data.dian_token;
				this.isAuthentication = dataRes.data.user.isAuthentication;
				this.role = dataRes.data.user.role;
			} catch (e) {
				//TODO handle the exception
			}
			//跳转至tab 只能用switchTab,不能用 navigateTo
			uni.switchTab({
				url: '/pages/index/index'
			});
			return true;
		}
		//业务处理失败信息提示
		uni.showToast({
			title: dataRes.msg,
			icon: "none"
		})
		return false;
	},

	uprule(userrole) {
		try {
			uni.setStorageSync("dian_role", userrole);
			this.role = userrole;
		} catch (e) {
			this.role = userrole;
		}
		
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
