<template>
  <div>
    <div class="chart" :id="id" :style="styles"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    styles: String,
    echartObj: {
      type: Object,
      default: {}
    }
  },
  watch: {
    echartObj(val,oldVal) {
      console.log("echartObj======",this.id,val,oldVal)
      this.initChart();
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.id));
      let that = this;
      // 绘制图表
      myChart.setOption({
        color:['#0097fe','#3b75e8','#f3cf21','#f3942e','#18bc85','#ccc','#005afe','#7dcaff','#04885c','#916fe6'],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x:'55%',
          top: "25%",
          data: this.echartObj.legend,
          icon: "roundRect",
          itemWidth: 10,
          itemHeight: 10,
          formatter: function(name) {
            var index = 0;
            var labels = that.echartObj.legend;
            var counts = that.echartObj.series;
            // console.log(labels,counts,'你是不是没值')
            var sum = ''
            if(counts&&counts.length>0){
              sum = counts.reduce(function(a, b) {
                return Number(a) + Number(b.value);
              }, 0);
            }
            if(labels&&labels.length>0){
              labels.forEach(function(value, i) {
                if (value == name) {
                  index = i;
                }
              });
            }
            if(sum){
              if(counts&&counts.length>0){
                return (
                  name +
                  " | " +
                  ((Number(counts[index].value) / sum) * 100).toFixed(0) +
                  "% " +
                  counts[index].value
                );
              }
            }else {
              if(counts&&counts.length>0){
                return name +
                  " | " +
                  "0% " +
                  counts[index].value
              }
            }
            // if(counts&&counts.length>0){
            //   return name + "    " + counts[index].value;
            // }
            // return name ;
          }
        },
        series: [
          {
            tooltip: {
              trigger: "none"
            },
            type: "pie",
            selectedMode: "single",
            radius: ["20%", "21%"],
            center: ['30%', '50%'],
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold",
                  color: "#3aa0ff"
                },
                formatter: function(params) {
                  return (
                    that.echartObj.total[0].name +
                    ":" +
                    that.echartObj.total[0].value
                  );
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.echartObj.total
          },
          {
            name: "接待来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: this.echartObj.series
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>

<style>
</style>