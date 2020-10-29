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
      timer: null,
    };
  },
  watch: {
    chartsData: {
      handler(val) {
        clearInterval(this.timer);
        this._setOption(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts();
    });
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
  methods: {
    initEcharts() {
      this.myCharts = this.$echarts.init(this.$refs.myCharts);

      this._setOption(this.chartsData);
    },
    _setOption(chartsData) {
      let angle = 0;
      let options = {
        backgroundColor: "#111",
        title: [
          {
            text: "完成度",
            x: "center",
            top: "52%",
            textStyle: {
              color: "#fdf914",
              fontSize: 20,
              fontWeight: "100",
            },
          },
          {
            text: `${chartsData}%`,
            x: "center",
            top: "42%",
            textStyle: {
              fontSize: "20",
              color: "#fdf914",
              fontFamily: "Lato",
              foontWeight: "600",
            },
          },
        ],
        polar: {
          radius: ["44%", "50%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true,  //两侧是否有圆弧
            barWidth: 60,
            showBackground: true, //是否显示条柱背景
            backgroundStyle: {
              color: "rgba(66, 66, 66, .3)",
            },
            data: [chartsData],
            coordinateSystem: "polar", //极坐标轴

            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#fdf914",
                  },
                  {
                    offset: 1,
                    color: "#38a700",
                  },
                ]),
              },
            },
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
        ],
      };

      this.timer = setInterval(() => {
        //用setInterval做动画感觉有问题
        angle = angle + 3;
        this.myCharts.setOption(options);
      }, 100);
    },
  },
};
</script>
<style lang="less" scoped></style>
