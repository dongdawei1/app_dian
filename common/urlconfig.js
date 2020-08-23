/* 请求配置信息*/
export default {
	// api请求前缀
	webUrl: 'http://localhost:8080',
	v2Url: 'http://localhost:8080/api/v2/',
	v1Url: 'http://localhost:8080/api/v1/vp/',
	logCaptcha: 'log/captcha',
	logCreate: 'log/create',
	logLogin: 'log/login',
	logGetUesr: 'log/get_user_info',
	getbuuer: 'bunner/getpguang',
	getordls: 'order/get_conduct_purchase_order',
	getpayos: 'order/get_pay_order_all',
	getoscaozuo: 'order/operation_purchase_order',
	getnpayos: 'order/native_pay_order_app',
	getdaibaojia: 'order/getdaibaojia',
	createjiedan: 'order/createjiedan',
    shouhuo: 'order/shouhuo',         
	getUserRealName:'realName/getUserRealName',
	getfabulista:'fabu/getfabulista',
	getfabubyid:'fabu/getfabubyid',
	getmyfabu:'fabu/getmyfabu',
	upfabu:'fabu/upfabu',
	
	
	getWholesaleCommodityPublicId:'wholesaleCommodity/getWholesaleCommodityPublicId',
	get_myWholesaleCommodity_list:'wholesaleCommodity/get_myWholesaleCommodity_list',
	operation_userWholesaleCommodity:'wholesaleCommodity/operation_userWholesaleCommodity',
	get_position_all:'releaseWelfare/get_position_all',
	getContact:'getPublishings/getContact',
	
	get_position_bytype:'releaseWelfare/get_position_bytype',
	get_position:'releaseWelfare/get_position',
	
	create_position:'releaseWelfare/create_position',
	get_position_list:'releaseWelfare/get_position_list',
	position_operation:'releaseWelfare/position_operation',
	
	get_resume_all:'resume/get_resume_all',
	getWholesaleCommodityPublicList:'wholesaleCommodity/getWholesaleCommodityPublicListAp',
	

	select_resume_by_id:'resume/select_resume_by_id',
	operation_resume:'resume/operation_resume',
	create_resume:'resume/create_resume',
	
	myPurchaseOrder:'order/myPurchaseOrder',
	// websocket地址11
	websocketUrl: "ws://localhost:8080/api/v1/vp/so/",
	// 消息提示tabbar索引
	TabbarIndex: 2
}
