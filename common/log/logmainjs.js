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
		console.log(dataRes)
		//业务成功 只能用  异步存储   setStorage
		if (dataRes.status === 0) {
			uni.setStorage({
				key: "dian_token",
				data: dataRes.data.dian_token
			})
			uni.setStorage({
				key: "dian_username",
				data: dataRes.data.user.username
			})
			uni.setStorage({
				key: "dian_isAuthentication",
				data: dataRes.data.user.isAuthentication
			})
			uni.setStorage({
				key: "dian_role",
				data: dataRes.data.user.isAuthentication
			})
			if (reg) {  //注册
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
		//业务处理失败信息提示
		uni.showToast({
			title: dataRes.msg,
			icon: "none"
		})
		return false;
	}
}