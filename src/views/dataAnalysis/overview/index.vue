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
          <span class="rece1"><span class="overviewIcon overviewIcon1"></span>总接待量</span>
          <span class="rece2 style1">{{info.allReceptionNum}}</span>
          <span class="rece3">电话接待:{{info.inCallAnswerNum}}</span>
          <span class="rece3">会话接待:{{info.sessionNum}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon2"></span>人均通话时长</span>
          <span class="rece2 style2">{{info.avgCallTime}}</span>
          <span class="rece3">人均呼入时长:{{info.avgCallInTime}}</span>
          <span class="rece3">人均呼出时长:{{info.avgCallOutTime}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon3"></span>平均会话时长</span>
          <span class="rece2 style3">{{info.avgSessionTime}}</span>
          <span class="rece3">平均首次响应时间:{{info.avgFirstRespTime}}</span>
          <span class="rece3">平均响应时间:{{info.avgRespTime}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon4"></span>会话满意率</span>
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
    <!-- 咨询分类 -->
    <div class="circleFlex">
      <div class="pr" v-for="(item,index) in chartList" :key="index">
        <a-select
          v-if="item.typeId"
          @change="changeTypeFn($event,item)"
          v-model="item.typeId"
          style="width: 174px;"
        >
          <a-select-option v-for="(it,ind) in item.childList" :key="ind" :value="it.id">{{it.name}}</a-select-option>
        </a-select>
        <CircleChart
          :id="item.id"
          :key="item.id"
          :echartObj="item.echartObj"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import LineChart from "@/views/dataAnalysis/lineChart";
import CircleChart from "@/views/dataAnalysis/circleChart";
import analysis from "@/utils/analysis.js";
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
          name: "serviceAcc",
          label: "技能组",
          mode: "multiple",
          placeholder:'请选择',
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName"
        }
      ],
      defaultSearchFormValues: {
        // inputDateStart:[moment().subtract(1, "days").format("YYYY-MM-DD"),moment().subtract(1, "days").format("YYYY-MM-DD")],
        inputDateStart:['2020-06-01','2020-06-10']
      },
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
        
      },
      chartList: [
        {
          id: "chart1",
          typeId: "",
          childList: [],
          echartObj: {
            
          }
        },
        {
          id: "chart2",
          childList: [],
          typeId: "",
          echartObj: {
            
          }
        },
        {
          id: "chart3",
          childList: [],
          typeId: "",
          echartObj: {
            
          }
        }
      ],
      chart2TypeId: "",
      chart3TypeId: "",
    };
  },
  components: {
    FormModelSearchForm,
    LineChart,
    CircleChart
  },
    watch: {
    chart2TypeId(val,oldVal){
      this.chartList[1].typeId = val;
      let name =''
      this.chartList[1].childList.map(v=>{
        if(v.id==val){
          name=v.name
        }
      })
      this.getChartData(val,1,name)
    },
    chart3TypeId(val,oldVal){
      this.chartList[2].typeId = val;
      let name =''
      this.chartList[2].childList.map(v=>{
        if(v.id==val){
          name=v.name
        }
      })
      this.getChartData(val,2,name)
    },
  },
  created() {
    this.getTree();
  },
   mounted() {
    this.getOverviewInfo();
    let receiveList =  analysis.getSkill();
    receiveList.then((res)=>{
      this.searchFormList[1].options = res;
    })
    this.getChartData("",0,'总量');
  },
  methods: {
    getTree() {
      api.consultTypeList({ type: 0 }).then(res => {
        console.log(res, "总览的整颗树");
        
        this.chartList[1].childList = res.data.list;
        this.chart2TypeId = res.data.list && res.data.list.length ? res.data.list[0].id : "";
        this.chartList[2].childList = res.data.list[0].childList;
        this.chart3TypeId = res.data.list && res.data.list.length && res.data.list[0].childList && res.data.list[0].childList.length ? res.data.list[0].childList[0].id : "";
        
      });
    },
    //咨询分类图表
    getChartData(typeId,chartIndex,str){
      let {
        inputDateStart,
        serviceAcc,
        ...others
      } = this.defaultSearchFormValues;
      let inputAccs = "";
      if (serviceAcc && serviceAcc.length > 0) {
        inputAccs = serviceAcc.join();
      }
      let params = {
        startDate: inputDateStart[0],
        endDate: inputDateStart[1],
        serviceAcc: inputAccs,
        typeId,
        ...others
      };
      api.consultTypeChartJson(params).then(res=>{
        this.chartList[chartIndex].echartObj = res.data.data;
        let counts = res.data.data.series;
        var sum = counts.reduce(function(a, b) {
          return Number(a) + Number(b.value);
        }, 0);
        let total = [
          {
            value: sum,
            name: str,
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ];
        this.$set(this.chartList[chartIndex].echartObj, "total", total);
      })
    },
    getOverviewInfo(){
      let{inputDateStart,serviceAcc} = this.defaultSearchFormValues
      let inputAccs = ''
      if(serviceAcc&&serviceAcc.length){
        inputAccs = serviceAcc.join()
      }
      let params = {
        startDate:inputDateStart[0],
        endDate:inputDateStart[1],
        serviceAcc:inputAccs
      }
      api.overviewInfo(params).then(res=>{
        console.log(res,'总览')
        this.info = res.data.data;
        this.echartObj = this.info.callChar;
        this.echartObj2 = this.info.msgChar;

        this.circleObj = this.info.channelChar;
        var counts = this.info.channelChar.series;
        var sum = counts.reduce(function(a, b) {
          return a + b.value;
        }, 0);
        let total = [
          {
             value: sum,
             name: "总接待量",
             itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
        this.$set(this.circleObj,'total',total)
      })
    },
    prevHandleSubmit(val) {
       this.defaultSearchFormValues = {
        ...val
      }
      this.getOverviewInfo()
     
    },
  }
};
</script>

<style lang="less" scoped>
.circleFlex {
  display: flex;
  div {
    flex: 1;
  }
  .pr {
    position: relative;
    .ant-select {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 10;
    }
  }
}
.receptionList {
  ul {
    display: flex;
    padding: 20px 0 20px;
    li {
      width: 25%;
      text-align: center;
      span {
        display: block;
      }
      .rece1 {
        font-size: 14px;
        color: #4c4c4c;
        .overviewIcon{
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size: 30px 30px;
          padding-left: 35px;
        }
        .overviewIcon1{
          background-image: url('../../../assets/imgs/da1.png');
        }
        .overviewIcon2{
          background-image: url('../../../assets/imgs/da6.png');
        }
        .overviewIcon3{
          background-image: url('../../../assets/imgs/da7.png');
        }
        .overviewIcon4{
          background-image: url('../../../assets/imgs/da8.png');
        }
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