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
          <span class="rece1">话务总量</span>
          <span class="rece2 style1">333</span>
          <span class="rece3">呼入量/已接:333</span>
          <span class="rece3">呼出量/已接:52</span>
        </li>
        <li>
          <span class="rece1">通话时长</span>
          <span class="rece2 style2">333</span>
          <span class="rece3">呼入时长:333</span>
          <span class="rece3">呼出时长:52</span>
        </li>
        <li>
          <span class="rece1">平均通话时长</span>
          <span class="rece2 style3">333</span>
          <span class="rece3">平均呼出时长:333</span>
          <span class="rece3">平均呼入时长:52</span>
        </li>
        <li>
          <span class="rece1">接通率</span>
          <span class="rece2 style4">333</span>
          <span class="rece3">呼出接通率:333</span>
          <span class="rece3">呼入接通率:333</span>
        </li>
        <li>
          <span class="rece1">小结完成率</span>
          <span class="rece2 style5">100%</span>
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
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
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
      defaultSearchFormValues: {}
    };
  },
  components: {
    FormModelSearchForm
  },
  methods: {
    prevHandleSubmit(val) {}
  }
};
</script>

<style lang="less" scoped>
.receptionList {
  ul {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      span {
        display: block;
      }
      .rece1 {
        font-size: 14px;
        color: #4c4c4c;
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