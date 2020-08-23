<template>
	<!--和pc端保持一致只有几个字段可以编辑后期优化-->
	<view class="mybody">
		<view class="xinxiyouxiaoqi">信息有效期为30天,到期后可手动延期</view>
		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_position"
					:clearable="false"
					:disabled="true"  
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.position"
					:selectHideType="'hideAll'"
					@change="change"
				></xfl-select>
			</view>
			<view class="gao1 hui" style="width: 38%; margin-bottom: 21px;">
				<input class="shang" :disabled="true" v-model="ruleForm.number" maxlength="3" type="number" placeholder="输入招聘人数小于100" />
			</view>
		</view>

		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_salary"
					:clearable="false"
					:disabled="true" 
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.salary"
					:selectHideType="'hideAll'"
					@change="change_salary"
				></xfl-select>
			</view>

			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_education"
					:clearable="false"
					:showItemNum="5"
					:disabled="true" 
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.education"
					:selectHideType="'hideAll'"
					@change="change_education"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
					:list="list_experience"
					:clearable="false"
					:showItemNum="5"
					:disabled="true" 
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.experience"
					:selectHideType="'hideAll'"
					@change="change_experience"
				></xfl-select>
			</view>

			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
				:disabled="true" 
					:list="list_age"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.age"
					:selectHideType="'hideAll'"
					@change="change_age"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="so_no" style="width: 42%; margin-bottom: 20px;">
				<xfl-select
				:disabled="true" 
					:list="list_isPublishContact"
					:clearable="false"
					:showItemNum="3"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="isPublishContact"
					:selectHideType="'hideAll'"
					@change="change_isPublishContact"
				></xfl-select>
			</view>
			<view class="gao1" style="width: 38%; margin-bottom: 21px;"><input class="shang" v-model="ruleForm.email" maxlength="29" /></view>
		</view>

		<view class="sou2">
			<view class="gao2"><input class="shang2" v-model="ruleForm.describeOne" maxlength="100" placeholder="请输入职位介绍" /></view>
		</view>
		<view class="sou2">
			<view class="gao2"><input class="shang2" v-model="ruleForm.workingAddress" maxlength="100" placeholder="请输入地址详情" /></view>
		</view>
		<!-- 还差 其他福利和  介绍人奖励 -->
		<view class="sou">
			<view class="so_no" style="width: 26%; margin-bottom: 20px;">
				<xfl-select
				:disabled="true" 
					:list="list_gender"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.gender"
					:selectHideType="'hideAll'"
					@change="change_gender"
				></xfl-select>
			</view>

			<view class="so_no" style="width: 58%; margin-bottom: 20px;">
				<xfl-select
				:disabled="true" 
					:list="list_introductoryAward"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 36px; font-size: 16px; '"
					:initValue="ruleForm.introductoryAward"
					:selectHideType="'hideAll'"
					@change="change_introductoryAward"
				></xfl-select>
			</view>
		</view>

		<view class="sou">
			<view class="wenzi" style="width: 40%; margin-bottom: 21px;"><text class="shang">联系人姓名</text></view>
			<view class="gao1 hui" style="width: 42%; margin-bottom: 21px;"><input class="shang" :disabled="true"  v-model="ruleForm.consigneeName" maxlength="6" placeholder="联系人" /></view>
		</view>

		<view class="sou">
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ ruleForm.detailed }}</view>
			</view>
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ ruleForm.contact }}</view>
			</view>
		</view>
		<!--公司名-->
		<view class="sou2 ">
			<view class="gao2 hui">
				<view class="shang2">{{ ruleForm.companyName }}</view>
			</view>
		</view>

		<view class="fuli">选择福利</view>
		<view class="danxuan">
			<checkbox-group @change="change_welfare">
				<label v-for="item in list_welfare" :key="item.value">
					
					<checkbox :disabled="true"  :value="item.value" :checked="item.checked" style="transform:scale(0.6)"></checkbox>
					<test>{{ item.value }}</test>
				</label>
			</checkbox-group>
		</view>

		<view class="gerenzhongxinbut"><button class="mini-class" @click="save()" type="primary" :loading="loading">修改招聘信息</button></view>
	</view>
</template>

<script>
import xflSelect from '../../components/xfl-select/xfl-select.vue'; //下拉导入
export default {
	components: {
		xflSelect //下拉框
	},

	data() {
		return {
			list_position: ['服务员'],
			list_salary: ['2000元以上', '3000元以上', '4000元以上', '5000元以上', '6000元以上', '8000元以上', '10000元以上', '面议'],
			list_education: ['不限', '初中以上', '高中以上', '大专以上', '本科以上'],
			list_experience: ['不限', '1年以上', '2年以上', '3年以上', '4年以上'],
			list_age: ['18-30岁', '18-40岁', '18-50岁', '30-40岁', '30-60岁'],

			list_gender: [{ value: '男', releaseType: 1 }, { value: '女', releaseType: 2 }, { value: '不限', releaseType: 3 }],
			list_isPublishContact: [{ value: '公开手机号', releaseType: 1 }, { value: '公开邮箱', releaseType: 2 }],
			list_introductoryAward: [
				'无',
				'每人100元入职一个月后奖励',
				'每人200元入职一个月后奖励',
				'每人300元入职一个月后奖励',
				'每人400元入职一个月后奖励',
				'每人500元入职一个月后奖励'
			],
			list_welfare: [
				{ value: '五险', checked: false },
				{ value: '包住', checked: false },
				{ value: '包吃', checked: false },
				{ value: '13薪', checked: false },
				{ value: '其他', checked: false }
			],

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
				userId: '',
				position: '', //职位类型
				number: '', //招聘人数  100
				salary: '', //  salaryMin,salaryMax ,unlimited拼的字符串提交
				education: '', //学历
				experience: '', //工作年限
				age: '', //年龄范围
				gender: '', //性别
				email: '', //非必填
				isPublishContact: '', // 是否公开手机 1公开，2隐藏
				workingAddress: '', //工作地址，默认填充实名中的地址，可以修改
				describeOne: '', //职位描述 100字以下
				//实名中获取
				detailed: '', //省市区  回显置灰
				contact: '', //实名联系联系方式  不修改
				consigneeName: '', //联系人姓名 可修改
				realNameId: '', //实名id
				introductoryAward: '', //介绍人奖励  非必填
				welfare: [] //福利
			},
			isPublishContact:'',
		};
	},

	onLoad(option) {
		this.ruleForm = JSON.parse(decodeURIComponent(option.item));
		
		if(this.ruleForm.isPublishContact===1){
			this.isPublishContact='公开手机号';
		}else{
			this.isPublishContact='公开邮箱';
		}
		console.log(this.ruleForm )
		let welfare=this.ruleForm.welfare;
		welfare=welfare.substring(0,welfare.length-1);
		
		let welfare_split_list=welfare.split("/")
		var changed = {};
		for (var i = 0; i < this.list_welfare.length; i++) {
			if (welfare_split_list.indexOf(this.list_welfare[i].value) !== -1) {
				this.list_welfare[i].checked=true;
			} 
		}
		this.ruleForm.welfare = welfare_split_list;
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
		//年龄范围
		change_age(e) {
			this.ruleForm.age = e.newVal;
		},
		//介绍人奖励
		change_introductoryAward(e) {
			this.ruleForm.introductoryAward = e.newVal;
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
		//福利
		change_welfare(e) {
			this.ruleForm.welfare =  e.target.value;
			
		},
		save() {
			let er = false;
			let msg = '';

			if (this.ruleForm.age === '' || this.ruleForm.age === null) {
				er = true;
				msg = '年龄范围不能为空';
			} else if (this.ruleForm.workingAddress === '' || this.ruleForm.workingAddress === null) {
				er = true;
				msg = '地址详情不能为空';
			} else if (this.ruleForm.describeOne === '' || this.ruleForm.describeOne === null) {
				er = true;
				msg = '职位介绍不能为空';
			} else if (this.ruleForm.education === '' || this.ruleForm.education === null) {
				er = true;
				msg = '学历要求不能为空';
			} else if (this.ruleForm.experience === '' || this.ruleForm.experience === null) {
				er = true;
				msg = '工作经验不能为空';
			} else if (this.ruleForm.gender === '' || this.ruleForm.gender === null) {
				er = true;
				msg = '性别要求不能为空';
			} else if (this.ruleForm.isPublishContact === null || this.ruleForm.isPublishContact === '') {
				er = true;
				msg = '请选择公开联系类型';
			} else if (this.ruleForm.position === null || this.ruleForm.position === '') {
				er = true;
				msg = '职位类型不能为空';
			} else if (this.ruleForm.salary === null || this.ruleForm.salary === '') {
				er = true;
				msg = '工资不能为空';
			} else if (this.ruleForm.contact === null || this.ruleForm.contact === '') {
				er = true;
				msg = '未获取到实名方式请稍后重试';
			} else if (this.ruleForm.isPublishContact === 2 && (this.ruleForm.email === null || this.ruleForm.email === '')) {
				er = true;
				msg = '邮箱不能为空，或者选择公开手机';
			} else if (!this.$user.checkno(this.ruleForm.number)) {
				er = true;
				msg = '招聘人数必须是数字';
			} else if (this.ruleForm.number <= 0 || this.ruleForm.number > 100) {
				er = true;
				msg = '招聘人数必须在1-100之间';
			} else if (this.ruleForm.consigneeName === null || this.ruleForm.consigneeName === '') {
				er = true;
				msg = '联系人不能为空';
			} else if (this.ruleForm.introductoryAward === null || this.ruleForm.introductoryAward === '') {
				er = true;
				msg = '介绍人奖励不能为空';
			} else if (this.ruleForm.welfare.length === 0) {
				er = true;
				msg = '请选择福利';
			}
			if (er) {
				uni.showToast({
					title: msg,
					icon: 'none'
				});
				return false;
			}
			this.loading = true;
			 this.ruleForm.type=6;
			//编辑
			this.$http.post(this.$urlconfig.position_operation, this.ruleForm, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					uni.showModal({
						title: '',
						content: '编辑职位成功,我们将尽快审核;',
						success: function(res) {
							//  if (res.cancel) {
							// 	uni.switchTab({
							// 		url: '/pages/myRelease/myRelease'
							// 	});
							// }else{
							// }
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
				this.$http.get(this.$urlconfig.get_position, {}, {}).then(data => {
					if (data.status === 0 && data.data.length > 0) {
						this.list_position = data.data;
					}
				});
			}
		}
	}
};
</script>

<style scoped></style>
