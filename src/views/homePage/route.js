import fourChild from "./four/route"
import RouteView from "@/layouts/RouteView"
import three from "./three/three"
// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const rootRoute = [
  {
    path: '/one',
    name: 'one',
    meta: {
      title: '第一张',
      permission: 'one'
    },
    component: () => import('./one/one.vue')
  },
  {
    path: '/two',
    name: 'two',
    meta: {
      title: '第二张',
      permission: 'two'
    },
    component: () => import('./two/two.vue')
  },
  {
    path: '/three',
    name: 'marget',
    meta: {
      title: '应用市场',
      hasChild: true
    },
    component: RouteView,
    children: [{
      path: '/three/three',
      name: 'three',
      meta: {
        title: '第三张',
        permission: 'three'
      },
      component: three
    },
    {
      path: '/three/test',
      name: 'test',
      meta: {
        title: '测试',
        permission: 'test'
      },
      component: three
    }
    ]
  },
  {
    path: '/four',
    name: 'four',
    meta: {
      title: '第四张',
      permission: 'four',
      isParent: true
    },
    isChildMenu: true,
    redirect: "/four/power",
    component: () => import('./four/four.vue'),
    children: [
      ...fourChild
    ]
  },
]