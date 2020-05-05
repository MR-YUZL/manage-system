<template>
    <div>
        <pie-echarts :dataList="dataList" />
    </div>
</template>

<script>
import pieEcharts from './../../../components/Echarts/pie'
export default {
    components:{
        pieEcharts
    },
  data: () => ({
    dataList:[
       
        {
            id:'first',
            options:{
                title: {
                    text: 'ECharts',
                    left: 'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 0,
                    top: 20,
                    bottom: 20,
                    data:['销量1','销量2','销量3','销量4']
                },
                color : [ 'red', 'orange', 'green', 'purple' ],
                series: [{
                    name: '销量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center : [ '50%', '50%' ],
                    data: [{name:'销量1',value:'11'},{name:'销量2',value:'222'},{name:'销量3',value:'333'},{name:'销量4',value:'444'}]
                }]
            }
        }    
    ]
  }),
  
  mounted() {
    //   this.getData()
  },
  methods: {
   
  },
  watch: {},
  computed: {}
};
</script>
