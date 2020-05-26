<template>
  <div>
    <a-page-header title="在线质检" style="padding:16px 0;" />
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
        <div class="message"></div>
        <div class="information"></div>
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
    TablePagination,
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
          title: "会话时间",
          key: "sessionDate",
          ranges: {
            近7天: [moment().subtract(6, "days"), moment()],
            近30天: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "select",
          title: "问题解决状态",
          key: "status",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 0, name: "未解决" },
            { value: 1, name: "已解决" }
          ]
        },
        {
          type: "input",
          title: "质检人",
          placeholder: "请输入",
          key: "qcAcc"
        },
        {
          type: "input",
          title: "咨询分类",
          placeholder: "请输入",
          key: "inputAccs"
        },
        {
          type: "select",
          title: "接待客服:",
          key: "serviceAccs",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 0, name: "微信公众号" }
          ]
        },
        {
          type: "select",
          title: "客服组",
          key: "serviceGroupId",
          defaultValue: "null",
          options: [
            { value: "null", name: "所有状态" },
            { value: 0, name: "微信公众号" }
          ]
        },
        {
          type: "select",
          title: "质检状态:",
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
          title: "会话时长",
          placeholder: "请输入",
          key: "sessionTime"
        },
        {
          type: "input",
          title: "会话ID",
          placeholder: "请输入",
          key: "sessionId"
        }
      ],
      columns: [
        {
          title: "会话ID",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: 'idSkip' },
        },
        {
          title: "接待客服",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "会话开始时间",
          dataIndex: "beginTime",
          key: "beginTime"
        },
        {
          title: "咨询分类",
          dataIndex: "consultType",
          key: "consultType"
        },
        {
          title: "问题解决状态",
          dataIndex: "status",
          key: "status",
          customRender: value => {
            let obj = {
              "0": "未解决",
              "1": "已解决"
            };
            return obj[value];
          }
        },
        {
          title: "会话时长",
          dataIndex: "sessionTime",
          key: "sessionTime"
        },
        {
          title: "质检人",
          dataIndex: "qcAccName",
          key: "qcAccName"
        },
        {
          title: "质检状态",
          dataIndex: "qcStatus",
          key: "qcStatus",
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
      params:{
        serviceGroupId:'123', //客服组ID
        qcStatus:'0',//质检状态(1已质检、0未质检)
      }
    };
  },

  mounted() {
    this.getList(this.params);
  },
  methods: {
    getList(params) {
      api.sessionOnlineList(params).then(res => {
        console.log('会话列表',res)
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
    searchFun() {},
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