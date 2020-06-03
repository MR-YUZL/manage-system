<template>
  <div >
    <div class="chart" :id="_id">

    </div>
  </div>
</template>

<script>
export default {
  props:{
    _id:String,
    _titleText:String,
    _xText:String,
    _yText:String,
    _chartData:Array,
    _type:String
  },
  data(){
    return{
      chart:null
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
        
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["客户发出消息", "访客发出消息", "消息总数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "客户发出消息",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "访客发出消息",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "消息总数",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
         
        ]
      });
      window.addEventListener('resize',function() {consumeChart.resize()});
    },
  },
}
</script>

<style>

</style>