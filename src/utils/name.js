export const rootMenu = [{
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

export const userMenu = [{
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
}, ]

export const columns = [{
    title: "职位名称",
    align: 'center',
    dataIndex: "name",
    width: "15%",
    scopedSlots: {
      customRender: "name"
    },
  },
  {
    title: "对应岗位",
    align: 'center',
    dataIndex: "post",
    width: "20%",
    scopedSlots: {
      customRender: "post"
    },
  },
  {
    title: "职位级别",
    align: 'center',
    dataIndex: "level",
    width: "10%",
    scopedSlots: {
      customRender: "level"
    },
  },
  {
    title: "招聘部门",
    align: 'center',
    dataIndex: "recruit",
    width: "15%",
    scopedSlots: {
      customRender: "recruit"
    },
  },
  {
    title: "最低学历要求",
    align: 'center',
    dataIndex: "education",
    width: "10%",
    scopedSlots: {
      customRender: "education"
    },
  },
  {
    title: "报名数",
    align: 'center',
    dataIndex: "num",
    width: "10%",
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

export const data = [{
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export const treeData = [{
    title: '第一张',
    key: 'one',
    children: [{
        title: '添加',
        key: 'one--add',
      },
      {
        title: '删除',
        key: 'one--delete',
      },
      {
        title: '修改',
        key: 'one--edit',
      },
      {
        title: '查询',
        key: 'one--query',
      },
    ],
  },
  {
    title: '第二张',
    key: 'two',
    children: [{
        title: '添加',
        key: 'two--add',
      },
      {
        title: '删除',
        key: 'two--delete',
      },
      {
        title: '修改',
        key: 'two--edit',
      },
      {
        title: '查询',
        key: 'two--query',
      },
    ],
  }, {
    title: '应用市场',
    key: 'marget',
    children: [{
        title: '第三张',
        key: 'marget--three',
        children: [{
          title: '添加',
          key: 'marget--three--add',
        }]
      },
      {
        title: '测试',
        key: 'marget--test',
        children: [{
          title: '添加',
          key: 'marget--test--add',
        }]
      },
    ],
  },
  {
    title: '第四张',
    key: 'four',
  },
];

export const condition = {
  name: "",
  post: "",
  level: "",
  education: "",
  recruit: "",
  num: "",
}

export const educationOptions = [{
    value: '大专',
    title: "大专"
  },
  {
    value: '本科',
    title: "本科"
  },
  {
    value: '硕士',
    title: "硕士"
  }
]

export const postOptions = [{
    value: '设计岗',
    title: "设计岗"
  },
  {
    value: '开发岗',
    title: "开发岗"
  },
]

export const levelOptions = [{
    value: '高级',
    label: '高级',
    title: '高级',
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
    title: '中级',
    isLeaf: false,
  },
  {
    value: '低级',
    label: '低级',
    title: '低级',
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

export const formList = [{
    span: 6,
    label: "职位名称",
    field: "name",
    name: "name",
    component: "Input",
    props: {
      placeholder: "请输入职位名称"
    }
  },
  {
    span: 6,
    label: "对应岗位",
    field: "post",
    name: "post",
    component: "Select",
    props: {
      placeholder: "请选择岗位"
    }
  },
  {
    span: 6,
    label: "职位级别",
    field: "level",
    name: "level",
    component: "Cascader",
    props: {
      placeholder: "请选择职位级别"
    }
  },
  {
    span: 6,
    label: "最低学历要求",
    field: "education",
    name: "education",
    component: "Select",
    props: {
      placeholder: "请选择学历"
    }
  },
  {
    span: 6,
    label: "招聘部门",
    field: "recruit",
    name: "recruit",
    component: "TreeSelect",
    props: {
      placeholder: "请输入职位名称",
      allowClear: true,
      showSearch: true,
      replaceFields: {
        children: "test",
        value: "title"
      },
      treeNodeFilterProp: "title",
      treeDefaultExpandAll: true
    }
  },
  {
    span: 7,
    label: "报名数区间",
    field: "num",
    name: "num",
    component: "InputNum",
    initialValue: [0, 50],
    props: {}
  }
]

export const formModal = [{

    label: "职位名称",
    ref: "name",
    component: "Input",
    props: {
      placeholder: "请输入职位名称"
    }
  },
  {

    label: "对应岗位",
    ref: "post",
    component: "Select",
    props: {
      placeholder: "请选择岗位"
    }
  },
  {

    label: "职位级别",
    ref: "level",
    component: "Select",
    props: {
      placeholder: "请选择级别"
    }
  },
  {

    label: "最低学历要求",
    ref: "education",
    component: "Select",
    props: {
      placeholder: "请选择学历"
    }
  },
  {

    label: "招聘部门",
    ref: "recruit",
    component: "TreeSelect",
    props: {
      placeholder: "请输入职位名称",
      allowClear: true,
      showSearch: true,
      replaceFields: {
        children: "test",
        value: "title"
      },
      treeNodeFilterProp: "title",
      treeDefaultExpandAll: true
    }
  },
  {
    label: "报名数区间",
    ref: "num",
    component: "Input",
    props: {}
  }
]