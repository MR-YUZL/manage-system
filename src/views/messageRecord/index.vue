<template>
  <div>
    <h2 class="TitleH2"></h2>
    <Search :tools="formList" @onSearch="searchFun" /> 
  </div>
</template>

<script>
import Search from './../../components/Search/index'
import moment from "moment";
export default {
  components: {
    Search
  },
  data(){
    return {
      formList: [
        {
          type: 'input',
          title: '用户名:',
          placeholder: '请输入',
          key: 'guestName',
          defaultValue: null,
        },
        {
          type: 'dateRange',
          title: '留言时间:',
          key: 'queryTime',
          defaultValue:null,
          ranges: {
            今天: [moment(), moment()],
            昨天: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            近7天: [moment().subtract(6, "days"), moment()],
            近30天: [moment().subtract(29, "days"), moment()]
          }
        },
        {
          type: 'select',
          title: '留言状态:',
          key: 'status',
          defaultValue: "null",
          options:[{ value: "null", name: "全部" },{value:0,name:"未处理"},{value:1,name:'已处理'}]
        },
        {
          type: 'select',
          title: '来源终端:',
          key: 'source',
          defaultValue: "null",
          options:[{ value: "null", name: "全部" },{value:0,name:"网页"},{value:1,name:'微信小程序'},{value:2,name:'微信公众号'},{value:3,name:'安卓'},{value:3,name:'ios'}]
        },
        {
          type: 'search',
          title: '筛选',
          btnType:'primary'
        }
      ],
      searchField: {},
      msgFormSon:[]
    }
  },
  mounted() {
    console.log("goods/groups加载");
  },
  methods: {
    //检索组件传参接收
    searchFun(values){
      this.searchField = values
    }
  },
  watch: {},
  computed: {}
};
</script>
