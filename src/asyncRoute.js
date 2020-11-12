import router from "./routes/routes";
import store from './store'

router.beforeEach(async (to, from, next) => {
    const token = sessionStorage.getItem('TOKEN')
    if (to.name === 'login' || to.name === 'showModal') {
        store.dispatch('LoginOut')
        next()
    } else {
        if (token) {
            const userInfo = Object.keys(store.state.user.userInfo);
            if (userInfo.length) {
                next()
            } else {
                const permission = await store.dispatch('GetUserInfo', token)

                const asyncRoutes = await store.dispatch('AssignRoute', permission)
                console.log('asyncRoutes', asyncRoutes)

                next({
                    ...to,
                    replace: true
                })
            }
        } else {
            next({
                name: 'login'
            })
        }
    }
})