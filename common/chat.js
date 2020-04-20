import Config from "./urlconfig.js";
import User from "./user.js";

export default {
	// socket地址
	url: Config.websocketUrl,
	// 连接状态
	IsOpen: false,
	// SocketTask
	SocketTask: false,




	// 是否上线（会员id绑定客户端id，验证用户身份，通过则绑定）
	IsOnline: false,





	// 当前聊天对象（进入聊天页面获取）
	CurrentToUser: {
		userid: 0, // 通过判断userid是否为0，当前用户处在什么场景下
		username: "",
		userpic: ""
	},




	// 连接
	Open() {
		if (this.IsOpen) return; // 防止重复连接
		// 连接
		let token = uni.getStorageSync("dian_token");
		this.SocketTask = uni.connectSocket({
			url: this.url + token,
			complete: (e) => {},
		});
		if (!this.SocketTask) return;
		// 监听开启
		this.SocketTask.onOpen(() => {
			// 将连接状态设为已连接
			this.IsOpen = true;

		});
		// 监听信息
		this.Message();
		// 监听关闭
		this.SocketTask.onClose(() => {
			this.IsOpen = false;
			this.SocketTask = false;
		});
		// 监听错误
		this.SocketTask.onError((e) => {
			this.IsOpen = false;
			this.SocketTask = false;
		});
	},
	// 关闭连接,退出时需要关闭连接
	Close() {
		if (this.IsOpen) {
			this.SocketTask.close();
		}
	},


	// 	// 绑定失败,断开连接
	// 	uni.showToast({ title: res.msg, icon:"none" });
	// 	this.SocketTask.close();

	// 监听信息
	Message() {
		this.SocketTask.onMessage((e) => {
			console.log(e)
			// 字符串转json
			let res = JSON.parse(e.data);
			console.log(res)
			// 绑定返回结果
			if (res.type == 1) {
				if (res.msg == 1) {
					return true;
				} else {
					this.IsOpen = false;
					return false;
				}

			}

			if (res.type === 2) {
				// 通知接单人员有新订单
				this.__Notify();
				uni.$emit('getjinxin', res.getjinxin);
			}else if (res.type === 3) {
				// 通知接单人员关单
				this.__Notify();
				uni.$emit('liushui', res.liushui);
			}else if (res.type === 4) {
				// 通知接单人员关单
				this.__Notify();
				uni.$emit('xuanzhong', res.xuanzhong);
			}else if (res.type === 5) {
				// 通知接单人员关单
				this.__Notify();
				uni.$emit('shauxinjiedan',  res.msg);
			}
			
			
			else if (res.type === 12) {
				// 通知发单人员 有人接单,自动刷新
				this.__Notify();
				
				uni.$emit('getordlist', res.msg);
			}
			// // 存储到chatdetail
			// this.__UpdateChatdetail(res);
			// // 更新chatlist（将当前会话置顶，修改chatlist中当前会话的data和time显示）
			// this.__UpdateChatlist(res);
			// // 总未读数+1，修改tabbar信息数
			// if (this.CurrentToUser.userid !== res.from_id) {
			// 	this.__UpdateNoReadNum({ type:"add" });
			// }
		})
	
	},
	// 总未读数+1，修改tabbar信息数
	__UpdateNoReadNum(options = {}) {
		// 获取总未读数
		let noreadnum = uni.getStorageSync('noreadnum' + User.userinfo.id);
		noreadnum = noreadnum || 0;
		// 接收信息增加
		if (options.type == 'add') {
			// 总未读+1
			noreadnum++;
			// 响铃震动提示
			this.__Notify();
		} else {
			noreadnum -= options.num; // 读取信息减少
		}
		noreadnum = noreadnum > 0 ? noreadnum : 0;
		// 修改tabbar信息数
		this.__UpdateTabbarBadge(noreadnum);
		// 存储
		uni.setStorage({
			key: 'noreadnum' + User.userinfo.id,
			data: noreadnum
		})
	},
	// 消息提示音震动
	__Notify() {
		uni.vibrateLong();
	},

	// 初始化tabbarBadge
	initTabbarBadge() {
		console.log('初始化tabbar未读数')
		// 获取总未读数
		let noreadnum = uni.getStorageSync('noreadnum' + User.userinfo.id);
		this.__UpdateTabbarBadge(noreadnum);
	},
	// 存储到chatdetail（我与某位用户的历史记录）
	__UpdateChatdetail(res, issend = false) {
		/*
		// 组织格式，本地存储
		{
			isme:false,
			userid:17,
			userpic:"../../static/demo/userpic/11.jpg",
			type:"text",
			data:"哈哈哈",
			time:"1555146412"
		},
		
		*/
		let userid = issend ? this.CurrentToUser.userid : res.from_id;
		// 获取旧数据（ chatdetail_[当前用户id]_[聊天对象id] ）
		let list = uni.getStorageSync('chatdetail_' + User.userinfo.id + '_' + userid);
		list = list ? JSON.parse(list) : [];
		// 追加
		list.push(this.__format(res, {
			type: "chatdetail",
			isme: issend,
			olddata: list,
		}));
		// 存储
		uni.setStorage({
			key: 'chatdetail_' + User.userinfo.id + '_' + userid,
			data: JSON.stringify(list)
		})
	},
	// 更新chatlist（将当前会话置顶，修改chatlist中当前会话的data和time显示）
	__UpdateChatlist(res) {
		/*
		// 组织格式，本地存储
		{
			userid:12,
			userpic:"../../static/demo/userpic/12.jpg",
			username:"昵称",
			time:"10:21",
			data:"我是信息",
			noreadnum:2
		}
		*/
		// 获取旧数据
		let chatlist = uni.getStorageSync('chatlist' + User.userinfo.id);
		chatlist = chatlist ? JSON.parse(chatlist) : [];
		// 判断是否已存在该会话，存在：将当前会话置顶；不存在：追加至头部
		let index = chatlist.findIndex((item) => {
			return item.userid == res.to_id || item.userid == res.from_id;
		})
		// 不存在
		if (index == -1) {
			let obj = this.__format(res, {
				type: "chatlist"
			});
			// 忽略本人发送
			if (res.from_id !== User.userinfo.id) {
				obj.noreadnum = 1;
			}
			chatlist.unshift(obj);
		} else {
			// 存在：将当前会话置顶,修改chatlist中当前会话的data和time显示
			chatlist[index].data = res.data;
			chatlist[index].type = res.type;
			chatlist[index].time = res.time;
			// 当前聊天对象不是该id，未读数+1（排除本人发送消息）
			if (res.from_id !== User.userinfo.id && this.CurrentToUser.userid !== chatlist[index].userid) {
				chatlist[index].noreadnum++;
			}
			// 置顶当前会话
			chatlist = this.__toFirst(chatlist, index);
		}
		// 存储到本地存储
		uni.setStorage({
			key: 'chatlist' + User.userinfo.id,
			data: JSON.stringify(chatlist)
		})
	},
	// 数据格式转换
	__format(data, options = {}) {
		/**
		 options = {
			 type:"chatdetail", // 转化类型
			 olddata:olddata,   // 旧数据（chatdetail中必填）
			 isme:true			// （true本人，false聊天对象，chatdetail中必填）
		 }
		 * */
		switch (options.type) {
			case "chatlist": // 新增会话用到
				let obj = {
					userid: data.from_id,
					userpic: data.from_userpic,
					username: data.from_username,
					time: data.time, // 最新消息时间戳
					data: data.data,
					noreadnum: 0 // 未读数
				};
				// 本人发送的信息
				if (data.from_id == User.userinfo.id) {
					obj.userid = this.CurrentToUser.userid;
					obj.userpic = this.CurrentToUser.userpic;
					obj.username = this.CurrentToUser.username;
				}
				return obj;
				break;
			case "chatdetail":
				let list = options.olddata; // 旧数据
				let chattime = new Date().getTime(); // 获取当前时间
				let length = list.length;
				return {
					isme: options.isme,
					userpic: options.isme ? User.userinfo.userpic : data.from_userpic,
					type: data.type,
					data: data.data,
					time: chattime,

				};
				break;
			case "send":
				return {
					to_id: this.CurrentToUser.userid,
					from_id: User.userinfo.id,
					from_username: User.userinfo.username,
					from_userpic: User.userinfo.userpic,
					type: data.type,
					data: data.data,
					time: new Date().getTime()
				}
				break;
		}
	},
	// 数组置顶
	__toFirst(arr, index) {
		if (index != 0) {
			arr.unshift(arr.splice(index, 1)[0]);
		}
		return arr;
	}
}
