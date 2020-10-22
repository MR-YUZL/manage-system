import fourChild from "./four/route"
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const rootRoute = [{
    path: '/homePage/one',
    name: 'one',
    meta: {
      title: '第一张',
      permission: 'one'
    },
    component: () => import('./one/one.vue')
  },
  {
    path: '/homePage/two',
    name: 'two',
    meta: {
      title: '第二张',
      permission: 'two'
    },
    component: () => import('./two/two.vue')
  },
  {
    path: '/marget',
    name: 'marget',
    meta: {
      title: '应用市场'
    },
    component: RouteView,
    children: [{
        path: '/homePage/three',
        name: 'three',
        meta: {
          title: '第三张',
          permission: 'three'
        },
        component: () => import('./three/three.vue')
      },
      {
        path: '/homePage/test',
        name: 'test',
        meta: {
          title: '测试',
          permission: 'test'
        },
        component: () => import('./three/three.vue')
      }
    ]
  },
  {
    path: '/homePage/four',
    name: 'four',
    meta: {
      title: '第四张',
      permission: 'four'
    },
    isChildMenu: true,
    redirect: "/homePage/four/power",
    component: () => import('./four/four.vue'),
    children: [
      ...fourChild
    ]
  },
]

export const userRoute = [{
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
      title: '第二张',
      permission: 'two'
    },
    component: () => import('./two/two.vue')
  },
]