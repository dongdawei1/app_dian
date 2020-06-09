<template>
	<view class="wai">
		<block v-for="(tab, index) in item" :key="index">
			<view class="liebiao" @tap="tiaozhuan(tab)" >
				<image :src="tab.url" mode="scaleToFill"  lazy-load></image>
				<view>
					{{tab.releaseType}}
				</view>
				<view>
					{{tab.dibuBunnerbiaoti}}
				</view>
			</view>
		</block>
	</view>
</template>
<script>
export default {
	props: {
		item: Array
	},
	methods: {
		//TODO跳转未完成
		tiaozhuan(row) {
			this.$http.guanggaotiao(row);
		},
	}
};
</script>

<style scoped>
	.wai{
		border-top: 1upx solid #eeeeee;
		padding: 45upx 20upx 30upx 20upx;
		display: flex; 
		flex-wrap: wrap; /*父级容器 属性,默认情况下,子元素都排在一条线(又称"轴线")上,flex-wrap属性定义,如果一条轴线排不下,如何换行*/
		 
	}
	.liebiao{
		width:50%; 
		display: flex;
		flex-direction: column;
		/*元素上下排列
		flex-grow:1;*/
		height: 450upx;
	}
	.liebiao image{
		margin: 0 auto;
		/*圖片居中*/
		width:95%;
		height: 300upx;
	}
	.liebiao view{
		padding: 0 0 0 10upx;
		font-size: 30upx;
	}
</style>
