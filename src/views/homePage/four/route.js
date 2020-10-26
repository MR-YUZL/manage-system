export default [{
    path: '/four/power',
    name: 'power',
    component: () => import('./power')
  },
  {
    path: '/four/account',
    name: 'account',
    component: () => import('./account')
  },
]