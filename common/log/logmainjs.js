export default{
	/*处理登陆操作*/
	// 网络错误处理
	errorCheckRe(err, msg) {
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
	
	}
}