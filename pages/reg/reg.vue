<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/4.png"></image>
				<input class="biaoti" v-model="ruleForm.name" type="text" maxlength="18" placeholder="登陆名(8-18位)" />
			</view>

			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" v-model="ruleForm.mobilePhone" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="ruleForm.pass" type="text" maxlength="18" placeholder="登录密码(8-18位)" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>

			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="ruleForm.checkPass" type="text" maxlength="18" placeholder="确认密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>

			<view class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="biaoti" v-model="ruleForm.captcha" type="text" maxlength="4" placeholder="验证码" />

				<image v-if="captchaPathSh" :src="captchaPath" mode="" class="img-captcha" @tap="getVerCode"></image>
				<image v-if="!captchaPathSh" src="/static/shilu-login/shoucon.png" mode="" class="img-captcha" @tap="getVerCode"></image>
			</view>

		</view>
		<view class="danxuan">
			<radio-group name="radio" @change="radioRole">
				<label>
					<radio value="2" color="#FFCC33" style="transform:scale(0.6)" /><text>餐饮/酒店</text>
				</label>
				<label>
					<radio value="3" color="#FFCC33" style="transform:scale(0.6)" /><text>厨电维修/销售</text>
				</label>
				<label>
					<radio value="4" color="#FFCC33" style="transform:scale(0.6)" /><text>米面粮油菜送货</text>
				</label>
				<label>
					<radio value="5" color="#FFCC33" style="transform:scale(0.6)" /><text>酒水/消毒餐具</text>
				</label>
				<label>
					<radio value="6" color="#FFCC33" style="transform:scale(0.6)" /><text>商铺/摊位出租</text>
				</label>
				<label>
					<radio value="7" color="#FFCC33" style="transform:scale(0.6)" /><text>装修/菜谱/广告牌/杀虫</text>
				</label>
				<label>
					<radio value="11" color="#FFCC33" style="transform:scale(0.6)" /><text>求职</text>
				</label>
				<label>
					<radio value="12" color="#FFCC33" style="transform:scale(0.6)" /><text>工服/百货/绿植</text>
				</label>
				<label>
					<radio value="13" color="#FFCC33" style="transform:scale(0.6)" /><text>米面粮油菜批发</text>
				</label>
			</radio-group>
		</view>
		<view class="dlbutton" @tap="submitForm">
			<text>注册</text>
		</view>
		<!-- 底部信息 -->
		<view class="xieyi">
			<image @tap="isShowAgree" :src="showAgree==true?'/static/shilu-login/ty1.png':'/static/shilu-login/ty0.png'"></image>
			<text @tap="isShowAgree"> 注册既表示同意</text>
			<!-- 协议地址 -->
			<navigator url="../xieyi/xieyi" open-type="navigate" class="logUrl">《查看协议》</navigator>
			<text class="testClass"> | </text>
			<navigator url="../login/login" open-type="navigate" class="logUrl"> 返回登陆 </navigator>
		</view>
	</view>
</template>

<script>
	import logmain_Js from "../../common/log/logmainjs.js";
	var _this;
	export default {
		data() {
			return {
				showPassword: false,
				captchaPath: '', //验证码
				captchaPathSh: true, //验证码

				showAgree: false, //协议是否选择
				isRotate: false, //是否加载旋转

				isRequest: false,
				ruleForm: {
					name: '',
					pass: '',
					checkPass: '',
					mobilePhone: '', //手机号码
					role: '-1', //角色
					captcha: '', //验证码
					uuid: '', //生成验证码对应的 id
				},
			}
		},

		mounted() {
			_this = this;
		},
		onReady() {
			_this.getVerCode();
			_this.isRequest = false; //后端没有返回验证码前 点击不了
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			radioRole(res) {
				this.ruleForm.role = res.detail.value;
			},
			async getVerCode() {
				//注册
				if (this.isRequest) {
					//判断是否加载中，避免重复点击请求
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
				if (!logmain_Js.errorCheckRe(err, true)) {
					this.captchaPathSh = false;
					return;
				}
				this.captchaPathSh = true;
				this.captchaPath = res.data.msg
			},
			async submitForm() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}
				if (this.ruleForm.name.length > 18 || this.ruleForm.name.length < 8) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名在8-18位之间'
					});
					return false;
				}
				if (this.ruleForm.mobilePhone.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.ruleForm.pass.length < 8 || this.ruleForm.pass.length > 18) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码要在8-18位'
					});
					return false;
				}

				if (this.ruleForm.checkPass.length < 8 || this.ruleForm.checkPass.length > 18) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '确认密码要在8-18位'
					});
					return false;
				}

				if (this.ruleForm.pass != this.ruleForm.checkPass) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '两次密码不一致'
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
				if (this.ruleForm.role == '-1') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请选择用户类型'
					});
					return false;
				}
				this.isRotate = true;
				let [err, res] = await this.$http.postV2(this.$urlconfig.logCreate, this.ruleForm, {});
				this.isRotate = false;
				if (!logmain_Js.errorCheckRe(err)) {
					return;
				}
				if (!logmain_Js.checkLog(res, true)) {
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




	.list {
		display: flex;
		flex-direction: column;
		padding-top: 10upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
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

	.danxuan {
		display: flex;
		flex-direction: column;
		padding-top: 20upx;
		padding-left: 60upx;
		padding-right: 70upx;

		justify-content: space-around;
		align-items: center;
		/* height: 100upx;    高*/
		color: #333333;
		/* border-bottom: 1upx solid rgba(230, 230, 230, 1);  下边框 */
		text-align: left;
		font-size: 27upx;
		/* line-height: 100upx;
		margin-left: 16upx; */
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

	.testClass {
		letter-spacing: 9upx;
		/* 字体间距*/
	}

	.xieyi image {
		width: 45upx;
		height: 45upx;
	}
</style>
