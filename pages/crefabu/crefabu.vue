<template>
	<view class="mybody">
		<view class="xinxiyouxiaoqi">信息有效期为30天,到期后可手动延期</view>
	

		<view class="sou">
			<view class="wenzi" style="width: 40%; margin-bottom: 21px;"><text class="shang">联系人姓名</text></view>
			<view class="gao1" style="width: 42%; margin-bottom: 21px;"><input class="shang" v-model="ruleForm.consigneeName" maxlength="6" placeholder="联系人" /></view>
		</view>
 实名信息
		<view class="sou">
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ realName.detailed }}</view>
			</view>
			<view class="gao1 chengshi hui" style="width: 38%; margin-bottom: 21px;">
				<view class="shang ">{{ realName.contact }}</view>
			</view>
		</view>
		<!--公司名-->
		<view class="sou2 ">
			<view class="gao2 hui">
				<view class="shang2">公司名称：{{ realName.companyName }}</view>
			</view>
		</view>
<!--实名地址-->
		<view class="sou2 ">
			<view class="gao2 hui">
				<view class="shang2">实名地址：{{ realName.addressDetailed }}</view>
			</view>
		</view>
	<!-- 	<view class="fuli">选择福利</view>
		<view class="danxuan">
			<checkbox-group @change="change_welfare">
				<label v-for="item in list_welfare" :key="item.value">
					<checkbox :value="item.value" :checked="!item.checked" style="transform:scale(0.6)"></checkbox>
					<test>{{ item.value }}</test>
				</label>
			</checkbox-group>
		</view> -->

		<view class="gerenzhongxinbut"><button class="mini-class" @click="save()" type="primary" :loading="loading">提交招聘信息</button></view>
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
			
			
			realName: {},
			
			
			loading: false,
			ruleForm: {
				          userId: '',
				          releaseType: '',//发布类型
				          releaseTitle: '',//标题
				          serviceType: '',//商品/服务类型
				          serviceAndprice: [],//项目及价格KEY，vaule
				          project: '', //项目
				          price: '',//价格
				          serviceIntroduction: '',//介绍
				          remarks: '',//备注
				          serviceDetailed: [],//服务地址 来电确认和全市
				          pictureUrl: [],//图片
				          //实名中获取
				          contact: '',  //实名联系联系方式 回显 可修改
				          consigneeName: '', //联系人姓名 回显可修改
			}
		};
	},

	onLoad(option) {
		this.realName = JSON.parse(decodeURIComponent(option.item));
		this.ruleForm.contact = this.realName.contact;
		this.ruleForm.consigneeName = this.realName.consigneeName;
		this.ruleForm.workingAddress = this.realName.addressDetailed;
		this.ruleForm.email = this.realName.email;
		this.__init();
	},

	methods: {
		__init() {
			
		},

		
		save() {
			
		},
		
	
	}
};
</script>

<style scoped></style>
