<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource"></a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        columns: [
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
        ]
    };
  },
  props: {
    dataSource:Array,
    columnsData: {
      type: Array
    },
    columnsIndex: ""
    // [{inserColumns:[],insertIndex:"summaryRate"}]
  },
  created() {
      
  },
  watch: {}
};
</script>

<style>
</style>