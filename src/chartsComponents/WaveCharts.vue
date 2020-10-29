<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "pieCharts",
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
      type: Number,
      default: 60,
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
          top: "47%",
          left: "center",
          text: `${chartsData}分`,
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 32,
          },
        },
        series: [
          {
            type: "liquidFill",
            itemStyle: {
              opacity: 0.8, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#FFB931", //阴影颜色
            },
            radius: "80%",
            //水波
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#FE8704",
                },
                {
                  offset: 1,
                  color: "#FFB931",
                },
              ]),
            ],
            data: [
              {
                value: chartsData / 100,
              },
            ],
            center: ["50%", "50%"],
            backgroundStyle: {
              color: "#000",
            },
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            outline: {
              itemStyle: {
                borderColor: "transparent",
                borderWidth: 5,
              },
              borderDistance: 0,
            },
          },
        ],
      };
      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped></style>
