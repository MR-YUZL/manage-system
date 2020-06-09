import axios from 'axios'
export default {
    //查询整颗树
    consultTypeList(params) {
        return axios.get('/config/system/findTypeListJson', {params})
    },
    //总览 
    overviewInfo(params) {
        return axios.get('/overview/count/info', {params})
    },
    //总览-咨询分类
    consultTypeChartJson(params) {
        return axios.get('/overview/count/type', {params})
    },
    //数据分析-电话客服-个人统计  
    phonePersonInfo(params) {
        return axios.get('/phoneSerivce/data/getPersonData', {params})
    },
    //数据分析-电话客服-部门统计  
    phoneDepartmentInfo(params) {
        return axios.get('/phoneSerivce/data/getDepartmentData', {params})
    },
    //坐席管控-坐席考勤
    seatControlList(params) {
        return axios.get('/seat/exam/stats/search', {params})
    },
    //坐席管控-会话数据
    sessionStatsList(params) {
        return axios.get('/session/stats/search', {params})
    },
    //坐席管控-质检统计
    qcStatsList(params) {
        return axios.get('/qc/stats/search', {params})
    },
    //工单分类统计/图标
    orderTypeChartJson(params) {
        return axios.get('/hfw/count/type/list', {params})
    },
    
    //工单分类查询/下拉框  
    orderTypeSelectJson(params) {
        return axios.get('/config/system/listJson', {params})
    },
    //工单工作分析
    orderAccList(params) {
        return axios.get('/hfw/count/acc/list', {params})
    },
    //工单工作分析-明细
    orderDetailList(params) {
        return axios.get('/hfw/count/acc/detail', {params})
    },
    //技能组列表
    sessionServiceGroups(params) {
        return axios.get('/staff/hfwStaffSkillGroups/listJson', {params})
    },
}