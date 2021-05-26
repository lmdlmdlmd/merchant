/**
 * uni-app store 状态管理器
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index'

Vue.use(Vuex)

const store = new Vuex.Store(modules)

export default store