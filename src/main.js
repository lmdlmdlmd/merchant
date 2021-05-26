import Vue from 'vue'

import _ from 'lodash'

import App from './App'
import store from './store'
import api from './api/index'
import Service from './utils/request'
import Cache from './utils/cache'
import Vant from 'vant';
import 'vant/lib/index.less';
import common from './provider/common';
// 引入mock.js ，用于拦截和业务层请求地址相同的Ajax 请求，并返回模拟的响应数据；生产环境只需注释掉mock.js所在行即可切换到真实接口调用环境。
require('../mock/mock-server.js')

Vue.use(Service)
Vue.use(Cache)
Vue.use(common);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$_ = _
Vue.use(Vant);
App.mpType = 'app'

const app = new Vue({
  store,
  api,
  ...App
})
app.$mount()
