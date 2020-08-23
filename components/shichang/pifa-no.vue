<template>
	<view class="index-list">
		<view class="index-list2" @tap="opendetail(item)">{{item.releaseTitle}} </view>
		<view class="index-list3 " @tap="opendetail(item)">
			<template v-if="item.pictureUrl">
				<!-- 图片 -->
				<image :src="item.pictureUrl" 
				mode="scaleToFill" 
				lazy-load></image>
			</template>
		</view>
		<view class="index-list4"  >
			<view>
				商品名称 : {{item.serviceType}}
			</view>
			<view>
				价格(元) : {{item.jage}}
			</view>
		</view>
		<view class="index-list4"  >
			<view>
				包装方式 : {{item.addressDetailed}}
			</view>
			<view>
				包装规格 : {{item.cations}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		
		
		methods:{
			// 进入详情页
			opendetail(item){
				uni.navigateTo({
					url: '../../pages/xiangqing/xiangqing?id='+item.id+'&releaseType='+item.releaseType
				});
				
			}
		}
	}
</script>

<style scoped>
.index-list{
	padding: 10upx 55upx 0 0;
	border-bottom: 1upx solid #EEEEEE;
}

.index-list2{
	padding-top: 10upx;
	font-size: 34upx;
	color: #5d5d5d;
}
.index-list3{
	position: relative;
}
.index-list3 image{
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

</style>
