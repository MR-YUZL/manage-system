import { login, GetUserInfo } from "@/api/login";
import { rootRoute } from "@/views/homePage/route";
import router, { resetRouter } from "@/routes/routes";

const user = {
  state: {
    userInfo: {},
    mainRoute: rootRoute,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_UESRINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_ROUTERS: (state, routes) => {
      state.mainRoute = routes;
    },
  },

  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            const result = res.result;

            commit("SET_TOKEN", result.token);

            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },

    GetUserInfo({ commit }, token) {
      return new Promise((resolve, reject) => {
        GetUserInfo({
          token,
        })
          .then((res) => {
            if (res.code === 200) {
              const result = res.result;

              commit("SET_UESRINFO", result);

              resolve(result.permission);
            }
          })
          .catch((error) => reject(error));
      });
    },

    LoginOut({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resetRouter();
          commit("SET_UESRINFO", {});
          sessionStorage.removeItem("TOKEN");
          resolve();
        }, 1000);
      });
    },

    AssignRoute({ commit }, permission) {
      return new Promise((resolve, reject) => {
        let routeFilter = (route, permission = []) => {
          return route.reduce((per, cur) => {
            if (permission.some((value) => value.page === cur.name)) {
              if (!cur.children || cur.isChildMenu) {
                return [...per, cur];
              } else {
                cur.children = routeFilter(
                  cur.children,
                  permission.find((value) => value.page === cur.name).children
                );
                return [...per, cur];
              }
            } else {
              return [...per];
            }
          }, []);
        };

        let routeArr = routeFilter(rootRoute, permission);
        // commit('SET_ROUTERS', routeArr)  //会出问题

        resolve(routeArr);
      });
    },
  },
};

export default user;
