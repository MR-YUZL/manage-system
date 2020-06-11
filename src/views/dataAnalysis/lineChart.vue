<template>
  <div >
    <div class="chart" :id="id" style="width: 100%;height: 300px;"></div>
  </div>
</template>

<script>
export default {
  props:{
    id:String,
    echartObj:{
      type:Object,
      default:{}
    }
  },
  watch: {
    echartObj(val,oldVal) {
      console.log("echartObj======",this.id,val,oldVal)
      this.initChart();
    }
  },
  data(){
    return{
    }
  },
  mounted(){
    this.initChart()
  },
  methods:{
    initChart(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.id));
      // 绘制图表
      myChart.setOption({
        color:['#0097fe','#3b75e8','#f3cf21','#f3942e','#ccc'],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          name: this.echartObj.legend,
          top:10,
          left:10,
          icon:'roundRect',
          itemWidth:10,
          itemHeight:10,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.echartObj.xAxis
        },
        yAxis: {
          type: "value"
        },
        series: this.echartObj.series
      });
      window.addEventListener('resize',function() {myChart.resize()});
    },
  },
}
</script>

<style>

</style>