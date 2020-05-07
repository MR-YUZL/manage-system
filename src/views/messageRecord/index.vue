<template>
  <div>
    <h2 class="TitleH2">留言记录</h2>
    <div class="box">
      <Search :tools="formList" @onSearch="searchFun" /> 
      <div>
        <Table-data :columns-list="columnsList"  :pagination-status="paginationStatus"></Table-data>
        <!-- <a-table :columns="columns" :dataSource="dataSource" :pagination='true'>
          <div slot="guestName" slot-scope="record,row">
            <span class="blue" @click="checkMessage(row.id)">{{row.guestName}}22</span>
          </div>
        </a-table> -->
      </div>
    </div>
  </div>
</template>

<script>
import Search from './../../components/Search/index'
import TableData from "./../../components/Table"
import moment from "moment";
// import axios from "axios"
export default {
  components: {
    Search,
    TableData
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
      columnsList:[
        {
          title: '用户名',
          dataIndex: 'guestName',
          key: 'guestName',
          scopedSlots: { customRender: 'guestName' },
        },
        {
          title: '留言时间',
          dataIndex: 'inputTime',
          key: 'inputTime',
        },
        {
          title: '当前状态',
          dataIndex: 'status',
          key: 'status',
          customRender:(value)=>{
            let obj = {
              "0":'未处理',
              "1":'已处理'
            }
            return obj[value]
          }
        },
        {
          title: '处理结果',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '跟进人',
          dataIndex: 'followAccName',
          key: 'followAccName',
        },
        {
          title: '处理时间',
          dataIndex: 'followTime',
          key: 'followTime',
        },
        {
          title: '来源终端',
          dataIndex: 'source',
          key: 'source',
          customRender:(value)=>{
            let obj = {
              "0":'网页',
              "1":'微信小程序',
              "2":'微信公众号',
              "3":'安卓',
              "4":'ios'
            }
            return obj[value]
          }
        },
      ],
      dataSource:[],
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      },
      //分页请求参数
      paginationStatus:{
        url:'hfw/tsmHfwLeaveComments/listPageJson',
        method:'post',
        params:{
          page:1,
          pageSize:10,
          currentPage:1
        },
      },
    }
  },
  mounted() {
    // axios.post("workflow/follow/saveWorkflowFollow",{test:123})
    // this.getList()
  },
  methods: {
    getList(){
      this.Request.post('hfw/tsmHfwLeaveComments/listPageJson',{ ...this.searchField}).then(res => {
        console.log(res.data,'asdfadfasdfasdfasdf')
        let data = res.data
        this.dataSource =  data.list
      })
    },
    checkMessage(id){   // 调取接口
      console.log(id)
    },
    //检索组件传参接收
    searchFun(values){
      this.searchField = values
    }
  },
  watch: {},
  computed: {}
};
</script>
