<template>
	<view class="index-list">
		<view class="index-list4 " @tap="openUrl">
			<view class="index-list2">{{ item.releaseTitle }}</view>
			<view class="index-list2" v-if="item.welfareStatus !== 4 && item.authentiCationStatus !== 3">
				
				<text v-if="item.releaseType < 400">
					状态 :
					<text v-if="item.welfareStatus === 1">发布中</text>
					<text v-if="item.welfareStatus === 2">隐藏中</text>
					<text v-if="item.welfareStatus === 5">不在有效期</text>
					<text v-if="item.welfareStatus === 4">审核中</text>
				</text>
				<text v-if="item.releaseType > 400">{{ item.isValidity }}</text>
			</view>

			<view class=" jinggao" v-if="item.welfareStatus === 4 && item.authentiCationStatus === 3">审核失败 : {{ item.authentiCationFailure }}</view>
		</view>

		<!-- 	<view class="index-list2" @tap="opendetail(item)">{{item.releaseTitle}} </view> -->
		<view class="index-list3 " @tap="openUrl">
			<template>
				<!-- 图片 -->
				<image :src="item.pictureUrl[0].pictureUrl" mode="scaleToFill" lazy-load></image>
			</template>
		</view>

		<view class="index-list4">
			<view class="fontsize" v-if="item.releaseType === 7">酒水饮料 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 8">消毒餐具 : {{ item.serviceType }}</view>

			<view class="fontsize" v-if="item.releaseType === 14">店面/窗口出租</view>
			<view class="fontsize" v-if="item.releaseType === 15">摊位出租/转让</view>

			<view class="fontsize" v-if="item.releaseType === 13">菜谱/广告牌制作</view>
			<view class="fontsize" v-if="item.releaseType === 17">装修服务</view>
			<view class="fontsize" v-if="item.releaseType === 19">灭虫服务</view>

			<!-- //4蔬菜,5粮油,6副食/调料, 7酒水饮料,8消毒餐具 ，13菜谱/广告牌制作，17装修专区，19灭虫专区，29水产/禽蛋9 清洁用品,11桌椅餐具,32 电器设备/维修，，33 电器设备出售，34二手电器设备， -->
			<view class="fontsize" v-if="item.releaseType === 18">设备维修 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 33">电器设备出售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 34">二手电器设备 : {{ item.serviceType }}</view>

			<view class="fontsize" v-if="item.releaseType === 101">工服制作 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 102">百货 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 103">绿植 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 104">装饰用品 : {{ item.serviceType }}</view>

			<view class="fontsize" v-if="item.releaseType === 4">蔬菜零售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 5">粮油零售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 6">调料/副食零售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 29">水产/禽蛋零售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 9">清洁用品零售 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 11">桌椅餐具 : {{ item.serviceType }}</view>

			<view class="fontsize" v-if="item.releaseType === 401">蔬菜批发 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 405">粮油批发 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 406">调料/副食批发 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 429">水产/禽蛋批发 : {{ item.serviceType }}</view>
			<view class="fontsize" v-if="item.releaseType === 409">清洁用品批发 : {{ item.serviceType }}</view>

			<view class="fontsize" v-if="item.remarks !== null && item.remarks !== ''">备注 : {{ item.remarks }}</view>
			<view class="fontsize" v-else>备注 : --</view>
		</view>
		<view class="index-list4">
			<view class="fontsize" v-if="item.releaseType <400">联系人 : {{ item.consigneeName }}</view>
			<view class="fontsize">发布时间 : {{ item.createTime }}</view>
		</view>

		<view class="myReleasebuwai">
			<view class="myReleasebuno"><button class="mini-class " @click="openUrl()" size="mini" type="primary">编辑</button></view>

			<view class="myReleasebuno" v-if="item.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(1)" size="mini" type="primary">刷新</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 5 && item.releaseType<400">
				<button class="mini-class " :loading="loading" @click="operation(2)" size="mini" type="primary">延期</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(3)" size="mini" type="primary">隐藏</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 2">
				<button class="mini-class " :loading="loading" @click="operation(4)" size="mini" type="primary">显示</button>
			</view>

			<view class="myReleasebuno"><button class="mini-class " :loading="loading" @click="operation(5)" size="mini" type="primary">删除</button></view>
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
	methods: {
		// 跳转
		openUrl() {
			// try{
			// 	console.log(uni.getStorageSync("realName"));
				
			// }catch(e){}
			let url = '../../pages/crezhaopinup/crezhaopinup?item=' + encodeURIComponent(JSON.stringify(this.item));
			uni.navigateTo({
				url: url
			});
			return true;
		},
		//操作
		operation(type) {
			let data = {};
			data.type = type;
			data.userId = this.item.userId;
			data.id = this.item.id;
			data.releaseType = this.item.releaseType;
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
			if (this.item.releaseType < 400) {
				url = this.$urlconfig.upfabu;
			} else {
				url=this.$urlconfig.operation_userWholesaleCommodity;
			}

			this.$http.post(url, data, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					});
					this.$emit('getnew');
				}
			});
		}
	}
};
</script>

<style scoped>
.index-list {
	padding: 10upx 55upx 0 0;
	border-bottom: 1upx solid #eeeeee;
}

.index-list2 {
	padding-top: 10upx;
	font-size: 34upx;
	color: #5d5d5d;
}
.index-list3 {
	position: relative;
}
.index-list3 image {
	width: 100%;

	height: 450upx;
	border-radius: 20upx;
}
.index-list4 {
	padding: 0 20upx 0 20upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.fontsize {
	font-size: 30upx;
}
</style>
