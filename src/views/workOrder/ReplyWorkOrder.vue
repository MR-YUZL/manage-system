<template>
  <div class="ReplayWorkOrder">
    <div class="funBtn" v-if="info.status == 1">
      <a-button type="primary" @click="handleWorkOrder(2)">接单</a-button>
      <a-button type="primary" @click="handleWorkOrder(2)">转接</a-button>
      <a-button type="primary" @click="handleWorkOrder(3)">完结</a-button>
    </div>
    <div class="funBtn" v-else>
      <a-button type="primary" @click="handleWorkOrder(4)">重启</a-button>
    </div>
    <p class="text">{{info.content}}</p>
    <div v-if="info.status!=2">
    <BaseForm ref="replayForm" :formObject="replayFormObject"   @formSubmit="replyWorkOrder"></BaseForm>
    </div>
  </div>
</template>

<script>
import BaseForm from "@/components/BaseForm/index";
export default {
    name: "replayWorkOrder",
    components: {
      BaseForm
    },
    props:{
      workOrderId:{
        type:String,
        default:function(){
          return ''
        }
      },
      orderInfo:{
        type:Object,
        defautl:{}
      }
    },
    data() {
        return {
          info:{},
          replayCon:'',
          replayFormObject:{
            ref: "replayWorkOrderModal",
            sureBtn:'回复',
            modelList:[
               {
                type: "textarea",
                label: "跟进结果",
                placeholder: "请输入你的跟进结果",
                ruleName: "content",
                rules: [{
                  required: true,
                  message: "请输入你的跟进结果",
                  trigger: "blur"
                }]
              },
              {
                type: "upload",
                label: "上传附件",
                placeholder: "请选择",
                ruleName: "fileList ",
              },
            ],
            defaultValues:{
              content:'',
              fileList:[]
            }
          }
        }
    },
     watch:{
      workOrderId(value){
        if(value){
          // this.getWorkOrderDetails()
          this.$refs.replayForm.$refs.replayWorkOrderModal.resetFields();
        }
      },
      orderInfo(){
        this.info  = this.orderInfo
      }
    },
    created(){
      // this.getWorkOrderDetails()
      this.info  = this.orderInfo
    },
    mounted(){ 
    },
    methods: {
      // getWorkOrderDetails(){
      //   let params = {
      //     id:this.workOrderId
      //   }
      //   this.Request.get('/workflow/infoJson',params).then(res=>{
      //     console.log('工单信息',res.data,'=====================')
      //     this.info = res.data.data
      //   })
      // },
      handleWorkOrder(type){  // 这里的参数需要再看下
        let params = {
          workflowId:this.workOrderId,
          type,
          remark:''
        }
        this.Request.post('/workflow/follow/saveWorkflowFollow',params).then(res=>{
           this.$message.success('操作成功')
           this.getWorkOrderDetails()
        })
      },
      // 回复
      replyWorkOrder(data){
        console.log(data,'====')
        let params = {
          workflowId:this.workOrderId,
          type:1,
          ...data,
        }
        this.Request.post('/workflow/follow/saveWorkflowFollow',params).then(()=>{
           this.$message.success('操作成功')
           this.replayFormObject.defaultValues.content  = ''
           this.replayFormObject.defaultValues.fileList = []
           this.$emit('updataOrderRecord')
        })
      }
    }
}
</script>

<style lang="less" scoped>
.ReplayWorkOrder{
  margin-bottom:50px;
  .funBtn{
    display:flex;
    flex-direction: row-reverse;
    button{
      margin-left:10px;
    }
  }
  .text{
    margin-top:10px;
    
  }
}

</style>
<style lang="less">
.ReplayWorkOrder .ant-form-item-label{
  display:none
}
.ReplayWorkOrder .ant-form-item{
  text-align:left!important;
  margin-bottom:5px;
  button{
    margin-left:0!important;
  }
}
</style>
