<template>
  <div>
    <a-page-header title="历史会话" style="padding:16px 0;" />

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
            <span class="blue" @click="skipDetail(row.id)">{{row.id}}</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
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
          <!-- <MessageDetail
            :recordList="recordList"
            :handleRecordBtn="handleRecordBtn"
            :handleResult="handleResultCon"
            @setHandleResult="setHandleResult"
          />-->
          <BaseForm
            :formObject="formObject"
            :defaultValues="formAxiosReturnValues"
            @toggleModal="toggleModal"
            @formSubmit="formSubmit"
          />
        </div>
        <div class="information">
          <UserInformation :guestId="guestId" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import UserInformation from "@/components/userInf";
// import MessageDetail from "@/views/messageRecord/messageDetail";
import BaseForm from "@/components/BaseForm";
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
          type: "input",
          title: "会话ID",
          placeholder: "请输入",
          key: "id"
          // defaultValue: '',
        },
        {
          type: "dateRange",
          title: "会话时间",
          key: "queryTime",
          ranges: {
            今日: [moment(), moment()],
            // 昨天: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            本周: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: "select",
          title: "会话来源:",
          key: "channelType",
          defaultValue: "null",
          options: [
            { value: "null", name: "全部" },
            { value: 2, name: "网站咨询" },
            { value: 0, name: "微信公众号" },
            { value: 1, name: "微信小程序" },
            { value: 3, name: "app" },
            { value: 5, name: "QQ" },
            { value: 4, name: "微信" }
          ]
        },
        {
          type: "input",
          title: "接待客服",
          placeholder: "请输入",
          key: "serviceAccs"
        },
        {
          type: "input",
          title: "姓名",
          placeholder: "请输入",
          key: "name"
        },
        {
          type: "input",
          title: "咨询分类",
          placeholder: "请输入",
          key: "consultType"
        }
      ],
      columns: [
        {
          title: "会话ID",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: "idSkip" }
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
          title: "会话时长/轮次",
          dataIndex: "sessionSum",
          key: "sessionSum"
        },
        {
          title: "会话来源",
          dataIndex: "channelType",
          key: "channelType",
          customRender: value => {
            let con = {
              children: (
                <div>
                  {value == 0 && <div>网站咨询</div>}
                  {value == 1 && <div>微信公众号</div>}
                  {value == 2 && <div>微信小程序</div>}
                  {value == 3 && <div>IOS</div>}
                  {value == 4 && <div>安卓</div>}
                  {value == 5 && <div>QQ</div>}
                  {value == 6 && <div>微信</div>}
                </div>
              )
            };
            return con;
          }
        },
        {
          title: "平均响应时长",
          dataIndex: "laveResponseDuration",
          key: "laveResponseDuration"
        },
        {
          title: "接待客服",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "咨询分类",
          dataIndex: "consultType",
          key: "consultType"
        },
        {
          title: "会话结束时间",
          dataIndex: "endTime",
          key: "endTime"
        },
        {
          title: "满意度",
          dataIndex: "appraiseValue",
          key: "appraiseValue",
          customRender: value => {
            let con = {
              children: (
                <div>
                  {value == 0 && <div>不太愿意</div>}
                  {value == 1 && <div>一般满意</div>}
                  {value == 2 && <div>满意</div>}
                  {value == 3 && <div>很满意</div>}
                  {value == 4 && <div>非常满意</div>}
                </div>
              )
            };
            return con;
          }
        }
      ], // 表头
      dataSource: [], // 表格数据
      //弹窗
      detailsShow: false,
      recordList: [],
      guestId: "",
      handleRecordBtn: "",
      handleResultCon: {
        name: "",
        con: ""
      },
      params: {
        id: "",
        queryTime: "",
        channelType: "",
        serviceAccs: "",
        name: ""
      },
      formAxiosReturnValues: {
        id: "id_123",
        test: "hello"
      },
      formObject: {
        ref: "testModal",
        sureBtn:'保存并更新',
        modelList: [
          {
            type: "cascader",
            label: "咨询分类",
            placeholder: "请选择",
            model: undefined,
            ruleName: "receiverGroupId",
            options: [],
            rules: {
              required: true,
              message: "请选择咨询分类",
              trigger: "change"
            }
          },
          {
            type: "select",
            label: "解决问题",
            placeholder: "请选择",
            model: undefined,
            ruleName: "receiverGroupId", 
            options: [
              { key: "1", value: "已解决" },
              { key: "2", value: "未解决" }
            ],
            rules: {
              required: true,
              message: "请选择咨询分类",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "咨询备注",
            placeholder: "请选择",
            model: undefined,
            ruleName: "receiverGroupId" //receiverGroupId 工单受理组id
          }
        ]
      }
    };
  },
  components: {
    Search,
    TablePagination,
    UserInformation,
    // MessageDetail
    BaseForm
  },
  mounted() {
    this.getList(this.params);
  },
  methods: {
    toggleModal() {},
    formSubmit(data) {
      console.log(data,'data')
    },
    getList(params) {
      api.sessionList(params).then(res => {
        console.log("=========", res);
        if (res.data.status) {
          this.dataSource = res.data.list;
        }
      });
    },

    searchFun() {},
    onSelectChange() {},
    paginationChange() {},
    //弹窗
    skipDetail(id) {
      console.log(id, "==========id");
      this.Request.get("/hfw/tsmHfwLeaveComments/infoJson?id=" + id).then(
        res => {
          let data = res.data.data;
          this.handleResultCon.con = data.result;
          this.handleResultCon.name = data.followAccName;
          this.recordList = data.detailBeanList;
          this.guestId = data.guestId;
        }
      );
      this.detailsShow = true;
    },
    handleCancel() {
      this.detailsShow = false;
    },
    setHandleResult() {}
  }
};
</script>

<style lang="less" scoped>
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
</style>