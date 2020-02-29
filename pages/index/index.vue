<template>
	<view>
		
		<!--首页-->
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
					swiper:[]
				}
			};
		},
		onLoad() { //页面加载
			this.__init();
		},
		onShow() {  //监听页面显示。页面每次出现在屏幕上都触发,页面显示
			this.getFollowPostList();
		},
		methods:{
			// 初始化数据
			__init(){
				this.getSwiper();
			},
		
			
			// 获取广告
			 getSwiper(){
				// let [err,res] = await this.$http.get('/adsense/0');
				// if (!this.$http.errorCheck(err,res)) return;
				let arr = [];
				// let list = res.data.data.list;
				let list =[{
					url:'/static/shilu-login/3.png',
					id:3		
				},{
					url:'/static/shilu-login/1.png',
					id:1	
				}];
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id:list[i].id,
						src:list[i].url
					})
				}
				this.topic.swiper = arr;
			},
		}
	}
</script>

<style>

/**轮播开始*/
.topic-swiper{
	padding:0 20upx 20upx 20upx;
}
.topic-swiper image{
	width: 100%;
	border-radius:10upx;
}
/**轮播结束*/
</style>
