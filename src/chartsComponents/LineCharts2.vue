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
          data: item.data.map((v) => v),
          type: "line",
          smooth: false,
          showAllSymbol: false,
          // symbol: "none",
          itemStyle: {
            normal: {
              color: color[index].itemStyle,
              lineStyle: {
                width: 2,
              },
            },
          },
        };
        data.push(only);
      });

      let options = {
        legend: {
          icon: "rect", //标题样式，颜色以数据各自的itemstyle的color为主
          top: 0, //标题位置
          left: "2%",
          textStyle: {
            fontSize: 14,
          },
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 20, //标题之间的间隔
          data: labelArr, //标题数组，不设置时自动根据数据的name显示
        },
        tooltip: {
          trigger: "axis", //坐标轴触发  ‘item’图形触发
          axisPointer: {
            type: "cross", //十字指示器  ‘line’直线指示器 ‘shadow’阴影指示器
          },
          padding: [10, 10],
          backgroundColor: "#fff",

          formatter: (params) => {
            let item = [];
            let label = params[0] ? params[0].axisValueLabel : "";

            params.forEach((v, index) => {
              let { name, unit } = chartsData.find(
                (val) => val.label === v.seriesName
              );
              item.push(`              
                  <div style="display:flex;align-items:center">
                    <div style="width:70px;color:rgb(154,154,154);">${name}</div> 
                    <div style="font-size:16px;height:18px;line-height:18px;color:rgb(154,154,154);font-weight:500;">${v.value} ${unit}</div>
                  </div>
                 `);
            });

            return `
               <div style="box-shadow: 0 0 5px #a2a2a2;">
                <div style="font-family:UnidreamLED;letter-spacing:2px;color:#000;margin:0 10px;">
                 ${label}
                </div>
                <div style="margin:10px;position:relative;">
                 ${item.join("")}
                </div>
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
            margin: 5,
            show: true,
            color: "#000",
            fontSize: 16,
            formatter: (params) => {
              return params;
            },
          },
          splitLine: {
            //分割线
            lineStyle: {
              type: "line",
            },
          },
        },
        series: data,
      };
      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
