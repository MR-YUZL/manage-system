import Vue from "vue";
import VueRouter from "vue-router";
import homePageChild from '@/views/homePage/route.js'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);
// router
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: () => import('@/views/homePage/index.vue'),
      children: [
        ...homePageChild
      ]
    },
  ]
});


export { router };
