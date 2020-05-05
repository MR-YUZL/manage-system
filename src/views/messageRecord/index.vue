<template>
  <div>
    <Search :search-list="searchList" @func="getMsgFormSon" />
  </div>
</template>

<script>
import Search from './../../components/Search/test1'
export default {
  components: {
    Search
  },
  data: () => ({
    searchList:[
            {
                model:'time',              //参数数据
                status:'time',        //匹配组件
                name:'',              //参数名称
                title:'回访时间：'     //条件名称
            },
            {
                model:'input',
                status:'input',
                name:'',
                title:'客户标签：'
            },
            
            {
                model:'select',//单选下拉
                status:'select',
                name:'',
                title:'客户姓名：',
                options:[{name:'1111',value:'1111'},{name:'2222',value:'2222'}]
            },
            {
                model:'input1',
                status:'input',
                name:'',
                title:'输入框：'
            },
            {
                model:'time1',
                status:'time',
                name:'',
                title:'结束时间：'
            },
            {
                model:['select_input1','select_input2'],
                status:'select_input',
                name:'',
                title:'',
                // placeholder:'ces',
                options:[{name:'1111',value:'1111'},{name:'2222',value:'2222'}]
            },
             {
                model:'time3',
                status:'time',
                name:'',
                title:'回访时间：'
            },
            {
                model:'input3',
                status:'input',
                name:'',
                title:'客户标签：'
            },
            {
              model:'time_interval3',
              status:'time_interval',
              name:'',
              title:'时间区间：'
            },
            {
              model:'number_nterval',
              status:'number_nterval',
              name:'',
              title:'数字区间：'
            },
        
            {
                status:'btn',
            },
        ],
         msgFormSon:[]
  }),
  
  mounted() {
    console.log("goods/groups加载");
  },
  methods: {
    //检索组件传参接收
    getMsgFormSon(data){
      this.msgFormSon = data
      console.log(this.msgFormSon)
    }
  },
  watch: {},
  computed: {}
};
</script>
