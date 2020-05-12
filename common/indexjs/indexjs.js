export default {
	role: uni.getStorageSync("dian_role"),
	/*处理登陆操作*/
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
				releaseType: 15
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






	// name: "待报价订单",
	// id: "daibaojia"
}


