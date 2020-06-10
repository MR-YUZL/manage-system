<template>
  <div>
    <a-page-header title="工单分类统计" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />

    <!-- <CircleTable /> -->
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
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import CircleChart from "@/views/dataAnalysis/circleChart";
import analysis from "@/utils/analysis.js";
import CircleTable from "@/views/dataAnalysis/consult";
import moment from "moment";
export default {
  data() {
    return {
      orderTypeList1: [],
      orderTypeList2: [],
      orderSel2: "",
      orderSel3: "",
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "查询时间"
        },
        {
          type: "select",
          name: "inputAcc",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName"
        }
      ],
      defaultSearchFormValues: {
        // inputDateStart:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
        inputDateStart: ["2020-06-03", "2020-06-11"]
      },

      searchParams: {},
      chartList: [
        {
          id: "chart1",
          typeId: "",
          childList: [],
          echartObj: {
            // legend: [
            //   "电话接待",
            //   "网页接待",
            //   "微信公众号",
            //   "微信个人号",
            //   "微信小程序",
            //   "QQ接待"
            // ],
            // series: [
            //   { value: 335, name: "电话接待" },
            //   { value: 310, name: "网页接待" },
            //   { value: 234, name: "微信公众号" },
            //   { value: 135, name: "微信个人号" },
            //   { value: 1548, name: "微信小程序" },
            //   { value: 1548, name: "QQ接待" }
            // ],
            // total: [
            //   {
            //     value: 0,
            //     name: "总接待量",
            //     itemStyle: { normal: { color: "#ffffff" } }
            //   }
            // ]
          }
        },
        {
          id: "chart2",
          childList: [],
          typeId: "",
          echartObj: {
            // legend: [
            //   "电话接待",
            //   "网页接待",
            //   "微信公众号",
            //   "微信个人号",
            //   "微信小程序",
            //   "QQ接待"
            // ],
            // series: [
            //   { value: 335, name: "电话接待" },
            //   { value: 310, name: "网页接待" },
            //   { value: 234, name: "微信公众号" },
            //   { value: 135, name: "微信个人号" },
            //   { value: 1548, name: "微信小程序" },
            //   { value: 1548, name: "QQ接待" }
            // ],
            // total: [
            //   {
            //     value: 0,
            //     name: "总接待量",
            //     itemStyle: { normal: { color: "#ffffff" } }
            //   }
            // ]
          }
        },
        {
          id: "chart3",
          childList: [],
          typeId: "",
          echartObj: {
            // legend: [
            //   "电话接待",
            //   "网页接待",
            //   "微信公众号",
            //   "微信个人号",
            //   "微信小程序",
            //   "QQ接待"
            // ],
            // series: [
            //   { value: 335, name: "电话接待" },
            //   { value: 310, name: "网页接待" },
            //   { value: 234, name: "微信公众号" },
            //   { value: 135, name: "微信个人号" },
            //   { value: 1548, name: "微信小程序" },
            //   { value: 1548, name: "QQ接待" }
            // ],
            // total: [
            //   {
            //     value: 0,
            //     name: "总接待量",
            //     itemStyle: { normal: { color: "#ffffff" } }
            //   }
            // ]
          }
        }
      ],
      chart2TypeId: "",
      chart3TypeId: "",
    };
  },
  components: {
    FormModelSearchForm,
    CircleChart,
    CircleTable
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
      this.getOrderTypeChartJson(val,1,name)
    },
    chart3TypeId(val,oldVal){
      this.chartList[2].typeId = val;
      let name =''
      this.chartList[2].childList.map(v=>{
        if(v.id==val){
          name=v.name
        }
      })
      this.getOrderTypeChartJson(val,2,name)
    },
  },
  created() {
    this.getTree();
  },
  mounted() {
    this.getOrderTypeChartJson("",0,"总接待量");
    // this.getOrderTypeSelectJson();
    let receiveList = analysis.getSkill();
    receiveList.then(res => {
      this.searchFormList[1].options = res;
    });
    
  },
  methods: {
    getTree() {
      api.consultTypeList({ type: 1 }).then(res => {
        console.log(res, "整颗树");
        
        this.chartList[1].childList = res.data.list;
        this.chart2TypeId = res.data.list && res.data.list.length ? res.data.list[0].id : "";
        this.chartList[2].childList = res.data.list[0].childList;
        this.chart3TypeId = res.data.list && res.data.list.length && res.data.list[0].childList && res.data.list[0].childList.length ? res.data.list[0].childList[0].id : "";
        
      });
    },

    //图表
    getOrderTypeChartJson(typeId,chartIndex,str) {
      let {
        inputDateStart,
        inputAcc,
        ...others
      } = this.defaultSearchFormValues;
      let inputAccs = "";
      if (inputAccs && inputAccs.length > 0) {
        inputAccs = inputAcc.join();
      }
      let params = {
        startDate: inputDateStart[0],
        endDate: inputDateStart[1],
        inputAcc: inputAccs,
        typeId,
        ...others
      };

      api.orderTypeChartJson(params).then(res => {
        console.log(res, "工单分类统计图表数据44555555555555");
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
      });
    },

    changeTypeFn(eve,item){
      console.log(eve,item)
      let chartIndex = ''
      if(item.id == 'chart2'){
        chartIndex = 1 
      }
      else if(item.id == 'chart3'){
        chartIndex = 2
      }else{
        chartIndex = 0
      }
      let name = '';
      this.chartList[chartIndex].childList.map(v=>{
        if(v.id==eve){
          name=v.name
        }
      })
      this.getOrderTypeChartJson(eve,chartIndex,name)
    },

    prevHandleSubmit(val) {
      this.defaultSearchFormValues = {
        ...val
      };
      this.getOrderTypeChartJson();
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
      right: 0;
      top: 0;
      z-index: 10;
    }
  }
}
</style>