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
		<view class="index-list4" v-if="item.releaseType !== 13 && item.releaseType !== 17 && item.releaseType !== 19 && item.releaseType !== 15 && item.releaseType !== 14 ">
			<view>
				商品/服务名称 : {{item.serviceType}}
			</view>
			<view>
				服务城区 : {{item.serviceDetailed}}
			</view>
		</view>
		
		<view class="index-list4" v-if="item.releaseType === 15 || item.releaseType === 14 ">
			<view>
				出租面积(平米) : {{item.mianjia}}
			</view>
			<view>
				所在城区 : {{item.serviceDetailed}}
			</view>
		</view>
		
		<view class="index-list4" v-if="item.releaseType === 13 || item.releaseType === 17 || item.releaseType === 19">
			<view>
				起步价格(元) : {{item.mianjia}}
			</view>
			<view>
				服务城区 : {{item.serviceDetailed}}
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
.index-list4 view{
	color: #515151;
	font-size: 30upx;
}
.index-list4{	
}

</style>
