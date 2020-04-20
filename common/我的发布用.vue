<template>
	<view class="box">
		<block v-for="(item,index) in tabBars" :key="index">
			<view class="biaoti">
				<image :src="item.liioc"></image>
				<text> {{item.name}}</text>
				<!--这有一条线-->
			</view>
			<view class="liebiao">
				<block v-for="(item1,index1) in item.list" :key="index1">
					<view class="liell" v-if="item1.releaseType!==35 " @click="tiaozhuan(item1.releaseType)">
						<image :src="item1.lsioc"></image>
						<text> {{item1.name}}</text>
					</view>
					<view class="liell" v-if="item1.releaseType===35 &&(role===1 || role===4 || role===13) " @click="tiaozhuan(item1.releaseType)">
						<image :src="item1.lsioc"></image>
						<text> {{item1.name}}</text>
					</view>
				</block>
			</view>
		</block>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				role: '',
				tabBars: [{
						name: "零售信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "蔬菜零售",
								lsioc: "/static/quanbu/shucai.png",
								releaseType: 4
							},
							{
								name: "粮油零售",
								lsioc: "/static/quanbu/liangyou.png",
								releaseType: 5
							},
							{
								name: "调料/副食",
								lsioc: "/static/quanbu/tiaoliao.png",
								releaseType: 6
							},
							{
								name: "水产/蛋禽",
								lsioc: "/static/quanbu/shuichan.png",
								releaseType: 29
							},
							{
								name: "清洁用品",
								lsioc: "/static/quanbu/qingjie.png",
								releaseType: 9
							},
							{
								name: "桌椅餐具",
								lsioc: "/static/quanbu/canju.png",
								releaseType: 11
							}
						]
					},


					{
						name: "工服/百货零售信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "工服",
								lsioc: "/static/quanbu/gongfu.png",
								releaseType: 101
							},
							{
								name: "百货",
								lsioc: "/static/quanbu/baihuo.png",
								releaseType: 102
							},
							{
								name: "绿植",
								lsioc: "/static/quanbu/lvzhi.png",
								releaseType: 103
							},
							{
								name: "装饰用品",
								lsioc: "/static/quanbu/zhuangshi.png",
								releaseType: 104
							}
						]

					},
					{
						name: "酒水/饮料/消毒餐具",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "酒水/饮料",
								lsioc: "/static/quanbu/jiu.png",
								releaseType: 7
							},
							{
								name: "消毒餐具",
								lsioc: "/static/quanbu/xiaodu.png",
								releaseType: 8
							}
						]
					},

					{
						name: "电器出售/设备维修信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "电器出售",
								lsioc: "/static/quanbu/chufangdiaoqi.png",
								releaseType: 33
							},
							{
								name: "二手电器",
								lsioc: "/static/quanbu/jiuwu.png",
								releaseType: 34
							},
							{
								name: "维修电器",
								lsioc: "/static/quanbu/weixiu.png",
								releaseType: 18
							}
						]
					},

					{
						name: "出租信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "店面/窗口",
								lsioc: "/static/quanbu/dianmain.png",
								releaseType: 14
							},
							{
								name: "摊位",
								lsioc: "/static/quanbu/tanwei.png",
								releaseType: 15
							}
						]
					},
					{
						name: "装修/灭虫/广告",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "菜谱/广告",
								lsioc: "/static/quanbu/caipu.png",
								releaseType: 13
							},
							{
								name: "装修服务",
								lsioc: "/static/quanbu/zhangxiu.png",
								releaseType: 15
							},
							{
								name: "灭虫服务",
								lsioc: "/static/quanbu/shachong.png",
								releaseType: 19
							}
						]
					},
					//上边跳一个地址,下边的条三个页面

					{

						name: "招聘/求职信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
								name: "招聘信息",
								lsioc: "/static/quanbu/zhiwei.png",
								releaseType: 30
							},
							{
								name: "求职信息",
								lsioc: "/static/quanbu/jianli.png",
								releaseType: 31
							}
						]
					},
					
					
					{
						name: "批发信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
							name: "全部批发",
							lsioc: "/static/quanbu/pifa.png",
							releaseType: 35
						}]
					}
				]

			}
		},
		onLoad() { //页面加载
			this.__init();
		},
		//页面每次出现都检查是否开启接到哪如果开启刷新订单
		onShow() {

		},

		methods: {
			__init() {
				this.role = uni.getStorageSync("dian_role");
			},
			tiaozhuan(releaseType) {
				if (this.$user.isAuthentication!==2){
					uni.showToast({
						title: '实名完成后才能查看信息',
						icon: "none"
					});
				}
				if (releaseType === 35) {
					//批发
				}else if(releaseType === 30 || releaseType === 31){
					//招聘求职
				}else{
					//其他全部信息
					uni.navigateTo({
						 url:'../../pages/shichang/shichang?releaseType='+releaseType+ '&role='+this.role
					});
				}
			}

		}


	}
</script>

<style>
	.box {
		padding: 40upx 0 50upx 30upx;

	}

	.biaoti {
		display: flex;
		/*水平*/
		border-bottom: 1upx solid #EEEEEE;

	}

	.biaoti image {
		width: 40upx;
		height: 60upx;
	}

	.biaoti text {
		font-size: 35upx;
		padding: 0 0 15upx 15upx;
	}

	.liebiao {
		padding: 30upx 0 40upx 35upx;
		display: flex;
		flex-wrap: wrap;
	}

	.liell {
		display: flex;
		flex-direction: column;
		/*元素上下排列*/
		width: 155upx;
		height: 155upx;

	}

	.liell image {
		margin: 0 auto;
		/*圖片居中*/
		width: 60upx;
		height: 60upx;
	}

	.liell text {
		text-align: center;
		/*文字居中*/
		font-size: 30upx;
		color: #4b4f51;
	}
</style>
