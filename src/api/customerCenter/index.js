import axios from 'axios'
export default {
    //客户管理列表
  custManageList(params) {
    return axios.get('/customers/hfwCustomersInfo/listPageJson', {params})
  },
  //设置列表字段 
  setFieldsJson(params) {
    return axios.get('/config/hfwConfigFields/fieldsJson', {params})
  },
  //客户管理-设置负责人 
  setPrincipalJson(params){
    return axios.post('/customers/hfwCustomersInfo/setPrincipalJson', params)
  },
  //客户管理-删除 
  delCustomer(params){
    return axios.post('/customers/hfwCustomersInfo/delJson', params)
  },
  //客户管理-创建客户 
  createCustomer(params){
    return axios.post('/customers/hfwCustomersInfo/saveJson', params)
  },
  //客户管理-导出  
  exportCustomer(params){
    return axios.post('/customers/hfwCustomersInfo/exportJson', params)
  },
  //客户管理-导入数据 
  importJson(params) {
    return axios.post('/imp/hfwImportFile/importJson', params)
  },
  //客户管理-导入匹配成功
  matchJson(params){
    return axios.post('/imp/hfwImportFile/matchJson', params)
  },
  //客户管理-导入结果
  importResult(params) {
    return axios.get('/imp/hfwImportResult/resultJson', {params})
  },
  //线索管理list 
  clueManageList(params){
    return axios.post('/customers/hfwCustomersClue/listPageJson', params)
  },
  //跟进记录list 
  followRecordList(params){
    return axios.post('/customers/hfwCustomersVisit/listPageJson', params)
  },
  //历史会话list 
  sessionList(params) {
    return axios.get('/hfw/hfwSessionInfo/listPageJson', {params})
  },
  //质量检测-会话质检-在线质检 
  sessionOnlineList(params) {
    return axios.get('/session/qc/search', {params})
  },
  //质量检测-电话质检 
  callphoneList(params) {
    return axios.get('/callphone/qc/serach', {params})
  },
}