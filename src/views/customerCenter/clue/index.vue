<template>
  <div>
    <a-page-header title="线索管理" style="padding:16px 0;" />
    <div class="box">
      <!-- <Search :tools="searchList" @onSearch="searchFun" /> -->
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
      <!-- 按钮区 -->
      <div class="button-area">
        <div class="left-side"></div>
        <div class="right-side">
          <a-button @click="exportClue">导出</a-button>
        </div>
      </div>
      <!-- 按钮区 -->
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
        ></a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
      <ExportCustomerModal
        :visible="visible"
        v-if="visible"
        :totalRecord="pager.totalRecord"
        @closeUpdate="closeUpdate"
        @exportUrl="exportUrl"
      />
    </div>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import ExportCustomerModal from "@/views/customerCenter/customerManage/modal/exportCustomer";
export default {
  data() {
    return {
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      searchFormList: [
        {
          type: "compact",
          name: "queryText",
          compact: "input",
          compactName: "queryType",
          options: [
            {
              label: "姓名",
              value: "1"
            },
            {
              label: "手机号",
              value: "2"
            },
            {
              label: "微信号",
              value: "6"
            },
            {
              label: "邮箱",
              value: "3"
            },
            {
              label: "qq",
              value: "4"
            },
            {
              label: "钉钉",
              value: "5"
            }
          ]
        },
        {
          type: "input",
          name: "guestName",
          label: "所在地区:",
          placeholder: "请输入"
        },
        {
          type: "selectGroup",
          name: "inputAccs",
          label: "创建人",
          mode: "multiple",
          list: []
        },
        {
          type: "select",
          label: "创建来源:",
          name: "clueSource",
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "微信公众号" },
            { key: 1, id: "微信小程序" },
            { key: 2, id: "网址咨询" },
            { key: 3, id: "电话咨询" },
            { key: 4, id: "微信" },
            { key: 5, id: "qq" }
          ],
          optionValue: "key",
          optionLabel: "id"
        }
      ],
      columns: [
        {
          title: "姓名",
          dataIndex: "clueName",
          key: "clueName"
        },
        {
          title: "手机号",
          dataIndex: "cluePhone",
          key: "cluePhone"
        },
        {
          title: "微信号",
          dataIndex: "clueWechat",
          key: "clueWechat"
        },
        {
          title: "邮箱",
          dataIndex: "clueEmail",
          key: "clueEmail"
        },
        {
          title: "qq",
          dataIndex: "clueQq",
          key: "clueQq"
        },
        {
          title: "钉钉",
          dataIndex: "clueDingding",
          key: "clueDingding"
        },
        {
          title: "所在地区",
          dataIndex: "clueArea",
          key: "clueArea"
        },
        {
          title: "创建来源",
          dataIndex: "clueSource",
          key: "clueSource"
        },
        {
          title: "创建人",
          dataIndex: "inputAcc",
          key: "inputAcc"
        },
        {
          title: "咨询备注",
          dataIndex: "clueRemarks",
          key: "clueRemarks"
        },
        {
          title: "创建时间",
          dataIndex: "inputDate",
          key: "inputDate"
        }
      ], // 表头
      dataSource: [], // 表格数据
      searchParams: {
        queryText: "1",
        queryType: 1,
        totalRecord: "20"
      },
      defaultSearchFormValues: {
        queryType: "1"
      },
      visible:false
    };
  },
  components: {
    FormModelSearchForm,
    TablePagination,
    ExportCustomerModal
  },
  mounted() {
    this.getList();
    this.getStaffSkillGroups();
  },
  methods: {
    prevHandleSubmit(val) {
      this.searchParams = Object.assign({}, this.searchParams, val);
      this.getList();
    },
    exportUrl(){
      let url = '/customers/hfwCustomersClue/exportJson?dataSource='+ this.dataSource + '&queryType=';
      // document.location = url;
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      };
      api.clueManageList(params).then(res => {
        console.log("线索管理列表", res);
        if (res.data.status) {
          this.dataSource = res.data.list;
          this.pager = res.data.pager;
        }
      });
    },
    getStaffSkillGroups(type) {
      api.staffSkillGroups({ type: 0 }).then(res => {
        console.log("创建人没有权限", res);
        if (res.data.status) {
          this.searchFormList[2].list = res.data.list;
        }
      });
    },
    exportClue() {
     this.visible = true
    },
    closeUpdate(){
      this.visible = false
    },
    searchFun() {},
    onSelectChange() {},
    paginationChange(values) {
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