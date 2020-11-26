<template>
  <div :style="{ width, height }" ref="myCharts"></div>
</template>
<script>
export default {
  name: "pieCharts",
  props: {
    width: {
      type: String,
      default: "80%",
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
            radius: ["30%", "80%"], //大小
            center: ["50%", "50%"], //位置
            // roseType: "radius",      //是否为南丁格尔图  通过圆心角来展示数据所占百分比，半径展示大小   ‘area’圆心角相同，仅通过半径来展示大小
            label: {
              show: true,
              normal: {
                position: "outside",
                fontSize: 16,
                color: "#000",
                formatter: (params) => {
                  return `${params.percent}%`;
                },
              },
            },
            labelLine: {
              show: true,
              length:8,
              length2:4
            },
            data,
          },
        ],
      };
      this.myCharts.setOption(options, true);

      this.myCharts.on("click", "series", (value) => {
        this.$emit('getInfo',value.name)
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
