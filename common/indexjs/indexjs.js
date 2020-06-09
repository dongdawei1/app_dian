export default {
	role: uni.getStorageSync("dian_role"),
	/*全部页显示的列表*/
	getquanbuliebiao(){
		let daohao = [{
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
								releaseType: 17
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
					}
				];
		
		if (this.role !== 2) {
			//arr.push("A","B")
			let no = {
						name: "批发信息",
						liioc: "/static/quanbu/gengduo.png",
						list: [{
							name: "全部批发",
							lsioc: "/static/quanbu/pifa.png",
							releaseType: 35
						}]
					};
			daohao.push(no);
		}
		return daohao;
	},
	
	
	//首页显示操作按钮
	getdaohao() {
		let daohao = [];

		try {
			//let role = uni.getStorageSync("dian_role");
			if (this.role === 2 || this.role === 1) {
				daohao = [{
						name: '近三天采购',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布采购',
						paths: '/pages/creord/creord',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 3) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/creqp/creqp', //电器
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 4) {
				daohao = [{
						name: '未完成订单',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '全部订单',
						paths: '/pages/jinxingorder/jinxingorder',
						ioc: '/static/shou/g3.png',
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 5) {
				daohao = [{
						name: '未完成订单',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/crejiu/crejiu',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 6) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布租房信息',
						paths: '/pages/crezu/crezu',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 7) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布服务信息',
						paths: '/pages/crezhuang/crezhuang',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 11) {
				daohao = [{
						name: '招聘信息',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '我的简历',
						paths: '/pages/myRelease/myRelease',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			} else if (this.role === 12) {
				daohao = [{
						name: '招聘信息',
						paths: '',
						ioc: '/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/crebai/crebai',
						ioc: '/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc: '/static/shou/g4.png'
					}
				]
			}
			let daohaorole = {
				role: this.role,
				daohao: daohao
			};
			return daohaorole;
		} catch (e) {

			daohao = [{
					name: '需求信息',
					paths: '',
				},
				{
					name: '其他发布',
					paths: '/pages/qitafabu/qitafabu',
				}
			]
			let daohaorole = {
				role: 0,
				daohao: daohao
			};
			return daohaorole;
		}

	},
	//首页显示操作按钮
	quanbudingdao() {
		let tabBars= [{
				name: "蔬菜零售",
				releaseType: 4
			},
			{
				name: "粮油零售",
				releaseType: 5
			},
			{
				name: "调料/副食",
				releaseType: 6
			},
			{
				name: "水产/蛋禽",
				releaseType: 29
			},
			{
				name: "清洁用品",
				releaseType: 9
			},
			{
				name: "桌椅餐具",
				releaseType: 11
			}, {
				name: "工服制作",
				releaseType: 101
			},
			{
				name: "百货信息",
				releaseType: 102
			},
			{
				name: "绿植销售",
				releaseType: 103
			},
			{
				name: "装饰用品",
				releaseType: 104
			}, {
				name: "酒水/饮料",
				releaseType: 7
			},
			{
				name: "消毒餐具",
				releaseType: 8
			}, {
				name: "电器销售",
				releaseType: 33
			},
			{
				name: "二手电器销售",
				releaseType: 34
			},
			{
				name: "维修电器服务",
				releaseType: 18
			}, {
				name: "店面/窗口出租",
				releaseType: 14
			},
			{
				name: "摊位出租",
				releaseType: 15
			},
			{
				name: "菜谱/广告制作",
				releaseType: 13
			},
			
			{
				name: "装修服务",
				releaseType: 17
			},
			{
				name: "灭虫服务",
				releaseType: 19
			},
			{
				name: "招聘信息",
				releaseType: 30
			},
			{
				name: "求职信息",
				releaseType: 31
			}
		];

		if (this.role !== 2) {
			//arr.push("A","B")
			let no = {
				name: "批发信息",
				releaseType: 35
			};
			tabBars.push(no);
		}

		let newslist= [] ;
		for (let a = 0; a < tabBars.length; a++) {
			let li = {
				releaseType:tabBars[a].releaseType,
				list: []
			}
			newslist.push(li)
		}
		let result = {
			newslist: newslist,
			tabBars: tabBars
		}
	
		return result;
	},
	//根据发布类型返回对应的名称
	getreleaseName(releaseType){
		let releaseName='';
		if(releaseType===4){
			releaseName='蔬菜零售';
		}else if(releaseType===5){
			releaseName='粮油零售';
		}else if(releaseType===6){
			releaseName='副食/调料零售';
		}else if(releaseType===7){
			releaseName='酒水/饮料零售';
		}else if(releaseType===8){
			releaseName='消毒餐具';
		}else if(releaseType===9){
			releaseName='清洁用品零售';
		}else if(releaseType===101){
			releaseName='工服制作';
		}else if(releaseType===102){
			releaseName='百货';
		}else if(releaseType===103){
			releaseName='绿植销售';
		}else if(releaseType===104){
			releaseName='装饰用品';
		}else if(releaseType===11){
			releaseName='桌椅餐具零售';
		}else if(releaseType===13){
			releaseName='菜谱/广告制作';
		}else if(releaseType===14){
			releaseName='店面/窗口出租';
		}else if(releaseType===15){
			releaseName='摊位出租';
		}else if(releaseType===17){
			releaseName='装修服务';
		}else if(releaseType===18){
			releaseName='维修电器服务';
		}else if(releaseType===19){
			releaseName='灭虫服务';
		}else if(releaseType===29){
			releaseName='水产/蛋禽';
		}else if(releaseType===33){
			releaseName='电器销售';
		}else if(releaseType===34){
			releaseName='二手电器销售';
		}else if(releaseType===401){
			releaseName='蔬菜批发';
		}else if(releaseType===405){
			releaseName='粮油批发';
		}else if(releaseType===406){
			releaseName='调料/副食批发';
		}else if(releaseType===429){
			releaseName='水产/禽蛋批发';
		}else if(releaseType===409){
			releaseName='清洁用品批发';
		}
return releaseName;
	}
}


