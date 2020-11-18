import Account from './account'
export default [{
    path: '/four/power',
    name: 'power',
    component: () => import('./power')
  },
  {
    path: '/four/:data',
    name: 'account',
    component: Account
  },
]