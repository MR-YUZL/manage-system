<template>
  <div>
    <a-page-header title="工单分类统计" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
    <div class="circleFlex">
      <div>
        <CircleChart
          id="circleChart1"
          :echartObj="circleObj1"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
      <div class="orderType2 pr">
        <a-select @change="firstTypeFn" v-model="orderSel2" style="width: 174px;">
          <a-select-option v-for="(item,index) in orderTypeList1" :key="index" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
        <CircleChart
          id="circleChart2"
          :echartObj="circleObj2"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
      <div class="orderType3 pr">
        <a-select v-model="orderSel3" style="width: 174px;">
          <a-select-option v-for="(item,index) in orderTypeList2" :key="index" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
        <CircleChart
          id="circleChart3"
          :echartObj="circleObj3"
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
export default {
  data() {
    return {
      orderTypeList1:[],
      orderTypeList2:[],
      orderSel2:'',
      orderSel3:'',
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
      circleObj1: {
        legend: [
          "电话接待",
          "网页接待",
          "微信公众号",
          "微信个人号",
          "微信小程序",
          "QQ接待"
        ],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" }
        ],
        total: [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj2: {
        legend: [
          "电话接待",
          "网页接待",
          "微信公众号",
          "微信个人号",
          "微信小程序",
          "QQ接待"
        ],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" }
        ],
        total: [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj3: {
        legend: [
          "电话接待",
          "网页接待",
          "微信公众号",
          "微信个人号",
          "微信小程序",
          "QQ接待"
        ],
        series: [
          { value: 335, name: "电话接待" },
          { value: 310, name: "网页接待" },
          { value: 234, name: "微信公众号" },
          { value: 135, name: "微信个人号" },
          { value: 1548, name: "微信小程序" },
          { value: 1548, name: "QQ接待" }
        ],
        total: [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      searchParams: {}
    };
  },
  components: {
    FormModelSearchForm,
    CircleChart
  },
  mounted() {
    this.getOrderTypeChartJson();
    this.getOrderTypeSelectJson();
  },
  methods: {
    firstTypeFn(val){
      console.log(val)
      this.orderSel2 = val;
      this.fn()
    },
    getOrderTypeChartJson() {
      api.orderTypeChartJson(this.searchParams).then(res => {
        console.log(res, "工单分类统计图标数据");
      });
    },
    getOrderTypeSelectJson() {
      let promise = new Promise((resolve,reject)=>{
        api.orderTypeSelectJson({ type: 1, pid: 0 }).then(res => {
          resolve(res);
          console.log(res, "工单分类右上角下拉框2");
          this.orderTypeList1 = res.data.list;
          this.orderSel2 = this.orderTypeList1[0].id;
        });

      });
      promise.then(res=>{
        this.fn()
      })
    },
    fn(){
      api.orderTypeSelectJson({ type: 1, pid: this.orderSel2 }).then(res => {
          console.log(res, "工单分类右上角下拉框3");
          if(res.data.list.length){
            this.orderTypeList2 = res.data.list;
            this.orderSel3 = this.orderTypeList2[0].id;
          }
        });
    },
    prevHandleSubmit(val) {
      this.searchParams = Object.assign({}, this.searchParams, val);
      this.getOrderTypeChartJson();
    }
  }
};
</script>

<style lang="less" scoped>
.circleFlex {
  display: flex;
  div {
    flex: 1;
  }
  .pr{
    position: relative;
    .ant-select{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10
    }
  }
}
</style>