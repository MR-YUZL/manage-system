<template>
  <div>
    <a-page-header title="历史会话" style="padding:16px 0;" />

    <div class="box">
      <!-- <Search :tools="searchList" @onSearch="searchFun" /> -->
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevReferOnChange="prevReferOnChange"
        @prevHandleSubmit="prevHandleSubmit"
      />
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id"
        >
          <div slot="idSkip" slot-scope="record,row">
            <span class="blue" @click="skipDetail(row.id)">{{row.id}}</span>
          </div>
          <div slot="name" slot-scope="record,row">
            <span class="name" :title="row.name">{{row.name}}</span>
          </div>
          <div slot="consultTypeName" slot-scope="record,row">
            <span class="name" :title="row.consultTypeName">{{row.consultTypeName}}</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>

    <a-modal
      title="记录"
      :footer="null"
      width="880px"
      v-if="detailsShow"
      :visible="detailsShow"
      @cancel="handleCancel"
    >
      <div class="record-detail">
        <div class="message">
          <!-- <MessageDetail
            :recordList="recordList"
            :handleRecordBtn="handleRecordBtn"
            :handleResult="handleResultCon"
            @setHandleResult="setHandleResult"
          />-->
          <BaseForm
            :formObject="formObject"
            @formSubmit="formSubmit"
          />
          <div class="customerGrading">客户评级:{{appraiseValue}}</div>
          <div style="width:355px" class="historyScroll">
            <HistoryList style="position:relative;background-color:#fff;" :sessionInf="sessionInf" />
          </div>
        </div>
        <div class="information">
          <!-- 8c730589aa1d41a19d2ce8ca23f9fb1e -->
          <UserInformation :guestId="guestId"  />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
// import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import UserInformation from "@/components/userInf";
// import MessageDetail from "@/views/messageRecord/messageDetail";
import BaseForm from "@/components/BaseForm";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import HistoryList from '@/components/historyMessage/historyList'
export default {
  data() {
    return {
      sessionInf:{},
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      searchFormList: [
        {
          type: "input",
          label: "会话ID",
          placeholder: "请输入",
          name: "id"
        },
        {
          type: "rangepicker",
          label: "会话时间",
          name: "queryTime",
          placeholder:'请选择',
        },
        {
          type: "select",
          label: "会话来源:",
          name: "channelType",
          placeholder:'请选择',
          options: [
            { key: "null", id: "全部" },
            { key: 2, id: "网站咨询" },
            { key: 0, id: "微信公众号" },
            { key: 1, id: "微信小程序" },
            { key: 3, id: "app" },
            { key: 5, id: "QQ" },
            { key: 4, id: "微信" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "selectGroup",
          label: "接待客服",
          name: "serviceAccs",
          mode: "multiple",
          list: [],
          placeholder:'请选择',
        },
        {
          type: "input",
          label: "姓名",
          placeholder: "请输入",
          name: "name"
        },
        {
          type: "cascader",
          label: "咨询分类",
          placeholder: "请选择",
          name: "consultType",
          options:[],
          fieldNames: {
            label: "name",
            value: "id",
            children: "childrens"
          },
        }
      ],
      columns: [
        {
          title: "会话ID",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: "idSkip" }
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "会话开始时间",
          dataIndex: "beginTime",
          key: "beginTime"
        },
        {
          title: "会话时长/轮次",
          dataIndex: "sessionSum",
          key: "sessionSum"
        },
        {
          title: "会话来源",
          dataIndex: "channelType",
          key: "channelType",
          customRender: value => {
            let con = {
              children: (
                <div>
                  {value == 0 && <div>网站咨询</div>}
                  {value == 1 && <div>微信公众号</div>}
                  {value == 2 && <div>微信小程序</div>}
                  {value == 3 && <div>IOS</div>}
                  {value == 4 && <div>安卓</div>}
                  {value == 5 && <div>QQ</div>}
                  {value == 6 && <div>微信</div>}
                </div>
              )
            };
            return con;
          }
        },
        {
          title: "平均响应时长",
          dataIndex: "aveResponseDuration",
          key: "aveResponseDuration"
        },
        {
          title: "接待客服",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "咨询分类",
          dataIndex: "consultTypeName",
          key: "consultTypeName",
          scopedSlots: { customRender: "consultTypeName" }
        },
        {
          title: "会话结束时间",
          dataIndex: "endTime",
          key: "endTime"
        },
        {
          title: "满意度",
          dataIndex: "appraiseValue",
          key: "appraiseValue",
          customRender: value => {
            let con = {
              children: (
                <div>
                  {value == '' && <div>未评价</div>}
                  {value == 0 && value!='' && <div>不太愿意</div>}
                  {value == 1 && <div>一般满意</div>}
                  {value == 2 && <div>满意</div>}
                  {value == 3 && <div>很满意</div>}
                  {value == 4 && <div>非常满意</div>}
                </div>
              )
            };
            return con;
          }
        }
      ], // 表头
      dataSource: [], // 表格数据
      //弹窗
      detailsShow: false,
      recordList: [],
      guestId: "",
      handleRecordBtn: "",
      handleResultCon: {
        name: "",
        con: ""
      },
      searchParams: {
        id: "",
        queryTime: "",
        channelType: "",
        serviceAccs: [],
        name: ""
      },
      defaultSearchFormValues:{},
      formObject: {
        ref: "testModal",
        sureBtn:'保存并更新',
        modelList: [
          {
            type: "cascader",
            label: "咨询分类",
            placeholder: "请选择",
            model: undefined,
            ruleName: "consultType",
            options: [],
            fieldNames: { label: "name", value: "id", children: "childrens" },
            rules: {
              required: true,
              message: "请选择咨询分类",
              trigger: "change"
            }
          },
          {
            type: "select",
            label: "解决问题",
            placeholder: "请选择",
            model: undefined,
            ruleName: "status", 
            options: [
              { key: 1, value: "已解决" },
              { key: 0, value: "未解决" }
            ],
            rules: {
              required: true,
              message: "请选择解决问题",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "咨询备注",
            placeholder: "请选择",
            model: undefined,
            ruleName: "advisoryRemark",
            maxLength:256
          }
        ],
        defaultValues:{}
      },
      detailId:'',
      historicalRefer:{}
    };
  },
  computed:{
    appraiseValue(){
      let obj = {
        '0':'不太满意',
        '1':'一般满意',
        '2':'满意',
        '3':'很满意',
        '4':'非常满意',
      }
      return obj[this.formObject.appraiseValue]
    }
  },
  components: {
    FormModelSearchForm,
    TablePagination,
    UserInformation,
    // MessageDetail
    BaseForm,
    HistoryList
  },
  mounted() {
    this.getList();
    this.getReferClassify();
    this.getService();
  },
  methods: {
    prevReferOnChange(val){
      this.consultType = val.join();
    },
    getService(){
      api.staffSkillGroups({type:1}).then(res=>{
        console.log(res,'接待客服')
        if(res.data.role){
          this.searchFormList[3].list = res.data.list
        }else{
          this.searchFormList.splice(3,1)
        }
        
      })
    },
    prevHandleSubmit(val){
      console.log(val,'val')
      if(val.consultType && val.consultType[0]){
        val.consultType = val.consultType.join();
      }else{
        val.serviceAccs = ''
      }
      if(val.serviceAccs && val.serviceAccs[0]){
        val.serviceAccs = val.serviceAccs.join();
      }else{
        val.serviceAccs = ''
      }
      this.searchParams = Object.assign({},this.searchParams,{consultType:this.consultType},val)
      this.getList();
    },
    toggleModal() {},
    formSubmit(data) {
      console.log(data,'data566')
      let consultArr = data.consultType;
      let consultObj = {
        firstConsultId:consultArr[0],
        secondConsultId:consultArr[1],
        threeConsultId:consultArr[2]
      }
      let obj = {
        ...data,
        id:this.detailId,
        ...consultObj
      }
      api.saveReferRemark(obj).then(res=>{
        console.log('历史会话保存咨询备注',res)
        if(res.data.status){
          this.$message.success('保存成功')
        }
      })
    },
    getReferClassify() {
      api.referClassify().then(res => {
        console.log("咨询分类", res);
        if (res.data.status) {
          this.formObject.modelList[0].options = res.data.list;
          this.searchFormList[5].options = res.data.list;
        }
      });
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      }
      api.sessionList(params).then(res => {
        console.log("=========", res);
        if (res.data.status) {
          this.dataSource = res.data.list;
          this.pager = res.data.pager;
        }
      });
    },

    searchFun() {},
    onSelectChange() {},
    paginationChange(values) {
      this.pager = values;
      this.getList();
    },
    //弹窗
    skipDetail(id) {
      this.detailId = id;
      console.log(id, "==========id");
      this.Request.get("/hfw/hfwSessionInfo/infoJson?id=" + id).then(
        res => {
          let data = res.data.data;
          this.handleResultCon.con = data.result;
          this.handleResultCon.name = data.followAccName;
          this.recordList = data.detailBeanList;
          this.guestId = data.guestId;
          console.log(data,'123')
          let {advisoryRemark,status,firstConsultId,secondConsultId,threeConsultId} = data;
          this.formObject.defaultValues = {
            advisoryRemark,status,
            consultType:[firstConsultId,secondConsultId,threeConsultId]};
          this.sessionInf = {
            orgId:data.orgId,
            sessionId:data.id,
            msgTimeEnd:moment(data.endTime).format("YYYY-MM-DD HH:mm:ss.SSS"),
            type:1,
            serviceImAccount:data.serviceImAccount,
            visitorAccount:data.guestImAccount,
          }
          this.detailsShow = true;
        }
      );
    },
    handleCancel() {
      this.detailsShow = false;
    },
    setHandleResult() {}
  }
};
</script>

<style lang="less" scoped>
.box{
  .name{
    display: inline-block;
    width: 110px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.record-detail {
  display: flex;
  .message {
    width: 380px;
    border-right: 1px solid #e6e6e6;
    .historyScroll{
      height: 270px;
      // .message-list{
      //   height: 270px;
      // }
    }
    .customerGrading {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      margin: 0 20px 20px 0;
    }
    /deep/button{
        margin-right: 20px;
      }
  }
  .information {
    margin-left: 48px;
    width: 384px;
  }
}
</style>