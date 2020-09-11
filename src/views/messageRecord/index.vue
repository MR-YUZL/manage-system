<template>
  <div>
    <a-page-header title="留言记录" style="padding:16px 0;" />
    <div class="box">
      <div class="searchStyle">
        <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
          @prevHandleSubmit="prevHandleSubmit"
        />
      </div>
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
        >
          <div slot="name" slot-scope="record, row">
            <span class="blue" @click="checkMessage(row.id, row.leaveStatus)">{{
              row.name
            }}</span>
          </div>
        </a-table>
      </div>
      <div style="padding:20px 0;">
        <TablePagination
          :parentPager="pager"
          @paginationChange="paginationChange"
        />
      </div>
    </div>
    <a-modal
      title="记录"
      :footer="null"
      width="880px"
      v-if="detailsShow"
      :visible="detailsShow"
      @cancel="handleCancel"
    >
      <div class="record-detail">
        <div class="message">
          <MessageDetail
            :sessionObj="sessionObj"
            :handleRecordBtn="handleRecordBtn"
            :handleResult="handleResultCon"
            @setHandleResult="setHandleResult"
          />
        </div>
        <div class="information" v-if="guestId">
          <UserInformation :guestId="guestId" />
        </div>
      </div>
    </a-modal>
    <a-modal
      title="留言处理"
      v-if="leaveModalShow"
      :visible="leaveModalShow"
      @cancel="handleleaveModalCancel"
      @ok="handleleaveModalOk"
    >
      <div style="display:flex">
        <p style="width:78px;">处理结果</p>
        <a-textarea
          v-model="resultContent"
          placeholder="请输入处理结果"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          maxLength="100"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import UserInformation from "./../../components/userInf";
// import Search from './../../components/Search/index'
import MessageDetail from "./messageDetail";
import TablePagination from "../../components/Table/TablePagination";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  components: {
    FormModelSearchForm,
    MessageDetail,
    UserInformation,
    TablePagination
  },
  data() {
    return {
      defaultSearchFormValues: {},
      searchFormList: [
        {
          type: "input",
          label: "用户名:",
          placeholder: "请输入",
          name: "name"
        },
        {
          type: "rangepicker",
          label: "留言时间:",
          name: "queryTime"
        },
        {
          type: "select",
          label: "留言状态:",
          name: "leaveStatus",
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "未处理" },
            { key: 1, id: "已处理" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "select",
          label: "来源终端:",
          name: "channelType",
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "网站咨询" },
            { key: 1, id: "微信公众号" },
            { key: 2, id: "微信小程序" },
            { key: 3, id: "IOS" },
            { key: 4, id: "安卓" },
            { key: 4, id: "QQ" },
            { key: 4, id: "微信" }
          ],
          optionValue: "key",
          optionLabel: "id"
        }
      ],
      searchField: {},
      columns: [
        {
          title: "用户名",
          dataIndex: "name",
          key: "1",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "留言时间",
          dataIndex: "leaveFollowTime",
          key: "2"
        },
        {
          title: "当前状态",
          dataIndex: "leaveStatus",
          key: "3",
          customRender: value => {
            let con = {
              children: (
                <div>
                  {value == 0 && <div style="color:#f99921">未处理</div>}
                  {value == 1 && <div>已处理</div>}
                </div>
              )
            };
            return con;
          }
        },
        {
          title: "处理结果",
          dataIndex: "leaveResult",
          key: "4"
        },
        {
          title: "跟进人",
          dataIndex: "leaveFollowName",
          key: "5"
        },
        {
          title: "处理时间",
          dataIndex: "leaveFollowTime",
          key: "6"
        },
        {
          title: "来源终端",
          dataIndex: "channelType",
          key: "7",
          customRender: value => {
            let obj = {
              "0": "网站咨询",
              "1": "微信公众号",
              "2": "微信小程序",
              "3": "IOS",
              "4": "安卓",
              "5": "QQ",
              "6": "微信"
            };
            return obj[value];
          }
        }
      ],
      dataSource: [],
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      detailsShow: false,
      guestImAccount: "",
      handleRecordBtn: false,
      detailsId: "",
      leaveModalShow: false,
      resultContent: "",
      guestId: "",
      sessionObj: {},
      handleResultCon: {
        name: "",
        con: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.Request.get("/hfw/hfwSessionInfo/leave/listPageJson", {
        ...this.pager,
        ...this.searchField
      }).then(res => {
        let data = res.data;
        let page = data.pager;
        this.dataSource = data.list;
        this.pager = Object.assign({}, this.pager, page);
      });
    },
    prevHandleSubmit(val) {
      let obj = {}
      for(let key in val){
        if(val[key] != 'null'){
          obj[key] = val[key]
        }
      }
      this.searchField = Object.assign({}, this.searchField, obj);
      this.getList();
    },
    checkMessage(id, status) {
      // 调取接口
      //  "0":'未处理',  "1":'已处理'
      console.log(id, "--", status);
      this.handleRecordBtn = status ? false : true;
      this.detailsShow = true;
      this.Request.get("/hfw/hfwSessionInfo/infoJson?id=" + id).then(res => {
        console.log(res.data.data, "记录详情");
        let data = res.data.data;
        this.detailsId = data.id;
        this.guestId = data.guestId;
        this.handleResultCon.con = data.leaveResult;
        this.handleResultCon.name = data.leaveFollowName;
        this.sessionObj = {
          orgId: data.orgId,
          sessionId: data.id,
          msgTimeEnd: moment(data.lastMsgTime).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          ),
          type: 2,
          serviceImAccount: data.serviceImAccount
        };
      });
    },
    handleCancel() {
      this.sessionObj = {};
      this.handleResultCon = {
            name: '',
            con: ''
      }
      this.detailsShow = false;
    },
    paginationChange(values) {
      this.pager = values;
      this.getList();
    },
    setHandleResult() {
      this.leaveModalShow = true;
      this.resultContent = "";
    },
    handleleaveModalCancel() {
      this.leaveModalShow = false;
    },
    handleleaveModalOk() {
      let params = {
        id: this.detailsId,
        leaveResult: this.resultContent,
        leaveStatus: 1
      };
      this.Request.post("/hfw/hfwSessionInfo/updateStatus", params).then(
        res => {
          console.log(res);
          this.leaveModalShow = false;
          this.handleRecordBtn = false;
          this.handleResultCon = {
            name: res.data.leaveFollowName,
            con: this.resultContent
          }
            this.getList();
          // this.handleResultCon.con = this.resultContent
        }
      );
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
.page_pagination {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
}
.record-detail {
  display: flex;
  .message {
    width: 380px;
    border-right: 1px solid #e6e6e6;
  }
  .information {
    margin-left: 48px;
    width: 384px;
  }
}
.searchStyle {
  padding: 20px 10px 30px 20px;
}
</style>
