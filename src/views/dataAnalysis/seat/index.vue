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
          <a-button type="primary" @click="exportSeat">导出</a-button>
        </div>
        <a-table :columns="seatColumns" :dataSource="seatDataSource" :pagination="false" :rowKey="record => record.id"></a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="会话数据" force-render>
          <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
          @prevHandleSubmit="prevHandleSubmit"
        />
        <div class="groupAnalyze">
          <span></span>
          <a-button type="primary" @click="exportSession">导出</a-button>
        </div>
        <a-table :columns="sessionColumns" :dataSource="sessionDataSource" :pagination="false" :rowKey="record => record.id"></a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="质检统计">
        <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
          @prevHandleSubmit="prevHandleSubmit"
        />
        <div class="groupAnalyze">
          <span></span>
          <a-button type="primary" @click="exportQuality">导出</a-button>
        </div>
        <a-table :columns="qcColumns" :dataSource="qcDataSource" :pagination="false" :rowKey="record => record.id"></a-table>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title="导出"
      :visible="exportModal.showSeat"
      v-if="exportModal.showSeat"
      @cancel="handleCancelExportSeat"
      @ok="handleOkExportSeat"
    >
      是否确认导出坐席考勤的数据？
      <br />本次导出{{seatDataSource.length}}条数据
    </a-modal>
    <a-modal
      title="导出"
      :visible="exportModal.showSession"
      v-if="exportModal.showSession"
      @cancel="handleCancelExportSession"
      @ok="handleOkExportSession"
    >
      是否确认导出会话数据的数据？
      <br />本次导出{{sessionDataSource.length}}条数据
    </a-modal>
    <a-modal
      title="导出"
      :visible="exportModal.showQc"
      v-if="exportModal.showQc"
      @cancel="handleCancelExportQc"
      @ok="handleOkExportQc"
    >
      是否确认导出质检统计的数据？
      <br />本次导出{{qcDataSource.length}}条数据
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import analysis from "@/utils/analysis.js";
import qs from "qs";
export default {
  data() {
    return {
      exportModal:{
        showSeat:false,
        showSession:false,
        showQc:false
      },
      seatColumns: [
        
        {
          title: "日期",
          dataIndex: "date",
          key: "date"
        },
        {
          title: "客服姓名",
          dataIndex: "serviceAccName",
          key: "serviceAccName"
        },
        {
          title: "首次登录时间",
          dataIndex: "firstLoginTime",
          key: "firstLoginTime"
        },
        {
          title: "首次在线时间",
          dataIndex: "firstOnlineTime",
          key: "firstOnlineTime",
        },
        {
          title: "小休次数",
          dataIndex: "sleepCount",
          key: "sleepCount",
        },
        {
          title: "小休时长",
          dataIndex: "sleepDuration",
          key: "sleepDuration"
        },
        {
          title: "在线时长",
          dataIndex: "onlineDuration",
          key: "onlineDuration"
        },
        {
          title: "挂起时长",
          dataIndex: "suspendDuration",
          key: "suspendDuration"
        },
        {
          title: "最后登出时间",
          dataIndex: "lastLogoutTime",
          key: "lastLogoutTime"
        },
        
      ],
      seatDataSource: [],
      searchFormList: [
        {
          type: "rangepicker",
          name: "loginDate",
          label: "查询时间"
        },
        {
          type: "select",
          name: "serviceAccs",
          label: "技能组",
          mode: "multiple",
          placeholder:'请选择',
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName"
        }
      ],
      defaultSearchFormValues: {
        loginDate:[moment().subtract(1, "days").format("YYYY-MM-DD"),moment().subtract(1, "days").format("YYYY-MM-DD")],
      },
      sessionColumns:[
          {
          title: "客服姓名",
          dataIndex: "serviceAccName",
          key: "serviceAccName",
        },
        {
          title: "会话接待总量",
          dataIndex: "sessionNum",
          key: "sessionNum"
        },
        {
          title: "有效会话数",
          dataIndex: "validSessionNum",
          key: "validSessionNum"
        },
        {
          title: "消息总数",
          dataIndex: "msgNum",
          key: "msgNum"
        },
        {
          title: "转接量",
          dataIndex: "transferNum",
          key: "transferNum"
        },
        {
          title: "未分类会话量",
          dataIndex: "unWriteSummaryNum",
          key: "unWriteSummaryNum"
        },
        {
          title: "平均首次响应时间",
          dataIndex: "avgFirstRespTime",
          key: "avgFirstRespTime"
        },
        {
          title: "平均会话响应时间",
          dataIndex: "avgRespTime",
          key: "avgRespTime"
        },
        {
          title: "会话满意率",
          dataIndex: "satisfiedRatio",
          key: "satisfiedRatio"
        },
        {
          title: "问题处理率",
          dataIndex: "handledRatio",
          key: "handledRatio"
        },
        {
          title: "生成线索数",
          dataIndex: "clueNum",
          key: "clueNum"
        },
      ],
      sessionDataSource:[],
      searchParams:{},
      qcColumns:[
        {
          title: "客服姓名",
          dataIndex: "serviceAccName",
          key: "serviceAccName",
        },
        {
          title: "电话接待量",
          dataIndex: "phoneNum",
          key: "phoneNum",
        },
        {
          title: "会话接待量",
          dataIndex: "chatNum",
          key: "chatNum",
        },
        {
          title: "电话质检量",
          dataIndex: "phoneQcNum",
          key: "phoneQcNum",
        },
        {
          title: "会话质检量",
          dataIndex: "chatQcNum",
          key: "chatQcNum",
        },
        {
          title: "会话质检平均分",
          dataIndex: "chatQcAvgScore",
          key: "chatQcAvgScore",
        },
        {
          title: "电话质检平均分",
          dataIndex: "phoneQcAvgScore",
          key: "phoneQcAvgScore",
        },
        {
          title: "最低会话质检分",
          dataIndex: "chatQcMinScore",
          key: "chatQcMinScore",
        },
        {
          title: "最低电话质检分",
          dataIndex: "phoneQcMinScore",
          key: "phoneQcMinScore",
        }
      ],
      qcDataSource:[]
    };
  },
  components: {
    FormModelSearchForm
  },
   mounted(){
    this.getSeatControlList();
    this.getSessionStatsList();
    this.getQcStatsList();
    let receiveList =  analysis.getSkill();
    receiveList.then((res)=>{
      this.searchFormList[1].options = res;
    })
  },
  methods: {
    getSeatControlList(){
      console.log(this.defaultSearchFormValues,'this.defaultSearchFormValues')
      let { loginDate,serviceAccs} = this.defaultSearchFormValues;
      let date = loginDate.join();
      let acc = ''
      if(serviceAccs && serviceAccs.length > 0){
        acc = serviceAccs.join();
      }
      let param = {
        loginDate:date,
        serviceAccs:acc
      }
      api.seatControlList(param).then(res=>{
        console.log(res,'坐席管控-坐席考勤')
        this.seatDataSource = res.data.list
      })
    },
    getSessionStatsList(){
      api.sessionStatsList().then(res=>{
        console.log(res,'坐席管控-会话数据')
        this.sessionDataSource = res.data.list
      })
    },
    getQcStatsList(){
      api.qcStatsList().then(res=>{
        console.log(res,'坐席管控-质检统计')
        this.qcDataSource = res.data.list;
      })
    },
    changeTabFn() {},
    prevHandleSubmit(val) {
      this.defaultSearchFormValues = {
        ...val
      }
      this.getSeatControlList()
    },
    handleOkExportSeat(){
      let { loginDate,serviceAccs} = this.defaultSearchFormValues;
      let date = loginDate.join();
      let acc = ''
      if(serviceAccs && serviceAccs.length > 0){
        acc = serviceAccs.join();
      }
      let param = qs.stringify({
        loginDate:date,
        serviceAccs:acc
      });
      let url =`/seat/exam/stats/export?${param}`;
      window.location.href = url;
      this.exportModal.showSeat = false
    },
    handleOkExportSession(){
      let { loginDate,serviceAccs} = this.defaultSearchFormValues;
      let date = loginDate.join();
      let acc = ''
      if(serviceAccs && serviceAccs.length > 0){
        acc = serviceAccs.join();
      }
      let param = qs.stringify({
        sessionDate:date,
        serviceAccs:acc
      });
      let url =`/session/stats/export?${param}`;
      window.location.href = url;
      this.exportModal.showSession = false
      
    },
    handleOkExportQc(){
      let { loginDate,serviceAccs} = this.defaultSearchFormValues;
      let date = loginDate.join();
      let acc = ''
      if(serviceAccs && serviceAccs.length > 0){
        acc = serviceAccs.join();
      }
      let param = qs.stringify({
        qcDate:date,
        serviceAccs:acc
      });
      let url =`/qc/stats/export?${param}`;
      window.location.href = url;
      this.exportModal.showQc = false
    },
    exportSeat(){
      this.exportModal.showSeat = true
    },
    exportSession(){
      this.exportModal.showSession = true
    },
    exportQuality(){
      this.exportModal.showQc = true
    },
    handleCancelExportSeat (){
      this.exportModal.showSeat = false
    },
    handleCancelExportSession(){
      this.exportModal.showSession = false
    },
    handleCancelExportQc(){
      this.exportModal.showQc = false
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
</style>