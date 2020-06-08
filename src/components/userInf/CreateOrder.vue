<template>
  <div class="">
    <Modal :currentModal="createdWorkOrder" v-if="createdWorkOrder.visible"  @toggleModal="createdToggleModal">
      <div slot='content'>
        <BaseForm 
          ref="formObjectCreated"
          :formObject="formObjectCreated"
          @toggleModal="createdToggleModal"
          @formSubmit="formSubmitWorkOrder"
        ></BaseForm>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal/index";
import BaseForm from "@/components/BaseForm/index";

export default {
    name: "worlOrder",
    components: {
    
      Modal,
      BaseForm
    },
    props:['createdWorkOrderVisible','relevObj'],
    data() {
      return {
      
        closeWorkOrderShow:false,
        batchRestartShow:false,
        batchRestartValue:'',
        batchTransmit:{
          visible:false,
          title:'批量转交'
        },
        createdWorkOrder:{
          visible:false,
          title:'创建工单'
        },
     
        exportDataShow:false,
      
        formObjectCreated:{
          type:'modalForm',
          ref: "createdModal",
          sureBtn:'确定',
          defaultValues:{},
          modelList: [
              {
                type: "input",
                label: "工单标题",
                placeholder: "请选择",
                ruleName: "title",
                rules: [{
                  required: true,
                  message: "请输入工单标题",
                  trigger: "blur"
                }]
              },
              {
                type: "textarea",
                label: "工单内容",
                placeholder: "请选择",
                ruleName: "content",
                rules: [{
                  required: true,
                  message: "请输入工单内容",
                  trigger: "blur"
                }]
              },
              {
                type: "upload",
                label: "上传附件",
                placeholder: "请选择",
                ruleName: "fileList",
              },
                {
                type: "radio",
                label: "工单优先级",
                placeholder: "请选择",
                ruleName: "level",
                options:[
                  {
                    key:'0',
                    value:'低'
                  },
                  {
                    key:'1',
                    value:'中'
                  },
                  {
                    key:'2',
                    value:'高'
                  }
                ],
                 rules: [{
                  required: true,
                  message: "请选择",
                  trigger: "blur"
                }]
              },
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
                options: []
              },
              {
                type: "cascader",
                label: "工单分类",
                placeholder: "请选择",
                ruleName: "typeId",
                options: []
              },
              {
                type: "select",
                label: "关联客户",
                placeholder: "请选择",
                ruleName: "customerId",
                options: [],
                rules: [{
                  required: true,
                  message: "请选择",
                  trigger: "change"
                }]
              },
            ]        
       },
     
       
       
        searchField:{},
        pager:{},
        selectedRowKeys: [],
        batchTaransParams:{},
        workOrderId:'',
        classifyList:[], //分类列表
        info:{},
        // formFieldsDefaultCum:{}  // 自定义字段默认值
      }
    },
    computed:{
        
    },

    created(){
     
      this.getSkillGroup()
      this.getStaffListAll()
      this.getClassification()
      this.getRelatedCustomerList()
     
    },
    mounted(){
        this.createdWorkOrder.visible  = this.createdWorkOrderVisible
        if(this.relevObj&&this.relevObj.detailId){
          let replaceArr = {
            type: "defaultText",
            label: "关联客户",
            value:this.relevObj.custManager,
            options: [],
          }
          this.formObjectCreated.modelList.splice(7,1,replaceArr)
        }
    },
    methods: {
    
      // search数据
      getSkillGroup(){  // 获取受理组
        this.Request.get('/staff/hfwStaffSkillGroups/listJson').then(res => {
          console.log('受理组',res.data.list)
          let list = res.data.list
          list.map(item=>{
            this.formObjectCreated.modelList[4].options.push({
              key:item.groupId,
              value:item.groupName
            })
          })
          this.$forceUpdate()
         
        })
      },
      getStaffListAll(){ // 受理人，发起人
        this.Request.get('/staff/hfwStaffSkillGroupsMember/staffList',{}).then(res=>{
          let list = res.data.list
          list.map(item=>{
        
          
             this.formObjectCreated.modelList[5].options.push({
              key:item.userAccount,
              value:item.userName
            })
          })
        })
      },
      // 查询分类
      getClassification(){
        this.Request.get('/config/system/findTypeListJson',{}).then(res=>{
          console.log('分类列表',res.data)
          let list = res.data.list
          this.classifyList  = this.treeChangeData(list)
          this.formObjectCreated.modelList[6].options = this.classifyList
        })
      },
      async getRelatedCustomerList(){
        let params = {
          matchKey:''
        }
        let res = await this.Request.get('/hfw/workbench/blurMatchCustName',params)
        if(res){
          let list = res.data.list
          let options = this.formObjectCreated.modelList
          console.log( options[options.length-1])
          list.map(item=>{
            options[options.length-1].options.push({
              key:item.custId,
              value:item.custName
            })
          })
          this.getFormFields()
        }
      },
      // 获取工单信息
      getWorkOrderDetails(){
        let params = {
          id:this.workOrderId
        }
        this.Request.get('/workflow/infoJson',params).then(res=>{
          console.log('工单信息',res.data,'=====================')
          this.info = res.data.data
        })
        this.$forceUpdate()
      },
      
     
     
      handleCancelBatchRestart(){
        this.batchRestartShow = false
      },
     
 
     
     
    
      
      createdToggleModal(){
        this.$emit('newOrder',false)
        this.createdWorkOrder.visible = false
        this.$refs.formObjectCreated.resetForm()
      },
      formSubmitWorkOrder(data){
        console.log('创建工单参数',data)
        let {typeId,customerId,...others} = data
        let custId = customerId?customerId:this.relevObj.detailId;
        let params = {
          ...others,
          customerId:custId
        }
        if(typeId&&typeId.length>0){
            params.typeId = typeId[typeId.length-1]
        }
        this.Request.post('/workflow/saveWorkflow',params).then(res=>{
          console.log('工单创建成功',res)
          this.createdWorkOrder.visible = false
          this.$emit('newOrder',false)
         
        })
      },
    
     
    
      treeChangeData(array){
        array.map((item) => {
          item['value'] = item.id;
          item['label'] = item.name; 
          item['children'] = item.childList;
          if(item.childList.length>0){
            this.treeChangeData(item.childList);
          }
        })
        return array;
      },
      // 更新工单记录
     
      // 获取工单的自定义字段
      getFormFields(){
        let obj = {
          '1':'input',
          '2':'radio',
          '3':'selectmultiple',
          '4':'date',
          '5':'input'
        }
        let objStatus = {
          '1':'blur',
          '2':'blur',
          '3':'change',
          '4':'change',
          '5':'blur'
        }
        this.Request.get('/config/hfwConfigFields/formFieldsJson',{state:2}).then(res=>{
          console.log('自定义字段列表',res.data)
          this.formFields = res.data.list
          let formFieldsDefault = {}
          let formFieldsObj = []
          this.formFields.map(item=>{
            if(item.isDefined == 1){
              formFieldsObj.push({
                type: obj[item.dataType],
                label: item.fieldName,
                placeholder: "请选择",
                ruleName: item.fieldCode,
                options: item.options,
                rules: [{
                  required: item.isRequired==1?true:false,
                  message: "请输入",
                  trigger: objStatus[item.dataType]
                }]
              })
              if(item.dataType == 3){
                formFieldsDefault[item.fieldCode] = []
              }
              if(item.dataType == 2&&item.options.length>0){
                item.options.map(it=>{
                  if(it.isDefault==1){
                    formFieldsDefault[item.fieldCode] = it.optionId
                  }
                })
              }
              if(item.dataType == 3&&item.options.length>0){
                item.options.map(it=>{
                  if(it.isDefault==1){
                    formFieldsDefault[item.fieldCode].push(it.optionId)
                  }
                })
              }
            }
          })
          formFieldsObj.map(item=>{
            if(item.options.length>0){
              item.options.map(it=>{
                it.key = it.optionId
                it.value = it.optionName
              })
            }
          })
          this.formObjectCreated.defaultValues = formFieldsDefault
          this.$set(this.formObjectCreated,'modelList',[...this.formObjectCreated.modelList,...formFieldsObj])
          this.$forceUpdate()
        })
      }
  },
         
}
</script>

<style lang="less" scoped>
  .workOrder{
    padding:10px;
    .flex-between{
      margin:30px 0 10px;
      button{
        margin-right:10px;
      }
    }
  }
  .workOrderDetail{
    display: flex;
    .left{
      width:50%;
      box-sizing:border-box;
      border-right:1px solid #ddd;
      padding-right:10px;
    }
    .right{
      width:50%;
    }
  }
</style>
