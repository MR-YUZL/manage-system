<template>
  <div class="">
    <a-page-header title="工单管理" />
    <div class="workOrder">
      <FormModelSearchForm :formList="searchFormList"  @prevHandleSubmit="prevHandleSubmit"></FormModelSearchForm>
      <div class="flex-between">
        <div>
          <a-button @click="closeWorkOrderModal">批量完结</a-button><a-button @click="batchRestartModal">批量重启</a-button><a-button @click="batchTransmitModal">批量转交</a-button>
        </div>
        <div>
          <a-button @click="exportDataModal" v-if="this.$store.state.basic.btnRealms.indexOf('work_order_manager_export')>-1">当前数据导出</a-button><a-button type="primary" @click="createdWorkOrderModal">新建工单</a-button>
        </div>
      </div>
      <div>
        <a-table 
        :columns="columns"  
        :data-source="dataSource"  
        :pagination="false" 
        :row-selection="rowSelection"  
        :rowKey="record => record.id">
          <div slot="action" slot-scope="record,row">
            <span class="blue" @click="workOrderDetailModal(record.id)">{{record.code}}</span>
          </div>
        </a-table>
      </div>
    </div>
    <div style="padding:10px 0 20px 0;"><TablePagination :parentPager="pager" @paginationChange="paginationChange" /></div>
    <a-modal title="完结工单" :visible="closeWorkOrderShow" v-if="closeWorkOrderShow" @cancel="handleCancelCloseOrder" @ok="handleBatch(3)">
      <p>确认完结工单嘛？完结后，可重新开启工单</p>
       <a-textarea
        v-model="closeOrderRemark"
        placeholder="若有备注请填写，若无请直接完结"
        :auto-size="{ minRows: 3, maxRows: 5 }"
        :maxLength="200"
        />
    </a-modal>
    <a-modal title="批量重启" :visible="batchRestartShow" v-if="batchRestartShow" @cancel="handleCancelBatchRestart" @ok="handleBatch(4)">
      <a-textarea
        v-model="batchRestartValue"
        placeholder="请输入备注"
        :auto-size="{ minRows: 3, maxRows: 5 }"
        :maxLength="200"
        />
    </a-modal>
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
    <a-modal title="导出" :visible="exportDataShow" v-if="exportDataShow" @cancel="handleCancelExport" @ok="handleOkExport">
         是否确认导出当前条件下的工单数据？
         <br />
         本次导出工{{pager.totalRecord}}条数据
    </a-modal>
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
    <Modal :currentModal="workOrderDetail">
      <div slot="content">
        <div class="workOrderDetail">
          <div class="left">
            <ReplyWorkOrder 
            :workOrderId="workOrderId" 
            :orderInfo="info" 
            @updataOrderRecord="updataOrderRecord"
             @updataWorkOrderDetails="getWorkOrderDetails"
             :receiverAcc="formObject.modelList[0].options"
             :receiverGroupId="formObject.modelList[1].options"
             ></ReplyWorkOrder>
            <RecordList ref="RecordList" :workOrderId="workOrderId"></RecordList>
          </div>
          <div class="right">
            <WorkOrderProper :workOrderId="workOrderId" :orderInfo="info"></WorkOrderProper>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import TablePagination from "@/components/Table/TablePagination";
import Modal from "@/components/Modal/index";
import BaseForm from "@/components/BaseForm/index";
import ReplyWorkOrder from "./ReplyWorkOrder"
import RecordList from "./RecordList"
import WorkOrderProper from "./WorkOrderProper"
import { mapState } from "vuex";
export default {
    name: "worlOrder",
    components: {
      FormModelSearchForm,
      TablePagination,
      Modal,
      BaseForm,
      ReplyWorkOrder,
      RecordList,
      WorkOrderProper
    },
    props:{},
    data() {
      return {
        closeOrderRemark:'',
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
        workOrderDetail:{
          width:'70%',
          visible:false,
          title:'工单详情'
        },
        exportDataShow:false,
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
                maxLength:40,
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
                maxLength:256,
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
        searchFormList: [
          {
            type:'select',
            label: "优先级",
            name: "level",
            placeholder: "请选择",
            options: [
              { value: "2",label:'高' },
              { value: "1", label:'中' },
              { value: "0", label:'低'}
            ],
          },
          {
            type: "input",
            label: "标题",
            placeholder: "请输入",
            name: "title"
          },
           {
            type: "input",
            label: "客户名称",
            placeholder: "请输入",
            name: "customerName"
          },
          {
            type:'select',
            label: "受理组",
            placeholder: "请选择",
            name: "receiverGroupId",
            options: [],
          },{
            type:'select',
            label: "受理人",
            placeholder: "请选择",
            name: "receiverAcc",
            options: [],
          },
          {
            type:'select',
            label: "发起人",
            placeholder: "请选择",
            name: "inputAcc",
            options: [],
          },
          {
            type:'cascader',
            label: "分类",
            placeholder: "请选择",
            name: "typeId",
            options: [
              { key: 2, id: "高" },
              { key: 1, id: "中" },
              { key: 0, id: "低" }
            ],
          },
            {
            type:'select',
            label: "工单状态",
            placeholder: "请选择",
            name: "status",
            options: [
              { value:0,label:'未受理'},
              { value:1,label:'受理中'},
              { value:2,label:'已完结'},
            ],
          },
          {
            type: "rangepicker",
            label: "创建时间",
            name: "sessionDate",
          },
            {
            type: "input",
            label: "工单编号",
            placeholder: "请输入",
            name: "code"
          },
        ],
        columns:[
          {
            title: '工单编号',
            // dataIndex: 'code',
            // key: 'code',
            scopedSlots: { customRender: 'action' },
          },
          {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
          },
          {
            title: '优先级',
            dataIndex: 'level',
            key: 'level',
            customRender:(values)=>{
              let obj = {
                '0':'低',
                '1':'中',
                '2':'高'
              }
              return obj[values]
            }
          },
          {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
             customRender:(values)=>{
              let obj = {
                '0':'未受理',
                '1':'受理中',
                '2':'已完结'
              }
              return obj[values]
            }
          },
          {
            title: '发起人',
            dataIndex: 'inputAccName',
            key: 'inputAccName',
          },
          {
            title: '受理组',
            dataIndex: 'receiverGroupName',
            key: 'receiverGroupName',
          },
          {
            title: '受理人',
            dataIndex: 'receiverAccName',
            key: 'receiverAccName',
          },
        ],
        dataSource:[],
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
      // ...mapState({
      //   btnRealms: state => state.basic.btnRealms
      // }),
      rowSelection(){
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
            this.selectedRowKeys = selectedRows
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            this.selectedRowKeys = selectedRows
            console.log(selected, selectedRows, changeRows);
          },
        }
      },
    },
    created(){
      this.getList()
      this.getSkillGroup()
      this.getStaffListAll()
      this.getClassification()
      this.getRelatedCustomerList()

    },
    mounted(){},
    methods: {
      getList(){
        let params = {
          ...this.pager,
          ...this.searchField
        }
        this.Request.get('/workflow/listPageJson',params).then(res=>{
          console.log(res.data.list,'工单列表')
          let list = res.data.list
          this.dataSource = list
          this.pager = res.data.pager
        })
      },
      // search数据
      getSkillGroup(){  // 获取受理组
        this.Request.get('/staff/hfwStaffSkillGroups/listJson').then(res => {
          console.log('受理组',res.data.list)
          let list = res.data.list
          list.map(item=>{
            this.searchFormList[3].options.push({
              value:item.groupId,
              label:item.groupName
            })
            this.formObject.modelList[0].options.push({
              key:item.groupId,
              value:item.groupName
            })
            this.formObjectCreated.modelList[4].options.push({
              key:item.groupId,
              value:item.groupName
            })
          })
          this.$forceUpdate()
          console.log( this.searchFormList[3],'========')
        })
      },
      getStaffListAll(){ // 受理人，发起人
        this.Request.get('/staff/hfwStaffSkillGroupsMember/staffList',{}).then(res=>{
          let list = res.data.list
          list.map(item=>{
            this.searchFormList[4].options.push({
              value:item.userAccount,
              label:item.userName
            })
            this.searchFormList[5].options.push({
              value:item.userAccount,
              label:item.userName
            })
            this.formObject.modelList[1].options.push({
              key:item.userAccount,
              value:item.userName
            })
             this.formObjectCreated.modelList[5].options.push({
              key:item.userAccount,
              value:item.userName
            })
          })
        })
      },
      // 查询分类
      getClassification(){
        this.Request.get('/config/system/findTypeListJson',{type:1}).then(res=>{
          let list = res.data.list
          this.classifyList  = this.treeChangeData(list)
          this.searchFormList[6].options = this.classifyList
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
      // 完结工单
      closeWorkOrderModal(){
        if(this.selectedRowKeys.length==0){
          this.$message.warn('请先选择工单！')
          return false;
        }
        this.closeWorkOrderShow = true
      },
      handleCancelCloseOrder(){
        this.closeWorkOrderShow = false
      },
      handleBatch(type){
        console.log(this.batchTaransParams,'批量转接2')
        let params = {
          type, //0-创建，1-跟进，2-转交，3-完结,
          idList:[],
        }
        this.selectedRowKeys.map(item=>{
          params.idList.push(item.id)
        })
        if(type == 3){
          params.remark = this.closeOrderRemark
        }else if(type == 4){
          params.remark = this.batchRestartValue
        }else if(type == 2){
          params = {...params,...this.batchTaransParams}
        }
        this.Request.post('/workflow/follow/saveWorkflowBatchFollow',params).then(res=>{
          console.log(res,'批量成功')
          this.closeWorkOrderShow = false
          this.batchTransmit.visible = false
          this.batchRestartShow = false
          this.$message.success('操作成功')
        })
      },
      //批量重启
      batchRestartModal(){
        if(this.selectedRowKeys.length==0){
          this.$message.warn('请先选择工单！')
          return false;
        }
        this.batchRestartShow = true
      },
      handleCancelBatchRestart(){
        this.batchRestartShow = false
      },
      //批量转交
      batchTransmitModal(){ 
        if(this.selectedRowKeys.length==0){
          this.$message.warn('请先选择工单！')
          return false;
        }
        this.batchTransmit.visible = true
      },
      toggleModal(){
        this.$refs.batchTransmitRef.resetForm()
        this.batchTransmit.visible = false
      },
      formSubmit(data){
         console.log(this.batchTaransParams,'批量转接')
        this.batchTaransParams = {...data}
        this.handleBatch(2)
      },
      // 导出当前数据
      exportDataModal(){
        this.exportDataShow= true
      },
      handleCancelExport(){
        this.exportDataShow= false
      },
      handleOkExport(){
        let searchField = {...this.searchField}
        this.Request.post('/workflow/export/workflow',searchField).then(res=>{
          this.$message.success('导出成功')
        })
      },
      //创建工单
      createdWorkOrderModal(){
        this.createdWorkOrder.visible = true
        console.log('获取自定义工单')
      },
      createdToggleModal(){
        this.createdWorkOrder.visible = false
        this.$refs.formObjectCreated.resetForm()
      },
      formSubmitWorkOrder(data){
        let {fileList,typeId,...others} = data
        let params = {
          ...others,
          fileList:[]
        }
        if(typeId&&typeId.length>0){
            params.typeId = typeId[typeId.length-1]
        }
        if(fileList&&fileList.length>0){
          fileList.map(item=>{
            params.fileList.push({
              fileUrl:item.url,
              fileName:item.fileName
            })
          })
        }
        console.log('创建工单参数',params)
        this.Request.post('/workflow/saveWorkflow',params).then(res=>{
          console.log('工单创建成功',res)
          this.createdWorkOrder.visible = false
          this.$refs.formObjectCreated.resetForm()
          this.getList()
        })
      },
      //工单详情
      workOrderDetailModal(id){
        this.workOrderDetail.visible = true
        this.workOrderId = id
        this.getWorkOrderDetails()
      },
      // 搜索
      prevHandleSubmit(data){
        console.log('搜索条件',data)
        this.pager.currentPage = 1
        let {typeId,sessionDate,...others} = data
        this.searchField = {...others}
        if(sessionDate&&sessionDate.length>0){
          this.searchField.startDate = sessionDate[0]
          this.searchField.endDate = sessionDate[1]
        }
        if(typeId&&typeId.length>0){
          this.searchField.typeId=typeId[typeId.length-1]
        }
        this.getList()
      },
      paginationChange(data){
        console.log(data)
        this.pager = data
        this.getList()
      },
      treeChangeData(array){
        array.map((item) => {
          item['value'] = item.id;
          item['label'] = item.name; 
          if(item.childList.length>0){
            item['children'] = item.childList;
            this.treeChangeData(item.childList);
          }
        })
        return array;
      },
      // 更新工单记录
      updataOrderRecord(){
        this.$refs.RecordList.getList()
      },
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
