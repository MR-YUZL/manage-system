export const menu = [{
    key: '/homePage/one',
    title: '主页',
    path: ""
  }, {
    key: '/homePage/two',
    title: '基础应用管理',
    path: ""
  }, {
    key: '/market',
    title: '应用市场',
    path: "",
    children: [{
      key: '/market/purchase',
      title: '应用购买',
    }, {
      key: '/home/manage',
      title: '应用管理',
    }, {
      key: '/home/DDManage',
      title: '订单管理',
    }]
  },
  {
    key: '/DDManage',
    title: '订单管理',
    path: ""
  }, {
    key: '/capital',
    title: '资金管理',
    path: "",
    children: [{
      key: '/capital/DDManage',
      title: '订单管理',
    }]
  }, {
    key: '/contract',
    title: '合同管理',
    path: "",
    children: [{
      key: '/contract',
      title: '订单管理',
    }]
  },
  {
    key: '/mail',
    title: '通讯录管理',
    path: ""
  }, {
    key: '/System',
    title: '系统管理',
    path: "",
    children: [{
      key: '/System',
      title: '订单管理',
    }]
  }
]

export const columns = [{
    title: "职位名称",
    align:'center',
    dataIndex: "name",
    width: "15%",
    scopedSlots: {
      customRender: "name"
    },
  },
  {
    title: "对应岗位",
    align:'center',
    dataIndex: "post",
    width: "15%",
    scopedSlots: {
      customRender: "post"
    },
  },
  {
    title: "职位级别",
    align:'center',
    dataIndex: "level",
    width: "15%",
    scopedSlots: {
      customRender: "level"
    },
  },
  {
    title: "招聘部门",
    align:'center',
    dataIndex: "recruit",
    width: "15%",
    scopedSlots: {
      customRender: "recruit"
    },
  },
  {
    title: "最低学历要求",
    align:'center',
    dataIndex: "education",
    width: "15%",
    scopedSlots: {
      customRender: "education"
    },
  },
  {
    title: "报名数",
    align:'center',
    dataIndex: "num",
    width: "15%",
    scopedSlots: {
      customRender: "num"
    },
  },
  {
    title: "操作",
    align:'center',
    dataIndex: "operation",
    width: "15%",
    scopedSlots: {
      customRender: "operation"
    },
  },
]