<template>
  <div>
    <a-page-header title="客户管理" style="padding:16px 0;" />
    <div class="box">
      <!-- 普通客服没有tab 记得判断 -->
      <a-tabs :activeKey="params.dataSource" @change="changeTabFn">
        <a-tab-pane key="1" tab="未分配的客户"></a-tab-pane>
        <a-tab-pane key="2" tab="我负责的客户" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="下属成员负责的客户"></a-tab-pane>
      </a-tabs>
      <Search :tools="searchList" @onSearch="searchFun" />
      <!-- 按钮区 -->
      <div class="button-area">
        <div class="left-side">
          <a-button @click="setManager">设置负责人</a-button>
          <a-button @click="delCustomer">删除</a-button>
        </div>
        <div class="right-side">
          <a-button @click="exportCustomer">导出客户</a-button>
          <a-button @click="importCustomer">导入客户</a-button>
          <a-button @click="importResult">导入结果</a-button>
          <a-button type="primary" @click="createCustomer">创建客户</a-button>
        </div>
      </div>
      <!-- 按钮区 -->
      <div>
        <a-table
          :columns="columns"
          :dataSource="tableList"
          :pagination="false"
          :rowKey="record => record.id"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="onPageChange"
        >
          <div slot="detailSkip" slot-scope="record,row">
            <span class="blue" @click="customerDetail(row.custId)">{{row.custName}}</span>
          </div>
          <div slot="action" slot-scope="record,row">
            <span class="blue" style="margin-right:10px;" @click="followCustomer(row.custId)">跟进客户</span>
            <span class="blue" @click="createOrder(row.custId)">创建工单</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <!-- 弹窗 -->
    <SetManagerModal :visible="modals.setManagerVisible" :custIds="custIds" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <DelCustomerModal :visible="modals.delCustomerVisible" :custIds="custIds" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <ExportCustomerModal :visible="modals.exportCustomerVisible" :tableList="tableList" :dataSource="params.dataSource" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <ImportCustomerModal :visible="modals.importCustomerVisible" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <ImportResultModal :visible="modals.importResultVisible" :pageSize="pager.currentPage" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <CreateCustomerModal :visible="modals.createCustomerVisible" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <setLabelModal :visible="modals.setLabelVisible" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <followCustomerModal :visible="modals.followCustomerVisible" v-if="followId" :followId="followId" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
    <DetailModal :visible="modals.detailVisible" v-if="detailId" :detailId="detailId" @delUpdate="delUpdate" @closeUpdate="closeUpdate" />
  </div>
</template>
<script>
import moment from "moment";
import Search from "@/components/Search/index2";
import TablePagination from "@/components/Table/TablePagination";
import api from "@/api/customerCenter";
import SetManagerModal from "@/views/customerCenter/customerManage/modal/setManager";
import DelCustomerModal from "@/views/customerCenter/customerManage/modal/delCustomer";
import ExportCustomerModal from "@/views/customerCenter/customerManage/modal/exportCustomer";
import ImportCustomerModal from "@/views/customerCenter/customerManage/modal/importCustomer";
import ImportResultModal from "@/views/customerCenter/customerManage/modal/importResult";
import CreateCustomerModal from "@/views/customerCenter/customerManage/modal/createCustomer";
import setLabelModal from "@/views/customerCenter/customerManage/modal/setLabel";
import followCustomerModal from "@/views/customerCenter/customerManage/modal/followCustomer";
import DetailModal from "@/views/customerCenter/customerManage/detail";

export default {
  components: {
    Search,
    TablePagination,
    SetManagerModal,
    DelCustomerModal,
    ExportCustomerModal,
    ImportCustomerModal,
    ImportResultModal,
    CreateCustomerModal,
    setLabelModal,
    followCustomerModal,
    DetailModal
  },
  data() {
    return {
      detailId:'',
      followId:'',
      exportJson: [],
      custIds: [],
      columns: [
        {
          title: "客户名称",
          dataIndex: "custName",
          key: "custName",
          scopedSlots: { customRender: 'detailSkip' },
        },
        {
          title: "客户标签",
          dataIndex: "custLabels",
          key: "custLabels"
        },
        {
          title: "客户分组",
          dataIndex: "custGroup",
          key: "custGroup"
        },
        {
          title: "地址",
          dataIndex: "custAddress",
          key: "custAddress"
        },
        {
          title: "联系人",
          dataIndex: "custLinkMan",
          key: "custLinkMan"
        },
        {
          title: "电话",
          dataIndex: "custPhone",
          key: "custPhone"
        },
        {
          title: "客户经理",
          dataIndex: "custManager",
          key: "custManager"
        },
        {
          title: "负责人",
          dataIndex: "custPrincipals",
          key: "custPrincipals"
        },
        {
          title: "创建人",
          dataIndex: "inputAcc",
          key: "inputAcc"
        },
        {
          title: "创建时间",
          dataIndex: "inputDate",
          key: "inputDate"
        },
        {
          title: "最近跟进时间",
          dataIndex: "lastFollowDate",
          key: "lastFollowDate"
        },
        {
          title: "下次跟进时间",
          dataIndex: "nextFollowDate",
          key: "nextFollowDate"
        },
        {
          title: currentPageData => {
            return (
              <div>
                操作
                <AIcon onClick={this.setLabelClick} type="setting" />
              </div>
            );
          },
          dataIndex: "status",
          key: "3",
          scopedSlots: { customRender: 'action' },
        }
      ], // 表头
      tableList: [], // 表格数据
      modals: {
        setManagerVisible: false,
        delCustomerVisible: false,
        exportCustomerVisible: false,
        importCustomerVisible: false,
        importResultVisible: false,
        createCustomerVisible: false,
        setLabelVisible: false,
        followCustomerVisible:false,
        detailVisible:false
      },
      // activeKey: "1",
      searchList: [
        {
          type: "compact",
          key: "queryType",
          defaultValue:'1',
          name:'queryText',
          defaultName: null,
          options: [
            {
              name: "客户名称",
              value: "1"
            },
            {
              name: "联系人",
              value: "2"
            },
            {
              name: "联系电话",
              value: "3"
            }
          ]
        },
        {
          type: "select",
          title: "客户标签",
          key: "queryTime",
          mode: "multiple",
          options:[]
        },
        {
          type: "select",
          title: "创建人",
          key: "status",
          mode: "multiple",
          options:[]
        },
        {
          type: "input",
          title: "负责人",
          key: "source"
        },
        {
          type: "dateRange",
          title: "创建时间",
          key: "queryTime",
          ranges: {
            今日: [moment(), moment()],
            // 昨天: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            本周: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "dateRange",
          title: "最近跟进时间",
          key: "queryTime",
          ranges: {
            今日: [moment(), moment()],
            本周: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "dateRange",
          title: "下次跟进时间",
          key: "queryTime",
          ranges: {
            今日: [moment(), moment()],
            本周: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "input",
          title: "客户分组"
        },
        {
          type: "search",
          title: "筛选",
          btnType: "primary"
        }
      ],
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      params: {
        dataSource: "1",
        queryType: 1
      },
      selectedRowKeys:[]
    };
  },
  mounted() {
    this.getList(this.params);
  },
  methods: {
    getList(params) {
      api.custManageList(params).then(res => {
        console.log(res, "res-----");
        if (res.data.status) {
          this.tableList = res.data.list;
          this.pager = res.data.pager
        }
      });
    },
    delUpdate(){
      this.custIds = [];
      this.getList(this.params);
    },
    closeUpdate(){
      this.modals.delCustomerVisible = false;
      this.modals.setManagerVisible = false;
      this.modals.exportCustomerVisible = false;
      this.modals.importCustomerVisible = false;
      this.modals.importResultVisible = false;
      this.modals.createCustomerVisible = false;
      this.modals.setLabelVisible = false;
      this.modals.followCustomerVisible = false;
      this.modals.detailVisible = false;
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.custIds = [];
      this.selectedRowKeys = selectedRowKeys;
      selectedRows.map(v=>{
        this.custIds.push(v.custId)
      })
    },
    onPageChange(){},
    customerDetail(custId) {
      this.detailId = custId;
      this.modals.detailVisible = true
    },
    followCustomer(custId) {
      console.log(custId)
      this.followId = custId;
      this.modals.followCustomerVisible = true
    },
    createOrder() {},
    changeTabFn(key) {
      this.params.dataSource = key;
    },
    //按钮区start
    setManager() {
      if (!this.custIds.length) {
        this.$message.warn("请选择客户");
        return false;
      }
      this.modals.setManagerVisible = true;
    },
    delCustomer() {
      if (!this.custIds.length) {
        this.$message.warn("请选择客户");
        return false;
      }
      this.modals.delCustomerVisible = true;
    },
    exportCustomer() {
      this.modals.exportCustomerVisible = true;
    },
    importCustomer() {
      this.modals.importCustomerVisible = true;
    },
    importResult() {
      this.modals.importResultVisible = true;
    },
    createCustomer() {
      this.modals.createCustomerVisible = true;
    },
    setLabelClick() {
      this.modals.setLabelVisible = true;
    },
    //按钮区end
    checkMessage(id, status) {
      // 调取接口
      //  "0":'未处理',  "1":'已处理'
      console.log(id, status);
      this.handleRecordBtn = !status ? true : false;
      this.detailsShow = true;
    },
    //检索组件传参接收
    searchFun(values) {
      console.log("values", values);
      this.pager.currentPage = 1;
      this.searchField = values;
      //   this.getList();
    },
    paginationChange(values) {
      this.pager = values;
      //   this.getList();
    }
  }
};
</script>
<style lang="less" scoped>
.button-area {
  display: flex;
  justify-content: space-between;
  padding:10px 0;
  .left-side {
    text-align: left;
    button{
      margin-left: 10px;
    }
  }
  .right-side {
    flex-shrink: unset;
    text-align: right;
    button{
      margin-right: 10px;
    }
  }
}
</style>