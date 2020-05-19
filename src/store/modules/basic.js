const basic = {
    state : {
        status:1, //电话工作台tabs状态
        callStatus:{},//通话状态
        outCallTask:{}
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

        }
    },
    action : {

    }
}
export default basic