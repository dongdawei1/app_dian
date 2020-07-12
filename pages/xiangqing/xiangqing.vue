<template>
	<view>
		<!-- loading-->
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
		<view class="body" v-if="releaseType !== 13 && releaseType !== 17 && releaseType !== 19 && releaseType !== 15 && releaseType !== 14 && releaseType < 400">
			<view class="biaoti">{{ fabu.releaseTitle }}</view>
			<view class="neirong">
				<view>发布类型：{{ fabu.releaseName }}</view>
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
				<view>企业名称：{{ fabu.updateTime }}</view>
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
				<view>发布类型：{{ fabu.releaseName }}</view>
				<view>联系人：{{ fabu.consigneeName }}</view>
				<view>备注：{{ fabu.remarks }}</view>
				<view>地址详情：{{ fabu.serviceDetailed }}</view>
				<view>出租面积(平米)：{{ fabu.mianjia }}</view>
			</view>
			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>企业名称：{{ fabu.updateTime }}</view>
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
				<view>发布类型：{{ fabu.releaseName }}</view>
				<view>联系人：{{ fabu.consigneeName }}</view>
				<view>备注：{{ fabu.remarks }}</view>
				<view>服务区域：{{ fabu.serviceDetailed }}</view>
				<view>起步价格(元)：{{ fabu.mianjia }}</view>
			</view>
			<view class="fubiaoti">实名详情</view>
			<view class="neirong">
				<view>企业名称：{{ fabu.updateTime }}</view>
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

		<!-- 广告 -->
		<lunbo :item="swiper"></lunbo>
	</view>
</template>

<script>
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
import indexjs from '../../common/indexjs/indexjs.js';
import lunbo from '../../components/lunbo/lunbo.vue';
import pingjia from '../../components/pingjia/pingjia.vue';
export default {
	components: {
		LotusLoading,
		pingjia,
		lunbo
	},
	data() {
		return {
			releaseType: '',
			ruleForm: {
				id: ''
			},
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			fabu: {},
			evaluate: {},
			realName: {},
			swiper: []
		};
	},
	onLoad(option) {
		this.ruleForm.id = parseInt(option.id);
		this.releaseType = parseInt(option.releaseType);
		this.getSwiper();
		//招聘，简历没有广告 只有 批发和发布两种类型 广告
		if (this.releaseType < 400) {
			//调用发布接口
			this.init(this.$urlconfig.getfabubyid);
		} else {
			//调用批发接口
			this.init(this.$urlconfig.getWholesaleCommodityPublicId);
		}
	},

	methods: {
		init(url) {
			this.lotusLoadingData.isShow = true;
			this.$http.get(url, this.ruleForm, {}).then(data => {
				this.lotusLoadingData.isShow = false;
				if (data.status === 0) {
					this.evaluate = data.data.evaluate;
					if (this.releaseType < 400) {
						this.fabu = data.data.fabu;
						this.fabu.releaseName = indexjs.getreleaseName(this.fabu.releaseType);
						this.fabu.serviceAndprice = JSON.parse(this.fabu.serviceAndprice);
					} else {
						this.fabu = data.data.wholesaleCommodity;
						this.realName = data.data.realName;
						this.fabu.commodityJiage = this.$http.toDecimal2(this.fabu.commodityJiage);
						let commodityPacking = this.fabu.commodityPacking;
						let specifi = this.fabu.specifi;
						if (commodityPacking === 1) {
							this.fabu.commodityPackingName = '散装称重(kg)';
							this.fabu.commodityPackingFangshi = 'kg';
						} else if (commodityPacking === 2) {
							if (specifi === 1) {
								this.fabu.commodityPackingName = this.fabu.cations + 'g' + '/袋';
							} else if (specifi === 2) {
								this.fabu.commodityPackingName = this.fabu.cations + 'kg' + '/袋';
							}
							this.fabu.commodityPackingFangshi = '袋';
						} else if (commodityPacking === 3) {
							if (specifi === 3) {
								this.fabu.commodityPackingName = this.fabu.cations + 'ML' + '/瓶/桶';
							} else if (specifi === 4) {
								this.fabu.commodityPackingName = this.fabu.cations + 'L' + '/瓶/桶';
							}
							this.fabu.commodityPackingFangshi = '瓶/桶';
						}
					}

					this.fabu.pictureUrl = JSON.parse(this.fabu.pictureUrl);
				}
			});
		},
		// //TODO跳转未完成
		// tiaozhuan(row) {
		// 	this.$http.guanggaotiao(row);
		// },
		// 获取广告
		getSwiper() {
			let uuidform = {
				permissionid: this.releaseType,
				bunnerType: 2
			};
			this.$http.get(this.$urlconfig.getbuuer, uuidform, {}).then(data => {
				if (data.status === 0) {
					let arr = [];
					if (data.data !== null) {
						for (let i = 0; i < data.data.length; i++) {
							arr.push({
								permissionid: data.data[i].permissionid,
								url: JSON.parse(data.data[i].imgUrl)[0].pictureUrl,
								tableId: data.data[i].tableId,
								dibuBunnerbiaoti: data.data[i].dibuBunnerbiaoti,
								releaseType: data.data[i].releaseType
							});
						}
						this.swiper = arr;
					}
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.body {
	padding: 20upx 30upx 0 30upx;
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
