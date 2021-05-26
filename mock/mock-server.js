const Mock = require('mockjs')

const Random = Mock.Random
const mock = Mock.mock

function fmtGetUrl(url) {
  let obj = {}
  url.split('?')[1].split('&').forEach((v) => {
    const s = v.split('=')
    obj[s[0]] = s[1]
  })
  return obj
}

mock('http://localhost:9090/merchant/user/login', 'post', function (config) {
  // 这里的option是请求的相关参数
  const { username, password } = JSON.parse(config.body)
  console.log(username)
  return Mock.mock({
    status: 200,
    dataSource: { token:'111111111',name:username,passwd:password },
    message: '@cword(2)'
  })
})
mock(new RegExp('http://localhost:9090/merchant/user/login1' + '.*'), 'get', function (config) {
  // 这里的option是请求的相关参数
  const { id } = fmtGetUrl(config.url)

  return Mock.mock({
    // code:0,
    status: 200,
    dataSource: [{ id }],
    message: '@cword(2)'
  })
})

let userName = '王利明2'
//获取用户信息
mock(new RegExp('http://localhost:9090/merchant/getUser' + '.*'), 'get', function (config) {
  // 这里的option是请求的相关参数
  console.log("huoqu dao qingqiu")
  console.log(config.url)
  
  const { id } = fmtGetUrl(config.url)
  
  return Mock.mock({
    // code:0,
    status: 200,
    dataSource: {name: userName},
    message: '@cword(2)'
  })
})
//修改用户信息
mock(new RegExp('http://localhost:9090/merchant/updateUser'), 'post', function (config) {
  // 这里的option是请求的相关参数
  const { name } = JSON.parse(config.body)
  // const { name } = fmtGetUrl(config.url)
  console.log(name)
  userName=name
  return Mock.mock({
    // code:0,
    status: 200,
    dataSource: {name:'王利明'},
    message: '@cword(2)'
  })
})