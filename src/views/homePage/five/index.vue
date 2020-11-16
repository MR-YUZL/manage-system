<template>
  <div class="container">
    <LineCharts
      class="lCharts"
      :chartsData="chartsData"
      :title="lineTitle"
      :xAxis="xAxisLine"
    ></LineCharts>

    <section class="action">
      <a-button type="primary" @click="handleClick"> 切换 </a-button>

      <a-button-group>
        <a-button icon="minus" @click="decline" />
        <a-button icon="plus" @click="increase" />
      </a-button-group>
      <count-to
        class="count_to"
        :startVal="startVal"
        :endVal="endVal"
        :duration="2000"
      ></count-to>
    </section>

    <BarCharts
      class="bCharts"
      :chartsData="barData"
      :title="barTitle"
      :xAxis="xAxisBar"
    ></BarCharts>

    <section class="charts">
      <PieCharts
        class="pCharts"
        :chartsData="pieData"
        :title="pieTitle"
        :width="'33%'"
      ></PieCharts>

      <ProCharts
        class="pCharts"
        :chartsData="percent"
        :title="proTitle"
        :width="'33%'"
      ></ProCharts>

      <WaveCharts
        class="wCharts"
        :chartsData="percent"
        :title="waveTitle"
        :width="'33%'"
      ></WaveCharts>
    </section>

    <FunnelCharts class="fCharts" :chartsData="funnelData"></FunnelCharts>

    <InstrumentCharts class="iCharts"></InstrumentCharts>
  </div>
</template>
<script>
import { GetLineData, GetBarData, GetPieData } from "@/api/five";
import {
  LineCharts,
  PieCharts,
  ProCharts,
  WaveCharts,
  BarCharts,
  FunnelCharts,
  InstrumentCharts,
} from "@/chartsComponents";
import CountTo from "vue-count-to";
export default {
  name: "five",
  data() {
    return {
      chartsData: [],
      xAxisLine: [],
      lineTitle: "消费趋势",
      xAxisBar: [],
      barData: [],
      barTitle: "",
      pieData: [],
      pieTitle: "",
      proData: 60,
      proTitle: "",
      waveData: 60,
      waveTitle: "",
      startVal: 0,
      endVal: 20,
      percent: 20,
      funnelData: [
        { value: 2, name: "赢单" },
        { value: 8, name: "沟通细节" },
        { value: 15, name: "方案/报价" },
        { value: 25, name: "需求确认" },
        { value: 50, name: "验证客户" },
      ],
    };
  },
  watch: {
    percent(val, olVal) {
      this.endVal = val;
      this.startVal = olVal;
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.requestLine();
      this.requestBar();
      this.requestPie();
    },
    increase() {
      let percent = this.percent + 10;
      if (percent > 100) {
        percent = 100;
      }
      this.percent = percent;
    },
    decline() {
      let percent = this.percent - 10;
      if (percent < 0) {
        percent = 0;
      }
      this.percent = percent;
    },
    handleClick() {
      this.lineTitle = this.lineTitle === "就业岗位" ? "消费趋势" : "就业岗位";
      this.requestLine();
    },
    requestLine() {
      GetLineData({ charts: this.lineTitle }).then((res) => {
        if (res.code === 200) {
          let data = res.result;
          this.xAxisLine = data.lineX;
          this.chartsData = data.line;
        }
      });
    },
    requestBar() {
      GetBarData({ charts: this.barTitle }).then((res) => {
        if (res.code === 200) {
          let data = res.result;
          this.xAxisBar = data.barX;
          this.barData = data.bar;
        }
      });
    },
    requestPie() {
      GetPieData({ charts: this.pieTitle }).then((res) => {
        if (res.code === 200) {
          let data = res.result;
          this.pieData = data.pie;
        }
      });
    },
  },
  components: {
    CountTo,
    LineCharts,
    PieCharts,
    ProCharts,
    WaveCharts,
    BarCharts,
    FunnelCharts,
    InstrumentCharts,
  },
};
</script>
<style lang="less" scoped>
.shadow-mixin() {
  box-shadow: 0 0 10px #a2a2a2;
}
.lCharts,
.bCharts,
.fCharts,
.iCharts {
  background: #fff;
  margin-top: 30px;
  padding: 30px 0;
  .shadow-mixin;
}
.count_to {
  font-size: 20px;
  font-weight: bold;
}
.charts {
  height: 350px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .pCharts {
    background: #fff;
    padding: 30px 0;
    .shadow-mixin;
  }
  .wCharts {
    background: #fff;
    padding: 30px 0;
    .shadow-mixin;
  }
}
.action {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  line-height: 40px;
  background: #fff;
  margin-top: 30px;
  padding: 0 10px;
  .shadow-mixin;
}
</style>
