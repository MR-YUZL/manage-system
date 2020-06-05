<template>
  <div>
    <a-page-header title="服务总览" style="padding:16px 0;" />
    <div>
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
    </div>
    <div class="receptionList">
      <ul>
        <li>
          <span class="rece1">总接待量</span>
          <span class="rece2 style1">{{info.allReceptionNum}}</span>
          <span class="rece3">电话接待:{{info.inCallAnswerNum}}</span>
          <span class="rece3">会话接待:{{info.sessionNum}}</span>
        </li>
        <li>
          <span class="rece1">人均通话时长</span>
          <span class="rece2 style2">{{info.avgCallTime}}</span>
          <span class="rece3">人均呼入时长:{{info.avgCallInTime}}</span>
          <span class="rece3">人均呼出时长:{{info.avgCallOutTime}}</span>
        </li>
        <li>
          <span class="rece1">平均会话时长</span>
          <span class="rece2 style3">{{info.avgSessionTime}}</span>
          <span class="rece3">平均首次响应时间:{{info.avgFirstRespTime}}</span>
          <span class="rece3">平均响应时间:{{info.avgRespTime}}</span>
        </li>
        <li>
          <span class="rece1">会话满意率</span>
          <span class="rece2 style4">{{info.satisfiedAppraiseRate}}</span>
          <span class="rece3">参评率:{{info.appraiseRate}}</span>
        </li>
      </ul>
    </div>
    <a-page-header title="消费概况" style="padding:16px 0;" />
    <div>
      <LineChart id="consumeChart" :echartObj="echartObj" />
    </div>
    <a-page-header title="接待量趋势" style="padding:16px 0;" />
    <div>
      <LineChart id="receptionChart" :echartObj="echartObj2" />
    </div>
    <a-page-header title="接待来源" style="padding:16px 0;" />
    <CircleChart id="circleChart" :echartObj="circleObj" styles="width:600px;height:300px;margin:auto" />
    <a-page-header title="咨询分类" style="padding:16px 0;" />
    <div class="circleFlex">
      <CircleChart id="circleChart1" :echartObj="circleObj1" styles="width:100%;height:300px;margin:auto" />
      <CircleChart id="circleChart2" :echartObj="circleObj2" styles="width:100%;height:300px;margin:auto" />
      <CircleChart id="circleChart3" :echartObj="circleObj3" styles="width:100%;height:300px;margin:auto" />
    </div>
  </div>
</template>

<script>
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import LineChart from "@/views/dataAnalysis/lineChart";
import CircleChart from "@/views/dataAnalysis/circleChart";

export default {
  data() {
    return {
      info:{},
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
      echartObj: {
        // legend: ["消息总数", "访客发出消息", "客服发出消息"],
        // xAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        // series: [
        //   {
        //     name: "消息总数",
        //     type: "line",
        //     data: [120, 132, 101, 134, 90, 230, 210],
        //     smooth: true
        //   },
        //   {
        //     name: "访客发出消息",
        //     type: "line",
        //     data: [220, 182, 191, 234, 290, 330, 310],
        //     smooth: true
        //   },
        //   {
        //     name: "客服发出消息",
        //     type: "line",
        //     data: [150, 232, 201, 154, 190, 330, 410],
        //     smooth: true
        //   }
        // ]
      },
      echartObj2: {
        // legend: ["总接待量", "电话接待", "会话接待"],
        // xAxis:["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        // series: [
        //   {
        //     name: "总接待量",
        //     type: "line",
        //     data: [120, 132, 101, 134, 90, 230, 210],
        //     smooth: true
        //   },
        //   {
        //     name: "电话接待",
        //     type: "line",
        //     data: [220, 182, 191, 234, 290, 330, 310],
        //     smooth: true
        //   },
        //   {
        //     name: "会话接待",
        //     type: "line",
        //     data: [150, 232, 201, 154, 190, 330, 410],
        //     smooth: true
        //   }
        // ]
      },
      circleObj: {
        legend: ["电话接待", "网页接待", "微信公众号", "微信个人号", "微信小程序", "QQ接待"],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" },
        ],
        total:[
          {
             value: 0,
             name: "总接待量",
             itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj1:{
        legend: ["电话接待", "网页接待", "微信公众号", "微信个人号", "微信小程序", "QQ接待"],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" },
        ],
        total:[
          {
             value: 0,
             name: "总接待量",
             itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj2:{
        legend: ["电话接待", "网页接待", "微信公众号", "微信个人号", "微信小程序", "QQ接待"],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" },
        ],
        total:[
          {
             value: 0,
             name: "总接待量",
             itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj3:{
        legend: ["电话接待", "网页接待", "微信公众号", "微信个人号", "微信小程序", "QQ接待"],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" },
        ],
        total:[
          {
             value: 0,
             name: "总接待量",
             itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      }
    };
  },
  components: {
    FormModelSearchForm,
    LineChart,
    CircleChart
  },
  mounted() {
    this.getOverviewInfo()
  },
  methods: {
    getOverviewInfo(){
      api.overviewInfo().then(res=>{
        console.log(res,'总览')
        this.info = res.data.data;
        this.echartObj = this.info.callChar;
        this.echartObj2 = this.info.msgChar;
        // this.circleObj = this.info.channelChar;
        // let total = [
        //   {
        //      value: 0,
        //      name: "总接待量",
        //      itemStyle: { normal: { color: "#ffffff" } }
        //   }
        // ]
        // this.$set(this.circleObj,'total',total)
      })
    },
    prevHandleSubmit(val) {
      //   this.searchParams = Object.assign(
      //     {},
      //     this.searchParams,
      //     this.clueArea,
      //     val
      //   );
      //   this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.circleFlex{
  display: flex;
  div{
    flex: 1;
  }
}
.receptionList {
  ul {
    display: flex;
    li {
      width: 25%;
      text-align: center;
      span {
        display: block;
      }
      .rece1 {
        font-size: 14px;
        color: #4c4c4c;
      }
      .rece2 {
        font-size: 36px;
        color: #fd6769;
      }
      .style1 {
        color: #3596fd;
      }
      .style2 {
        color: #fe9243;
      }
      .style3 {
        color: #18bc85;
      }
      .style4 {
        color: #fd6769;
      }
      .rece3 {
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>