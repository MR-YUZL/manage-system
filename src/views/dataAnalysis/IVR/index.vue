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
      :rowKey="record => record.id"
    >
    </a-table>
    <div class="groupAnalyze">
      <span>IVR呼叫分配统计</span>
    </div>
    <a-table
      :columns="callColumns"
      :dataSource="callDataSource"
      :pagination="false"
      :rowKey="record => record.id"
    >
    </a-table>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import analysis from "@/utils/analysis.js";
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
          name: "groupIds",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName",
          placeholder: "全部技能组"
        }
      ],
      defaultSearchFormValues: {
        inputDateStart:[moment().subtract(1, "days").format("YYYY-MM-DD"),moment().subtract(1, "days").format("YYYY-MM-DD")]
      },
      searchParams:{},
      columns:[
        {
          title: "技能组",
          dataIndex: "groupName",
          key: "groupName"
        },
        {
          title: "接待分配量",
          dataIndex: "receiveNum",
          key: "receiveNum"
        },
        {
          title: "平均排队用时",
          dataIndex: "avgWaitTime",
          key: "avgWaitTime"
        },
        {
          title: "接通量",
          dataIndex: "connectNum",
          key: "connectNum"
        },
        {
          title: "平均接通用时",
          dataIndex: "avgConnectTime",
          key: "avgConnectTime"
        },
        {
          title: "客服未接通量",
          dataIndex: "notConnectNum",
          key: "notConnectNum"
        },
        {
          title: "无客服在线量",
          dataIndex: "notOnLine",
          key: "notOnLine"
        },
        {
          title: "排队放弃量",
          dataIndex: "giveUpNum",
          key: "giveUpNum"
        },
        {
          title: "接通成功率",
          dataIndex: "connectRate",
          key: "connectRate"
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
          dataIndex: "receiveNum",
          key: "receiveNum"
        },
        {
          title: "平均排队用时",
          dataIndex: "avgWaitTime",
          key: "avgWaitTime"
        },
        {
          title: "接通量",
          dataIndex: "connectNum",
          key: "connectNum"
        },
        {
          title: "平均接通用时",
          dataIndex: "avgConnectTime",
          key: "avgConnectTime"
        },
        {
          title: "客服未接通量",
          dataIndex: "notConnectNum",
          key: "notConnectNum"
        },
        {
          title: "排队放弃量",
          dataIndex: "giveUpNum",
          key: "giveUpNum"
        },
        {
          title: "接通成功率",
          dataIndex: "connectRate",
          key: "connectRate"
        },
      ],
      callDataSource:[]
    };
  },
  components: {
    FormModelSearchForm
  },
  mounted(){
    this.getIvrReport();
    let receiveList =  analysis.getSkill();
    receiveList.then((res)=>{
      this.searchFormList[1].options = res;
    })
  },
  methods: {
    getIvrReport(){
      
      let{inputDateStart,groupIds} = this.searchParams
      let dateArr = inputDateStart.split(',')
      let inputAccs = ''
      if(groupIds&&groupIds.length){
        inputAccs = groupIds.join()
      }
      let params = {
        beginDate: dateArr[0],
        endDate: dateArr[1],
        groupIds:inputAccs
      }
      api.ivrReport(params).then(res=>{
        console.log('ivr导航数据分析',res.data)
        if(res.data.status){
          let {groupAnalysis,personAnalysis} = res.data.data
          this.dataSource = groupAnalysis;
          this.callDataSource = personAnalysis;
        }
      })
    },
    prevHandleSubmit(data) {
      console.log(data,'data')
      this.searchParams = { ...data }
      this.getIvrReport();
    }
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