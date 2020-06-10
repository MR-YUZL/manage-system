<template>
  <div>
    <a-page-header title="个人统计" style="padding:16px 0;" />
    <div class>
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
    </div>
    <div class="receptionList">
      <ul>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon1"></span>话务总量</span>
          <span class="rece2 style1">{{info.callTotalNum}}</span>
          <span class="rece3">呼入量/已接:{{info.inCallAllNum}}/{{info.inCallAnswerNum}}</span>
          <span class="rece3">呼出量/已接:{{info.callOutAllNum}}/{{info.callOutAnswerNum}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon2"></span>通话时长</span>
          <span class="rece2 style2">{{info.callTotalTime}}</span>
          <span class="rece3">呼入时长:{{info.callInTime}}</span>
          <span class="rece3">呼出时长:{{info.callOutTime}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon3"></span>平均通话时长</span>
          <span class="rece2 style3">{{info.avgCallTime}}</span>
          <span class="rece3">平均呼出时长:{{info.avgCallOutTime}}</span>
          <span class="rece3">平均呼入时长:{{info.avgCallInTime}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon4"></span>接通率</span>
          <span class="rece2 style4">{{info.completionRate}}</span>
          <span class="rece3">呼出接通率:{{info.callOutCRate}}</span>
          <span class="rece3">呼入接通率:{{info.callInCRate}}</span>
        </li>
        <li>
          <span class="rece1"><span class="overviewIcon overviewIcon5"></span>小结完成率</span>
          <span class="rece2 style5">{{info.summaryRate}}</span>
        </li>
      </ul>
    </div>
    <div>
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
        <span slot="out" slot-scope="text, record">{{record.callOutAllNum}}/{{record.callOutAnswerNum}}</span>
        <span slot="in" slot-scope="text, record">{{record.inCallAllNum}}/{{record.inCallAnswerNum}}</span>
      </a-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/analysis";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import moment from 'moment';
export default {
  data() {
    return {
      columns: [
        {
          title: "日期",
          dataIndex: "inputtime",
          key: "inputtime"
        },
        {
          title: "技能组",
          dataIndex: "groupName",
          key: "groupName"
        },
        {
          title: "客服姓名",
          dataIndex: "serviceName",
          key: "serviceName"
        },
        {
          title: "话务量总数",
          dataIndex: "callTotalNum",
          key: "callTotalNum"
        },
        {
          title: "呼出量/已接",
          dataIndex: "callOutAllNum",
          key: "callOutAllNum",
          scopedSlots: { customRender: 'out' },
        },
        {
          title: "呼入量/已接",
          dataIndex: "inCallAllNum",
          key: "inCallAllNum",
          scopedSlots: { customRender: 'in' },
        },
        {
          title: "通话总时长",
          dataIndex: "callTotalTime",
          key: "callTotalTime"
        },
        {
          title: "呼入时长",
          dataIndex: "callInTime",
          key: "callInTime"
        },
        {
          title: "呼出时长",
          dataIndex: "callOutTime",
          key: "callOutTime"
        },
        {
          title: "平均通话时长",
          dataIndex: "avgCallTime",
          key: "avgCallTime"
        },
        {
          title: "平均呼入时长",
          dataIndex: "avgCallInTime",
          key: "avgCallInTime"
        },
        {
          title: "平均呼出时长",
          dataIndex: "avgCallOutTime",
          key: "avgCallOutTime"
        },
        {
          title: "小结完成率",
          dataIndex: "summaryRate",
          key: "summaryRate"
        }
      ],
      dataSource: [
        {
          key: "1",
          inputtime: "0",
          serviceName: "inputtime"
        },
        {
          key: "2",
          inputtime: "0",
          serviceName: "inputtime"
        }
      ],
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
        }
      ],
      defaultSearchFormValues: {
        inputDateStart:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
        // inputDateStart:['2020-06-03','2020-06-06']
      },
      searchParams:{},
      info:{},
    };
  },
  components: {
    FormModelSearchForm
  },
  mounted(){
    this.getPhonePersonInfo();
  },
  methods: {
    getPhonePersonInfo(){
      let dateObj = {
        ...this.defaultSearchFormValues
      };
      let dateArr = dateObj.inputDateStart
      let params = {
        beginDate:dateArr[0],
        endDate:dateArr[1],
      }
      api.phonePersonInfo(params).then(res=>{
        console.log('电话客服-个人统计',res)
        this.dataSource = res.data.dayList;
        this.info = res.data.totalDto;
      })
    },
    prevHandleSubmit(val) {
      this.defaultSearchFormValues = {
        ...val
      }
      this.getPhonePersonInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.receptionList {
  ul {
    display: flex;
    padding: 20px 0 20px;
    li {
      flex: 1;
      text-align: center;
      span {
        display: block;
      }
      .rece1 {
        font-size: 14px;
        color: #4c4c4c;
        .overviewIcon{
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size: 30px 30px;
          padding-left: 35px;
        }
        .overviewIcon1{
          background-image: url('../../../assets/imgs/da1.png');
        }
        .overviewIcon2{
          background-image: url('../../../assets/imgs/da2.png');
        }
        .overviewIcon3{
          background-image: url('../../../assets/imgs/da3.png');
        }
        .overviewIcon4{
          background-image: url('../../../assets/imgs/da4.png');
        }
        .overviewIcon5{
          background-image: url('../../../assets/imgs/da5.png');
        }
      }
      .rece2 {
        font-size: 36px;
        color: #fd6769;
      }
      .style1 {
        color: #3596fd;
      }
      .style2 {
        color: #fe9243;
      }
      .style3 {
        color: #18bc85;
      }
      .style4 {
        color: #fd6769;
      }
      .style5 {
        color: #9bd06e;
      }
      .rece3 {
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>