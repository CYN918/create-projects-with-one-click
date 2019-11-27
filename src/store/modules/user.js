import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken  } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menuItems:[],
   dialogVisible:false
  },

  mutations: {
   SET_ADDUSER:(state,dialogVisible)=>{
        state.dialogVisible = dialogVisible
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_CERTIFICATION: (state, certification) => {
      state.certification = certification
    },
    SET_MENUITEMS:(state, arr) => {
      state.menuItems = arr
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo,pasword) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.pasword,userInfo.verification).then(response => {
          const data = response.data
          setToken(data.token)
          if(response.code == 200){
            localStorage.setItem('user',JSON.stringify(response)) 
          }
          commit('SET_TOKEN', data.token)
          commit('SET_MENUITEMS', response.menuItems)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          if (data.certification) {
            commit('SET_CERTIFICATION', data.certification)
          } else {
            commit('SET_CERTIFICATION', {})
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注册
    registered ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken ()
        resolve()
        this.$router.push({name:'login'})
      })
    }
  },

}

export default user
