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
    align: 'center',
    dataIndex: "name",
    width: "10",
    scopedSlots: {
      customRender: "name"
    },
  },
  {
    title: "对应岗位",
    align: 'center',
    dataIndex: "post",
    width: "15",
    scopedSlots: {
      customRender: "post"
    },
  },
  {
    title: "职位级别",
    align: 'center',
    dataIndex: "level",
    width: "15",
    scopedSlots: {
      customRender: "level"
    },
  },
  {
    title: "招聘部门",
    align: 'center',
    dataIndex: "recruit",
    width: "15",
    scopedSlots: {
      customRender: "recruit"
    },
  },
  {
    title: "最低学历要求",
    align: 'center',
    dataIndex: "education",
    width: "15",
    scopedSlots: {
      customRender: "education"
    },
  },
  {
    title: "报名数",
    align: 'center',
    dataIndex: "num",
    width: "15",
    scopedSlots: {
      customRender: "num"
    },
  },
  {
    title: "操作",
    align: 'center',
    dataIndex: "operation",
    width: "15",
    scopedSlots: {
      customRender: "operation"
    },
  },
]

export const condition = {
  name: "",
  post: "",
  level: "",
  education: "",
  recruit: "",
  num: "",
}

export const options = [{
      value: '高级',
      label: '高级',
      children: [{
          value: '中高',
          label: '中高',
          children: [{
            value: '下高',
            label: '下高',
          }, ],
        },
        {
          value: '上高',
          label: '上高',
        },
      ],
    },
    {
      value: '中级',
      label: '中级',
      isLeaf: false,
    },
    {
      value: '低级',
      label: '低级',
      isLeaf: false,
    },
  ]

  export const treeList = [{
      title: '销售部',
      value: 'xsb',
      key: '0-0',
      scopedSlots: {
        title: 'custom'
      },
      test: [{
          value: 'cp',
          key: '0-0-0',
          title: '产品',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          title: '客服',
          value: 'kf',
          key: '0-0-1',
          scopedSlots: {
            title: 'custom'
          },
        },
      ],
    },
    {
      title: '开发部',
      value: 'kfb',
      key: '0-1',
      scopedSlots: {
        title: 'custom'
      },
      test: [{
          value: 'yw',
          key: '0-1-0',
          title: '运维',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          title: '框架',
          value: 'kj',
          key: '0-1-1',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          value: 'cs',
          key: '0-1-2',
          title: '测试',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          title: '前端',
          value: 'qd',
          key: '0-1-3',
          scopedSlots: {
            title: 'custom'
          },
        },
      ],
    },
    {
      title: '人事部',
      value: 'rsb',
      key: '0-2',
      scopedSlots: {
        title: 'custom'
      },
      test: [{
          value: 'cw',
          key: '0-2-0',
          title: '财务',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          title: '招聘',
          value: 'zp',
          key: '0-2-1',
          scopedSlots: {
            title: 'custom'
          },
        },
        {
          value: 'px',
          key: '0-2-2',
          title: '培训',
          scopedSlots: {
            title: 'custom'
          },
        },
      ],
    },
  ]