<template>
  <div>
    <h2 class="TitleH2">线索管理</h2>
    <div class="box">
      <Search :tools="searchList" @onSearch="searchFun" />
      <div>
        <DataTable :tableConfig="tableConfig" @onSelectChange="onSelectChange"></DataTable>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import DataTable from "@/components/DataTable";
import TablePagination from "@/components/Table/TablePagination";
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
      searchList: [
        {
          type: "compact",
          name: "queryType",
          child: [
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
          title: "所在地区:",
          placeholder: "请输入",
          key: "guestName"
          // defaultValue: '',
        },
        {
          type: "input",
          title: "创建人",
          placeholder: "请输入",
          key: "inputAccs"
        },
        {
          type: "select",
          title: "创建来源:",
          key: "clueSource",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 0, name: "微信公众号" },
            { value: 1, name: "微信小程序" },
            { value: 2, name: "网址咨询" },
            { value: 3, name: "电话咨询" },
            { value: 4, name: "微信" },
            { value: 5, name: "qq" }
          ]
        }
      ],
      tableConfig: {
        rowKey: "id",
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
        list: [], // 表格数据
        align: "center",
        loading: false,
        rowSelection: true
      }
    };
  },
  components: {
    Search,
    TablePagination,
    DataTable
  },
  mounted(){
      this.getList()
  },
  methods: {
    getList(){
      api.clueManageList().then(res=>{
        
      })
    },
    searchFun() {},
    onSelectChange() {},
    paginationChange() {}
  }
};
</script>

<style>
</style>