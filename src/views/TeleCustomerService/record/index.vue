<template>
  <div class="record">
    <h2 class="TitleH2">通话记录</h2>
    <div class="box">
      <Search :tools="formList" @onSearch="searchFun" /> 
      <div class="btn">
         <a-button type="primary">
          批量播放录音
        </a-button>
      </div>
      <div>
        <a-table :columns="columns" :dataSource="dataList" :pagination='false' :rowKey="record => record.id"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          >
          <a slot="action" slot-scope="text" href="javascript:;" @click="playRecording(text)">
            播放录音
          </a>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
  </div>
</template>

<script>
import UserInformation from './../../../components/userInf'
import Search from './../../../components/Search/index'
import MessageDetail from './../../messageRecord/messageDetail'
import TablePagination from "./../../../components/Table/TablePagination"


export default {
  components: {
    Search,
    MessageDetail,
    UserInformation,
    TablePagination
  },
  data(){
    return {
      formList: [
        {
          type: 'input',
          title: '联系电话:',
          placeholder: '请输入',
          key: 'telphone',
          // defaultValue: '',
        },
        {
          type: 'input',
          title: '客户名称:',
          placeholder: '请输入',
          key: 'custName',
          // defaultValue: '',
        },
        {
          type: 'select',
          title: '通话类型:',
          key: 'callType',
          defaultValue: "",
          options:[{ value: "0", name: "null" },{ value: "1", name: "来电已接" },{value:2,name:"来电未接"},{value:3,name:'去电已接'},{value:4,name:'去电未接'}] //来电已接,来电未接、去电已接、去电未接
        },
        {
          type: 'input',
          title: '客服姓名:',
          placeholder: '请输入',
          key: 'customers',
          // defaultValue: '',
        },
        {
          type: 'search',
          title: '筛选',
          btnType:'primary'
        }
      ],
      searchField: {},
      columns:[
        {
          title: '通话ID',
          dataIndex: 'callId',
          key: '1',
        },
        {
          title: '客户名称',
          dataIndex: 'custName',
          key: '2',
        },
        {
          title: '通话类型',
          dataIndex: 'callType',
          key: '3',

        },
        {
          title: '通话时间',
          dataIndex: 'callTime',
          key: '4',
        },
        {
          title: '主呼号码',
          dataIndex: 'caller',
          key: '5',
        },
        {
          title: '被呼号码',
          dataIndex: 'called',
          key: '6',
        },
        {
          title: '客服姓名',
          dataIndex: 'serviceName',
          key: '7',
        },
        {
          title: '通话时长',
          dataIndex: 'callLength',
          key: '8',
        },
        {
          title: '咨询分类',
          dataIndex: 'consultType',
          key: '9',
        },
        {
          title: '操作',
          dataIndex: '',
          key: '10',
          scopedSlots: { customRender: 'action' }
        },
      ],
      dataList:[
        {
          callId:1,
          custName:'打不死的小灰灰',
          callType:1,
          callTime:20201029,
          caller:'18153535353',
          called:'18888888888',
          serviceName:'灰太狼',
          callLength:'10min',
          consultType:'1'
        }
      ],
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      recordList:[],
      handleRecordBtn:false,
      detailsId:'',
      resultContent:'',
      selectedRowKeys:[],
      handleResultCon:{
        name:'',
        con:''
      },
      guestId:''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      console.log({ ...this.pager,...this.searchField})
      this.Request.post('/hfw/callrecords/queryCallRecords',{ ...this.pager,...this.searchField}).then(res => {
        console.log(res)
        let data = res.data
        let page = data.pager
        this.dataSource =  data.list
        this.pager = Object.assign({},this.pager,page)
      })
    },
   
    onShowSizeChange(current, pageSize) {
      this.pager.pageSize = pageSize;
      this.pager.currentPage = 1;
      this.getList();
    },
    paginationChange(values) {
      this.pager = values
      this.getList();
    },
   
     onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
  
    //检索组件传参接收
    searchFun(values){
      console.log('values',values)
      this.pager.currentPage = 1
      this.searchField = values
      this.getList();
    },
    //播放录音
    playRecording(text){
      console.log(text)
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
  .record{
    .btn{
      padding: 20px;
    }
  }
  .page_pagination{
    margin:10px 0;
    display: flex;
    justify-content: flex-end;
  }
  .record-detail{
    display:flex;
    .message{
      width:380px;
      border-right:1px solid #e6e6e6;
    }
    .information{
      margin-left:48px;
      width:384px;
    }
  }
</style>
