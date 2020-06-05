<template>
  <div>
    <a-page-header title="坐席管控" style="padding:16px 0;" />
    <a-tabs default-active-key="1" @change="changeTabFn">
      <a-tab-pane key="1" tab="坐席考勤">
        <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
          @prevHandleSubmit="prevHandleSubmit"
        />
        <div class="groupAnalyze">
          <span></span>
          <a-button type="primary">导出</a-button>
        </div>
        <a-table :columns="seatColumns" :dataSource="seatDataSource" :pagination="false"></a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="会话数据" force-render>
          <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
          @prevHandleSubmit="prevHandleSubmit"
        />
        <div class="groupAnalyze">
          <span></span>
          <a-button type="primary">导出</a-button>
        </div>
        <a-table :columns="sessionColumns" :dataSource="sessionDataSource" :pagination="false"></a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="质检统计">

      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      seatColumns: [
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
      seatDataSource: [],
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "查询时间"
        },
        {
          type: "select",
          name: "inputAccs",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "key",
          optionLabel: "id"
        }
      ],
      defaultSearchFormValues: {},
      sessionColumns:[
          {
          title: "客服姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "会话接待总量",
          dataIndex: "groupName",
          key: "groupName"
        },
      ],
      sessionDataSource:[]
    };
  },
  components: {
    FormModelSearchForm
  },
  methods: {
    changeTabFn() {},
    prevHandleSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.groupAnalyze {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
</style>