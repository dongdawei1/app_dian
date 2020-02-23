// 引入配置文件
import config from "./urlconfig.js";
import User from "./user.js";
export default {
	//请求设置
	config: {
		baseUrl: config.webUrl,
		v2url: config.v2Url,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'appid': 'a',
			//'dian_token':uni.getStorageSync("token")
			//'Content-Type':'application/json;charset=UTF-8',
			//	'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",
	},
	request(options = {}) {
		options.header = options.header || this.config.header; //options.header=如果有传就是options.header || 如果没传就等于默认值
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;
		// TODO：token增加等操作,不需要验证,全部由后端验证
		if (options.token) {
			// 验证用户是否登录
			if (!this.checkToken(options.checkToken)) return;
			// 验证用户操作权限（验证是否绑定手机号码）
			if (!this.checkAuth(options.checkAuth)) return;
			options.header.dian_token = User.token;
		}
		options.header.dian_token = uni.getStorageSync("dian_token");
		return uni.request(options);
	},


	get(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';

		return this.request(options);
	},
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		options.header = {
			'Content-Type': 'application/json;charset=UTF-8',
			'appid': 'a'
		};
		return this.request(options);
	},
	/**注册开始*/
	requestV2(options = {}) {
		options.header = options.header || this.config.header; //options.header=如果有传就是options.header || 如果没传就等于默认值
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.v2url + options.url;
		// TODO：token增加等操作,不需要验证,全部由后端验证
		if (options.token) {
			// 验证用户是否登录
			if (!this.checkToken(options.checkToken)) return;
			// 验证用户操作权限（验证是否绑定手机号码）
			if (!this.checkAuth(options.checkAuth)) return;
			options.header.dian_token = User.token;
		}
		options.header.dian_token = uni.getStorageSync("dian_token");
		return uni.request(options);
	},
	getV2(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.requestV2(options);
	},
	postV2(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		options.header = {
			'Content-Type': 'application/json;charset=UTF-8',
			'appid': 'a'
		};
		return this.requestV2(options);
	},
	/**注册结束*/
	// 上传图片
	upload(url, options = {}) {
		options.url = this.config.baseUrl + url;
		options.header = options.header || this.config.header;
		options.fileType = options.fileType || "image";
		options.formData = options.formData || {};
		options.filePath = options.filePath;
		options.name = options.name;
		// TODO：token增加等操作
		if (options.token) {
			// 验证是否登录
			if (!this.checkToken(options.checkToken)) return;
			// 验证权限
			if (!this.checkAuth(options.checkAuth)) return;
			options.header.token = User.token;
		}

		return uni.uploadFile(options);
	},
	// 错误处理
	errorCheck(err, res, errfun = false, resfun = false) {
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({
				title: '加载失败',
				icon: "none"
			});
			return false;
		}
		if (res.data.errorCode) {
			typeof errfun === 'function' && resfun();
			uni.showToast({
				title: res.data.msg,
				icon: "none"
			});
			return false;
		}
		return true;
	},

	// 网络错误处理
	errorCheckRe(err, msg) {
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({
				title: msg == true ? '验证码获取失败请重启app' : '请求失败请重试',
				icon: "none"
			});
			return false;
		}
		return true;
	},
	//处理登陆注册返回业务
	checkLog(res, reg) {
		console.log(res)
		let dataRes = res.data;
		if (dataRes.status === 0) {
			let ss = JSON.parse(dataRes.data);
			uni.setStorage({
				key: "dian_token",
				data: ss.dian_token
			})
			let user = JSON.parse(ss.user);
			uni.setStorage({
				key: "username",
				data: user.username
			})
			if (reg) {
				uni.showToast({
					title: '注册成功请牢记密码',
					icon: "none"
				})
			}
			//跳转至tab 只能用switchTab,不能用 navigateTo
			uni.switchTab({  
				url: '/pages/index/index'
			});
			return true;
		}
		uni.showToast({
			title: dataRes.msg,
			icon: "none"
		})
		return false;

	},

	// 验证用户是否登录User.token 初始值为 false 登陆后有值
	checkToken(checkToken) {
		if (checkToken && !User.token) {
			uni.showToast({
				title: '请先登录',
				icon: "none"
			})
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return false;
		}
		return true;
	},
	// 验证用户权限
	checkAuth(checkAuth) {
		if (checkAuth && !User.userinfo.phone) {
			uni.showToast({
				title: '请先绑定手机号码',
				icon: "none"
			})
			uni.navigateTo({
				url: '/pages/user-bind-phone/user-bind-phone'
			});
			return false;
		}
		return true;
	},
	//生成uuid
	getUuid(checkAuth) {
		return Date.parse(new Date());
	}
}
