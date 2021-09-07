import fourChild from "./four/route";
import RouteView from "@/layouts/RouteView";
import three from "./three";
// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const rootRoute = [
  {
    path: "/one",
    name: "one",
    meta: {
      title: "第一张",
      permission: {
        添加: "one--add",
        查询: "one--query",
        删除: "one--delete",
        编辑: "one--edit",
      },
    },
    component: () => import("./one"),
  },
  {
    path: "/two",
    name: "two",
    meta: {
      title: "第二张",
      permission: {
        添加: "two--add",
        查询: "two--query",
        删除: "two--delete",
        编辑: "two--edit",
      },
    },
    component: () => import("./two"),
  },
  {
    path: "/three",
    name: "marget",
    meta: {
      title: "应用市场",
      hasChild: true,
    },
    component: RouteView,
    children: [
      {
        path: "/three/three",
        name: "three",
        meta: {
          title: "第三张",
          hasChild: true,
          permission: {
            添加: "marget--three--add",
          },
        },
        component: three,
        children: [
          {
            path: "/three/three/child",
            name: "child",
            component: () => import("./three/children/threeChild.vue"),
            meta: {
              title: "第三张孩子",
              permission: {
                添加: "marget--three--child--add",
              },
            },
          },
        ],
      },
      {
        path: "/three/test",
        name: "test",
        meta: {
          title: "测试",
          permission: {
            添加: "marget--test--add",
          },
        },
        component: three,
      },
    ],
  },
  {
    path: "/four",
    name: "four",
    meta: {
      title: "第四张",
      isParent: true,
    },
    isChildMenu: true,
    redirect: "/four/power",
    component: () => import("./four"),
    children: [...fourChild],
  },
  {
    path: "/five",
    name: "five",
    meta: {
      title: "eCharts组件",
    },
    component: () => import("./five"),
  },
  {
    path: "/map",
    name: "map",
    meta: {
      title: "eCharts地图",
    },
    component: () => import("./echartsMap"),
  },
  {
    path: "/hover",
    name: "hover",
    meta: {
      title: "hover",
    },
    component: () => import("./hover"),
  },
  {
    path: "/demo-one",
    name: "demo-one",
    meta: {
      title: "demo-one",
    },
    component: () => import("./demo-one"),
  },
  {
    path: "/layout",
    name: "layout",
    meta: {
      title: "layout",
    },
    component: () => import("./layout"),
  },
];
