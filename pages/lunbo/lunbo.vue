<template>
	<view>	
					<!-- 轮播图 -->
					<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<block v-for="(item,index) in topic.swiper" :key="index">
							<swiper-item>
								<image :src="item.src" mode="widthFix" lazy-load></image>
							</swiper-item>
						</block>
					</swiper>
					
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topic:{
					list:[]
				}
			};
		},
		onLoad() {
			this.__init();
		},
		onShow() {
			this.getFollowPostList();
		},
		methods:{
			// 初始化数据
			__init(){
				this.getSwiper();
			},
		
			
			// 获取广告
			async getSwiper(){
				let [err,res] = await this.$http.get('/adsense/0');
				if (!this.$http.errorCheck(err,res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						src:list[i].src,
						url:list[i].url
					})
				}
				this.topic.swiper = arr;
			},
		}
	}
</script>

<style>
.search-input{
	padding: 20upx;
}
.search-input>input{
	background: #F4F4F4;
	border-radius:10upx;
}
.topic-search{
	display: flex;
	justify-content: center;
	font-size: 27upx;
}

.topic-swiper{
	padding:0 20upx 20upx 20upx;
}
.topic-swiper image{
	width: 100%;
	border-radius:10upx;
}

.topic-new{
	padding: 20upx;
}
.topic-new>view:first-child{
	padding-bottom: 5upx;
	font-size: 32upx;
}
</style>
