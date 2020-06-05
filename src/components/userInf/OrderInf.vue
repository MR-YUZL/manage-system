<template>
    <div class="user_data">
        <div class="header">
            <span class="workOrderIcon">工单信息</span>
            <span class="save" @click="createdWorkOrderModal">新增工单</span>
        </div>
        <div class="content row_1" v-bind:class="{ expansion : active }">
            <a-icon :type="active ? 'up' : 'down'" class="icon" @click="showFn" v-if="userInfList && userInfList.length" />
            <div class="content_item"  >
              <a-row type="flex" justify="space-between" align="bottom" >
                <a-col :span="20" v-for="(item,index) in userInfList" :key="index" class="item" @click="viewDetails(item)">
                  <div class="list">
                    <div class="item_left"><router-link to="/" >{{item.title}}</router-link></div>
                    <div class="item_right item_1" v-if="item.status == 0">未受理</div>
                    <div class="item_right item_1" v-if="item.status == 1">受理中</div>
                    <div class="item_right item_2" v-else-if="item.status == 2">已完结</div>
                  </div>
                </a-col>
                </a-row>  
            </div>
        </div>
          <Modal :currentModal="createdWorkOrder" @toggleModal="createdToggleModal" v-if="createdWorkOrder.visible">
            <div slot='content'>
              <BaseForm 
                 ref="baseForm"
                :formObject="formObjectCreated"
                @toggleModal="createdToggleModal"
                @formSubmit="formSubmitWorkOrder"
              ></BaseForm>
          </div>
        </Modal>
    </div>
</template>
<script>
import Modal from './../Modal/index'
import BaseForm from '../BaseForm/index'
export default {
  props:{
    guestId:{  // 访客id
      type:String,
      default:''
    }
  },
    components:{
      Modal,
      BaseForm
    },
    data(){
      return{
        active:false,
        createdWorkOrder:{
          visible:false,
          title:'新增工单'
        },
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
            // {
            //   type: "select",
            //   label: "关联客户",
            //   placeholder: "请选择",
            //   ruleName: "customerId",
            //   options: [],
            //   rules: [{
            //     required: true,
            //     message: "请选择",
            //     trigger: "change"
            //   }
            //   ]
            // },
          ]        
        },
        userInfList:[],
        formFields:[],
        customerId:'',
        customFieldsDefault:{}//自定义字段默认值
      }
    },
    created(){
      this.getWorkOrderList()
      this.getFormFields()
    },
    methods:{
      showFn(){
        this.active = !this.active
      },
      viewDetails(item){
        console.log(item,'viewDetails(item)')
      },
      // 获取工单信息
      getWorkOrderList(){
        this.Request.get('/hfw/workbench/getWorkFlowInfo?guestId='+this.guestId).then(res => {
          this.userInfList = res.data.list
          console.log('工单信息' , res.data.list)
        })
      },
      createdWorkOrderModal(){
        this.createdWorkOrder.visible = true
        // this.getRelatedCustomerList()
        // this.$refs.createdModal
        // this.formObjectCreated.defaultValues = {}
        this.getClassification()
        this.getSkillGroup()
        this.getStaffListAll()
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
      // 创建工单
      createdToggleModal(){
         console.log(this.$refs.baseForm)
         this.createdWorkOrder.visible = false
         this.formObjectCreated.defaultValues = this.customFieldsDefault
          // this.$refs.baseForm.resetForm()
      },
      formSubmitWorkOrder(data){
        let {typeId,...others} = data
        let params = {
          ...others,
          userType:1,
          customerId:this.guestId
        }
        if(typeId&&typeId.length>0){
          params.typeId = typeId[typeId.length-1]
        }
        console.log('创建工单参数',params)
        this.Request.post('/workflow/saveWorkflow',params).then(res=>{
          console.log('工单创建成功',res)
           this.createdWorkOrder.visible = false
          //  this.$refs.baseForm.resetForm()
           this.getWorkOrderList()
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
      // 获取工单的自定义字段
      getFormFields(){
        let obj = {
          '1':'input',
          '2':'radio',
          '3':'checkbox',
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
          let formFieldsDefault = {};
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
          this.customFieldsDefault = formFieldsDefault
          this.$set(this.formObjectCreated,'modelList',[...this.formObjectCreated.modelList,...formFieldsObj])

          this.$forceUpdate()
          console.log('新的字段表==============================',this.formObjectCreated)
        })
      }
    }
}
</script>
<style lang="less" scoped>
    .user_data{
        padding:20px;
        .header{
            display: flex;
            justify-content: space-between;
            .save{
                color:#3E7BF8;
                cursor: pointer;
            }
            .workOrderIcon{
              padding-left:26px;
              background:url('../../assets/imgs/text-icon3.png') left center no-repeat
            }
        }
        .row_1{
            position: relative;
            overflow: hidden;
        }
        .expansion{
           height: 40px;;
        }
        .content{
            .icon{
                position: absolute;
                right: 0;
                top: 18px;
            }
            .content_item{
                width: 93%;
                padding-top: 5px; 
                .item{
                
                    .list{
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        width: 100%;
                        
                        .item_left{
                            min-width: 0px;
                            overflow: hidden;
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #6D97F9;
                        }
                        .item_right{
                            padding:0 5px;
                            -ms-flex-negative: 0;
                            flex-shrink: 0;
                            text-align: right;
                            border: 1px solid #D3D3D3;
                            
                        }
                        .item_1{
                            color: #F8A28B;
                        }
                        .item_2{
                            color: #8BD6B8;
                        }
                    }
                display: flex; 
                padding-top: 12px; 
                
                
                }
            }
            
        }
    }
</style>