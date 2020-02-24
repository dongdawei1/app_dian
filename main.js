import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
// 挂载全局方法
import request from "./common/request.js";
Vue.prototype.$http = request;
import urlconfig from "./common/urlconfig.js";
Vue.prototype.$urlconfig = urlconfig;

import user from "./common/user.js";
Vue.prototype.$user = user;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
