<template>
	
	<view>
		<view class="meishuju">
			未完成实名认证不能查询或者发布信息哦！
			</view>
		<view  >
			<button class="mini-class "  @click="openUrl('crejianli/crejianli')"  type="primary">去实名/查看实名进度</button>
		</view>
		
		
	</view>
</template>
<script>
export default {
	methods: {
		// 跳转
		openUrl(url){
			uni.navigateTo({
				url: '../../pages/'+url
			});
		}
	}
};
</script>

<style>
.meishuju {
	font-size: 30upx;
	text-align: center;
	padding: 100upx 50upx 10upx 50upx;
}
</style>
