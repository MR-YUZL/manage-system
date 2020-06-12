<template>
  <div>
    <a-page-header title="IVR导航分析" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    >
    </a-table>
    <div class="groupAnalyze">
      <span>IVR呼叫分配统计</span>
    </div>
    <a-table
      :columns="callColumns"
      :dataSource="callDataSource"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
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
      columns:[
        {
          title: "技能组",
          dataIndex: "1",
          key: "1"
        },
        {
          title: "接待分配量",
          dataIndex: "2",
          key: "2"
        },
        {
          title: "平均排队用时",
          dataIndex: "3",
          key: "3"
        },
        {
          title: "接通量",
          dataIndex: "4",
          key: "4"
        },
        {
          title: "平均接通用时",
          dataIndex: "5",
          key: "5"
        },
        {
          title: "客服未接通量",
          dataIndex: "6",
          key: "6"
        },
        {
          title: "无客服在线量",
          dataIndex: "7",
          key: "7"
        },
        {
          title: "排队放弃量",
          dataIndex: "8",
          key: "8"
        },
        {
          title: "接通成功率",
          dataIndex: "9",
          key: "9"
        },
      ],
      dataSource:[],
      callColumns:[
        {
          title: "客服姓名",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "接待分配量",
          dataIndex: "2",
          key: "2"
        },
        {
          title: "平均排队用时",
          dataIndex: "3",
          key: "3"
        },
        {
          title: "接通量",
          dataIndex: "4",
          key: "4"
        },
        {
          title: "平均接通用时",
          dataIndex: "5",
          key: "5"
        },
        {
          title: "客服未接通量",
          dataIndex: "6",
          key: "6"
        },
        {
          title: "排队放弃量",
          dataIndex: "8",
          key: "8"
        },
        {
          title: "接通成功率",
          dataIndex: "9",
          key: "9"
        },
      ],
      callDataSource:[]
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
  padding: 20px;
  line-height: 32px;
}
</style>