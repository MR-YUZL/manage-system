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
  },]
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
      actions: ['marget--three--add']
    }, {
      page: 'test',
      actions: []
    }]
  },
  {
    page: 'four',
    actions: []
  },
  ]
}

const treeData = [{
  title: '第一张',
  key: 'one',
  children: [{
    title: '添加',
    key: 'add',
  },
  {
    title: '删除',
    key: 'delete',
  },
  {
    title: '修改',
    key: 'edit',
  },
  {
    title: '查询',
    key: 'query',
  },
  ],
},
{
  title: '第二张',
  key: 'two',
  children: [{
    title: '添加',
    key: 'add',
  },
  {
    title: '删除',
    key: 'delete',
  },
  {
    title: '修改',
    key: 'edit',
  },
  {
    title: '查询',
    key: 'query',
  },
  ],
}, {
  title: '第三张',
  key: '0-2',
},
{
  title: '第四张',
  key: '0-3',
},
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



Mock.mock('/meun', 'post', list)

Mock.mock('/info', 'get', info)

Mock.mock('/login', 'post', login)

Mock.mock('/userList', 'post', userList)

Mock.mock('/powerList', 'post', powerList)