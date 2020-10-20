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
      name: 'login',
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
  const token = window.sessionStorage.TOKEN || null
  if (to.name !== 'login' && !token) next({
    name: 'login'
  })
  else next()
})

export {
  router
};