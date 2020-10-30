<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "lineCharts",
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

      if (this.chartsData.length) {
        this._setOption(this.chartsData);
      }
    },
    _setOption(chartsData) {
      let data = [];
      let labelArr = [];
      let color = [
        { areaStyle: "rgba(242,202,0,0.2)", itemStyle: "#F2CA00" },
        { areaStyle: "rgba(31,226,132,0.5)", itemStyle: "#1FE284" },
        { areaStyle: "rgba(85,168,253,0.2)", itemStyle: "#55a8fd" },
      ];
      chartsData.forEach((item, index) => {
        labelArr.push(item.label);

        let only = {
          name: item.label,
          data: item.data.map((v) => v - 300),
          type: "line",
          smooth: false,
          showAllSymbol: false,
          symbol: "none",
          markLine: {
            symbol: ["none", "triangle"],
            data: [
              {
                lineStyle: {
                  color: "red",
                },
                label: {
                  position: "middle",
                  formatter: function (params) {
                    return params.name;
                  },
                },
                name: "警戒线",
                type: "average",
                yAxis: 0,
              },
            ],
          },
          // markArea: {
          //   data: [
          //     [
          //       {
          //         xAxis: "2月",
          //         yAxis: 300,
          //         itemStyle: {
          //           color: "red",
          //         },
          //       },
          //       {
          //         xAxis: "3月",
          //         yAxis: 500,
          //       },
          //     ],
          //   ],
          // },
          itemStyle: {
            normal: {
              color: color[index].itemStyle,
              lineStyle: {
                width: 2,
              },
            },
          },
        };
        if (item.areaStyle) {
          only.itemStyle.normal.areaStyle = {
            origin: "auto",
            color: {
              type: "linear",
              x: 0, //从右到左
              y: 0, //从下到上
              x2: 0, //从左到右
              y2: 1, //从上到下
              colorStops: [
                {
                  offset: 0,
                  color: color[index].areaStyle, // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color[index].itemStyle, // 100% 处的颜色
                },
              ],
              global: false,
            },
          };
        }
        if (this.chartsData.length === 1) {
          if (index === 0) {
            only.itemStyle.normal.areaStyle = {
              origin: "auto",
            };
          }
        }
        data.push(only);
      });

      let options = {
        title: {
          text: this.title,
          left: "16",
        },
        legend: {
          icon: "rect", //标题样式，颜色以数据各自的itemstyle的color为主
          top: 0, //标题位置
          right: "2%",
          textStyle: {
            fontSize: 14,
          },
          itemGap: 20, //标题之间的间隔
          data: labelArr, //标题数组，不设置时自动根据数据的name显示
        },
        tooltip: {
          trigger: "axis", //坐标轴触发  ‘item’图形触发
          axisPointer: {
            type: "cross", //十字指示器  ‘line’直线指示器 ‘shadow’阴影指示器
          },
          padding: [10, 10],
          formatter: (params) => {
            let item = [];
            let label = params[0] ? params[0].axisValueLabel : "";

            params.forEach((v, index) => {
              let { name, unit } = chartsData.find(
                (val) => val.label === v.seriesName
              );
              item.push(`              
                  <div style="display:flex;align-items:center">
                    <div style="width:8px;height:8px;border-radius:50%;background-color:${
                      color[index].itemStyle
                    }"></div>
                    <div style="width:70px;margin-left:10px">${name}</div> 
                    <div style="font-size:16px;height:18px;line-height:18px;color:#fff;font-weight:500;">${
                      v.value + 300
                    } ${unit}</div>
                  </div>
                 `);
            });

            return `
                <div style="font-family:UnidreamLED;letter-spacing:2px">
                 ${label}
                </div>
                <hr style="background-color:rgba(31, 148, 181, 1)" />
                <div style="margin:10px;position:relative;">
                 ${item.join("")}
                </div>
               `;
          },
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "30px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false, //刻度是否在数据中间
          axisTick: { show: false }, //刻度
          axisLine: { show: false }, //坐标轴
          data: this.xAxis,
        },
        yAxis: {
          type: "value",
          position: "left",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            //坐标轴标签
            margin: 20,
            show: true,
            color: "#000",
            fontSize: 16,
            formatter: (params) => {
              return params + 300;
            },
          },
          splitLine: {
            //分割线
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: data,
      };
      if (this.title === "消费趋势") {
        options.visualMap = {
          //分段
          // dimension:0, //x轴   1：y轴
          type: "piecewise",
          show: false,
          seriesIndex: [0], //指定哪一条线
          pieces: [
            {
              gt: 0,
              lt: 300,
              color: "#f2ca00",
            },
            { lt: 0, color: "#1FE284" },
          ],
        };
      }
      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
