<template>
  <div>
    <h2 class="TitleH2">客户管理</h2>
    <div class="box">
      <a-tabs :activeKey="activeKey" @change="changeTabFn">
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
        <DataTable :tableConfig="tableConfig" @onSelectChange="onSelectChange"></DataTable>
        <!-- <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
        >
          <div slot="guestName" slot-scope="record,row">
            <span class="blue" @click="checkMessage(row.id,row.status)">{{row.guestName}}22</span>
          </div>
        </a-table>-->
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <!-- 弹窗 -->
    <SetManagerModal :visible="modals.setManagerVisible" :custIds="custIds" />
    <DelCustomerModal :visible="modals.delCustomerVisible" :custIds="custIds" />
    <ExportCustomerModal :visible="modals.exportCustomerVisible" :dataSource="activeKey" />
    <ImportCustomerModal :visible="modals.importCustomerVisible" />
    <ImportResultModal :visible="modals.importResultVisible" />
    <CreateCustomerModal :visible="modals.createCustomerVisible" />
  </div>
</template>
<script>
import moment from "moment";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import api from "@/api/customerCenter";
import SetManagerModal from "@/views/customerCenter/customerManage/modal/setManager";
import DelCustomerModal from "@/views/customerCenter/customerManage/modal/delCustomer";
import ExportCustomerModal from "@/views/customerCenter/customerManage/modal/exportCustomer";
import ImportCustomerModal from "@/views/customerCenter/customerManage/modal/importCustomer";
import ImportResultModal from "@/views/customerCenter/customerManage/modal/importResult";
import CreateCustomerModal from "@/views/customerCenter/customerManage/modal/createCustomer";
import DataTable from "@/components/DataTable";
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
    DataTable
  },
  data() {
    return {
        exportJson:[],
        custIds:[],
      tableConfig: {
        rowKey: "id",
        columns: [
          {
            title: "客户名称",
            dataIndex: "custName",
            key: "custName"
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
            title: "操作",
            dataIndex: "status",
            key: "3",
            customRender: value => {
              let con = {
                children: (
                  <div>
                    {value == 0 && <div style="color:#f99921">跟进客户</div>}
                    {value == 1 && <div>创建工单</div>}
                  </div>
                )
              };
              return con;
            }
          }
        ], // 表头
        list: [

        ], // 表格数据
        align: "center",
        loading: false,
        rowSelection:true
      },
      modals: {
        setManagerVisible: false,
        delCustomerVisible: false,
        exportCustomerVisible: false,
        importCustomerVisible: false,
        importResultVisible: false,
        createCustomerVisible: false
      },
      activeKey: "1",
      searchList: [
        {
          type: "compact",
          name: "queryType",
          child: [
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
            }
          ]
        },
        {
          type: "select",
          title: "客户标签",
          key: "queryTime",
          mode: "multiple"
        },
        {
          type: "select",
          title: "创建人",
          key: "status",
          mode: "multiple"
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
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        dataSource: this.activeKey
      };
      this.tableConfig.list = [
        {
          custAddress: "0",
          custGroup: "1",
          custName: "1",
          custLinkMan: "1"
        },
        {
          custAddress: "0",
          custGroup: "1",
          custName: "1",
          custLinkMan: "1"
        },
        {
          custAddress: "0",
          custGroup: "1",
          custName: "1",
          custLinkMan: "1"
        }
      ];
      //   api.custManageList().then(res => {
      //     console.log(res, "res-----");
      //   });
    },
    onSelectChange(val){
        console.log(val)
        this.custIds = val
    },
    changeTabFn(key) {
      this.activeKey = key;
    },
    //按钮区start
    setManager() {
    if(!this.custIds.length){
        this.$message.warn('请选择客户')
        return false
      }
      this.modals.setManagerVisible = true;
    },
    delCustomer() {
        if(!this.custIds.length){
        this.$message.warn('请选择客户')
        return false
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
  justify-content: space-around;
  .left-side {
    flex: 1;
    text-align: left;
  }
  .right-side {
    flex-shrink: unset;
    text-align: right;
  }
}
</style>