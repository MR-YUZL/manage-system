import {
  login
} from "@/api/login";
import {
  rootRoute,
  userRoute
} from '@/views/homePage/route'


const user = {
  state: {
    token: '',
    roles: '',
    userInfo: {},
    mainRoute: rootRoute
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_UESRINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROUTERS: (state, routes) => {
      state.mainRoute = routes
    }
  },

  actions: {
    Login({
      commit,dispatch
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const result = res.result
          
          window.sessionStorage.TOKEN = result.token
          window.sessionStorage.UESRINFO = result
          window.sessionStorage.ROLES = roles

          commit('SET_UESRINFO', result)
          commit('SET_TOKEN', result.token)
          commit('SET_ROLES', result.roles)

          dispatch('AssignRoute',result.roles)
          resolve(res)

        }).catch(error => reject(error))
      })
    },

    LoginOut({
      commit
    }) {
      commit('SET_TOKEN', '')
      commit('SET_UESRINFO', {})

      delete window.sessionStorage.TOKEN
    },

    AssignRoute({
      commit
    }, roles) {
      return new Promise((resolve, reject) => {
        if (roles === 'root') {
          commit('SET_ROUTERS', rootRoute)
        } else if (roles === 'user') {
          commit('SET_ROUTERS', userRoute)
        }
      })
    }

  }
}

export default user