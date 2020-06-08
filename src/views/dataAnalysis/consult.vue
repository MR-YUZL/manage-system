<template>
  <div>
    <div class="circleFlex">
      <div class="pr" v-for="(item,index) in chartList" :key="index">
        <!-- <a-cascader
          :field-names="fieldNames"
          v-model="orderSel"
          :options="treeOptions"
          placeholder="请选择"
          @change="treeOnChange"
        />-->
        <a-select v-if="item.typeId" @change="changeTypeFn" v-model="orderSel" style="width: 174px;">
          <a-select-option
            v-for="(it,ind) in item.childList"
            :key="ind"
            :value="it.pid"
          >{{it.name}}</a-select-option>
        </a-select>
        <CircleChart
          :id="item.id"
          :echartObj="item.echartObj"
          styles="width:100%;height:300px;margin:auto"
        />
      </div>
      <!-- <div class="orderType3 pr">
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
      </div>-->
    </div>
  </div>
</template>

<script>
import api from "@/api/analysis";
import CircleChart from "@/views/dataAnalysis/circleChart";
export default {
  data() {
    return {
      chartList: [
        {
          id: "chart1",
          typeId:'',
          childList: [],
          echartObj: {
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
          }
        },
        {
          id: "chart2",
          childList: [],
          typeId:"51466f0262e04938b2065d9cb0481b10",
          echartObj: {
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
          }
        },
        {
          id: "chart3",
          childList: [],
          typeId:"3cd05d068ff74bb2a20af3da4340288f",
          echartObj: {
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
          }
        }
      ],
      orderTypeList: [],
      orderSel: "",
      circleObj: {},
      treeOptions: [],
      fieldNames: { label: "name", value: "pid", children: "childList" }
    };
  },
  mounted() {
    let params = Object.assign({}, this.searchParams);
    this.getOrderTypeChartJson(params);
    this.getOrderTypeSelectJson();
    this.getTree();
  },
  components: {
    CircleChart
  },
  methods: {
    getTree() {
      api.consultTypeList({ type: 1 }).then(res => {
        console.log(res, "整颗树");
        // this.treeOptions = res.data.list;
        // res.data.list.map(v=>{

        // })
        this.chartList[1].childList = res.data.list;
        // this.chartList[2].childList = [];
      });
    },
    changeTypeFn(val) {
      console.log(val,'====');
      this.orderSel = val;
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
      // let promise = new Promise((resolve, reject) => {
      //   api.orderTypeSelectJson({ type: 1, pid: 0 }).then(res => {
      //     resolve(res);
      //     console.log(res, "工单分类右上角下拉框2");
      //     this.orderTypeList1 = res.data.list;
      //     this.orderSel2 = this.orderTypeList1[0].id;
      //     // this.getSecondChart();
      //   });
      // });
      // promise.then(res => {
      //   this.fn();
      // });
    },
    fn() {
      // api.orderTypeSelectJson({ type: 1, pid: this.orderSel2 }).then(res => {
      //   console.log(res, "工单分类右上角下拉框3");
      //   if (res.data.list.length) {
      //     this.orderTypeList2 = res.data.list;
      //     this.orderSel3 = this.orderTypeList2[0].id;
      //     this.getThirdChart();
      //   }
      // });
    }
    // prevHandleSubmit(val) {
    //   this.searchParams = Object.assign({}, this.searchParams, val);
    //   this.getOrderTypeChartJson();
    // }
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