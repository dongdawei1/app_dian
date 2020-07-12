<template>
	<view>
		<noshiming v-if="!isxianshi"></noshiming>

		<view v-if="isxianshi">
			<!-- loading-->
			<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>

			<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>

			<view class="uni-tab-bar">
				<!-- 搜索框-->
				<view class="wai">
					<view class="liebiao" v-if="releaseType === 30">
						<xfl-select
							:list="list"
							:clearable="false"
							:showItemNum="5"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 30px; font-size: 16px; '"
							:initValue="'服务员'"
							:selectHideType="'hideAll'"
							@change="change"
						></xfl-select>
					</view>

					<view class="liebiao" v-if="releaseType !== 14 && releaseType !== 15 && releaseType !== 30 && releaseType !== 31 && releaseType !== 200 && releaseType < 400">
						<xfl-select
							:list="myReleaseType_4"
							:clearable="false"
							:showItemNum="5"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 30px; font-size: 16px; '"
							:initValue="initValue"
							:selectHideType="'hideAll'"
							@change="change_myReleaseType_4"
						></xfl-select>
					</view>
					<view class="liebiao" v-if="releaseType !== 200 && releaseType !== 31 && releaseType < 400">
						<xfl-select
							:list="welfareStatuss"
							:clearable="false"
							:showItemNum="5"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 30px; font-size: 16px; '"
							:initValue="'发布中'"
							:selectHideType="'hideAll'"
							@change="change_welfareStatus"
						></xfl-select>

						<!--200  是日期筛选框-->
					</view>

					<!-- <view class="liebiaobu">
					<button class="mini-class gao" size="mini" @click="getzhiwei()">查询</button>
				</view> -->
				</view>

				<swiper class="swiper-box kong" :style="{ height: swiperheight + 'px' }" :current="tabIndex" @change="tabChange">
					<swiper-item v-for="(items, index) in newslist" :key="index">
						<scroll-view>
							<template v-if="items.list.length > 0">
								<!-- 图文列表 -->
								<block v-for="(item, index1) in items.list" :key="index1">
									<!-- 简历 -->
									<view v-if="items.releaseType === 31"><myjianli :item="item" :index="index1" v-on:getnew="getnew"></myjianli></view>
								</block>
								<!-- 上拉加载 -->
								<uni-load-more v-if="items.releaseType !== 31" :status="status" :content-text="contentText" />
							</template>
							<template v-if="items.list.length === 0">
								<view v-if="items.releaseType === 31" class="gerenzhongxinbut">
									<button class="mini-class" @click="openUrl('crejianli/crejianli', 31)" type="primary">发布简历</button>
								</view>

								<view class="meishuju">~未查询到发布信息</view>
							</template>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';

import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';

import indexjs from '../../common/indexjs/indexjs.js';
import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';

import myjianli from '../../components/myRelease/myjianli.vue';

import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import noshiming from '../../components/noshiming/noshiming.vue';
import xflSelect from '../../components/xfl-select/xfl-select.vue'; //下拉导入
export default {
	components: {
		swiperTabHead,
		LotusLoading,
		uniLoadMore, //上拉加载更多
		xflSelect, //下拉框
		noshiming,
		myjianli
	},
	data() {
		return {
			welfareStatuss: [
				{ value: '发布中', welfareStatus: 1 },
				{ value: '隐藏中', welfareStatus: 2 },
				{ value: '审核中', welfareStatus: 4 },
				{ value: '超过有效期', welfareStatus: 5 }
			],
			initValue: '',
			status: 'more', //more（loading前）、loading（loading中）、noMore（没有更多了）
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多信息了'
			},
			swiperheight: 500,
			tabIndex: 0,
			role: '',
			releaseType: '',
			isbut: false,
			tabBars: [],
			newslist: [],
			myReleaseType_4: [],
			//加载中组件数据
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			realName: {},
			list: ['服务员'],
			list_role: '',
			releaseWelfare: {
				//查询条件
				//分页开始
				currentPage: 1,
				pageSize: 12, //每页显示的数量
				//分页结束
				releaseType: '',
				position: '服务员',
				welfareStatus: 1
			},
			isxianshi: true,
			isfanhui:false
		};
	},
	onLoad() {
		this.isfanhui=true;
		//页面加载
		uni.getSystemInfo({
			//高度适配
			success: res => {
				let height = res.windowHeight - uni.upx2px(100);
				this.swiperheight = height;
			}
		});
		//this.releaseType  批发===35
		//请求数据列表
		this.__init();
	},
	//页面每次出现都检查是否刷新
	onShow() {
		// console.log(this.releaseType);
		// console.log(9090)
		if(!this.isfanhui){
			//不等于true 说明是创建完返回的，需要刷新
			this.getnews(this.tabIndex, 1);
		}
	},
	  onHide() {
		  //页面跳转触发
	            this.isfanhui=false;
	 },

	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked() {},
	// 监听原生标题导航按钮点击事件
	onNavigationBarButtonTap(e) {},
	onReachBottom() {
		//除了简历外全部有上拉加载更多
		if (this.releaseType !== 31) {
			//上拉加载更多
			if (this.status === 'loading') {
				return;
			}
			this.status = 'loading'; // 修改状态
			this.releaseWelfare.currentPage++;
			this.getnews(this.tabIndex, 2);
		}
		return true;
	},
	methods: {
		//职位相关开始
		change(e) {
			this.releaseWelfare.position = e.newVal;
			this.getzhiweilist();
		},
		//发布状态切换
		change_welfareStatus(e) {
			this.releaseWelfare.welfareStatus = e.orignItem.welfareStatus;
			this.getzhiweilist();
		},
		//职位点击查询
		getzhiweilist() {
			this.status = 'more';
			this.releaseWelfare.currentPage = 1;
			this.getnews(this.tabIndex, 3);
		},
		//职位相关结束
		//切换ReleaseType
		change_myReleaseType_4() {
			this.releaseWelfare.releaseType = e.orignItem.releaseType;
			this.getzhiweilist();
		},

		change_pifa(e) {
			this.releaseWelfare.releaseType = e.orignItem.releaseType;
		},
		__init() {
			//没有实名
			if (this.$user.isAuthentication !== 2) {
				this.isxianshi = false;
				return false;
			}
			this.getUserRealName();
			//获取职位信息
			this.get_position_bytype();

			//获取顶部tab
			if (this.tabBars.length === 0 || this.newslist.length === 0) {
				let resule = indexjs.wodedingdao();
				this.tabBars = resule.tabBars;
				this.newslist = resule.newslist;
				this.role = resule.role;
			}
			if (this.role !== 11) {
				//tabBars[0]
				this.releaseType = this.tabBars[0].releaseType;
				this.getnews(this.tabIndex, 1);
			} else {
				//求职者显示的  tab
			}
		},

		getnew() {
			this.releaseWelfare.currentPage = 1;
			//点击查询
			this.getnews(this.tabIndex, 3);
		},

		//刷新和第一次请求列表
		getnews(index, type) {
			///let releaseType = this.releaseType;
			// if (this.releaseType !== 35) {
			// 	this.releaseWelfare.releaseType = releaseType;
			// }
			//let newslistLength = this.newslist[index].list.length;
			if (type === 1 || type === 3) {
				//每次滑动都请求后端
				if (this.releaseType === 30) {
					this.getDatas(this.$urlconfig.get_position_list, index, 1);
				} else if (this.releaseType === 31) {
					//简历直接请求后端
					this.lotusLoadingData.isShow = true;
					this.$http.get(this.$urlconfig.select_resume_by_id, {}, {}).then(data => {
						this.lotusLoadingData.isShow = false;
						if (data.status === 0) {
							if (data.data !== null) {
								this.newslist[index].list[0] = data.data;
								this.swiperheight = 500;
							} else {
								this.newslist[index].list = [];
							}
						}
					});
				} else if (this.releaseType === 35) {
					this.getDatas(this.$urlconfig.getWholesaleCommodityPublicList, index, 1);
				} else {
					this.getDatas(this.$urlconfig.getfabulista, index, 1);
				}
			} else if (type === 2) {
				if (this.releaseType !== 31) {
					//简历只有一条
					if (this.releaseType === 30) {
						this.getDatas(this.$urlconfig.get_position_list, index, 2);
					} else if (this.releaseType === 35) {
						this.getDatas(this.$urlconfig.getWholesaleCommodityPublicList, index, 2);
					} else {
						this.getDatas(this.$urlconfig.getfabulista, index, 2);
					}
				}

				return true;
			}
		},

		//请求数据
		getDatas(url, index, type) {
			//没有实名
			if (!this.isxianshi) {
				return false;
			}
			this.lotusLoadingData.isShow = true;
			this.$http.post(url, this.releaseWelfare, {}).then(data => {
				this.lotusLoadingData.isShow = false;
				if (data.status === 0) {
					if (type === 1) {
						//没有查询到结果
						if (data.data.datas === null || data.data.datas.length === 0) {
							this.newslist[index].list = [];
							return true;
						}
						//this.swiperheight   534   :450    581 :  490 *
						this.newslist[index].list = data.data.datas;
						this.swiperheight = this.newslist[index].list.length * 340 + 30;
						if (data.data.totalno > this.releaseWelfare.pageSize) {
							this.status = 'more';
						} else {
							this.status = 'noMore';
						}
					} else {
						//没有查询到结果
						if (data.data.datas === null || data.data.datas.length === 0) {
							this.status = 'noMore';
							return true;
						}
						//this.swiperheight   534   :450    581 :  490 *
						this.newslist[index].list = this.newslist[index].list.concat(data.data.datas);
						this.swiperheight = this.newslist[index].list.length * 340;
						this.status = 'more';
					}
				}
			});
			return true;
		},

		// tabbar点击事件
		tabtap(index) {
			this.tabIndex = index;
		},
		// 滑动事件
		tabChange(e) {
			///this.myReleaseType_4=indexjs.getMyReleaseType(this.role,releaseType)
			this.tabIndex = e.detail.current;

			let releaseType = this.newslist[this.tabIndex].releaseType;
			if (releaseType === 4 || releaseType === 7 || releaseType === 13 || releaseType === 18 || releaseType === 101 || releaseType === 401) {
				this.myReleaseType_4 = indexjs.getMyReleaseType(this.role, releaseType);
				this.releaseWelfare.releaseType = this.myReleaseType_4[0].releaseType;
				this.initValue = this.myReleaseType_4[0].value;
				releaseType = this.myReleaseType_4[0].releaseType;
			} else if (releaseType === 14 || releaseType === 15) {
				this.releaseWelfare.releaseType = 14;
			}
			this.releaseType = releaseType;
			this.releaseWelfare.currentPage = 1;
			this.status = 'more';
			this.getnews(this.tabIndex, 1);
		},

		// getMyReleaseType(){

		// }

		//获取职位信息
		get_position_bytype() {
			if (this.list.length === 1) {
				let params = {
					role: 1
				};
				this.$http.get(this.$urlconfig.get_position_bytype, params, {}).then(data => {
					if (data.status === 0 && data.data.length > 0) {
						this.list = data.data;
					}
				});
			}
		},
		// 跳转
		openUrl(url, type) {
			if (type === 31) {
				let url_31 = '../../pages/' + url + '?item=' + encodeURIComponent(JSON.stringify(this.realName));
				uni.navigateTo({
					url: url_31
				});
				return true;
			}
			uni.navigateTo({
				url: '../../pages/' + url
			});
		},
		//获取实名信息
		getUserRealName() {
			this.$http.get(this.$urlconfig.getUserRealName, {}, {}).then(data => {
				if (data.status === 0) {
					this.realName = data.data;
					// let ar = [];
					// ar[0] = data.data.provincesId.toString();
					// ar[1] = data.data.cityId.toString();
					// ar[2] = data.data.districtCountyId.toString();
					// this.releaseWelfare.selectedOptions = ar;
				}
			});
		}
	}
};
</script>

<style>
.kong {
	padding: 0 30upx 0 30upx;
}

.mini-class {
	font-size: 30upx;
}
.so {
	padding: 12upx 30upx 10upx 30upx;
}
.sou {
	padding: 1upx 1upx 1upx 0; /*不设边框出不来*/
	display: flex;
	border: 1upx solid #e0e1e0; /*边框*/
	flex-direction: row; /*同行多列布局*/
	/*border-style: solid; 边框样式*/
	/*border-color: #e0e1e0; 边框颜色*/
	/*	border-width: 1upx; 边框宽*/
	border-radius: 10upx; /*边框圆角*/
}
.wai {
	width: 100%;
	/* border-top: 1upx solid #eeeeee; */
	padding: 10upx 20upx 20upx 20upx;
	display: flex;
	flex-wrap: nowrap; /*父级容器 属性,默认情况下,子元素都排在一条线(又称"轴线")上,flex-wrap属性定义,如果一条轴线排不下,如何换行*/
}
.liebiao {
	padding: 0 5% 0 0;
	width: 45%;
	display: flex;
	flex-direction: column;

	/*元素上下排列
		flex-grow:1;
		height: 450upx;*/
}
.liebiaobu {
	width: 20%;
	display: flex;
	flex-direction: column;

	/*元素上下排列
		flex-grow:1;
		height: 450upx;*/
}

.so_pifa {
	padding: 12upx 40upx 10upx 40upx;
}
.gao {
	height: 72upx;
	margin: auto;
}
.gao1 {
	margin: auto;
	height: 59upx; /*不设置圆角出不来*/
	padding: 2upx 0 2upx 39upx;
}
.meishuju {
	font-size: 30upx;
	text-align: center;
	padding: 100upx 50upx 10upx 50upx;
}

button::after {
	border: none;
} /*去除按钮边框*/
</style>
