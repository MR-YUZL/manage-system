<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "InstrumentCharts",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    chartsData: {
      type: Array,
      default: () => [],
    },
    xAxis: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      myCharts: null,
    };
  },
  created() {},
  watch: {
    chartsData: {
      handler(val) {
        this._setOption(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts() {
      this.myCharts = this.$echarts.init(this.$refs.myCharts);
      this._setOption(this.chartsData);
    },
    _setOption(chartsData) {
      let value = 70;
      let options = {
        title: {
          text: '丢失率',
          bottom: "20%",
          x: "center",
          borderRadius: 15,
          padding: [7, 14],
          textStyle: {
            fontSize: 16,
            color: "#000",
            textAlign: "center",
          },
        },
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            radius: "90%",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#999",
              },
            },
            detail: {
              show: true,
              offsetCenter: [0, "80%"],
              formatter: "{value}%",
              color: "#ff8989",
              fontSize: 18,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "#999",
              },
            },
            axisLabel: {
              color: "#999",
              fontSize: 15,
            },
            pointer: {
              //指针样式
              show: true,
              width: 5,
              length: "70%",
            },
            itemStyle: {
              color: "#5470C6",
            },
            markPoint: {
              animation: false,
              silent: true,
              data: [
                {
                  x: "50%",
                  y: "50%",
                  symbol: "circle",
                  symbolSize: 25,
                  itemStyle: {
                    color: "#5470C6",
                  },
                },
                {
                  x: "50%",
                  y: "50%",
                  symbol: "circle",
                  symbolSize: 8,
                  itemStyle: {
                    color: "#fff",
                  },
                },
              ],
            },
            data: [
              {
                value: value,
              },
            ],
          },
          {
            type: "gauge",
            radius: "100%",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 18,
                color: [
                  //颜色区间
                  [value / 100, "#5470C6"],
                  [1, "rgba(210,219,238,0.3)"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
        ],
      };

      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
