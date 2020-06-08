<template>
  <div>
    <a-page-header title="工单分类统计" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
    <!-- <div class="circleFlex">
      <div>
        <CircleChart
          id="circleChart1"
          :echartObj="circleObj1"
          v-if="circleObj1.legend.length"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
      <div class="orderType2 pr">
        <a-select @change="firstTypeFn" v-model="orderSel2" style="width: 174px;">
          <a-select-option
            v-for="(item,index) in orderTypeList1"
            :key="index"
            :value="item.id"
          >{{item.name}}</a-select-option>
        </a-select>
        <CircleChart
          id="circleChart2"
          :echartObj="circleObj2"
          v-if="circleObj2.legend.length"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
      <div class="orderType3 pr">
        <a-select @change="secondTypeFn" v-model="orderSel3" style="width: 174px;">
          <a-select-option
            v-for="(item,index) in orderTypeList2"
            :key="index"
            :value="item.id"
          >{{item.name}}</a-select-option>
        </a-select>
        <CircleChart
          id="circleChart3"
          :echartObj="circleObj3"
          v-if="circleObj3.legend.length"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
    </div> -->
    <CircleTable  />
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
      defaultSearchFormValues: {},
      circleObj1: {
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
        total: [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ]
      },
      circleObj2: {
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
      },
      circleObj3: {
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
      },
      searchParams: {}
    };
  },
  components: {
    FormModelSearchForm,
    CircleChart,
    CircleTable
  },
  mounted() {
    let params = Object.assign({}, this.searchParams);
    this.getOrderTypeChartJson(params);
    this.getOrderTypeSelectJson();
    let receiveList = analysis.getSkill();
    receiveList.then(res => {
      this.searchFormList[1].options = res;
    });
  },
  methods: {
    firstTypeFn(val) {
      console.log(val);
      this.orderSel2 = val;
      // this.fn();
      this.getSecondChart();
    },
    secondTypeFn() {
      this.orderSel3 = val;
      this.getThirdChart()
    },
    getSecondChart() {
      let params = Object.assign({}, this.searchParams, {
        typeId: this.orderSel2
      });
      api.orderTypeChartJson(params).then(res => {
        this.circleObj2 = res.data.data;
        let total = [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ];
        this.$set(this.circleObj2, "total", total);
        console.log(this.circleObj2, "我是第二个图表");
      });
    },
    getThirdChart(){
      let params = Object.assign({}, this.searchParams, {
            typeId: this.orderSel3
          });
          api.orderTypeChartJson(params).then(res => {
            this.circleObj3 = res.data.data;
            let total = [
              {
                value: 0,
                name: "总接待量",
                itemStyle: { normal: { color: "#ffffff" } }
              }
            ];
            this.$set(this.circleObj3, "total", total);
            console.log(this.circleObj3, "我是第三个图表");
          });
    },
    getOrderTypeChartJson(params) {
      api.orderTypeChartJson(params).then(res => {
        console.log(res, "工单分类统计图标数据");
        this.circleObj1 = res.data.data;
        let total = [
          {
            value: 0,
            name: "总接待量",
            itemStyle: { normal: { color: "#ffffff" } }
          }
        ];
        this.$set(this.circleObj1, "total", total);
        console.log(this.circleObj1, "我是第一个图表");
      });
    },
    getOrderTypeSelectJson() {
      let promise = new Promise((resolve, reject) => {
        api.orderTypeSelectJson({ type: 1, pid: 0 }).then(res => {
          resolve(res);
          console.log(res, "工单分类右上角下拉框2");
          this.orderTypeList1 = res.data.list;
          this.orderSel2 = this.orderTypeList1[0].id;
          this.getSecondChart();
        });
      });
      promise.then(res => {
        this.fn();
      });
    },
    fn() {
      api.orderTypeSelectJson({ type: 1, pid: this.orderSel2 }).then(res => {
        console.log(res, "工单分类右上角下拉框3");
        if (res.data.list.length) {
          this.orderTypeList2 = res.data.list;
          this.orderSel3 = this.orderTypeList2[0].id;
          this.getThirdChart()
        }
      });
    },
    prevHandleSubmit(val) {
      this.searchParams = Object.assign({}, this.searchParams, val);
      // this.getOrderTypeChartJson();
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