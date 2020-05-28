<template>
  <div class="">
    <a-page-header title="工单管理" />
    <div class="workOrder">
      <FormModelSearchForm :formList="searchFormList"  @prevHandleSubmit="prevHandleSubmit"></FormModelSearchForm>
      <div class="flex-between">
        <div>
          <a-button>批量完结</a-button><a-button>批量重启</a-button><a-button>批量转交</a-button>
        </div>
        <div>
          <a-button>当前数据导出</a-button><a-button type="primary">新建工单</a-button>
        </div>
      </div>
      <div>
        <a-table :columns="columns"  :data-source="dataSource"  :pagination="false" :rowKey="record => record.id">
          <div slot="action" slot-scope="record,row">
            <span class="blue">{{record.code}}</span>
          </div>
        </a-table>
      </div>
    </div>
    <div style="padding:10px 0 20px 0;"><TablePagination :parentPager="pager" @paginationChange="paginationChange" /></div>
  </div>
</template>
<script>
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import TablePagination from "@/components/Table/TablePagination";
export default {
    name: "worlOrder",
    components: {
      FormModelSearchForm,
      TablePagination
    },
    props:{},
    data() {
      return {
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
        pager:{}
      }
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
