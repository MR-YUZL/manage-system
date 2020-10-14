import Mock from 'mockjs'

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
  total: 0
}

const builder = (data, total = 5, message, code = 0, headers = {}) => {
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
    name,
    post,
    level,
    education,
    recruit,
    num
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
  return builder(arr, dataClone.length)
}

const options = (options) => {
    
 
}

Mock.mock('/meun', 'post', list)

Mock.mock('/options', 'post', options)
// Mock.mock('/meun', /post|get/i, {
//   // /post|get/i 匹配post和get模式 也可以用'post'或'get'
//   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//   'list|15': [{
//     // 属性 id 是一个自增数，起始值为 1，每次增 1
//     'id|+1': 1,
//     // 随机数字1-100
//     'name': '@csentence(5)',
//     'post': '@ctitle(5)',
//     'level': '@ctitle(2)',
//     'recruit': '@csentence(5)',
//     'education': '@csentence(5)',
//     'num': '@csentence(5)',
//   }]
// })