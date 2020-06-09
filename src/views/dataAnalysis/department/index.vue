<template>
  <div>
    <a-page-header title="部门统计" style="padding:16px 0;" />
    <div>
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
    </div>
    <div class="groupAnalyze">
      <span>按组分析</span>
      <a-button type="primary" @click="exportGroup">导出</a-button>
    </div>
    <a-table
      :columns="groupColumns"
      :dataSource="groupDataSource"
      :pagination="false"
      :customRow="handleClickRow"
    >
      <span
        slot="out"
        slot-scope="text, record"
      >{{record.callOutAllNum}}/{{record.callOutAnswerNum}}</span>
      <span slot="in" slot-scope="text, record">{{record.inCallAllNum}}/{{record.inCallAnswerNum}}</span>
    </a-table>
    <div class="groupAnalyze">
      <span>按人分析</span>
      <a-button type="primary" @click="exportMember">导出</a-button>
    </div>
    <a-table :columns="memberColumns" :dataSource="memberDataSource" :pagination="false">
      <span slot="name" slot-scope="text, record">
        <span class="blue" @click="detailFn(record.account)">个人明细</span>
      </span>
      <span
        slot="out"
        slot-scope="text, record"
      >{{record.callOutAllNum}}/{{record.callOutAnswerNum}}</span>
      <span slot="in" slot-scope="text, record">{{record.inCallAllNum}}/{{record.inCallAnswerNum}}</span>
    </a-table>

    <a-modal
      title="导出"
      :visible="exportModal.showGroup"
      v-if="exportModal.showGroup"
      @cancel="handleCancelExportGroup"
      @ok="handleOkExportGroup"
    >
      是否确认导出按组分析的数据？
      <br />本次导出条数据
    </a-modal>
    <a-modal
      title="导出"
      :visible="exportModal.showMember"
      v-if="exportModal.showMember"
      @cancel="handleCancelExportMember"
      @ok="handleOkExportMember"
    >
      是否确认导出按人分析的数据？
      <br />本次导出条数据
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      exportModal: {
        showMember: false,
        showGroup: false
      },
      memberDataSource: [
        {
          key: "1",
          groupName: "0",
          callTotalNum: "inputtime"
        },
        {
          key: "2",
          groupName: "0",
          callTotalNum: "inputtime"
        }
      ],
      memberColumns: [
        {
          title: "操作",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "技能组",
          dataIndex: "groupName",
          key: "groupName"
        },
        {
          title: "客服姓名",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "话务量总数",
          dataIndex: "callTotalNum",
          key: "callTotalNum"
        },
        {
          title: "呼出量/已接",
          dataIndex: "callOutAllNum",
          key: "callOutAllNum",
          scopedSlots: { customRender: "out" }
        },
        {
          title: "呼入量/已接",
          dataIndex: "inCallAllNum",
          key: "inCallAllNum",
          scopedSlots: { customRender: "in" }
        },
        {
          title: "通话总时长",
          dataIndex: "callTotalTime",
          key: "callTotalTime"
        },
        {
          title: "呼入时长",
          dataIndex: "callInTime",
          key: "callInTime"
        },
        {
          title: "呼出时长",
          dataIndex: "callOutTime",
          key: "callOutTime"
        },
        {
          title: "平均通话时长",
          dataIndex: "avgCallTime",
          key: "avgCallTime"
        },
        {
          title: "平均呼入时长",
          dataIndex: "avgCallInTime",
          key: "avgCallInTime"
        },
        {
          title: "平均呼出时长",
          dataIndex: "avgCallOutTime",
          key: "avgCallOutTime"
        },
        {
          title: "小结完成率",
          dataIndex: "summaryRate",
          key: "summaryRate"
        }
      ],
      groupDataSource: [],
      groupColumns: [
        {
          title: "技能组",
          dataIndex: "groupName",
          key: "groupName"
        },
        {
          title: "话务量总数",
          dataIndex: "callTotalNum",
          key: "callTotalNum"
        },
        {
          title: "呼出量/已接",
          dataIndex: "callOutAllNum",
          key: "callOutAllNum",
          scopedSlots: { customRender: "out" }
        },
        {
          title: "呼入量/已接",
          dataIndex: "inCallAllNum",
          key: "inCallAllNum",
          scopedSlots: { customRender: "in" }
        },
        {
          title: "通话总时长",
          dataIndex: "callTotalTime",
          key: "callTotalTime"
        },
        {
          title: "呼入时长",
          dataIndex: "callInTime",
          key: "callInTime"
        },
        {
          title: "呼出时长",
          dataIndex: "callOutTime",
          key: "callOutTime"
        },
        {
          title: "平均通话时长",
          dataIndex: "avgCallTime",
          key: "avgCallTime"
        },
        {
          title: "平均呼入时长",
          dataIndex: "avgCallInTime",
          key: "avgCallInTime"
        },
        {
          title: "平均呼出时长",
          dataIndex: "avgCallOutTime",
          key: "avgCallOutTime"
        },
        {
          title: "小结完成率",
          dataIndex: "summaryRate",
          key: "summaryRate"
        }
      ],
      searchFormList: [
        {
          type: "select",
          name: "inputAccs",
          label: "部门",
          mode: "multiple",
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName"
        },
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
        }
      ],
      defaultSearchFormValues: {
        // inputDateStart:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
        inputDateStart: ["2020-06-03", "2020-06-08"]
      },
      searchParams: {},
      groupId: ""
    };
  },
  components: {
    FormModelSearchForm
  },
  mounted() {
    this.getPhoneDepartmentInfo();
    this.getSeviceAcc();
  },
  methods: {
    getPhoneDepartmentInfo() {
      let promise = new Promise((resolve, reject) => {
        let dateObj = Object.assign(
          {},
          this.defaultSearchFormValues,
          this.searchParams
        );
        let dateArr = dateObj.inputDateStart;
        let params = {
          beginDate: dateArr[0],
          endDate: dateArr[1],
          analysisType: 0
        };
        api.phoneDepartmentInfo(params).then(res => {
          resolve(res);
          console.log("电话客服-按组分析", res);
          this.groupDataSource = res.data.list;
          this.groupId = res.data.list[0].groupId;
        });
      });
      promise.then(res => {
        let dateObj = Object.assign(
          {},
          this.defaultSearchFormValues,
          this.searchParams
        );
        let dateArr = dateObj.inputDateStart;
        let params = {
          beginDate: dateArr[0],
          endDate: dateArr[1],
          analysisType: 1,
          groupIds: this.groupId
        };
        api.phoneDepartmentInfo(params).then(res => {
          console.log("电话客服-按人分析", res);
          this.memberDataSource = res.data.list;
        });
      });
    },
    handleClickRow(record, index) {
      return {
        on: {
          click: () => {
            // this.detailShowTable = true;
            let dateObj = Object.assign(
              {},
              this.defaultSearchFormValues,
              this.searchParams
            );
            let dateArr = dateObj.inputDateStart;
            let params = {
              beginDate: dateArr[0],
              endDate: dateArr[1],
              groupIds: record.groupId,
              analysisType: 1
            };
            api.phoneDepartmentInfo(params).then(res => {
              this.memberDataSource = res.data.list;
            });
          }
        }
      };
    },
    getSeviceAcc() {
      api.sessionServiceGroups().then(res => {
        console.log(res, "部门");
        this.searchFormList[0].options = res.data.list;
      });
    },
    detailFn(account) {
      let dateObj = Object.assign(
        {},
        this.defaultSearchFormValues,
        this.searchParams
      );
      let dateArr = dateObj.inputDateStart;
      let params = {
        beginDate: dateArr[0],
        endDate: dateArr[1],
        serviceAcc: account
      };
      this.$router.push({ path: "/dataAnalysis/personDetail", query: params });
    },
    prevHandleSubmit(val) {},
    exportGroup() {
      this.exportModal.showGroup = true;
    },
    exportMember() {
      this.exportModal.showMember = true;
    },
    handleCancelExportGroup() {
      this.exportModal.showGroup = false;
    },
    handleCancelExportMember() {
      this.exportModal.showMember = false;
    },
    handleOkExportGroup() {
      ///
      let param = {
        list:this.groupDataSource
      }
      console.log(param,'param')
      let url =`/phoneSerivce/data/groupReportExport?${param}`;
      window.location.href = url;
    },
    handleOkExportMember() {
      ///
      let param = {
        list:this.memberDataSource
      }
      let url =`/phoneSerivce/data/personReportExport?${param}`;
      window.location.href = url;
    }
  }
};
</script>

<style lang="less" scoped>
.groupAnalyze {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}
</style>