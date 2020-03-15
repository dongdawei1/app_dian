<template>
	<view class="content">

		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/4.png"></image>
				<input class="biaoti" v-model="ruleForm.username" type="text" maxlength="18" placeholder="登陆名" />
			</view>


			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="ruleForm.password" type="text" maxlength="18" placeholder="登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="biaoti" v-model="ruleForm.captcha" type="text" maxlength="4" placeholder="验证码" />
				<image v-if="captchaPathSh" :src="captchaPath" mode="" class="img-captcha" @tap="getVerCode"></image>
				<image v-if="!captchaPathSh" src="/static/shilu-login/shoucon.png" mode="" class="img-captcha" @tap="getVerCode"></image>
			</view>
		</view>

		<view class="dlbutton" @tap="submitForm">
			<text>登陆</text>
		</view>
		<!-- 底部信息 -->
		<view class="xieyi">
			<navigator url="../reg/reg" open-type="navigate" class="logUrl"> 注册账号 </navigator>
		</view>
	</view>

</template>

<script>
	var _this;
	export default {
		data() {
			return {
				showPassword: false,
				captchaPath: '', //验证码
				captchaPathSh: true, //手动获取验证码

				showAgree: false, //协议是否选择
				isRotate: false, //是否加载旋转
				isRequest: false, //验证码是否旋转
				ruleForm: {
					username: this.$user.username === '' ? '' : this.$user.username,
					password: '',
					captcha: '', //验证码
					uuid: '', //生成验证码对应的 id
				},
			}
		},

		onLoad() { //页面加载 1
			this.__init();
		},
		mounted() {
			_this = this; //页面加载完成后2
		},

		onReady() { //3
			_this.isRequest = false; //后端没有返回验证码前 点击不了
		},

		methods: {
			async __init() {
				let uuidform = {
					uuid: this.$http.getUuid()
				};
				let [err, res] = await this.$http.getV2(this.$urlconfig.logGetUesr, uuidform, {});
				if (!this.$user.eck(err)) {
					return;
				}

				if (res.data.status === 0) {

					if (this.$user.isAuthentication !== res.data.data.isAuthentication) {
						// uni.setStorageSync({
						// 	key: "dian_isAuthentication",
						// 	data: isAuthentication
						// })

						this.$user.upUserAu(res.data.data.isAuthentication);
					}
					if (this.$user.role !== res.data.data.role) {

						this.$user.uprule(res.data.data.role);
					}

					uni.switchTab({
						url: '/pages/index/index'
					});
					return false;
				}
				_this.getVerCode();
			},

			display() {
				this.showPassword = !this.showPassword
			},

			async getVerCode() {
				//获取验证码
				if (this.isRequest) {
					uni.showModal({
						title: '提示',
						content: '上一个操作还没有响应，请稍后再试',
						success: function(res) {}
					});
					this.isRequest = false;
					return false;
				}
				this.isRequest = true;
				//获取验证码
				this.ruleForm.uuid = this.$http.getUuid();
				let uuidform = {
					uuid: this.ruleForm.uuid
				};
				let [err, res] = await this.$http.getV2(this.$urlconfig.logCaptcha, uuidform, {});
				this.isRequest = false;
				if (!this.$user.eck(err, true)) {
					this.captchaPathSh = false;
					return;
				}
				this.captchaPathSh = true;
				this.captchaPath = res.data.data
			},
			async submitForm() {
				//登陆
				if (this.isRotate) {
					uni.showModal({
						title: '提示',
						content: '上一个操作还没有响应，请稍后再试',
						success: function(res) {}
					});
					this.isRequest = false;
					return false;
				}
				if (this.ruleForm.username.length > 18 || this.ruleForm.username.length < 8) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名在8-18位之间'
					});
					return false;
				}

				if (this.ruleForm.password.length > 18 || this.ruleForm.password.length < 8) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码在8-18位之间'
					});
					return false;
				}
				if (this.ruleForm.captcha.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}
				this.isRotate = true;
				let [err, res] = await this.$http.postV2(this.$urlconfig.logLogin, this.ruleForm, {});
				this.isRotate = false;
				if (!this.$user.eck(err)) {
					return;
				}
				if (!this.$user.checkLog(res)) {
					this.getVerCode();
					return;
				}

			}
		}
	}
</script>

<style>
	@import url("../../common/log/logmain.css");

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161upx;
		height: 161upx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 80upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 110upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.xieyi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 60upx;
		color: #444749;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.img11 {
		width: 40upx;
		height: 40upx;
		clear: ;
	}
</style>
