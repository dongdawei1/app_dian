<template>
	<view>
		<!-- 自定义导航栏 getRealName-->
		<uni-nav-bar :statusBar="true" left-icon="back" @click-left="back" leftText="返回" rightText="切换" @click-right="showPicker('region')">
			<view class="u-f-ajc" @tap="showPicker('region')">{{ result.result }}</view>
		</uni-nav-bar>
		<!-- 城市切换-->
		<w-picker mode="region" :value="defaultRegion" default-type="value" :hide-area="false" @confirm="onConfirm($event, 'region')" @cancel="onCancel" ref="region"></w-picker>
		<!-- loading-->
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>

		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		<!-- 搜索框-->

		<view class="so">
			<view class="sou" v-if="releaseType !== 30 && releaseType !== 31">
				<input class="uni-input" v-model="releaseWelfare.serviceType" focus :placeholder="placeholder" type="text" maxlength="18" />
				<button class="mini-class" size="mini" @click="getnew()">查询</button>
			</view>
			<view v-if="releaseType === 30 || releaseType === 31" style="width: 80%; margin: auto; margin-bottom: 20px;">
				<xfl-select
					:list="list"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 40px; font-size: 16px;'"
					:initValue="'服务员'"
					:selectHideType="'hideAll'"
					@change="change"
				></xfl-select>
			</view>
		</view>

		<view class="uni-tab-bar">
			<swiper class="swiper-box kong" :style="{ height: swiperheight + 'px' }" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view>
						<template v-if="items.list.length > 0">
							<!-- 图文列表 -->

							<block v-for="(item, index1) in items.list" :key="index1">
								<!-- 除招聘和简历 -->
								<view v-if="items.releaseType != 30 && items.releaseType != 31 && items.releaseType != 35">
									<index-list :item="item" :index="index1"></index-list>
								</view>
								<!-- 招聘 -->
								<view v-if="items.releaseType === 30"><zhaopin-list :item="item" :index="index1"></zhaopin-list></view>
								<!-- 招聘 -->
								<view v-if="items.releaseType === 31"><jianli-list :item="item" :index="index1"></jianli-list></view>
							</block>

							<!-- 上拉加载 -->
							<uni-load-more :status="status" :content-text="contentText" />
						</template>

						<template v-if="items.list.length === 0">
							<view class="meishuju">~未查询到发布信息</view>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import indexList from '../../components/index/index-list.vue';
import zhaopinList from '../../components/index/zhaopin-list.vue';
import jianliList from '../../components/index/jianli-list.vue';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';

import wPicker from '../../components/w-picker/w-picker.vue';
import indexjs from '../../common/indexjs/indexjs.js';

import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';

import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';

import xflSelect from '../../components/xfl-select/xfl-select.vue'; //下拉导入
export default {
	components: {
		indexList,
		zhaopinList,
		jianliList,
		swiperTabHead,
		LotusLoading,
		uniLoadMore, //上拉加载更多

		wPicker, //城市选择
		uniNavBar, //自定义导航
		xflSelect //下拉框
	},
	data() {
		return {
			status: 'more', //more（loading前）、loading（loading中）、noMore（没有更多了）
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多信息了'
			},
			placeholder: '请输入商品名或服务关键字',
			swiperheight: 500,
			tabIndex: 0,

			role: '',
			releaseType: '',
			isbut: false,
			tabBars: [],
			newslist: [],
			//加载中组件数据
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			//城市
			defaultRegion: ['150000', '150100', '150103'],
			result: {
				result: ''
			},
			list: ['服务员'],
			list_role: '',
			releaseWelfare: {
				//查询条件
				selectedOptions: [], //三级联动城市
				serviceType: '', //维修项目，设备名称
				//releaseTitle: '', //标题
				//分页开始
				currentPage: 1,
				pageSize: 12, //每页显示的数量
				//分页结束
				releaseType: '',
				position: '服务员',
				companyName:''
				//fouseSizeGreater: '',
				//fouseSizeLess: '' //面积小于
			}
		};
	},
	onLoad(e) {
		//页面加载
		uni.getSystemInfo({
			//高度适配
			success: res => {
				let height = res.windowHeight - uni.upx2px(100);
				this.swiperheight = height;
			}
		});
		this.role = e.role;
		this.releaseType = Number(e.releaseType);
		this.setplaceholder();
		this.__init();
	},
	//页面每次出现都检查是否开启接到哪如果开启刷新订单
	onShow() {},

	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked() {},
	// 监听原生标题导航按钮点击事件
	onNavigationBarButtonTap(e) {},

	onReachBottom() {
		//上拉加载更多
		if (this.status === 'loading') {
			return;
		}
		this.status = 'loading'; // 修改状态
		this.releaseWelfare.currentPage++;
		this.getnews(this.tabIndex, 2);
	},
	methods: {
		//设置搜索框文案
		setplaceholder() {
			if (this.releaseType === 14 || this.releaseType === 15) {
				this.placeholder = '请输入面积(整数数字)或者地址';
			}else{
				this.placeholder = '请输入商品名或服务关键字';
			}
		},
		//切换筛选条件
		change(e) {
			this.releaseWelfare.position = e.newVal;
			this.releaseWelfare.currentPage = 1;
			this.status = 'more';
			this.getnews(this.tabIndex, 1);
		},
		__init() {
			this.getUserRealName();
			if (this.tabBars.length === 0 || this.newslist.length === 0) {
				let resule = indexjs.quanbudingdao();
				this.tabBars = resule.tabBars;
				this.newslist = resule.newslist;
			}
			
			for (let a = 0; a < this.tabBars.length; a++) {
				if (this.tabBars[a].releaseType === this.releaseType) {
					let ti = this.tabBars[a];
					let tin = this.tabBars[0];
					//把点击的放在第一位
					this.tabBars.splice(0, 1, ti);
					this.tabBars.splice(a, 1, tin);
					let li = this.newslist[a];
					let lin = this.newslist[0];
					this.newslist.splice(0, 1, li);
					this.newslist.splice(a, 1, lin);
					this.tabIndex = 0;
					this.getnews(this.tabIndex, 1);
					break;
				}
			}
		},
		getnew() {
			this.releaseWelfare.currentPage = 1;
			//点击查询
			this.getnews(this.tabIndex, 3);
		},

		//刷新列表
		getnews(index, type) {
			let releaseType = this.newslist[index].releaseType;
			this.releaseType = releaseType;
			this.releaseWelfare.releaseType = releaseType;
			//let newslistLength = this.newslist[index].list.length;
			if (type === 1 || type === 3) {
				this.setplaceholder();
				//每次滑动都请求后端
				if (releaseType === 30) {
					this.get_position_bytype(2);
					this.getDatas(this.$urlconfig.get_position_all, index,1);
				} else if (releaseType === 31) {
					this.get_position_bytype(1);
					this.getDatas(this.$urlconfig.get_resume_all, index,1);
				} else if (releaseType === 35) {
					this.getDatas(this.$urlconfig.getWholesaleCommodityPublicList, index,1);
				} else {
					this.getDatas(this.$urlconfig.getfabulista, index,1);
				}
			} else if (type === 2) {
				if (releaseType === 30) {
					this.getDatas(this.$urlconfig.get_position_all, index,2);
				} else if (releaseType === 31) {
					this.getDatas(this.$urlconfig.get_resume_all, index,2);
				} else if (releaseType === 35) {
					return true;
				} else {
					this.getDatas(this.$urlconfig.getfabulista, index,2);
				}
			}
		},

		//请求数据
		getDatas(url, index, type) {
			this.lotusLoadingData.isShow = true;
			this.$http.post(url, this.releaseWelfare, {}).then(data => {
				this.lotusLoadingData.isShow = false;
				console.log(data)
				if (data.status === 0) {
					if (type === 1) {
						//没有查询到结果
						if (data.data.datas === null || data.data.datas.length === 0) {
							this.newslist[index].list = [];
							return true;
						}
						//this.swiperheight   534   :450    581 :  490 *
						this.newslist[index].list = data.data.datas;
						this.swiperheight = this.newslist[index].list.length * 340;
						if (data.data.totalno > this.releaseWelfare.pageSize) {
							this.status = 'more';
						} else {
							this.status = 'noMore';
						}
					}else{
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
			this.tabIndex = e.detail.current;
			this.releaseWelfare.serviceType = '';
			this.releaseWelfare.currentPage = 1;
			this.status = 'more';
			this.getnews(this.tabIndex, 1);
		},
		//城市弹窗
		showPicker(type) {
			this.$refs[type].show();
		},
		onConfirm(res, type) {
			this.result = res;
			this.releaseWelfare.selectedOptions = res.value;
		},
		onCancel() {},
		//顶导返回键
		back() {
			uni.navigateBack({ delta: 1 });
		},
		//获取职位信息
		get_position_bytype(role) {
			if (this.list.length === 1 || this.list_role !== role) {
				let params = {
					role: role
				};
				this.$http.get(this.$urlconfig.get_position_bytype, params, {}).then(data => {
					if (data.status === 0 && data.data.length > 0) {
						this.list = data.data;
					}
				});
				this.list_role = role;
			}
		},
		//获取实名信息
		getUserRealName() {
			this.$http.get(this.$urlconfig.getUserRealName, {}, {}).then(data => {
				if (data.status === 0) {
					this.result.result = data.data.detailed;
					let ar = [];
					ar[0] = data.data.provincesId.toString();
					ar[1] = data.data.cityId.toString();
					ar[2] = data.data.districtCountyId.toString();

					this.releaseWelfare.selectedOptions = ar;
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
	display: flex;
	flex-direction: row; /*同行多列布局*/
	border-style: solid;
	border-color: #e0e1e0;
	border-width: 1upx; /*边框*/
	border-radius: 10upx; /*圆角*/
}

.meishuju {
	font-size: 30upx;
	text-align: center;
	padding: 100upx 50upx 10upx 50upx;
}
</style>
