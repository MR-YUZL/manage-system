<template>
  <div>
    <a-page-header title="跟进记录" style="padding:16px 0;" />
    <div class="box">
      <Search :tools="searchList" @onSearch="searchFun" />
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
          :row-selection="rowSelection"
        >
          <div slot="detailSkip" slot-scope="record,row">
            <span class="blue" @click="customerDetail(row.id)">{{row.custName}}</span>
          </div>
        </a-table>
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
  data() {
    return {
      searchList: [
        {
          type: "input",
          title: "客户名称:",
          placeholder: "请输入",
          key: "queryText"
          // defaultValue: '',
        },
        {
          type: "input",
          title: "客服姓名",
          placeholder: "请输入",
          key: "followAccs"
        },
        {
          type: "dateRange",
          title: "跟进时间",
          key: "queryTimess",
          ranges: {
            今日: [moment(), moment()],
            // 昨天: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            本周: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(29, "days"), moment()]
          }
        }
      ],
      columns: [
          {
            title: "跟进时间",
            dataIndex: "followDate",
            key: "followDate"
          },
          {
            title: "客户名称",
            dataIndex: "custName",
            key: "custName",
            scopedSlots: { customRender: 'detailSkip' },
          },
          {
            title: "有效联系",
            dataIndex: "followValid",
            key: "followValid",
            customRender: value => {
              let con = {
                children: (
                  <div>
                    {value == 0 && <div>是</div>}
                    {value == 1 && <div>否</div>}
                  </div>
                )
              };
              return con;
            }
          },
          {
            title: "客服姓名",
            dataIndex: "followAcc",
            key: "followAcc"
          },
          {
            title: "跟进记录",
            dataIndex: "followRecord",
            key: "followRecord"
          }
        ], // 表头
        dataSource: [], // 表格数据
        pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      }
    };
  },
  components: {
    Search,
    TablePagination,
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      api.followRecordList().then(res => {});
    },
    customerDetail(){},
    searchFun() {},
    onSelectChange() {},
    paginationChange() {}
  }
};
</script>

<style>
</style>