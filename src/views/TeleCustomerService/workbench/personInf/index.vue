<template>
  <div class="sessionCenter">
    <div class="operation" v-if="status == '2' && outCallTask && outCallTask.taskStatus=='0'">
         <a-popconfirm
            title="你确定要取消预约吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm"
          
        >
            <a-button type="primary" ghost>
            取消预约
            </a-button>
        </a-popconfirm>
        
        <a-button type="primary" ghost @click="callBack">
        呼叫
        </a-button>
    </div>
    <div class="operation" v-else-if="status == '2' && outCallTask && outCallTask.taskStatus=='2'">
        <a-button type="primary" ghost @click="addServer">
        填写服务小结
        </a-button>
    </div>
    <div class="operation" v-else-if="status == '1'&& callStatus.status == 2">
        <a-button type="primary" ghost @click="callBack">
         回拨
        </a-button>
        <a-button type="primary" ghost @click="addCallTask">
        添加外呼任务
        </a-button>
    </div>
    <div class="operation" v-else-if="status == '1' && callStatus.status == 1">
         <a-button type="primary" ghost  @click="addCallTask">
         添加外呼任务
        </a-button>
        <a-button type="primary" ghost>
        创建工单
        </a-button>
         <a-button type="primary" ghost @click="addServer">
        添加本次服务小结
        </a-button>
    </div>
    <div class="operation_null" v-else>
       
    </div>
    <Modal  :currentModal="transferObj" @toggleModal="toggleModal" v-if="transferObj.visible">
        <template slot="content">
            <base-form :formObject="transferObj" @toggleModal="toggleModal" @formSubmit="formSubmit" v-if="transferObj.visible" />
            <!-- <FormModelSearchForm :defaultFormValues="defaultSearchFormValues" :formList="transferObj.modelList" /> -->
        </template>
        
    </Modal>
  
    <user-inf />
  </div>
</template>

<script>

import userInf from './../../../../components/userInf/index'
import BaseForm from './../../../../components/BaseForm/BaseFrom'
import Modal from './../../../../components/Modal'
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  data: () => ({
    transferObj:{},
    callTaskObj:{
      title:'添加至外呼任务',
      visible:false,
      ref:'callTask',
      type :'modalForm',
      modelList:[
        {
          type:'date',
          label:'预约时间：',
          placeholder:'请选择',
          model:undefined,
          ruleName:'appointmentsTime', //receiverGroupId 工单受理组id
          options:[],
          rules:{
            required: true,
            message: '请指定客服人员',
            trigger: 'change',
          }
        },
        {
          type:'textarea',
          label:'备注',
          placeholder:'',
          model:undefined,
          ruleName:'remark', //receiverGroupId 工单受理组id
        }
      ],
    },
    addServerObj:{
      title:'添加服务小结',
      visible:false,
      ref:'addServer',
      type :'modalForm',
      modelList:[
        {
          type:'cascader',
          label:'咨询分类',
          placeholder:'请选择',
          model:undefined,
          ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          options:[],
          rules:{
            required: true,
            message: '请选择咨询分类',
            trigger: 'change',
          }
        },
        {
          type:'select',
          label:'解决问题',
          placeholder:'请选择',
          model:undefined,
          ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          options:[{key:'1',value:'已解决'},{key:'2',value:'未解决'}],
          rules:{
            required: true,
            message: '请选择咨询分类',
            trigger: 'change',
          }
        },
        {
          type:'textarea',
          label:'咨询备注',
          placeholder:'请选择',
          model:undefined,
          ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
        }
      ],
    },
    callTaskObj1:{
      title:'添加至外呼任务',
      visible:false,
      ref:'transfer',
      type :'modalForm',
      modelList:[
        {
          type:'cascader',
          label:'指定客服人员',
          placeholder:'请选择',
          model:undefined,
          ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          options:[],
          rules:{
            required: true,
            message: '请指定客服人员',
            trigger: 'change',
          }
        }
      ],
    },
     formObject: {
        type: "modalForm",
        ref: "testModal",
        modelList: [{
          type: "input",
          label: "test1",
          ruleName: "test2",
          model: "sss",
          rules: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
        }],
      },
 
  }),
  components: {
    userInf,
    BaseForm,
    Modal,
    FormModelSearchForm
   
  },
  mounted() {
    
  },
  methods: {
    moment,
   addCallTask(){
       console.log(this.callTaskObj)
       console.log(this.transferObj)
       this["callTaskObj"]["visible"] = true;
       this.transferObj = this.callTaskObj

   },
  
    confirm() {
       this.Request.get('/hfw/workbench/deleteTask',{id:this.outCallTask.id}).then(res => {
            console.log(res.data)
              if(res.data.status){
                this.$store.commit('getOutCallStatus')
                this.$message.success('操作成功！');
              }
        }) 
      
    },
    //添加服务小结
    addServer(){
        this["addServerObj"]["visible"] = true;
       this.transferObj = this.addServerObj
    },
    //呼叫，回拨
    callBack(){
       console.log('呼叫，回拨') 
    },
   toggleModal(data){
       console.log(data)
       this.transferObj = {}
       switch(data.ref){
          case 'callTask':
            this['addServerObj']['visible'] = data.visible
            break;
          case 'addServer':
             this['addServerObj']['visible'] = data.visible
             break;
        }
   },
   formSubmit(data){
       console.log(data)
       this.transferObj = {}
       let url = ''
       let obj = data.obj
       switch(data.ref){
          case 'callTask':
            this['addServerObj']['visible'] = data.visible
            url = '/hfw/workbench/saveTask'
            obj.appointmentsTime = moment(obj.appointmentsTime).format("YYYY-MM-DD HH:SS:MM")
            obj.guestId = '7ca88132f26949b6bbc82f3b5a339735'
            break;
          case 'addServer':
             this['addServerObj']['visible'] = data.visible
             break;
        }
        console.log(obj)
        this.Request.post(url,obj).then(res => {
            if(res.data.status){
                 this.$message.success('操作成功！');
            }
        })
   },
    
  },
  watch: {},
  computed: {
    ...mapState({
        status:state=>state.basic.status,
        callStatus:state=> state.basic.callStatus,
        outCallTask:state=> state.basic.outCallTask
    })
  }
};
</script>
<style lang="less" scoped>
  .sessionCenter{
      background: #f5f5f5;
      .operation{
          border-top: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          background: #FFFFFF;
          line-height: 43px;
          text-align: right;
          padding: 0 15px;
          .ant-btn{
              min-width: 85px;
              margin: 0 10px;
          }
      }
      .operation_null{
          height: 43px;
           border-top: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          background: #FFFFFF;
      }
  }
</style>
