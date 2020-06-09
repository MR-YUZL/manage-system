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
          @change="changeTypeFn"
          v-model="item.typeId"
          style="width: 174px;"
        >
          <a-select-option v-for="(it,ind) in item.childList" :key="ind" :value="it.id">{{it.name}}</a-select-option>
        </a-select>
        <CircleChart
          :id="item.id"
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
          name: "inputAccs",
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
          typeId:'',
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
          typeId:"",
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
          typeId:"",
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
    };
  },
  components: {
    FormModelSearchForm,
    CircleChart,
    CircleTable
  },
  mounted() {
    this.getOrderTypeChartJson();
    // this.getOrderTypeSelectJson();
    // let receiveList = analysis.getSkill();
    // receiveList.then(res => {
    //   this.searchFormList[1].options = res;
    // });
    this.getTree()
  },
  methods: {
    getTree() {
      api.consultTypeList({ type: 1 }).then(res => {
        console.log(res, "整颗树");
        // this.treeOptions = res.data.list;
        // res.data.list.map(v=>{

        // })
        this.chartList[1].childList = res.data.list;
        this.chartList[2].childList = res.data.list[0].childList
        // this.chartList[2].childList = [];
      });
    },
    
   
    //图表
    getOrderTypeChartJson() {
      let dateArr = [];
      let params = {};
      if (JSON.stringify(this.searchParams) != "{}") {
        dateArr = this.searchParams.inputDateStart;
        params = {
          startDate: dateArr[0],
          endDate: dateArr[1],
          typeId:'',
          ...this.searchParams
        };
      } else {
        dateArr = this.defaultSearchFormValues.inputDateStart;
        params = {
          startDate: dateArr[0],
          endDate: dateArr[1],
          ...this.defaultSearchFormValues
        };
      }

      api.orderTypeChartJson(params).then(res => {
        console.log(res, "工单分类统计图表数据44555555555555");
        this.chartList[0].echartObj = res.data.data;
        console.log(this.chartList[0].echartObj,'this.chartList[0].echartObj')
        let total = [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ];
        this.$set(this.chartList[0].echartObj, "total", total);
        console.log(this.chartList[0].echartObj, "我是第一个图表");
      });
    },
    
    prevHandleSubmit(val) {
      this.searchParams = Object.assign({}, this.defaultSearchFormValues, val);
      // this.getOrderTypeChartJson();
    },
    firstTypeFn(val) {
      console.log(val);
      this.orderSel2 = val;
      // this.fn();
      // this.getSecondChart();
    },
    secondTypeFn() {
      // this.orderSel3 = val;
      // this.getThirdChart();
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