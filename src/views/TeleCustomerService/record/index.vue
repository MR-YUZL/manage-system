<template>
  <div>
    <h2 class="TitleH2">通话记录</h2>
    <div class="box">
      <Search :tools="formList" @onSearch="searchFun" /> 
      <div>
        <a-table :columns="columns" :dataSource="dataSource" :pagination='false' :rowKey="record => record.id">
          <div slot="guestName" slot-scope="record,row">
             <span class="blue" @click="checkMessage(row.id,row.status)">{{row.guestName}}22</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <a-modal title="记录" :footer="null" width="880px" v-if="detailsShow" :visible="detailsShow" @cancel="handleCancel">
      <div class="record-detail">
        <div class="message"><MessageDetail :recordList="recordList" :handleRecordBtn="handleRecordBtn" :handleResult="handleResultCon" @setHandleResult="setHandleResult" /> </div>
        <div class="information"><UserInformation  :guestId="guestId"/></div>
      </div>
   </a-modal>
    <a-modal title="留言处理" v-if="leaveModalShow" :visible="leaveModalShow" @cancel="handleleaveModalCancel" @ok="handleleaveModalOk">
      <div style="display:flex">
        <p style="width:78px;">处理结果</p><a-textarea v-model="resultContent" placeholder="请输入处理结果" :auto-size="{ minRows: 3, maxRows: 5 }" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import UserInformation from './../../../components/userInf'
import Search from './../../../components/Search/index'
import MessageDetail from './../../messageRecord/messageDetail'
import TablePagination from "./../../../components/Table/TablePagination"

import moment from "moment";
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
          key: 'guestName',
          // defaultValue: '',
        },
        {
          type: 'input',
          title: '客户名称:',
          placeholder: '请输入',
          key: 'guestName',
          // defaultValue: '',
        },
        {
          type: 'select',
          title: '通话类型:',
          key: 'status',
          defaultValue: "null",
          options:[{ value: "null", name: "全部" },{value:0,name:"未处理"},{value:1,name:'已处理'}] //来电已接 来电未接 去电已接 去电未接
        },
        {
          type: 'input',
          title: '客服姓名:',
          placeholder: '请输入',
          key: 'guestName',
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
          title: '用户名',
          dataIndex: 'guestName',
          key: '1',
          scopedSlots: { customRender: 'guestName' },
        },
        {
          title: '留言时间',
          dataIndex: 'inputTime',
          key: '2',
        },
        {
          title: '当前状态',
          dataIndex: 'status',
          key: '3',
          customRender:(value)=>{
            let con = {
              children:(
                <div>
                  {value==0 && <div style="color:#f99921">未处理</div>}
                  {value==1 && <div>已处理</div> }
                </div>
              )
            }
            return con
          }
        },
        {
          title: '处理结果',
          dataIndex: 'content',
          key: '4',
        },
        {
          title: '跟进人',
          dataIndex: 'followAccName',
          key: '5',
        },
        {
          title: '处理时间',
          dataIndex: 'followTime',
          key: '6',
        },
        {
          title: '来源终端',
          dataIndex: 'source',
          key: '7',
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
        totalRecord: 0,
        totalPage: 0
      },
      detailsShow:false,
      recordList:[],
      handleRecordBtn:false,
      detailsId:'',
      leaveModalShow:false,
      resultContent:'',
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
      this.Request.get('hfw/tsmHfwLeaveComments/listPageJson',{ ...this.pager,...this.searchField}).then(res => {
        let data = res.data
        let page = data.pager
        this.dataSource =  data.list
        this.pager = Object.assign({},this.pager,page)
      })
    },
    checkMessage(id,status){   // 调取接口
    //  "0":'未处理',  "1":'已处理'
      console.log(id,status)
      this.handleRecordBtn = !status?true:false
      this.detailsShow = true
      this.Request.get('/hfw/tsmHfwLeaveComments/infoJson?id='+ id).then(res=>{
        console.log(res.data.data,'记录详情')
        let data = res.data.data
        this.detailsId = data.id
        this.handleResultCon.con = data.result
        this.handleResultCon.name = data.followAccName
        this.recordList = data.detailBeanList
        this.guestId = data.guestId
      })
    },
    handleCancel(){
      this.detailsShow = false
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
    setHandleResult(){
      this.leaveModalShow=true
    },
    handleleaveModalCancel(){
      this.leaveModalShow=false
    },
    handleleaveModalOk(){
      this.Request.get('/hfw/tsmHfwLeaveComments/updateStatus?id='+ this.detailsId).then(res=>{
        console.log(res)
        this.leaveModalShow=false
        this.handleRecordBtn = false
        this.handleResultCon.con = this.resultContent

      })
    },
    //检索组件传参接收
    searchFun(values){
      console.log('values',values)
      this.pager.currentPage = 1
      this.searchField = values
      this.getList();
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
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
