<template>
  <div class="ReplayWorkOrder">
    <div class="funBtn">
      <div class="funBtn" v-if="info.status == 0">
        <a-button type="primary" @click="handleWorkOrder(2)">接单</a-button> 
      </div>
      <div class="funBtn" v-if="info.status == 1">
        <!-- 转交可以转交多次 -->
        <a-button type="primary" @click="batchTransmitModal()">转交</a-button>  
        <a-button type="primary" @click="endWorkOrderModal()">完结</a-button>
      </div>
      <div class="funBtn" v-if="info.status == 2">
        <a-button type="primary" @click="reopenWorkOrderModal()">重启</a-button>
      </div>
    </div>
    <p class="text">{{info.content}}</p>
    <div v-if="info.fileList&&info.fileList.length>0" class="fileListStyle">
       <span v-for="(item,index) in info.fileList" :key="index">
         <a-icon type="file"/>
         {{item.fileName}}
         <a :href="item.fileUrl">下载</a>
       </span>
    </div>
    <div v-if="info.status!=2">
      <BaseForm ref="replayForm" :formObject="replayFormObject"   @formSubmit="replyWorkOrder"></BaseForm>
    </div>
    <Modal :currentModal="batchTransmit"  @toggleModal="toggleModal" v-if="batchTransmit.visible">
      <div slot='content'>
        <BaseForm 
          ref="batchTransmitRef"
          :formObject="formObject"
          @toggleModal="toggleModal"
          @formSubmit="formSubmit"
        ></BaseForm>
      </div>
    </Modal>
    <a-modal title="完结工单" :visible="closeWorkOrderShow" v-if="closeWorkOrderShow" @cancel="handleCancelCloseOrder" @ok="handleWorkOrder(3)">
      <div class="creatOrder_text">确认完结工单嘛？完结后，可重新开启工单</div>
       <a-textarea
        v-model="closeOrderRemark"
        placeholder="若有备注请填写，若无请直接完结"
        :auto-size="{ minRows: 5, maxRows: 5 }"
        :maxLength="200"
        />
    </a-modal>
    <a-modal title="重新开启" :visible="reopenWorkOrderShow" v-if="reopenWorkOrderShow" @cancel="handleReopenOrder" @ok="handleWorkOrder(4)">
       <a-textarea
        v-model="reopenWorkOrderRemark"
        placeholder="请输入备注"
        :auto-size="{ minRows: 3, maxRows: 5 }"
        :maxLength="200"
        />
    </a-modal>
  </div>
</template>

<script>
import BaseForm from "@/components/BaseForm/index";
import Modal from "@/components/Modal/index";
export default {
    name: "replayWorkOrder",
    components: {
      BaseForm,
      Modal
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
        default:function(){
          return {}
        }
      },
      receiverAcc:{
        type:Array,
         default:function(){
          return []
        }
      },
      receiverGroupId:{
        type:Array,
         default:function(){
          return []
        }
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
                ruleName: "fileList",
              },
            ],
            defaultValues:{
              content:'',
              fileList:[]
            }
          },
          batchTransmit:{
            visible:false,
            title:'转交工单'
          },
          formObject:{
            type:'modalForm',
            ref: "testModal",
            sureBtn:'确定',
            defaultValues:{},
            modelList: [
              {
                type: "select",
                label: "工单受理组",
                placeholder: "请选择",
                ruleName: "receiverGroupId",
                options: [],
                rules: [{
                  required: true,
                  message: "请选择",
                  trigger: "change"
                }]
              },
              {
                type: "select",
                label: "工单受理人",
                placeholder: "请选择",
                ruleName: "receiverAcc",
                options: [],
                rules: {
                  required: true,
                  message: "请选择",
                  trigger: "change"
                }
              },
              {
                type: "textarea",
                label: "备注",
                placeholder: "请输入备注内容",
                ruleName: "remark",
                maxLength:200
              }
            ]
          },
          batchTaransParams:{},
          closeWorkOrderShow:false,
          closeOrderRemark:'',
          reopenWorkOrderShow:false,
          reopenWorkOrderRemark:''
        }
    },
     watch:{
      workOrderId(value){
        if(value){
          this.$refs.replayForm.resetForm()
        }
      },
      orderInfo(){
        this.info  = this.orderInfo
      }
    },
    created(){
      this.info  = this.orderInfo
      this.formObject.modelList[0].options = this.receiverAcc
      this.formObject.modelList[1].options = this.receiverGroupId
    },
    mounted(){ 
    },
    methods: {
      batchTransmitModal(){
        this.batchTransmit.visible = true
      },
      endWorkOrderModal(){
       this.closeWorkOrderShow = true
       this.closeOrderRemark = ''
      },
      reopenWorkOrderModal(){
        this.reopenWorkOrderShow = true
        this.reopenWorkOrderRemark = ''
      },
      toggleModal(){
        this.$refs.batchTransmitRef.resetForm()
        this.batchTransmit.visible = false
      },
      formSubmit(data){
        // console.log(this.batchTaransParams,'批量转接')
        this.batchTaransParams = {...data}
        this.handleWorkOrder(2)
      },
      handleWorkOrder(type){  // 这里的参数需要再看下
        let params = {
          workflowId:this.workOrderId,
          type,
        }
        if(type==2&&this.info.status==1){  // 完结 弹窗
          params = {...params,...this.batchTaransParams}
        }
        if(type == 3){
          params.remark = this.closeOrderRemark
        }
        if(type == 4){
          
          params.remark = this.reopenWorkOrderRemark
        }
        console.log('工单跟进参数',params)
        this.Request.post('/workflow/follow/saveWorkflowFollow',params).then(()=>{
          this.$message.success('操作成功')
          this.batchTransmit.visible = false
          this.reopenWorkOrderShow = false
          this.closeWorkOrderShow = false
          this.$emit('updataWorkOrderDetails')
        })
      },
      handleCancelCloseOrder(){
        this.closeWorkOrderShow = false
      },
      handleReopenOrder(){
        this.reopenWorkOrderShow = false
      },
      // 回复
      replyWorkOrder(data){
        console.log(data,'====')
        let {fileList , ...others} = data
        let params = {
          workflowId:this.workOrderId,
          type:1,
          ...others,
          fileList:[]
        }
        if(fileList&&fileList.length>0){
          fileList.map(item=>{
            params.fileList.push({
              fileUrl:item.url,
              fileName:item.fileName
            })
          })
        }
        this.$refs.replayForm.resetForm()
        console.log('回复的参数',params)
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
  .creatOrder_text{
    padding: 10px;
    text-align: center;
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
.fileListStyle{
  display:flex;
  flex-wrap:wrap;
  span{
    margin-bottom:10px;  
    margin-right:10px;
    display:block;
    padding:10px;
    border:thin solid #ddd;
  }
}
</style>
