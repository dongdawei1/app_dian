<template>
	<view class="index-list">
		<view v-if="item.releaseid === 13 || item.releaseid === 17 || item.releaseid === 19">
			<view class="tonghang">
				<view class="tonghang">
					<view class="juzhong">服务</view>
					<view class="liebiao">
						<view>很好 ({{ item.fuwutaiduhao }})</view>
						<view>满意 ({{ item.fuwutaiduzhong }})</view>
						<view>较差 ({{ item.fuwutaiducha }})</view>
					</view>
				</view>
				<view class="tonghang">
					<view class="juzhong">价格</view>
					<view class="liebiao">
						<view>合理 ({{ item.jiagedi }})</view>
						<view>偏高 ({{ item.jiagezhong }})</view>
						<view>较高 ({{ item.jiagegao }})</view>
					</view>
				</view>
			</view>
			<view class="tonghang">
				<view class="tonghang">
					<view class="juzhong">售后</view>
					<view class="liebiao">
						<view>满意 ({{ item.shouhouhao }})</view>
						<view>接受 ({{ item.shouhouzhong }})</view>
						<view>较差 ({{ item.shouhoucha }})</view>
					</view>
				</view>
				<view class="tonghang">
					<view class="juzhong">专业</view>
					<view class="liebiao">
						<view>较高 ({{ item.zhuanyehao }})</view>
						<view>中等 ({{ item.zhuanyemanyi }})</view>
						<view>一般 ({{ item.zhuayeyiban }})</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object
	}
};
</script>

<style scoped>
.index-list {
	padding: 10upx 55upx 0 0;
}
.tonghang{
	padding: 0 20upx 10upx 20upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	
}
.juzhong{
	padding: 55upx 15upx 0 0;
	font-size: 33upx;
	color: #f1a078;
}
.liebiao view{
	font-size: 30upx;
}
</style>
