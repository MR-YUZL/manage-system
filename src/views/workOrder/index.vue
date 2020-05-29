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
          <a-button @click="exportDataModal">当前数据导出</a-button><a-button type="primary" @click="createdWorkOrderModal">新建工单</a-button>
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
            <span class="blue">{{record.code}}</span>
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
        />
    </a-modal>
    <a-modal title="批量重启" :visible="batchRestartShow" v-if="batchRestartShow" @cancel="handleCancelBatchRestart" @ok="handleBatch(4)">
      <a-textarea
        v-model="batchRestartValue"
        placeholder="请输入备注"
        :auto-size="{ minRows: 3, maxRows: 5 }"/>
    </a-modal>
    <Modal :currentModal="batchTransmit">
      <div slot='content'>
        <BaseForm 
          :formObject="formObject"
          :defaultValues="formAxiosReturnValues"
          @toggleModal="toggleModal"
          @formSubmit="formSubmit"
        ></BaseForm>
      </div>
    </Modal>
    <a-modal title="导出" :visible="exportDataShow" v-if="exportDataShow" @cancel="handleCancelExport" @ok="handleOkExport">
         是否确认导出当前条件下的工单数据？
         <br />
         本次导出工XXX条数据
    </a-modal>
    <Modal :currentModal="createdWorkOrder">
      <div slot='content'>
        <BaseForm 
          :formObject="formObjectCreated"
          @toggleModal="createdToggleModal"
          @formSubmit="formSubmitWorkOrder"
        ></BaseForm>
      </div>
    </Modal>
  </div>
</template>
<script>
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import TablePagination from "@/components/Table/TablePagination";
import Modal from "@/components/Modal/index";
import BaseForm from "@/components/BaseForm/index";
export default {
    name: "worlOrder",
    components: {
      FormModelSearchForm,
      TablePagination,
      Modal,
      BaseForm
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
        exportDataShow:false,
        formObject:{
          type:'modalForm',
          ref: "testModal",
          sureBtn:'确定',
          modelList: [
            {
              type: "select",
              label: "工单受理组",
              placeholder: "请选择",
              ruleName: "receiverGroupId",
              options: [
                  {
              label: "客户名称",
              value: "1"
            },
            {
              label: "联系人",
              value: "2"
            },
            {
              label: "联系电话",
              value: "3"
            }],
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
              options: [ { key: 2, value: "网站咨询" },
                  { key: 0, value: "微信公众号" },
                  { key: 1, value: "微信小程序" },],
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
            }
          ]
        },
        formObjectCreated:{
          type:'modalForm',
          ref: "createdModal",
          sureBtn:'确定',
            modelList: [
              {
                type: "select",
                label: "工单受理组",
                placeholder: "请选择",
                ruleName: "receiverGroupId",
                options: [
                    {
                    key: "客户名称",
                    value: "客户名称"
                  }
                ]
              }
            ]        
        },
        formAxiosReturnValues:{},
        
       searchFormList: [
          {
            type:'select',
            label: "优先级",
            name: "level",
            options: [
              { key: "null", id: "全部优先级" },
              { key: 2, id: "高" },
              { key: 1, id: "中" },
              { key: 0, id: "低" }
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
            name: "qcAcc"
          },
          {
            type:'select',
            label: "受理组",
            name: "receiverGroupId",
            options: [
              { key: "null", id: "全部受理组" },
              { key: 0, id: "高" },
              { key: 1, id: "中" },
              { key: 2, id: "低" }
            ],
          },{
            type:'select',
            label: "受理人",
            name: "receiverAcc",
            options: [
              { key: "null", id: "全部受理人" },
              { key: 0, id: "高" },
              { key: 1, id: "中" },
              { key: 2, id: "低" }
            ],
          },
          {
            type:'select',
            label: "发起人",
            name: "status",
            options: [
              { key: "null", id: "全部发起人" },
              { key: 0, id: "高" },
              { key: 1, id: "中" },
              { key: 2, id: "低" }
            ],
          },
          {
            type:'select',
            label: "分类",
            name: "typeId",
            options: [
              { key: "null", id: "所有分类" },
              { key: 0, id: "高" },
              { key: 1, id: "中" },
              { key: 2, id: "低" }
            ],
          },
            {
            type:'select',
            label: "工单状态",
            name: "status",
            options: [
              { key: "null", id: "全部状态" },
              { key: 0, id: "高" },
              { key: 1, id: "中" },
              { key: 2, id: "低" }
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
            name: "qcAcc"
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
                '1':'高'
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
                '2':'已完成'
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
            dataIndex: 'receiverAcc',
            key: 'receiverAcc',
          },
        ],
        dataSource:[],
        searchField:{},
        pager:{},
        selectedRowKeys: [],
      }
    },
    computed:{
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
            console.log(selected, selectedRows, changeRows);
          },
        }
      },
    },
    created(){
      this.getList()
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
        })
      },
      // 完结工单
      closeWorkOrderModal(){
        this.closeWorkOrderShow = true
      },
      handleCancelCloseOrder(){
        this.closeWorkOrderShow = false
      },
      handleBatch(type){
        let params = {
          type, //0-创建，1-跟进，2-转交，3-完结,
        }
        if(type == 3){
          params.remark = this.closeOrderRemark
        }else if(type == 4){
          params.remark = this.batchRestartValue
        }else if(type == 2){
          let transParams = {
            receiverAcc:'',
            receiverGroupId:'',
            remark:''
          }
          params = {...params,transParams}
        }
        this.Request.get('/workflow/follow/saveWorkflowBatchFollow',params).then(res=>{
          console.log(res,'工单完结')
        })
      },
      //批量重启
      batchRestartModal(){
        this.batchRestartShow = true
      },
      handleCancelBatchRestart(){
        this.batchRestartShow = false
      },
      //批量转交
      batchTransmitModal(){ 
        this.batchTransmit.visible = true
      },
      toggleModal(){
        this.batchTransmit.visible = false
      },
      formSubmit(data){
        console.log(data)
      },
      // 导出当前数据
      exportDataModal(){
        this.exportDataShow= true
      },
      handleCancelExport(){
        this.exportDataShow= false
      },
      handleOkExport(){},
      //创建工单
      createdWorkOrderModal(){
        this.createdWorkOrder.visible = true
      },
      createdToggleModal(){

      },
      formSubmitWorkOrder(){},




      prevHandleSubmit(){

      },
      paginationChange(){}
    }
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
</style>
