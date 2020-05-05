<template>
  <div id="main" >
    <div v-for="(item,index) in dataList" :key="index">
      <div :id="item.id" style="width: 400px;height:250px;">

      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
    props:['dataList'],
  data: () => ({
    
  }),
  
  mounted() {
      this.getData()
    console.log(this.dataList)
  },
  methods: {
      getData(){
        this.dataList.map((item) => {
          let myChart =  echarts.init(document.getElementById(item.id))
          myChart.setOption(item.options);
        })
      }
  },
  watch: {},
  computed: {}
};
</script>
