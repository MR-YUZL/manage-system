<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "funnelCharts",
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
      let options = {
        title: {
          text: "转化率",
          subtext: "转化的百分率或分率",
          target: "blank",
          x: "center",
          top: "10",
          textStyle: {
            color: "#000",
            fontSize: 16,
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },

        legend: {
          x: "center",
          y: "92%",
          textStyle: {
            color: "#000",
          },
        },

        color: [
          "#d6ae71",
          "#6D300E",
          "#52301C",
          "#471C05",
          "#52301C",
          "#6D300E",
        ],

        series: [
          {
            name: "TIT",
            type: "funnel",
            left: "center",
            width: "80%",
            maxSize: "80%",
            // sort: 'ascending',
            label: {
              normal: {
                formatter: "{b}",
                backgroundColor: "#6D480E",
                color: "#fff",
                borderRadius: 3,
                padding: [5, 5, 1, 5],
                shadowBlur: 0,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#9E853A",
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                lineStyle: {
                  type: "solid",
                  color: "#6D480E",
                },
              },
            },
            itemStyle: {
              normal: {
                opacity: 0.9,
                borderColor: "#B6883F",
                borderWidth: 0,
              },
            },
            tooltip: {
              show: false,
            },

            data: chartsData,
          },
          {
            name: "TIT",
            type: "funnel",
            left: "center",
            width: "80%",
            maxSize: "80%",
            // sort: 'ascending',
            label: {
              normal: {
                position: "inside",
                formatter: "{c}%",
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                },
              },
            },

            itemStyle: {
              normal: {
                opacity: 0.9,
                borderColor: "#B6883F",
                borderWidth: 0,
              },
            },

            data: chartsData,
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
