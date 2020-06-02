<template>
  <div>
    <a-page-header title="客户管理" style="padding:16px 0;" />
    <div class="box">
      <!-- 普通客服没有tab 记得判断 -->
      <a-tabs :activeKey="searchParams.dataSource" @change="changeTabFn">
        <a-tab-pane key="1" tab="未分配的客户"></a-tab-pane>
        <a-tab-pane key="2" tab="我负责的客户" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="下属成员负责的客户"></a-tab-pane>
      </a-tabs>
      <!-- <Search :tools="searchList" @onSearch="searchFun" /> -->
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
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
          :rowKey="record => record.custId"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        >
          <div slot="detailSkip" slot-scope="record,row">
            <span class="blue" @click="customerDetail(row.custId)">{{row.custName}}</span>
          </div>
          <div slot="action" slot-scope="record,row">
            <span
              v-if="searchParams.dataSource=='2' || searchParams.dataSource=='3'"
              class="blue"
              style="margin-right:10px;"
              @click="followCustomer(row.custId)"
            >跟进客户</span>
            <span class="blue" @click="createOrder(row.custId)">创建工单</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <!-- 弹窗 -->
    <SetManagerModal
      v-if="modals.setManagerVisible"
      :visible="modals.setManagerVisible"
      :custIds="custIds"
      @closeUpdate="closeUpdate"
      @successLoadList="successLoadList"
    />
    <DelCustomerModal
      :visible="modals.delCustomerVisible"
      :custIds="custIds"
      @closeUpdate="closeUpdate"
      @successLoadList="successLoadList"
    />
    <ExportCustomerModal
      :visible="modals.exportCustomerVisible"
      v-if="modals.exportCustomerVisible"
      :totalRecord="pager.totalRecord"
      @closeUpdate="closeUpdate"
      @exportUrl="exportUrl"
    />
    <ImportCustomerModal :visible="modals.importCustomerVisible" @closeUpdate="closeUpdate" />
    <ImportResultModal
      :visible="modals.importResultVisible"
      v-if="modals.importResultVisible"
      @closeUpdate="closeUpdate"
    />
    <CreateCustomerModal
      :createCusObj="createCusObj"
      v-if="createCusObj.visible"
      :detailId="detailId"
      @closeUpdate="closeUpdate"
      @successLoadList="successLoadList"
    />
    <setLabelModal
      :visible="modals.setLabelVisible"
      v-if="modals.setLabelVisible"
      @closeUpdate="closeUpdate"
      @successLoadList="successLoadList"
    />
    <followCustomerModal
      :visible="modals.followCustomerVisible"
      v-if="modals.followCustomerVisible"
      :followId="detailId"
      @closeUpdate="closeUpdate"
      @successLoadList="successLoadList"
    />
    <DetailModal
      :visibleProps="detailObj"
      :detailId="detailId"
      v-if="detailObj.visible"
      :dataSource="searchParams.dataSource"
      @customerFollowShow="followCustomer"
      @editCustomerShow="editCustomerShow"
      @closeUpdate="closeUpdate"
    />
  </div>
</template>
<script>
import moment from "moment";
// import Search from "@/components/Search/index2";
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
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import Modal from "@/components/Modal";
import BaseForm from "@/components/BaseForm";
import qs from "qs";
export default {
  components: {
    FormModelSearchForm,
    TablePagination,
    SetManagerModal,
    DelCustomerModal,
    ExportCustomerModal,
    ImportCustomerModal,
    ImportResultModal,
    CreateCustomerModal,
    setLabelModal,
    followCustomerModal,
    DetailModal,
    Modal,
    BaseForm
  },
  data() {
    return {
      currentModal: {
        visible: false
      },
      formAxiosReturnValues: {},
      followObj: {
        title: "跟进客户",
        visible: false,
        modelList: [
          {
            type: "date",
            label: "预约时间：",
            placeholder: "请选择",
            model: undefined,
            ruleName: "appointmentsTime", //receiverGroupId 工单受理组id
            options: [],
            rules: {
              required: true,
              message: "请指定客服人员",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "备注",
            placeholder: "",
            model: undefined,
            ruleName: "remark" //receiverGroupId 工单受理组id
          }
        ]
      },
      createCusObj: {
        title: "新建客户",
        visible: false
      },
      detailId: "",
      exportJson: [],
      custIds: [],
      columns: [
        {
          title: currentPageData => {
            return (
              <div>
                操作
                <span style="padding-left:2px">
                  <AIcon onClick={this.setLabelClick} type="setting" />
                </span>
              </div>
            );
          },
          dataIndex: "status",
          key: "3",
          scopedSlots: { customRender: "action" }
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
        followCustomerVisible: false,
        detailVisible: false
      },
      // activeKey: "1",

      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      searchParams: {
        dataSource: "1"
      },
      selectedRowKeys: [],
      detailObj: {
        title: "客户详情",
        visible: false,
        width: "720px"
      },
      searchFormList: [
        {
          type: "compact",
          name: "queryText",
          compact: "input",
          compactName: "queryType",
          options: [
            { label: "客户名称", value: "1" },
            { label: "联系人", value: "2" },
            { label: "联系电话", value: "3" }
          ]
        },

        {
          type: "select",
          name: "custLabels",
          mode: "multiple",
          label: "客户标签",
          options: []
        },
        {
          type: "selectGroup",
          name: "inputAccs",
          label: "创建人",
          mode: "multiple",
          list: []
        },
        {
          type: "selectGroup",
          name: "principalAccs",
          label: "负责人",
          mode: "multiple",
          list: []
        },

        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "创建时间"
        },
        {
          type: "rangepicker",
          name: "lastFollowDateStart",
          label: "最近跟进时间"
        },
        {
          type: "rangepicker",
          name: "nextFollowDateStart",
          label: "下次跟进时间"
        }
      ],
      defaultSearchFormValues: {
        queryType: "1"
      }
    };
  },
  mounted() {
    this.getList();
    this.getCustomerLabel();
    this.getStaffSkillGroups(0);
    this.getStaffSkillGroups(1);
    this.getColumns();
  },
  methods: {
    getColumns() {
      api.setFieldsJson().then(res => {
        console.log("操作设置", res);
        let list = res.data.list;
        this.columns = [
          {
            title: currentPageData => {
              return (
                <div>
                  操作
                  <span style="padding-left:2px">
                    <AIcon onClick={this.setLabelClick} type="setting" />
                  </span>
                </div>
              );
            },
            dataIndex: "status",
            key: "3",
            scopedSlots: { customRender: "action" }
          }
        ];
        res.data.list.map(item => {
          if (item.isShow == 1) {
            if (item.fieldCode == "custName") {
              this.columns.unshift({
                title: item.fieldName,
                dataIndex: item.fieldCode,
                key: item.fieldCode,
                scopedSlots: { customRender: "detailSkip" }
              });
            } else {
              this.columns.unshift({
                title: item.fieldName,
                dataIndex: item.fieldCode,
                key: item.fieldCode
              });
            }
          }
        });

        // this.mockData = newArr;
        // this.targetKeys = newArr.filter(v => v.isShow == 1).map(item => item.key);
      });
    },
    followFormSubmit() {},
    toggleModal(data) {
      this["followObj"]["visible"] = data.visible;
    },
    prevHandleSubmit(val) {
      console.log(val, "val");
      this.searchParams = Object.assign({}, this.searchParams, val);
      this.getList();
    },
    successLoadList(val) {
      this.modals.delCustomerVisible = false;
      this.modals.followCustomerVisible = false;
      this.modals.setManagerVisible = false;
      this.modals.setLabelVisible = false;
      this.custIds = [];
      this.getList();
      if (val == "setLable") {
        this.getColumns();
      }
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      };
      console.log(params, "你对不对");
      api.custManageList(params).then(res => {
        console.log(res, "res-----");
        if (res.data.status) {
          this.tableList = res.data.list;
          this.pager = res.data.pager;
        }
      });
    },
    getCustomerLabel() {
      api.customerLabel().then(res => {
        console.log("客户标签", res);
        if (res.data.status) {
          let labels = JSON.parse(
            JSON.stringify(res.data.labels).replace(/name/g, "label")
          );
          this.searchFormList[1].options = labels;
        }
      });
    },
    getStaffSkillGroups(type) {
      api.staffSkillGroups({ type: type }).then(res => {
        console.log("创建人", res);
        if (res.data.status) {
          if (type == 0) {
            this.searchFormList[2].list = res.data.list;
          }
          if (type == 1) {
            this.searchFormList[3].list = res.data.list;
          }
        }
      });
    },
    closeUpdate() {
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
      selectedRows.map(v => {
        this.custIds.push(v.custId);
      });
    },
    onPageChange() {},
    customerDetail(custId) {
      console.log(custId, "客户详情");
      this.detailId = custId;
      this.detailObj.visible = true;
    },
    editCustomerShow(custId) {
      this.detailId = custId.custId;
      // this.modals.createCustomerVisible = true;
      this.createCusObj.visible = true;
      this.createCusObj.title = "编辑客户";
    },
    // customerFollowShow(){
    //   this.modals.followCustomerVisible = true
    // },
    followCustomer(custId) {
      this.detailId = custId; //此处有问题，记得修改
      this.modals.followCustomerVisible = true;
      // this.followObj.visible = true;
    },
    createOrder() {},
    changeTabFn(key) {
      this.searchParams.dataSource = key;
      this.getList();
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
    exportUrl() {
      this.modals.exportCustomerVisible = false;
      let param = qs.stringify(this.searchParams);
      let url = `/customers/hfwCustomersInfo/exportJson?${param}`;
      window.location.href = url;
      // document.location = url;
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
      // this.modals.createCustomerVisible = true;
      this.detailId = "";
      this.createCusObj.visible = true;
      this.createCusObj.title = "新增客户";
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
    },
    paginationChange(values) {
      console.log(values, "你是什么");
      this.custIds = [];
      this.pager = values;
      this.getList();
    }
  }
};
</script>
<style lang="less" scoped>
.button-area {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .left-side {
    text-align: left;
    button {
      margin-left: 10px;
    }
  }
  .right-side {
    flex-shrink: unset;
    text-align: right;
    button {
      margin-right: 10px;
    }
  }
}
</style>