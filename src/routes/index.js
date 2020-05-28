const routes = [
  {
    path: "/test",
    component: () => import("@/views/setting/qualityTesting/index2.vue")
  },
  {
    path:'/',
    component: () => import("@/views/index.vue"),
    redirect: '/currentSession',
    children: [
      {
        path:'currentSession',
        component: () => import("@/views/currentSession/index.vue"),
    
      },
      {
        path:'messageRecord',
        component: () => import("@/views/messageRecord/index.vue"),
      },
      {
        path:'TeleCustomerService',
        component: () => import("@/views/TeleCustomerService/index.vue"),
        children: [
          {
            path:'workbench',
            component: () => import("@/views/TeleCustomerService/workbench/index.vue"),
          },
          {
            path:'record',
            component: () => import("@/views/TeleCustomerService/record/index.vue"),
          },
        ]
      },
      {
        path:'qualityTesting',
        component: () => import("@/views/qualityTesting/index.vue"),
        children:[
          {
            path:'session',
            component: () => import("@/views/qualityTesting/session/index.vue"),
          },
          {
            path:'conversation',
            component: () => import("@/views/qualityTesting/conversation/index.vue"),
          },
          
        ]
      },
      {
        path:'historicalDialogue',
        component: () => import("@/views/historicalDialogue/index.vue")
      },
      {
        path:'workOrder',
        component: () => import("@/views/workOrder/index.vue")
      },
      {
        path:'knowledgeBase',
        component: () => import("@/views/knowledgeBase/index.vue")
      },
      {
        path:'customerCenter',
        component: () => import("@/views/customerCenter/index.vue"),
        children:[
          {
            path:'customerManage',
            component: () => import("@/views/customerCenter/customerManage/index.vue"),
          },
          {
            path:'clue',
            component: () => import("@/views/customerCenter/clue/index.vue"),
          },
          {
            path:'record',
            component: () => import("@/views/customerCenter/record/index.vue"),
          },
        ]
      },
      {
        path:'dataAnalysis',
        component: () => import("@/views/dataAnalysis/index.vue"),
        children:[
          {
            path:'overview',
            component: () => import("@/views/dataAnalysis/overview/index.vue"),
          },
          {
            path:'personal',
            component: () => import("@/views/dataAnalysis/personal/index.vue"),
          },
          {
            path:'department',
            component: () => import("@/views/dataAnalysis/department/index.vue"),
          },
          {
            path:'seat',
            component: () => import("@/views/dataAnalysis/seat/index.vue"),
          },
          {
            path:'IVR',
            component: () => import("@/views/dataAnalysis/IVR/index.vue"),
          },
          {
            path:'orderAnalysis',
            component: () => import("@/views/dataAnalysis/orderAnalysis/index.vue"),
          },
          {
            path:'orderClassification',
            component: () => import("@/views/dataAnalysis/orderClassification/index.vue"),
          }
        ]
      },
      {
        path:'staffManagement',
        component: () => import("@/views/staffManagement/index.vue"),
        children:[
          {
            path:'staff',
            component: () => import("@/views/staffManagement/staff/index.vue"),
          },
          {
            path:'skillGroup',
            component: () => import("@/views/staffManagement/skillGroup/index.vue"),
          },
          {
            path:'role',
            component: () => import("@/views/staffManagement/role/index.vue"),
          },
          {
            path:'role/addRole',
            component: () => import("@/views/staffManagement/role/addRole.vue"),
          },
        ]
      },
      {
        path:'setting',
        component: () => import("@/views/setting/index.vue"),
        children:[
          {
            path:'onlineChannel',
            component: () => import("@/views/setting/onlineChannel/index.vue"),
          },
          {
            path: "sessionAssignment",
            component: () =>
              import("@/views/setting/sessionAssignment/index.vue")
          },
          {
            path: "IVRSettings",
            component: () =>
              import("@/views/setting/IVRSettings/index.vue")
          },
          {
            path: "leavingMessage",
            component: () =>
              import("@/views/setting/leavingMessage/index.vue")
          },
          {
            path: "field",
            component: () => import("@/views/setting/field/index.vue")
          },
          {
            path: "system",
            component: () =>
              import("@/views/setting/system/index.vue")
          },
          {
            path: "commonWords",
            component: () =>
              import("@/views/setting/commonWords/index.vue")
          },
          {
            path: "qualityTesting",
            component: () => import("@/views/setting/qualityTesting/index.vue")
          },
          {
            path: "informationSafety",
            component: () => import("@/views/setting/informationSafety/index.vue")
          }
        ]
      }
    ]
  },
  // {
  //   path: "/login",
  //   component: () => import("@/containers/Login/index.vue")
  // },
  {
    path:'/test2',
    component: () => import('@/views/Test/index.vue')
  },
  {
    path:'/conversation',
    component: () => import('@/views/Test/conversation.vue')
  },
  {
    path: "*",
    component: () => import("@/components/NotFound")
  }

]

const defaultRoutes = routes[1].children;
export { routes , defaultRoutes };
