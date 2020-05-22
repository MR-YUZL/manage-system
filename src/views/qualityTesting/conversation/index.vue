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
        >
        <div slot="idSkip" slot-scope="record,row">
            <span class="blue" @click="qualityDetail(row.id)">{{row.id}}</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <a-modal title="质检详情" :footer="null" width="880px" v-if="detailsShow" :visible="detailsShow" @cancel="handleCancel">
      <div class="record-detail">
        <div class="message">123</div>
        <div class="information">7854</div>
      </div>
   </a-modal>
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
    TablePagination
  },
  data() {
    return {
      detailsShow:false,
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
          title: "通话ID",
          dataIndex: "callId",
          key: "callId",
          scopedSlots: { customRender: 'idSkip' },
        },
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
      dataSource: [], // 表格数据
      params: {
        callDate: "2020-05-01,2020-05-11",
        qcStatus: 0,
        qcAcc: "ldkj001",
        callType: 1,
        serviceGroupIds: ["0012d22c3dd74f68879c75d19c78de44"],
        serviceIds: ["ldkj001"],
        telphone: "15606156246",
        currentPage: 1,
        pageSize: 10
      }
    };
  },

  mounted() {
    this.getList(this.params);
  },
  methods: {
    getList(params) {
      api.callphoneList(params).then(res => {
        this.dataSource = res.data.list;
        this.pager = res.data.pager
      });
    },
    qualityDetail(){
      this.detailsShow = true
    },
    handleCancel(){
      this.detailsShow = false
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
<style lang="less" scoped>
.record-detail{
    display:flex;
    .message{
      width:380px;
      border-right:1px solid #e6e6e6;
    }
    .information{
      margin-left:48px;
      width:384px;
    }
  }
</style>
