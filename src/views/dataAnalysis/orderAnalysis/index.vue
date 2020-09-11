<template>
  <div>
    <a-page-header title="工单统计" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
    <!-- <div class="groupAnalyze">
      <span></span>
      <a-button type="primary" @click="exportOrder">导出</a-button>
    </div> -->
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :customRow="handleClickRow"
    ></a-table>
    <p class="serviceInfo" v-if="serviceInfo">{{serviceInfo}}明细</p>
    <a-table v-if="detailShowTable" :columns="detailColumns" :dataSource="detailDataSource" :pagination="false"></a-table>
  </div>
</template>

<script>
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import moment from 'moment';
import analysis from "@/utils/analysis.js";
import qs from "qs";
export default {
  data() {
    return {
      serviceInfo:'',
      detailShowTable:false,
      searchParams: {},
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "查询时间",
        },
        {
          type: "select",
          name: "inputAcc",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName",
          placeholder: "全部技能组"
        }
      ],
      defaultSearchFormValues: {
        inputDateStart:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
      },
      columns: [
        {
          title: "客服姓名",
          dataIndex: "inputAccName",
          key: "inputAccName"
        },
        {
          title: "创建工单量",
          dataIndex: "createCount",
          key: "createCount"
        },
        {
          title: "受理工单量",
          dataIndex: "receiverCount",
          key: "receiverCount"
        },
        {
          title: "完结工单量",
          dataIndex: "endCount",
          key: "endCount"
        },
        {
          title: "转接工单量",
          dataIndex: "transferCount",
          key: "transferCount"
        },
        {
          title: "跟进工单量",
          dataIndex: "followCount",
          key: "followCount"
        },
        {
          title: "平均首次响应时间",
          dataIndex: "firstResponseTime",
          key: "firstResponseTime"
        },
        {
          title: "平均处理时间",
          dataIndex: "responseTime",
          key: "responseTime"
        }
      ],
      dataSource: [],
      detailColumns: [
        {
          title: "日期",
          dataIndex: "firstResponseTime",
          key: "firstResponseTime"
        },
        {
          title: "客服姓名",
          dataIndex: "inputAccName",
          key: "inputAccName"
        },
        {
          title: "创建工单量",
          dataIndex: "createCount",
          key: "createCount"
        },
        {
          title: "受理工单量",
          dataIndex: "receiverCount",
          key: "receiverCount"
        },
        {
          title: "完结工单量",
          dataIndex: "endCount",
          key: "endCount"
        },
        {
          title: "转接工单量",
          dataIndex: "transferCount",
          key: "transferCount"
        },
        {
          title: "跟进工单量",
          dataIndex: "followCount",
          key: "followCount"
        },
      ],
      detailDataSource: []
    };
  },
  components: {
    FormModelSearchForm
  },
  mounted() {
    this.getOrderAccList();
    let receiveList =  analysis.getSkill();
    receiveList.then((res)=>{
      this.searchFormList[1].options = res;
    })
  },
  methods: {
    moment,
    handleClickRow(record,index){
      return{
        on:{
          click:()=>{
            this.detailShowTable = true;
            let dateObj = {
              ...this.searchParams
            }
            let dateArr = dateObj.inputDateStart
            let params = {
              startDate:dateArr[0],
              endDate:dateArr[1],
              inputAcc:record.inputAcc
            }
            this.serviceInfo = record.inputAccName
            api.orderDetailList(params).then(res=>{
              console.log('工单工作分析明细',res)
              this.detailDataSource = res.data.list;
            })
            console.log(record.inputAcc,index);
          }
        }
      }
    },
    getOrderAccList() {
      let{inputDateStart,inputAcc} = this.searchParams
      console.log(inputDateStart,'inputDateStart')
      let inputAccs = ''
      if(inputAcc&&inputAcc.length){
        inputAccs = inputAcc.join()
      }
      let params = {
        startDate:inputDateStart[0],
        endDate:inputDateStart[1],
        inputAcc:inputAccs
      }
      api.orderAccList(params).then(res => {
        console.log("工单工作分析", res);
        this.dataSource = res.data.list;
        // if(res.data.list&&res.data.list.length>0){

          
        // }
      });
    },
    prevHandleSubmit(data) {
      this.searchParams = { ...data }
      this.getOrderAccList();
    },
  }
};
</script>

<style lang="less" scoped>
.groupAnalyze {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.serviceInfo{
  margin-bottom: 0;
  padding: 20px 0 20px 15px;
}
</style>