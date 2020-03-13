export default {
	/*处理登陆操作*/
	// 网络错误处理
	getdaohao() {
		let daohao = [];

		try {
			let role = uni.getStorageSync("dian_role");
			if (role === 2 || role === 1) {
				daohao = [{
						name: '近三天采购',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布采购',
						paths: '/pages/creord/creord',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 3) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/creqp/creqp', //电器
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 4) {
				daohao = [{
						name: '未完成订单',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '全部订单',
						paths: '/pages/jinxingorder/jinxingorder',
						ioc:'/static/shou/g3.png',
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 5) {
				daohao = [{
						name: '未完成订单',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/crejiu/crejiu',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 6) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布租房信息',
						paths: '/pages/crezu/crezu',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 7) {
				daohao = [{
						name: '需求信息',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布服务信息',
						paths: '/pages/crezhuang/crezhuang',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 11) {
				daohao = [{
						name: '招聘信息',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '我的简历',
						paths: '/pages/myRelease/myRelease',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			} else if (role === 12) {
				daohao = [{
						name: '招聘信息',
						paths: '',
						ioc:'/static/shou/g1.png'
					},
					{
						name: '发布商品信息',
						paths: '/pages/crebai/crebai',
						ioc:'/static/shou/g3.png'
					},
					{
						name: '其他发布',
						paths: '/pages/qitafabu/qitafabu',
						ioc:'/static/shou/g4.png'
					}
				]
			}
			let daohaorole = {
				role: role,
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

	}

}
