<template>
  <div>
    <a-page-header title="通话质检" style="padding:16px 0;" />
    <div class="box">
      <Search :tools="searchList" @onSearch="searchFun" />
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
        ></a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
export default {
  components: {
    Search,
    TablePagination,
  },
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
          type: "dateRange",
          title: "通话时间",
          key: "callDate",
          ranges: {
            近7天: [moment().subtract(6, "days"), moment()],
            近30天: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "select",
          title: "质检状态",
          key: "qcStatus",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 0, name: "未质检" },
            { value: 1, name: "已质检" }
          ]
        },
        {
          type: "input",
          title: "质检人",
          key: "qcAcc",
          placeholder: "请输入"
        },
        {
          type: "select",
          title: "通话类型",
          key: "callType",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 2, name: "呼出" },
            { value: 1, name: "呼入" }
          ]
        },
        {
          type: "select",
          title: "客服组:",
          key: "serviceGroupIds"
        },
        {
          type: "select",
          title: "客服",
          key: "serviceIds",
          mode: "multiple"
        },
        {
          type: "input",
          title: "联系号码",
          key: "telphone",
          placeholder: "请输入"
        }
      ],
      columns: [
        {
          title: "主叫号码",
          dataIndex: "caller",
          key: "caller"
        },
        {
          title: "被叫号码",
          dataIndex: "called",
          key: "called"
        },
        {
          title: "通话类型",
          dataIndex: "callType",
          key: "callType",
          customRender: value => {
            let obj = {
              "2": "呼入",
              "1": "呼出"
            };
            return obj[value];
          }
        },
        {
          title: "通话时间",
          dataIndex: "callDate",
          key: "callDate"
        },
        {
          title: "客服",
          dataIndex: "serviceAcc",
          key: "serviceAcc"
        },
        {
          title: "通话时长",
          dataIndex: "callLength",
          key: "callLength"
        },
        {
          title: "质检状态",
          dataIndex: "qcType",
          key: "qcType",
          customRender: value => {
            let obj = {
              "0": "未质检",
              "1": "已质检"
            };
            return obj[value];
          }
        }
      ], // 表头
      dataSource: [] // 表格数据
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      api.callphoneList().then(res => {});
    },
    searchFun(values) {
      console.log("values", values);
    },
    onSelectChange() {},
    paginationChange() {}
  },
  watch: {},
  computed: {}
};
</script>
