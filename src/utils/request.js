/**
 * uni app request
 */

const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

import { checkLogin, checkResult } from '@/utils/checkResponse'

class Service {
  [config] = {
    baseURL: '',
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text'
  }

  interceptors = {
    request: (func) => {
      if (func) {
        Service[requestBefore] = func
      } else {
        Service[requestBefore] = (request) => func 
      }
    },
    response: (func) => {
      if (func) {
        Service[requestAfter] = func
      } else {
        Service[requestAfter] = (response) => func
      }
    }
  }

  static[requestBefore](config) {
    return config
  }

  static[requestAfter](response) {
    return response
  }

  static[isCompleteURL](url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  setConfig(func) {
    this[config] = func(this[config])
  }

  request(options = {}) {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = Service[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
    options.data = options.data
    options.header = {
      ...options.header,
      ...this[config].header
    }
    options.method = options.method || this[config].method

    options = {
      ...options,
      ...Service[requestBefore](options)
    }

    return new Promise((resolve, reject) => {
      options.success = function(res) {
        resolve(Service[requestAfter](res))
      }
      options.fail = function(err) {
        reject(Service[requestAfter](err))
      }
      uni.request(options)
    })
  }

  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options).then(checkLogin).then(checkResult)
  }

  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options).then(checkLogin).then(checkResult)
  }

  delete(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options).then(checkLogin).then(checkResult)
  }
}

Service.install = function(Vue) {
  Vue.mixin({
    beforeCreate: function() {
      if (this.$options.api) {
        Vue._api = this.$options.api
      }
    }
  })
  // Object.defineProperty(Vue.prototype, '$api', {
  //   get: function() {
  //     return Vue._api.apis
  //   }
  // })
}

export default Service
