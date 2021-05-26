/**
 * uni app check response
 * uni app 检测接口请求信息
 */
import Vue from 'vue'

const HttpErrorCode = {
  400: '请求错误',
  401: '未授权，请登陆',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部报错',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
  1: '接口请求失败'
}

/**
 * @description debounce 防抖
 * @param {*} fn 
 * @param {*} waitTimer 
 */
function debounce(fn, waitTimer) {
  let callback = fn
  let timer = null

  function debounced() {
    // 保存作用域
    let context = this
    // 保存参数，例如event对象
    let args = arguments

    clearTimeout(timer)
    timer = setTimeout(function() {
      callback.apply(context, args)
    }, waitTimer)
  }

  // 返回一个闭包
  return debounced
}

/**
 * @description throttle 节流
 * @param {*} fn 
 * @param {*} waitTimer 
 */
function throttle(fn, waitTimer) {
  let callback = fn
  let timer = null

  // 是否是第一次执行
  let firstInvoke = true

  function throttled() {
    let context = this
    let args = arguments

    // 如果是第一次触发，直接执行
    if (firstInvoke) {
      callback.apply(context, args)
      firstInvoke = false
      return
    }

    // 如果定时器已经存在，直接返回。
    if (timer) {
      return
    }

    timer = setTimeout(function() {
      // 注意这里 将clearTimeout 放到内部来执行
      clearTimeout(timer)
      timer = null
      callback.apply(context, args)
    }, waitTimer)
  }

  // 返回一个闭包
  return throttled
}

/**
 * @description logout 登出
 */
const logout = debounce(
  function() {
    Vue.prototype.$store.dispatch('logout')
  },
  250
)

/**
 * @description showErrorMsg 展示错误信息
 */
const errorMsg = debounce(
  function(msg) {
    uni.showToast({
      title: msg || 'Error',
      icon: 'none'
    })
  },
  250
)

/**
 * @description checkStatus 检查response返回状态
 * @param {*} response 
 * @returns 
 */
export const checkStatus = (response = {}) => {
  const res = response.data

  if (res.code !== 0) {
    let msg = HttpErrorCode[res.code] || res.message
    errorMsg(msg)
    return {
      code: res.code,
      msg: msg
    }
  } else {
    return res
  }
}

/**
 * @description checkLogin 检查登录状态
 * @param {*} response 
 * @returns 
 */
export const checkLogin = (response) => {
  let res = response.data
  if (res.code === 401) {
    logout()
  }
  return response
}

/**
 * @description checkResult 检查服务器返回结果
 * @param {*} result 
 * @returns 
 */
export const checkResult = (result) => {
  let { code,statusCode } = result
  console.log('------',result)
  result.ok = function() {
    return false
  }
  if (statusCode === 200 || code === 0) {
    
    result.ok = function() {
      return true
    }
  } else {
    errorMsg(result.msg || HttpErrorCode[code] || '请求失败')
  }
  return result
}
