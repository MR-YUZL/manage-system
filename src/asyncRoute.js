import router from "./routes/routes";
import store from './store'

router.beforeEach((to, from, next) => {
    let token, username
    const userInfo = window.sessionStorage.UESRINFO && JSON.parse(window.sessionStorage.UESRINFO)

    if (!userInfo || userInfo === {}) {
        token = null
    } else {
        token = userInfo.token
        username = userInfo.username
    }

    if (to.name !== 'login' && !token) {
        next({
            name: 'login'
        })
    } else {

        if (to.name === 'login') {
            //登出时不调用数据
            next()
            return
        }

        if (!Object.keys(store.state.user.userInfo).length) {
            //刷新页面时重新调用数据
            store.dispatch('GetUserInfo', {
                username
            }).then(() => {
                next()
            })
        } else {
            //正常切换页面
            next()
        }
    }
})
