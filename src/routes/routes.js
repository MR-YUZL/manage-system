import Vue from "vue";
import store from '../store'
import VueRouter from "vue-router";
import loginChild from '@/views/login/route.js'


import LoginLayout from '@/layouts/LoginLayout'
import BasicLayout from '@/layouts/BasicLayout'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let homeChild = store.state.user.mainRoute

Vue.use(VueRouter);
// router
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginLayout',
      component: LoginLayout,
      children: [
        ...loginChild
      ]
    },
    {
      path: '/homePage',
      redirect: '/homePage/one'
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: BasicLayout,
      children: [
        ...homeChild
      ]
    },
  ]
});

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

export {
  router
};