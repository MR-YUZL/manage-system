import {
  login,
  GetUserInfo
} from "@/api/login";
import {
  rootRoute,
  userRoute
} from '@/views/homePage/route'


const user = {
  state: {
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
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const result = res.result

          window.sessionStorage.UESRINFO = JSON.stringify(result)

          resolve(res)

        }).catch(error => reject(error))
      })
    },

    GetUserInfo({
      commit,
      dispatch
    }, username) {
      return new Promise((resolve, reject) => {
        GetUserInfo(username).then(res => {
          const result = res.result

          commit('SET_UESRINFO', result)

          dispatch('AssignRoute', result.permission)

          resolve()

        }).catch(error => reject(error))
      })
    },

    LoginOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('SET_UESRINFO', {})

          delete window.sessionStorage.UESRINFO
          resolve()
        }, 1000)
      })
    },

    AssignRoute({
      commit
    }, permission) {
      return new Promise((resolve, reject) => {

        let routeFilter = (route, permission = []) => {
          return route.reduce((per, cur) => {
            if (permission.some(value => value.page === cur.name)) {
              if (!cur.children || cur.isChildMenu) {
                return [...per, cur]
              } else {
                cur.children = routeFilter(cur.children, permission.find(value => value.page === cur.name).children)
                return [...per, cur]
              }
            } else {
              return [...per]
            }
          }, [])
        }

        let routeArr = routeFilter(rootRoute, permission)

        commit('SET_ROUTERS', routeArr)
        resolve()
        // if (roles === 'root') {
        //   commit('SET_ROUTERS', rootRoute)
        // } else if (roles === 'user') {
        //   commit('SET_ROUTERS', userRoute)
        // }
      })
    }

  }
}

export default user