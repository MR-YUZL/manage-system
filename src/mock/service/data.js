import Mock from 'mockjs'

const username = ['admin', 'root']
const password = ['admin', 'root']

const name_mock = [
  '视觉设计师',
  '前端工程师',
  '后端工程师',
  '测试工程师',
  '应用工程师',
  '运维工程师',
  'HR',
  '产品经理'
]

const post_mock = [
  '设计岗',
  '开发岗',
]

const level_mock = [
  '低级',
  '中级',
  '高级',
]

const recruit_mock = [
  '人事部',
  '销售部',
  '开发部',
]

const education_mock = [
  '本科',
  '大专',
  '硕士',
]

const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0,
}


const adminInfo = {
  'username': 'admin',
  'password': '',
  'name': '用户',
  'roles': 'user',
  'permission': [{
    page: 'one',
    actions: ['one--add', 'one--delete', 'one--edit']
  }, {
    page: 'two',
    actions: ['two--query']
  }, {
    page: 'four',
    actions: []
  }, ]
}

const rootInfo = {
  'username': 'root',
  'password': '',
  'name': '超级管理员',
  'roles': 'root',
  'permission': [{
      page: 'one',
      actions: ['one--query', 'one--add', 'one--delete', 'one--edit']
    }, {
      page: 'two',
      actions: ['two--query', 'two--add', 'two--delete', 'two--edit']
    }, {
      page: 'marget',
      actions: [],
      children: [{
        page: 'three',
        actions: ['marget--three--add'],
        children: [{
          page: 'child',
          actions: ['marget--three--child--add']
        }]
      }, {
        page: 'test',
        actions: []
      }]
    },
    {
      page: 'four',
      actions: []
    },
    {
      page: 'five',
      actions: []
    },
    {
      page: 'map',
      actions: []
    },
    {
      page: 'hover',
      actions: []
    },
  ]
}

const line = [{
    name: "消费金额",
    data: [120, 250, 450, 360, 140, 320],
    //  data: [-180, -50, 150, 60, -160, 20],
    areaStyle: false,
    label: "消费金额/元",
    unit: "元",
  },
  // {
  //   name: "平均金额",
  //   data: [300, 300, 300, 300, 300, 300],
  //   // data: [0, 0, 0, 0, 0, 0],
  //   label: "平均金额/元",
  //   unit: "元",
  // }, 
]

const lineX = ["1月", "2月", "3月", "4月", "5月", "6月"]

const line2 = [{
    name: "需求量",
    data: [230, 410, 150, 460, 240, 320],
    label: "需求量/人",
    unit: "人",
    areaStyle: true,
  },
  {
    name: "报名量",
    data: [520, 630, 650, 690, 560, 490],
    label: "报名量/人",
    unit: "人",
  },
  {
    name: "平均值",
    data: [300, 300, 300, 300, 300, 300],
    label: "平均值/人",
    unit: "人",
  },
]

const lineX2 = ["前端", "应用", "设计", "产品", "框架", "运维"]

const barX = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
]

const bar = [{
  data: [40, 79, 50, 40, 79, 50, 40, 79, 50, 40, 79, 50],
}, ]

const pie = [{
    value: 1,
    name: '甲'
  }, {
    value: 2,
    name: '乙'
  },
  {
    value: 3,
    name: '丙'
  },
  {
    value: 4,
    name: '丁'
  },
  {
    value: 5,
    name: '戊'
  },
]

const BJData = [{
    from: '北京',
    to: '上海',
    value: 95,
    province: '上海'
  },
  {
    from: '北京',
    to: '大连',
    value: 80,
    province: '辽宁'
  },
  {
    from: '北京',
    to: '南宁',
    value: 70,
    province: '广西'
  },
  {
    from: '北京',
    to: '南昌',
    value: 60,
    province: '江西'
  },
  {
    from: '北京',
    to: '拉萨',
    value: 50,
    province: '西藏'
  },
  {
    from: '北京',
    to: '长春',
    value: 40,
    province: '吉林'
  },
  {
    from: '北京',
    to: '包头',
    value: 30,
    province: '内蒙古'
  },
  {
    from: '北京',
    to: '重庆',
    value: 20,
    province: '重庆'
  },
];

const SHData = [{
    from: '上海',
    to: '包头',
    value: 95,
    province: '内蒙古'
  },
  {
    from: '上海',
    to: '昆明',
    value: 90,
    province: '云南'
  },
  {
    from: '上海',
    to: '广州',
    value: 80,
    province: '广东'
  },
  {
    from: '上海',
    to: '郑州',
    value: 70,
    province: '河南'
  },
  {
    from: '上海',
    to: '长春',
    value: 60,
    province: '吉林'
  },
  {
    from: '上海',
    to: '重庆',
    value: 50,
    province: '重庆'
  },
  {
    from: '上海',
    to: '长沙',
    value: 40,
    province: '湖南'
  },
];

const GZData = [{
    from: '广州',
    to: '太原',
    value: 90,
    province: '山西'
  },
  {
    from: '广州',
    to: '长春',
    value: 80,
    province: '吉林'
  },
  {
    from: '广州',
    to: '重庆',
    value: 70,
    province: '重庆'
  },
  {
    from: '广州',
    to: '西安',
    value: 60,
    province: '陕西'
  },
  {
    from: '广州',
    to: '成都',
    value: 50,
    province: '四川'
  },
  {
    from: '广州',
    to: '海口',
    value: 10,
    province: '海南'
  }
];

const builder = (data, total = 0, message, code = 0, headers = {}) => {
  responseBody.total = total
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}



const list = (params) => {
  let {
    current,
    pageSize,
    condition
  } = JSON.parse(params.body)
  let data = []
  const {
    name, //职位名称
    post, //对应岗位
    level, //职位级别
    education, //最低学历
    recruit, //招聘部门
    num //报名数
  } = condition;

  for (let i = 0; i < 15; i++) {
    data.push({
      id: i + 1,
      name: name_mock[Mock.mock({
        "number|0-7": 7
      }).number],
      post: post_mock[Mock.mock({
        "number|0-1": 1
      }).number],
      level: level_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      recruit: recruit_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      education: education_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      num: Mock.mock({
        "number|0-50": 50
      }).number
    })
  }
  let dataClone = JSON.parse(JSON.stringify(data))
  for (let i in condition) {
    if (condition[i]) {
      dataClone = dataClone.filter(
        (item) => {
          if (i === 'num') {
            let min = condition[i][0] || 0
            let max = condition[i][1] || 50
            return item[i] > min && item[i] < max
          } else {
            return item[i].indexOf(condition[i]) !== -1
          }
        });
    }
  }
  if (!(name || post || level || education || recruit || num)) {
    dataClone = data;
  }

  let pageNum = current - 1
  let arr = dataClone.slice(pageNum * pageSize, current * pageSize)

  return builder(arr, dataClone.length, '', 200)
}

const info = (options) => {
  const body = JSON.parse(options.body)

  if (body.token === 'token-root') {
    return builder(rootInfo, 0, '', 200)
  } else {
    return builder(adminInfo, 0, '', 200)
  }
}


const powerList = (options) => {
  return builder(treeData, 0, '', 200)
}

const userList = (options) => {
  const body = JSON.parse(options.body)
  const {
    name
  } = body

  let arr = []
  let userArr = [rootInfo, adminInfo]

  if (name) {
    arr = userArr.filter(v => v.name.indexOf(name) !== -1)
  } else {
    arr = userArr
  }

  return builder(arr, 0, '', 200)
}

const login = (options) => {
  let token = ''
  const body = JSON.parse(options.body)

  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({}, 0, '账户或密码错误', 401)
  }

  if (body.username === 'root') {
    token = 'token-root'
  } else {
    token = 'token-user'
  }

  return builder({
    'token': token,
  }, 0, '', 200)
}

const lineData = (options) => {
  const body = JSON.parse(options.body)
  const {
    charts
  } = body
  let obj = {}
  if (charts === '消费趋势') {
    obj = {
      line,
      lineX
    }
  } else {
    obj = {
      line: line2,
      lineX: lineX2
    }
  }
  return builder(obj, 0, '', 200)
}

const barData = (options) => {
  const body = JSON.parse(options.body)
  const {
    charts
  } = body
  let obj = {
    bar,
    barX
  }
  return builder(obj, 0, '', 200)
}

const pieData = (options) => {
  const body = JSON.parse(options.body)
  const {
    charts
  } = body
  let obj = {
    pie,
  }
  return builder(obj, 0, '', 200)
}

const mapData = (options) => {
  const body = JSON.parse(options.body)
  const {
    data
  } = body

  if (data === '北京') {
    return builder(BJData, 0, '', 200)
  } else if (data === '上海') {
    return builder(SHData, 0, '', 200)
  } else {
    return builder(GZData, 0, '', 200)
  }

}

Mock.mock('/meun', 'post', list)

Mock.mock('/info', 'get', info)

Mock.mock('/login', 'post', login)

Mock.mock('/userList', 'post', userList)

Mock.mock('/powerList', 'post', powerList)

Mock.mock('/lineData', 'post', lineData)

Mock.mock('/barData', 'post', barData)

Mock.mock('/pieData', 'post', pieData)

Mock.mock('/mapData', 'post', mapData)