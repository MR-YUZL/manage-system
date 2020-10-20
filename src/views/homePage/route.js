const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
export const rootRoute = [{
    path: '/homePage/one',
    name: 'one',
    meta: {
      title: '第一张'
    },
    component: () => import('./one/one.vue')
  },
  {
    path: '/homePage/two',
    name: 'two',
    meta: {
      title: '第二张'
    },
    component: () => import('./two/two.vue')
  },
  {
    path: '',
    name: 'three',
    meta: {
      title: '应用市场'
    },
    // component: RouteView,
    children: [{
      path: '/homePage/three',
      name: 'three',
      meta: {
        title: '第三张'
      },
      component: () => import('./three/three.vue')
    }]
  },
]

export const userRoute = [{
  path: '/homePage/one',
  name: 'one',
  meta: {
    title: '第一张'
  },
  component: () => import('./one/one.vue')
}, ]