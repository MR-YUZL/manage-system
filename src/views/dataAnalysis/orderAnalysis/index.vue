<template>
  <div>
    <a-page-header title="工单统计" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
    <div class="groupAnalyze">
      <span></span>
      <a-button type="primary">导出</a-button>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="false"></a-table>
    <a-table :columns="detailColumns" :dataSource="detailDataSource" :pagination="false"></a-table>
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
      columns: [],
      dataSource: [],
      detailColumns: [],
      detailDataSource: []
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