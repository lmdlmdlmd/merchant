import Vue from 'vue'
import globalConfig from '../config'
import Service from '../utils/request'

const service = new Service()

/**
 * @description 请求拦截器
 */
service.interceptors.request((request) => {
  return request
})

/**
 * @description 响应拦截器
 */
service.interceptors.response((response) => {
  return response
})

/**
 * @description 设置默认配置
 */
service.setConfig((config) => {
  config.baseURL = globalConfig.baseUrl
  return config
})

export default {
  apis: {
    login(params) {
      return service.post('/merchant/user/login', params)
    },

    login1(params) {
      return service.get('/merchant/user/login1?id=1', params)
    },
    getUser(params) {
      console.log("api fasong")
      return service.get('/merchant/getUser?', params)
    },
    updateUser(params) {
      return service.post('/merchant/updateUser', params)
    }
  }
}
