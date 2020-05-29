<template>
  <div>
    <a-page-header title="在线质检" style="padding:16px 0;" />
    <div class="box">
      <!-- <Search :tools="searchList" @onSearch="searchFun" /> -->
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
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
    <Detail
      v-if="qcId"
      :detailsShow="detailsShow"
      :qcId="qcId"
      :type="qcType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
// import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import Detail from "@/views/qualityTesting/detail";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  components: {
    FormModelSearchForm,
    TablePagination,
    Detail
  },
  data() {
    return {
      qcId: "",
      qcType: 0,
      detailsShow: false,
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      defaultSearchFormValues:{},
      searchFormList: [
        {
          type: "rangepicker",
          label: "会话时间",
          name: "sessionDate",
          
        },
        {
          type: "select",
          label: "问题解决状态",
          name: "status",
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "未解决" },
            { key: 1, id: "已解决" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "select",
          label: "质检人",
          name: "qcAcc",
          options: []
        },
        {
          type: "input",
          label: "咨询分类",
          name: "inputAccs"
        },
        {
          type: "select",
          label: "接待客服:",
          name: "serviceAccs",
          options: []
          
        },
        {
          type: "select",
          label: "客服组",
          name: "serviceGroupId",
          options: []
        },
        {
          type: "select",
          label: "质检状态:",
          name: "qcStatus",
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "未质检" },
            { key: 1, id: "已质检" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "inputCompact",
          label: "会话时长",
          placeholder: "请输入",
          name: "sessionTime"
        },
        {
          type: "input",
          label: "会话ID",
          placeholder: "请输入",
          name: "sessionId"
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
      searchParams: {
        //客服组ID
        // serviceGroupId:'123',
        //质检状态(1已质检、0未质检)
        // qcStatus:'0',
      }
    };
  },

  mounted() {
    this.getList();
    this.getSessionAccMember();
    this.getSessionServiceGroups()
  },
  methods: {
    prevHandleSubmit(val){
      console.log(val,'val')
      this.searchParams = Object.assign({},this.searchParams,val)
      this.getList();
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      }
      api.sessionOnlineList(params).then(res => {
        console.log("会话列表", res);
        this.dataSource = res.data.list;
        this.pager = res.data.pager;
      });
    },
    getSessionAccMember(){
      api.sessionAccMember().then(res=>{
        console.log('质检人和接待客服',res)
        if(res.data.status){
          let labels = JSON.parse(JSON.stringify(res.data.list).replace(/userName/g, "label"));
          let  lists= JSON.parse(JSON.stringify(labels).replace(/userAccount/g, "value"));
          this.searchFormList[2].options = lists;
          this.searchFormList[4].options = lists;
        }
      })
    },
    getSessionServiceGroups(){
      api.sessionServiceGroups().then(res=>{
        console.log('客服组',res)
        if(res.data.status){
          let labels = JSON.parse(JSON.stringify(res.data.list).replace(/groupName/g, "label"));
          let  lists= JSON.parse(JSON.stringify(labels).replace(/groupId/g, "value"));
          this.searchFormList[5].options = lists;
        }
      })
    },
    qualityDetail(id) {
      this.qcId = id;
      this.detailsShow = true;
      // this.getDetailInfo({id:id})
    },
    closeModal() {
      this.detailsShow = false;
    },
    tabChange() {},
    searchFun() {},
    onSelectChange() {},
    paginationChange(values) {
      this.pager = values;
      this.getList();
    }
  },
  watch: {},
  computed: {}
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