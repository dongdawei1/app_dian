<template>
	<view class="index-list">
		<view class="biaoti">状态 ：{{ item.guanShanReason }} </view>
		<view class="index-list4">
			<view>id：{{ item.id }}</view>
			<view>订单类型 ：{{ item.paymentTime }}</view>
		</view>
		
		<view class="index-list4">
			<view>订单总价(元) ：{{ item.guanShanTime }}</view>
			<view>发布时间 ：{{ item.createTime }}</view>
		</view>
		<view class="index-list4">
			<view v-if="item.remarks === null || item.remarks === ''">备注信息 ：--</view>
			<view v-if="item.remarks !== null && item.remarks !== ''">备注信息 ：{{ item.remarks }}</view>
		</view>
		<view v-if="item.orderStatus === 5 || item.orderStatus === 6" class="index-list4">
			<view>收货时间 ：{{ item.collectTime }}</view>
		</view>
		
		
		<view class="index-list4">
			<view>接单商户名称 ：{{ item.saleUserName }}</view>
		</view>

		<view class="index-list4"><view>采购详情 ：</view></view>

		<view v-for="(itshang, index1) in item.commoditySnapshot" :key="index1">
			<view class="oxiangqing">
				<view>{{ itshang.serviceType }}</view>
				<view>采购数量:{{ itshang.number }}</view>
				<view>{{ itshang.specifiName }}</view>
				<view v-if="itshang.specifi_cations !== undefined && itshang.specifi_cations !== '--'">包装规格:{{ itshang.specifi_cations }}</view>
				<view v-if="itshang.remarks !== null && itshang.remarks !== undefined && itshang.remarks !== ''">备注:{{ itshang.remarks }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	data() {
		return { loading: false };
	},
	methods: {}
};
</script>

<style scoped></style>
