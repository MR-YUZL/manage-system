const basic = {
    state : {
        status:1, //电话工作台tabs状态
        callStatus:{},//通话状态
        outCallTask:{},//选中的外呼任务信息
        outCallStatus:true,//选中的外呼任务状态
        classificationId:'',//知识库分类id
    },
    mutations : {
        getStatus(state,status){
            state.status = status
        },
        getCallStatus(state,callStatus){
            state.callStatus = callStatus

        },
        getOutCallTask(state,outCallTask){
            state.outCallTask = outCallTask

        },
        getOutCallStatus(state,outCallStatus){
            state.outCallStatus = outCallStatus
        },
        getClassificationId(state,classificationId){
            state.classificationId = classificationId
        }
    },
    action : {

    }
}
export default basic