export default {
	role: uni.getStorageSync("dian_role"),
	/*全部页显示的列表*/
	getquanbuliebiao() {
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
		let tabBars = [{
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

		let newslist = [];
		for (let a = 0; a < tabBars.length; a++) {
			let li = {
				releaseType: tabBars[a].releaseType,
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
	getreleaseName(releaseType) {
		let releaseName = '';
		if (releaseType === 4) {
			releaseName = '蔬菜零售';
		} else if (releaseType === 5) {
			releaseName = '粮油零售';
		} else if (releaseType === 6) {
			releaseName = '副食/调料零售';
		} else if (releaseType === 7) {
			releaseName = '酒水/饮料零售';
		} else if (releaseType === 8) {
			releaseName = '消毒餐具';
		} else if (releaseType === 9) {
			releaseName = '清洁用品零售';
		} else if (releaseType === 101) {
			releaseName = '工服制作';
		} else if (releaseType === 102) {
			releaseName = '百货';
		} else if (releaseType === 103) {
			releaseName = '绿植销售';
		} else if (releaseType === 104) {
			releaseName = '装饰用品';
		} else if (releaseType === 11) {
			releaseName = '桌椅餐具零售';
		} else if (releaseType === 13) {
			releaseName = '菜谱/广告制作';
		} else if (releaseType === 14) {
			releaseName = '店面/窗口出租';
		} else if (releaseType === 15) {
			releaseName = '摊位出租';
		} else if (releaseType === 17) {
			releaseName = '装修服务';
		} else if (releaseType === 18) {
			releaseName = '维修电器服务';
		} else if (releaseType === 19) {
			releaseName = '灭虫服务';
		} else if (releaseType === 29) {
			releaseName = '水产/蛋禽';
		} else if (releaseType === 33) {
			releaseName = '电器销售';
		} else if (releaseType === 34) {
			releaseName = '二手电器销售';
		} else if (releaseType === 401) {
			releaseName = '蔬菜批发';
		} else if (releaseType === 405) {
			releaseName = '粮油批发';
		} else if (releaseType === 406) {
			releaseName = '调料/副食批发';
		} else if (releaseType === 429) {
			releaseName = '水产/禽蛋批发';
		} else if (releaseType === 409) {
			releaseName = '清洁用品批发';
		}
		return releaseName;
	},
	wodedingdao() {
		let tabBars = [];
		let newslist = [];
	
		if (this.role === 1) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "店面/窗口出租",
					releaseType: 14
				},
				{
					name: "采购信息",
					releaseType: 200
				},
				{
					name: "电器/设备",
					releaseType: 18
				}, // 33电器/设备出售34二手电器/设备出售
				{
					name: "酒水/餐具",
					releaseType: 7
				},
				{
					name: "服务信息",
					releaseType: 13
				},
				{
					name: "我的简历",
					releaseType: 31
				},
				{
					name: "百货信息",
					releaseType: 101
				},
				{
					name: "零售商品",
					releaseType: 4
				},
				{
					name: "批发信息",
					releaseType: 401
				}
			]
		
			
		} else if (this.role === 2) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "采购信息",
					releaseType: 200
				},
				{
					name: "店面/窗口出租",
					releaseType: 14
				}
			]
		} else if (this.role === 3) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "店面/窗口出租",
					releaseType: 14
				},
				{
					name: "电器/设备",
					releaseType: 18
				}
			]
		} else if (this.role === 4) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "摊位出租转让",
					releaseType: 15
				},
				{
					name: "零售商品",
					releaseType: 4
				}, //4蔬菜出售 5粮油出售 6调料/副食出售 29水产/禽蛋出售 9清洁用品 11桌椅餐具
			    {
				    name: "我的简历",
				    releaseType: 31
			    }
			]
		} else if (this.role === 5) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				}, {
					name: "摊位出租转让",
					releaseType: 15
				},
				{
					name: "酒水/餐具",
					releaseType: 7
				}, //7酒水/饮料8消毒餐具
			]
		} else if (this.role === 6) {
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				}, {
					name: "出租信息",
					releaseType: 15
				}
			]
		} else if (this.role === 7) { //13菜谱/广告17装修19灭虫
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "服务信息",
					releaseType: 13
				}
			]
		} else if (this.role === 11) {
			tabBars = [{
				name: "我的简历",
				releaseType: 31
			}]
		} else if (this.role === 12) { //工服/百货/绿植/装饰用品
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				}, {
					name: "百货信息",
					releaseType: 101
				}
			]
		} else if (this.role === 13) { //工服/百货/绿植/装饰用品
			tabBars = [{
					name: "招聘信息",
					releaseType: 30
				},
				{
					name: "批发信息",
					releaseType: 401
				},
				{
					name: "摊位出租转让",
					releaseType: 15
				}
			]
		}

		for (let a = 0; a < tabBars.length; a++) {
			let li = {
				releaseType: tabBars[a].releaseType,
				list: []
			}
			newslist.push(li)
		}
		let result = {
			newslist: newslist,
			tabBars: tabBars,
			role: this.role
		}
		return result;


	},
	
	getMyReleaseType(role,releaseType){
	let	myReleaseType_4=[
			{value:'蔬菜零售',releaseType:4},
			{value:'粮油零售',releaseType:5},
			{value:'调料/副食零售',releaseType:6},
			{value:'水产/禽蛋零售',releaseType:29},
			{value:'清洁用品零售',releaseType:9},
			{value:'桌椅餐具',releaseType:11}
		];
		let	myReleaseType_7=[
			{value:'酒水/饮料',releaseType:7},
			{value:'消毒餐具',releaseType:8}
		];
		//4蔬菜出售 5粮油出售 6调料/副食出售 29水产/禽蛋出售 9清洁用品 11桌椅餐具
		let	myReleaseType_13=[
			{value:'菜谱/广告制作',releaseType:13},
			{value:'装修服务',releaseType:17},
			{value:'灭虫服务',releaseType:19}
		];
		
		let	myReleaseType_18=[
			{value:'维修电器服务',releaseType:18},
			{value:'电器销售',releaseType:33},
			{value:'二手电器销售',releaseType:34}
		];
		let	myReleaseType_101=[
			{value:'工服制作',releaseType:101},
			{value:'百货',releaseType:102},
			{value:'绿植销售',releaseType:103},
			{value:'装饰用品',releaseType:104}
		];
		let	myReleaseType_401=[
			{value:'蔬菜批发',releaseType:401},
			{value:'粮油批发',releaseType:405},
			{value:'调料/副食批发',releaseType:406},
			{value:'水产/禽蛋批发',releaseType:429},
			{value:'清洁用品批发',releaseType:409}
		];
		if(releaseType===4){
			return myReleaseType_4;
		}else if(releaseType===7){
			return myReleaseType_7;
		}else if(releaseType===13){
			return myReleaseType_13;
		}else if(releaseType===18){
			return myReleaseType_18;
		}else if(releaseType===101){
			return myReleaseType_101;
		}else if(releaseType===401){
			return myReleaseType_401;
		}else{
			return myReleaseType_4;
		}
		
		
		
		
		
	}


}
