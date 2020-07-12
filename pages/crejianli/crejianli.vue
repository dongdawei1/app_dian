<template>
	<view class="body">
		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_position"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'服务员'"
					:selectHideType="'hideAll'"
					@change="change"
				></xfl-select>
			</view>
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_salary"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'选择工资要求'"
					:selectHideType="'hideAll'"
					@change="change_salary"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_education"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'选择学历'"
					:selectHideType="'hideAll'"
					@change="change_education"
				></xfl-select>
			</view>
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_experience"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'选择工作年限'"
					:selectHideType="'hideAll'"
					@change="change_experience"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="gao1" style="width: 38%; margin-bottom: 21px;"><input class="shang" v-model="ruleForm.age" maxlength="4" type="number" placeholder="请输入年龄18-60" /></view>
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_gender"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'选择性别'"
					:selectHideType="'hideAll'"
					@change="change_gender"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="gao1 chengshi" style="width: 38%; margin-bottom: 21px;" @tap="showPicker('region', 0)">
				<!-- <input class="shang"  @tap="showPicker('region')"  v-model="ruleForm.age"  maxlength="4" type="number" placeholder="请选择所在城市" /> -->
				<!-- 城市切换-->
				<!-- <view > -->
				<view class="xianshicheng" v-if="result.result !== '' && result.result !== null">{{ result.result }}</view>
				<view class="shang" v-if="result.result === '' || result.result === null">选择所在城市</view>
			</view>

			<view class="gao1 chengshi" style="width: 38%; margin-bottom: 21px;" @tap="showPicker('region', 1)">
				<!-- <input class="shang"  @tap="showPicker('region')"  v-model="ruleForm.age"  maxlength="4" type="number" placeholder="请选择所在城市" /> -->
				<!-- 城市切换-->
				<!-- <view > -->
				<view class="xianshicheng" v-if="result1.result !== '' && result1.result !== null">{{ result1.result }}</view>
				<view class="shang" v-if="result1.result === '' || result1.result === null">选择求职城市</view>
			</view>
		</view>

		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_isPublishContact"
					:clearable="false"
					:showItemNum="3"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="'选择公开联系类型'"
					:selectHideType="'hideAll'"
					@change="change_isPublishContact"
				></xfl-select>
			</view>
			<view class="gao1" style="width: 38%; margin-bottom: 21px;"><input class="shang" v-model="ruleForm.email" maxlength="29" /></view>
		</view>

		<view class="sou">
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ ruleForm.contact }}</view>
			</view>
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ ruleForm.consigneeName }}</view>
			</view>
		</view>

		<view class="sou2">
			<view class="gao2"><input class="shang2" v-model="ruleForm.describeOne" maxlength="100" placeholder="请输入自我介绍" /></view>
		</view>
		<view class="gerenzhongxinbut"><button class="mini-class" @click="save()" type="primary" :loading="loading">提交简历</button></view>
		<w-picker
			mode="region"
			:value="defaultRegion"
			:no="no"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event, 'region')"
			@cancel="onCancel"
			ref="region"
		></w-picker>
	</view>
</template>

<script>
import xflSelect from '../../components/xfl-select/xfl-select.vue'; //下拉导入
import wPicker from '../../components/w-picker/w-picker.vue';
export default {
	components: {
		xflSelect, //下拉框
		wPicker //城市选择
	},

	data() {
		return {
			list_position: ['服务员'],
			list_salary: ['2000元以上', '3000元以上', '4000元以上', '5000元以上', '6000元以上', '8000元以上', '10000元以上', '面议'],
			list_education: ['无', '初中以上', '高中以上', '大专以上', '本科以上'],
			list_experience: ['无', '1-2年', '2-5年', '5-10年', '10年以上'],
			list_gender: [{ value: '男', releaseType: 1 }, { value: '女', releaseType: 2 }],
			list_isPublishContact: [{ value: '公开手机号', releaseType: 1 }, { value: '公开邮箱', releaseType: 2 }],
			//城市
			defaultRegion: [],
			no: 0,
			realName: {},
			result: {
				result: ''
			},
			result1: {
				result: ''
			},
			loading: false,
			ruleForm: {
				selectedOptions: [], //所在城区
				selectedOptions1: [], //求职城区
				position: '服务员', //职位类型
				salary: '', //
				education: '', //学历
				experience: '', //工作年限
				age: '', //年龄范围
				gender: '', //性别
				describeOne: '', //职位描述 100字以下
				email: '', //非必填
				isPublishContact: '', // 是否公开手机 1公开，2隐藏
				//实名中获取
				contact: '', //实名联系联系方式 回显置灰 不可修改
				consigneeName: '', //联系人姓名 回显置灰 不可修改
				type: 1 //1为创建2为重新发起或者编辑
			}
		};
	},
	onLoad(option) {
		this.realName = JSON.parse(decodeURIComponent(option.item));
		this.ruleForm.gender = this.realName.gender;
		this.ruleForm.contact = this.realName.contact;
		this.ruleForm.consigneeName = this.realName.consigneeName;
		this.defaultRegion[0] = this.realName.provincesId;
		this.defaultRegion[1] = this.realName.cityId;
		this.defaultRegion[2] = this.realName.districtCountyId;
		this.ruleForm.email = this.realName.email;
		this.__init();
	},

	methods: {
		__init() {
			this.get_position_bytype();
		},

		//工作类型
		change(e) {
			this.ruleForm.position = e.newVal;
		},
		//工资
		change_salary(e) {
			this.ruleForm.salary = e.newVal;
		},
		//学历
		change_education(e) {
			this.ruleForm.education = e.newVal;
		},
		//工作经验
		change_experience(e) {
			this.ruleForm.experience = e.newVal;
		},
		//性别
		change_gender(e) {
			//orignItem: {value: "男", releaseType: 1},
			this.ruleForm.gender = e.orignItem.releaseType;
		},
		//是否公开手机号
		change_isPublishContact(e) {
			this.ruleForm.isPublishContact = e.orignItem.releaseType;
		},
		//城市弹窗
		showPicker(type, no) {
			if (no === 0) {
				this.no = 0;
			} else {
				this.no = 1;
			}
			this.$refs[type].show();
		},

		onConfirm(res, type) {
			if (res.no === 0) {
				this.result = res;
				this.ruleForm.selectedOptions = res.value;
			} else {
				this.result1 = res;
				this.ruleForm.selectedOptions1 = res.value;
			}
		},
		save() {
			let er=false;
			let msg='';
			if(this.ruleForm.age===''|| this.ruleForm.age===null ){
				 er=true;
				 msg='年龄不能为空';
			}else if(this.ruleForm.describeOne===''|| this.ruleForm.describeOne===null ){
				 er=true;
				 msg='自我介绍不能为空';
			}else if(this.ruleForm.education===''|| this.ruleForm.education===null ){
				 er=true;
				 msg='学历不能为空';
			}else if(this.ruleForm.experience===''|| this.ruleForm.experience===null ){
				 er=true;
				 msg='工作年限不能为空';
			}else if(this.ruleForm.gender===''|| this.ruleForm.gender===null ){
				 er=true;
				 msg='性别不能为空';
			}else if(this.ruleForm.isPublishContact===''|| this.ruleForm.isPublishContact===null ){
				 er=true;
				 msg='请选择公开联系类型';
			}else if(this.ruleForm.position===''|| this.ruleForm.position===null ){
				 er=true;
				 msg='职位类型不能为空';
			}else if(this.ruleForm.position===''|| this.ruleForm.position===null ){
				 er=true;
				 msg='职位类型不能为空';
			}else if(this.ruleForm.salary===''|| this.ruleForm.salary===null ){
				 er=true;
				 msg='工资不能为空';
			}else if(this.ruleForm.selectedOptions.length===0){
				 er=true;
				 msg='所在城区不能为空';
			}else if(this.ruleForm.selectedOptions1.length===0 ){
				 er=true;
				 msg='求职城区不能为空';
			}else if(this.ruleForm.consigneeName==='' || this.ruleForm.consigneeName===null ||
			   this.ruleForm.contact==='' ||this.ruleForm.contact===null ){
				 er=true;
				 msg='未获取到实名方式请稍后重试';
			}else if(this.ruleForm.isPublishContact===2 &&  
			(this.ruleForm.email==='' || this.ruleForm.email===null) ){
				 er=true;
				 msg='邮箱不能为空，或者选择公开手机';
			}else if(!this.$user.checkno(this.ruleForm.age)   || this.ruleForm.age<18 || this.ruleForm.age>60 ){
				 er=true;
				 msg='年龄必须在18-60之间的数字';
			}
		   if(er){
			   uni.showToast({
			   	title: msg,
			   	icon: 'none'
			   });
			   return false;
		   }
			this.loading = true;
			//操作
			this.$http.post(this.$urlconfig.create_resume, this.ruleForm, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					uni.showModal({
						title: '',
						content: '创建简历成功,我们将尽快审核',
						success: function(res) {
							uni.switchTab({
								url: '/pages/myRelease/myRelease'
							});
						}
					});
				}
			});
		},
		onCancel() {},
		//获取职位信息
		get_position_bytype() {
			if (this.list_position.length === 1) {
				let params = {
					role: 1
				};
				this.$http.get(this.$urlconfig.get_position_bytype, params, {}).then(data => {
					if (data.status === 0 && data.data.length > 0) {
						this.list_position = data.data;
					}
				});
			}
		}
	}
};
</script>

<style scoped>
.body {
	padding: 25upx 5upx 25upx 25upx;
}
.so_no {
	padding: 0 20upx 5upx 10upx;
}
.sou {
	/*padding: 1upx 1upx 1upx 0; 不设边框出不来*/
	display: flex;
	/*border: 1upx solid #e0e1e0;边框*/
	flex-direction: row; /*同行多列布局*/
	/*border-style: solid; 边框样式*/
	/*border-color: #e0e1e0; 边框颜色*/
	/*	border-width: 1upx; 边框宽*/
	/*border-radius: 10upx; 边框圆角*/
}

.gao1 {
	/* width: 10%; */
	/* margin: auto; */
	/* height: 65upx; */
	/* padding: 2upx 0 2upx 20upx; */
	/* padding: 0 0 0 20upx; */
	padding: 0 20upx 5upx 10upx;
	margin: 0 20upx 0 9upx;
	border: 1upx solid #e0e1e0; /*边框*/
	border-style: solid; /*边框样式*/
	border-color: #e0e1e0; /*边框颜色*/
	border-width: 1upx; /*	边框宽*/
	border-radius: 10upx; /*边框圆角*/
}
.sou2 {
	padding: 0 76upx 5upx 10upx;
}
.gao2 {
	border: 1upx solid #e0e1e0; /*边框*/
	border-style: solid; /*边框样式*/
	border-color: #e0e1e0; /*边框颜色*/
	border-width: 1upx; /*	边框宽*/
	border-radius: 10upx; /*边框圆角*/
}
.shang2 {
	/* margin-left:0px */
	padding: 13upx 0 14upx 15upx;
}
.shang {
	/* margin-left:0px */
	padding: 12upx 0 0 10upx;
}
.hui {
	background: #edece8;
}
.chengshi {
	height: 77upx;
	/* margin-left:0px */
	/* padding: 12upx 0 0 10upx; */
}
.xianshicheng {
	line-height: 36upx;
	font-size: 30upx;
	color: #606266;
}
</style>
