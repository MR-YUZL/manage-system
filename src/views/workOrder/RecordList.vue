<template>
  <div class="">
    <a-tabs :animated="false">
      <a-tab-pane key="1" tab="工单日志">
        <ul class="recordList scroll" >
          <li v-for="(item,index) in workOrderList" :key="index">
            <h5>{{item.inputAcc}}</h5>
            <p>{{item.inputTime}}<span>{{changeType(item.type)}}</span></p>
            <div>{{item.content}}</div>
          </li>
        </ul>
      </a-tab-pane>
      <a-tab-pane key="2" tab="操作记录">
        <ul class="recordList scroll">
          <li v-for="(item,index) in handleList" :key="index">
            <h5>{{item.inputAcc}}</h5>
            <p>{{item.inputTime}}<span>{{item.content}}</span></p>
            <div>{{item.followContent}}</div>
          </li>
        </ul>
      </a-tab-pane>
  </a-tabs>
  </div>
</template>
<script>
export default {
    name: "",
    components: {},
    props:{
       workOrderId:{
        type:String,
        default:function(){
          return ''
        }
      }
    },
    data() {
        return {
          workOrderList:[],
          handleList:[]
        }
    },
    watch:{
      workOrderId(value){
        if(value){
          this.getList()
          this.getHandleList()
        }
      }
    },
    created(){
      this.getList()
      this.getHandleList()
    },
    mounted(){},
    methods: {
      getList(){
        let params = {
          workflowId:this.workOrderId
        }
        this.Request.get('/workflow/follow/listJson',params).then(res=>{
          console.log('工单记录',res.data)
          this.workOrderList = res.data.list
        })
      },
      changeType(type){  //操作类型,0-创建，1-跟进，2-转交，3-完结，4-重启
        let obj = {
                '0':'创建',
                '1':'跟进',
                '2':'转交',
                '3':'完结',
                '4':'重启'
              }

        return obj[type]+'了工单'     
      },
      getHandleList(){
        let params = {
          workflowId:this.workOrderId
        }
        this.Request.get('/workflow/log/listJson',params).then(res=>{
          console.log('操作记录',res.data)
          this.handleList = res.data.list
        })
      },
    }
}
</script>
<style lang="less" scoped>
.recordList{
  height:550px;
  overflow-y:scroll;
  p{
    color:#bbb;
    margin-bottom:10px;
    span{
      padding-left:15px;
      color:red
    }
  }
  li{
    margin-bottom:20px;
  }
}


</style>
