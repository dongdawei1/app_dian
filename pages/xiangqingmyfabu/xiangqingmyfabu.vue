<template>
	<view class="dabody">
		<view class="body" v-if="releaseType !== 13 && releaseType !== 17 && releaseType !== 19 && releaseType !== 15 && releaseType !== 14 && releaseType < 400">
			<view class="biaoti">{{ fabu.releaseTitle }}</view>
			<view class="neirong">
				<view>发布类型：{{ fabu.examineName }}</view>
				<view>联系人：{{ fabu.consigneeName }}</view>
				<view>备注：{{ fabu.remarks }}</view>
				<view>服务区域：{{ fabu.serviceDetailed }}</view>
				<view>名称：{{ fabu.serviceType }}</view>
				<view>
					价格/规格
					<block v-for="(item, index1) in fabu.serviceAndprice" :key="index1">
						<view class="hang">
							<view>型号/规格：{{ item.project }}</view>
							<view>参考价格(元)：{{ item.price }}</view>
						</view>
					</block>
				</view>
			</view>

			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>企业名称：{{ fabu.userType }}</view>
				<view>联系方式：{{ fabu.contact }}</view>
				<view>所在城区：{{ fabu.detailed }}</view>
				<view>联系地址：{{ fabu.realNameId }}</view>
				<view>发布时间：{{ fabu.createTime }}</view>
			</view>
			<view class="fubiaoti">具体介绍</view>
			<view class="neirong">
				<view>{{ fabu.serviceIntroduction }}</view>
			</view>

			<view class="fubiaoti">图片详情</view>
			<view class="neirong xiangqingtupiao">
				<block v-for="(item, index1) in fabu.pictureUrl" :key="index1">
					<template v-if="item.pictureUrl">
						<!-- 图片 -->
						<image :src="item.pictureUrl" mode="widthFix" lazy-load></image>
					</template>
				</block>
			</view>
		</view>

		<!--租房-->
		<view class="body" v-if="releaseType === 15 || releaseType === 14">
			<view class="biaoti">{{ fabu.releaseTitle }}</view>
			<view class="neirong">
				<view>发布类型：{{ fabu.examineName }}</view>
				<view>联系人：{{ fabu.consigneeName }}</view>
				<view>备注：{{ fabu.remarks }}</view>
				<view>地址详情：{{ fabu.serviceDetailed }}</view>
				<view>出租面积(平米)：{{ fabu.mianjia }}</view>
			</view>
			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>企业名称：{{ fabu.userType }}</view>
				<view>联系方式：{{ fabu.contact }}</view>
				<view>所在城区：{{ fabu.detailed }}</view>
				<view>联系地址：{{ fabu.realNameId }}</view>
				<view>发布时间：{{ fabu.createTime }}</view>
			</view>
			<view class="fubiaoti">具体介绍</view>
			<view class="neirong">
				<view>{{ fabu.serviceIntroduction }}</view>
			</view>

			<view class="fubiaoti">图片详情</view>
			<view class="neirong xiangqingtupiao">
				<block v-for="(item, index1) in fabu.pictureUrl" :key="index1">
					<template v-if="item.pictureUrl">
						<!-- 图片 -->
						<image :src="item.pictureUrl" mode="widthFix" lazy-load></image>
					</template>
				</block>
			</view>
		</view>

		<!--灭虫等服务-->
		<view class="body" v-if="releaseType === 13 || releaseType === 17 || releaseType === 19">
			<view class="biaoti">{{ fabu.releaseTitle }}</view>
			<view class="neirong">
				<view>发布类型：{{ fabu.examineName }}</view>
				<view>联系人：{{ fabu.consigneeName }}</view>
				<view>备注：{{ fabu.remarks }}</view>
				<view>服务区域：{{ fabu.serviceDetailed }}</view>
				<view>起步价格(元)：{{ fabu.mianjia }}</view>
			</view>
			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>企业名称：{{ fabu.userType }}</view>
				<view>联系方式：{{ fabu.contact }}</view>
				<view>所在城区：{{ fabu.detailed }}</view>
				<view>联系地址：{{ fabu.realNameId }}</view>
				<view>发布时间：{{ fabu.createTime }}</view>
			</view>
			<view class="fubiaoti">具体介绍</view>
			<view class="neirong">
				<view>{{ fabu.serviceIntroduction }}</view>
			</view>

			<view class="fubiaoti">图片详情</view>
			<view class="neirong xiangqingtupiao">
				<block v-for="(item, index1) in fabu.pictureUrl" :key="index1">
					<template v-if="item.pictureUrl">
						<!-- 图片 -->
						<image :src="item.pictureUrl" mode="widthFix" lazy-load></image>
					</template>
				</block>
			</view>
			<!--  <view class="fubiaoti">评价</view>
			<pingjia :item="evaluate"></pingjia>
			后期可做预约服务 -->
		</view>
		<!--批发-->
		<view class="body" v-if="releaseType >= 400">
			<view class="biaoti">{{ fabu.releaseTitle }}</view>
			<view class="neirong">
				<view>商品名称：{{ fabu.serviceType }}</view>
				<view>单价(元)：{{ fabu.commodityJiage }}</view>
				<view>包装方式：{{ fabu.commodityPackingName }}</view>
				<view>剩余数量：{{ fabu.commoditySurplusNo }}{{ fabu.commodityPackingFangshi }}</view>
				<view>交易次数：{{ fabu.servicFrequenc }}</view>
				<view>商品产地：{{ fabu.detailed }}</view>
				<view>产地详情：{{ fabu.addressDetailed }}</view>
				<view>价格到期日：{{ fabu.endTime }}</view>
				<view>备 注：{{ fabu.remarks }}</view>
			</view>
			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>联 系 人：{{ realName.consigneeName }}</view>
				<view>联系方式：{{ realName.contact }}</view>
				<view>市场名称：{{ realName.companyName }}</view>
				<view>市场地址：{{ realName.addressDetailed }}</view>
			</view>
			<view class="fubiaoti">具体介绍</view>
			<view class="neirong">
				<view>{{ fabu.serviceIntroduction }}</view>
			</view>

			<view class="fubiaoti">图片详情</view>
			<view class="neirong xiangqingtupiao">
				<block v-for="(item, index1) in fabu.pictureUrl" :key="index1">
					<template v-if="item.pictureUrl">
						<!-- 图片 -->
						<image :src="item.pictureUrl" mode="widthFix" lazy-load></image>
					</template>
				</block>
			</view>
			<!--
			<view class="fubiaoti">评价</view>
			<pingjia :item="evaluate"></pingjia>
			-->
		</view>

		<view class="myReleasebuwai">
			<view class="myReleasebuno"><button class="mini-class " @click="openUrl()" size="mini" type="primary">编辑</button></view>
			<view class="myReleasebuno" v-if="fabu.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(1)" size="mini" type="primary">刷新</button>
			</view>
			<view class="myReleasebuno" v-if="fabu.welfareStatus === 5">
				<button class="mini-class " :loading="loading" @click="operation(2)" size="mini" type="primary">延期</button>
			</view>
			<view class="myReleasebuno" v-if="fabu.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(3)" size="mini" type="primary">隐藏</button>
			</view>
			<view class="myReleasebuno" v-if="fabu.welfareStatus === 2">
				<button class="mini-class " :loading="loading" @click="operation(4)" size="mini" type="primary">显示</button>
			</view>

			<view class="myReleasebuno"><button class="mini-class " :loading="loading" @click="operation(5)" size="mini" type="primary">删除</button></view>
		</view>
	</view>
</template>

<script>
import indexjs from '../../common/indexjs/indexjs.js';
//import pingjia from '../../components/pingjia/pingjia.vue';
export default {
	components: {
		//	pingjia
	},
	data() {
		return {
			ruleForm: {
				id: ''
			},
			fabu: {},
			loading: false,
			evaluate: {},
			releaseType: 0
		};
	},

	onLoad(option) {
		this.fabu = JSON.parse(decodeURIComponent(option.item));
		this.releaseType = this.fabu.releaseType;
	},

	methods: {
		// 跳转
		openUrl() {
			let url_31 = '../../pages/crejianliup/crejianliup?item=' + encodeURIComponent(JSON.stringify(this.item));
			uni.navigateTo({
				url: url_31
			});
			return true;
		},
		//操作
		// <!-- authentiCationFailure: ""
		// 	authentiCationStatus: 2
		// 	consigneeName: "姓名12"
		// 	contact: "13810875784"
		// 	createTime: "2020-03-20 11:35:24"
		// 	detailed: "上海市/市辖区/黄浦区"
		// 	evaluateid: 0
		// 	examineName: "店面/窗口出租"
		// 	examineTime: "不在有效期"
		// 	id: 65
		// 	mianjia: 8991
		// 	pictureUrl: "[ {
		// ↵  "id" : 751,
		// ↵  "useStatus" : 3,
		// ↵  "userName" : "202003201135215871.jpeg",
		// ↵  "userId" : 1,
		// ↵  "pictureName" : "123.jpeg",
		// ↵  "pictureUrl" : "http://localhost:8080/img/202003201135215871.jpeg"
		// ↵} ]"
		// 	realNameId: "经营地址112221112222"
		// 	releaseTitle: "89999999"
		// 	releaseType: 14
		// 	remarks: "89998"
		// 	servicFrequenc: 0
		// 	serviceAndprice: null
		// 	serviceDetailed: "33333"
		// 	serviceIntroduction: "99999"
		// 	serviceType: null
		// 	termOfValidity: "2020-06-19"
		// 	updateTime: null
		// 	userId: 1
		// 	userType: "执照名"
		// 	welfareStatus: 5 -->
		operation(type) {
			let data = {};
			data.type = type;
			data.userId = this.fabu.userId;
			data.id = this.fabu.id;
			data.releaseType=this.releaseType;
			if (type === 1 || type === 2 || type === 4 || type === 3) {
				this.operationRequest(data);
			} else if (type === 5) {
				let this_ = this;
				uni.showModal({
					title: '确认要删除',
					content: '',
					success: function(res) {
						if (res.confirm) {
							this_.operationRequest(data);
						} else if (res.cancel) {
						}
					}
				});
			} else {
				uni.showToast({
					title: '操作类型错误',
					icon: 'none'
				});
			}
		},
		operationRequest(data) {
			this.loading = true;
			let url = '';
			if (this.releaseType < 400) {
				url = this.$urlconfig.upfabu;
			} else {
				url = '批发';
			}
			this.$http.post(url, data, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					uni.showModal({
						title: '操作成功',
						content: '点击确认键返回列表页',
						success: function(res) {
							uni.navigateBack();
						}
					});
					
					
				}
			});
		}
	}
};
</script>

<style>
.dabody {
	padding: 0 0 60upx 0;
}
.body {
	padding: 20upx 30upx 30upx 30upx;
}
.biaoti {
	font-size: 40upx;
}
.fubiaoti {
	font-size: 37upx;
	color: #40c200;
}
.neirong view {
	padding: 10upx 0 0 30upx;
	font-size: 35upx;
}
.hang {
	padding: 0 20upx 0 20upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.xiangqingtupiao {
	padding: 0 4upx 0 0;
}
.xiangqingtupiao image {
	width: 100%;
	border-radius: 20upx;
}
.lunbo {
	padding: 30upx 40upx 40upx 30upx;
}
</style>
