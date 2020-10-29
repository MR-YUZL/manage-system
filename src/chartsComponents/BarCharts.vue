<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "barCharts",
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
  watch: {
    chartsData: {
      handler(val) {
        this._setOption(val);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts() {
      this.myCharts = this.$echarts.init(this.$refs.myCharts);

      if (this.chartsData.length) {
        this._setOption(this.chartsData);
      }
    },
    _setOption(chartsData) {
      let data = [
        // {
        //   type: "bar",
        //   itemStyle: {
        //     normal: {
        //       color: "rgba(255,153,51,0.1)",
        //     },
        //   },
        //   silent: true,
        //   barWidth: 30,
        //   barGap: "-80%",
        //   data: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
        // },
      ];

      chartsData.forEach((item) => {
        data.push({
          type: "bar",
          barMaxWidth: 20,
          zlevel: 10,
          showBackground: true,
          data: item.data,
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF9A22",
                  },
                  {
                    offset: 1,
                    color: "#FFD56E",
                  },
                ],
              },
              barBorderRadius: [30, 30, 0, 0],
            },
          },
        });
      });

      let options = {
        backgroundColor: "#fff",
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        legend: {
          right: 20,
          top: 0,
          itemGap: 10,
          itemWidth: 30,
          itemHeight: 10,
          textStyle: {
            color: "red",
            fontWeight: "normal",
            fontSize: 14,
          },
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "3%",
          bottom: "8%",
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis,
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#282828",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。
              show: true,
              inside: false,
              lineStyle: {
                color: "#000",
              },
            },
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            splitNumber: 4,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              show: true,
              textStyle: {
                color: "#737373",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(131,101,101,0.2)",
                type: "dashed",
              },
            },
          },
        ],
        series: data,
      };
      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped></style>
