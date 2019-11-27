import request from '@/utils/request'

export function login (username, password,captcha) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/login.json',
    method: 'post',
    params: {
      username,
      password,
      captcha,
      loginMode:0,
    }
  })
}

export function getUserInfo (token) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/current.json',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//验证码
export function verification () {
  return request({
    url: '/api/open/b/b2b2c/userservice/kaptcha/code_image.jpeg',
    method: 'get'
  })
}

//B端用户注销
export function cancellation (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/logout.json',
    method: 'DELETE',
    timeout:999999, //控制错误是否抛出
    params: { 
      token:data
     }
  })
}