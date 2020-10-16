export default [{
    path: 'one',
    name: 'one',
    component: () => import('./page/one.vue')
  },
  {
    path: 'two',
    name: 'two',
    component: () => import('./page/two.vue')
  },
]