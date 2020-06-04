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
      <a-button type="primary">导出</a-button>
    </div>
    <a-table :columns="groupColumns" :dataSource="groupDataSource" :pagination="false"></a-table>
    <div class="groupAnalyze">
      <span>按人分析</span>
      <a-button type="primary">导出</a-button>
    </div>
    <a-table :columns="memberColumns" :dataSource="memberDataSource" :pagination="false">
      <span slot="name" slot-scope="text, record">
        <span class="blue">个人明细</span>
      </span>
      <span slot="out" slot-scope="text, record">{{record.callOutAllNum}}/{{record.callOutAnswerNum}}</span>
        <span slot="in" slot-scope="text, record">{{record.inCallAllNum}}/{{record.inCallAnswerNum}}</span>
    </a-table>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
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
          scopedSlots: { customRender: 'name' },
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
          scopedSlots: { customRender: 'out' },
        },
        {
          title: "呼入量/已接",
          dataIndex: "inCallAllNum",
          key: "inCallAllNum",
          scopedSlots: { customRender: 'in' },
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
      groupDataSource: [
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
          scopedSlots: { customRender: 'out' },
        },
        {
          title: "呼入量/已接",
          dataIndex: "inCallAllNum",
          key: "inCallAllNum",
          scopedSlots: { customRender: 'in' },
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
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
        }
      ],
      defaultSearchFormValues: {}
    };
  },
  components: {
    FormModelSearchForm
  },
  methods: {
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