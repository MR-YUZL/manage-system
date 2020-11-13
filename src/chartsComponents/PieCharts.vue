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
      let color = [
        {
          borderColor: "rgba(50,123,250,1)",
          itemColor: "rgba(50,123,250,0.7)",
        },
        { borderColor: "rgba(244,201,7,1)", itemColor: "rgba(244,201,7,0.7)" },
        {
          borderColor: "rgba(23,216,161,1)",
          itemColor: "rgba(23,216,161,0.7)",
        },
        {
          borderColor: "rgba(122,60,235,1)",
          itemColor: "rgba(122,60,235,0.7)",
        },
        {
          borderColor: "rgba(15,197,243,1)",
          itemColor: "rgba(15,197,243,0.7)",
        },
      ];

      chartsData.forEach((item, index) => {
        data.push({
          value: item.value,
          name: item.name,
          itemStyle: {
            borderWidth: 3,
            borderColor:'#0f375f',
            // borderColor: color[index].borderColor,
            color: color[index].itemColor,
          },
        });
      });

      let options = {
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "80%"],  //大小
            center: ["40%", "50%"],  //位置
            // roseType: "radius",      //是否为南丁格尔图  通过圆心角来展示数据所占百分比，半径展示大小   ‘area’圆心角相同，仅通过半径来展示大小  
            label: {
              show: true,
              normal: {
                position: "outside",
                fontSize: 16,
              },
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true,
            },
            data,
          },
        ],
      };
      this.myCharts.setOption(options, true);
    },
  },
};
</script>
<style lang="less" scoped></style>
