import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false
// 挂载全局方法
Vue.prototype.$store = store

import request from "./commons/request.js";
Vue.prototype.$http = request;
import urlconfig from "./commons/urlconfig.js";
Vue.prototype.$urlconfig = urlconfig;

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
