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
		  <view class="sou">
			  <input class="uni-input"  v-model="releaseWelfare.serviceType"  focus  placeholder="请输入商品名或服务关键字"  type="text" maxlength="18" />
		       <button class="mini-class"  size="mini"  :loading="loading" @click="getnew()">查询</button>
		   </view>
		</view>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box kong" :style="{ height: swiperheight + 'px' }" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view scroll-y class="list"><template v-if="items.list.length > 0"></template></scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';

import wPicker from '../../components/w-picker/w-picker.vue';
import indexjs from '../../common/indexjs/indexjs.js';

import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		swiperTabHead,
		LotusLoading,
		wPicker, //城市选择
		uniNavBar //自定义导航
	},
	data() {
		return {
			loading:false,
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

			releaseWelfare: {
				//查询条件
				selectedOptions: [], //三级联动城市
				serviceType: '', //维修项目，设备名称
				//releaseTitle: '', //标题
				//分页开始
				currentPage: 1,
				pageSize: 12, //每页显示的数量
				//分页结束
				releaseType: ''

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
		this.__init();
	},
	//页面每次出现都检查是否开启接到哪如果开启刷新订单
	onShow() {},

	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked() {
		
	},
	// 监听原生标题导航按钮点击事件
	onNavigationBarButtonTap(e) {
	},
	methods: {
		__init() {
			this.getUserRealName();
			if (this.tabBars.length === 0 || this.newslist.length === 0) {
				let resule = indexjs.quanbudingdao();
				this.tabBars = resule.tabBars;
				this.newslist = resule.newslist;
			}
			for (let a = 0; a < this.tabBars.length; a++) {
				if (this.tabBars[a].releaseType === this.releaseType) {
					let ti= this.tabBars[a];
					let tin= this.tabBars[0];
					//把点击的放在第一位
					this.tabBars.splice(0,1,ti);
					this.tabBars.splice(a,1,tin);
					
					let li =this.newslist[a];
					let lin=this.newslist[0];
					this.newslist.splice(0,1,li);
					this.newslist.splice(a,1,lin);
					
					this.tabIndex = 0;
				//	this.tabtap(a);
					this.getnews(this.tabIndex,1);
					break;
				}
			}
		},
     getnew(){
		 //1为查询
		 this.getnews(this.tabIndex,1);
	 },
		//刷新列表
		getnews(index,type) {
			
			//this.loading=true;
			console.log(index)
			this.lotusLoadingData.isShow = true;
			let releaseType = this.newslist[index].releaseType;
			let list = this.newslist[index].list.length;
			this.releaseWelfare.releaseType = releaseType;
			if (releaseType !== 30 && releaseType !== 31 && releaseType !== 35) {
			}
			
			//请求后端拿数据
			console.log( this.releaseWelfare)
			this.$http.post(this.$urlconfig.getfabulista, this.releaseWelfare, {}).then(data => {
				console.log( this.data)
				this.lotusLoadingData.isShow = false;
				if (data.status === 0) {
					//没有查询到结果
					if(data.data.datas===null){
						if(type===1){
							uni.showToast({
								title: "未查询到发布信息",
								icon: "none"
							});
							return true;
						}else if(type===2){
						//刷新或者上拉加载更多	
						}
						
					}
					//有查询到结果
			
				}
				
				//this.loading=false;
			});
											
		},

		// tabbar点击事件
		tabtap(index) {
			this.tabIndex = index;
		},
		// 滑动事件
		tabChange(e) {
			this.tabIndex = e.detail.current;
			this.releaseWelfare.serviceType='';
			this.releaseWelfare.currentPage=1;
			this.getnews(this.tabIndex,1);
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
.w-picker-demo {
	padding: 30rpx 0;
	text-align: center;
	font-size: 30rpx;
	line-height: 60rpx;
}
.result {
	margin-top: 60px;
}

.mini-class{
	font-size: 40rpx;
}
.so{
	padding: 10upx 30upx 10upx 30upx;
}
.sou{
	
	display: flex;
    flex-direction: row; /*同行多列布局*/
		border-style:solid;
		border-color:#e0e1e0;
		border-width:1px;/*边框*/
		border-radius:10upx; /*圆角*/
}
</style>
