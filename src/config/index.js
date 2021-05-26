/**
 * api 接口的地址
 */

const ipAddress = "/dev-api"

/**
 * @description apiPrefix api前缀
 */
const apiPrefix = 'http://localhost:9090'

const getBaseUrl = () => {
  // #ifdef H5
  return apiPrefix
  // #endif
  // #ifndef H5
  return ipAddress
  // #endif
}

export default {
  /**
   * 针对不同平台的baseUrl
   */
  baseUrl: getBaseUrl()
}