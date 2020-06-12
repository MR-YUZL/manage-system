<template>
  <div>
    <a-page-header title="通话质检" style="padding:16px 0;" />
    <div class="box">
      <!-- <Search :tools="searchList" @onSearch="searchFun" /> -->
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
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
            <span class="blue" @click="qualityDetail(row.id)">{{row.id}}</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
    <Detail
      v-if="detailsShow"
      :detailsShow="detailsShow"
      :qcId="qcId"
      :type="qcType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import Detail from "@/views/qualityTesting/conversation/detail";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  components: {
    FormModelSearchForm,
    TablePagination,
    Detail
  },
  data() {
    return {
      qcId: "",
      qcType: 1,
      form: {},
      qualityObj: {},

      detailsShow: false,
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      searchFormList: [
        {
          type: "rangepicker",
          label: "通话时间",
          name: "callDate",
          placeholder:'请选择',
        },
        {
          type: "select",
          label: "质检状态",
          name: "qcStatus",
          placeholder:'请选择',
          options: [
            { key: "null", id: "全部" },
            { key: 0, id: "未质检" },
            { key: 1, id: "已质检" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "select",
          label: "质检人",
          name: "qcAcc",
          placeholder: "请选择",
          options: []
        },
        {
          type: "select",
          label: "通话类型",
          name: "callType",
          placeholder:'请选择',
          options: [
            { key: "null", id: "全部" },
            { key: 2, id: "呼出" },
            { key: 1, id: "呼入" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "select",
          label: "客服组:",
          name: "serviceGroupIds",
          mode:"multiple",
          placeholder:'请选择',
          options: [],
          optionValue: "groupId",
          optionLabel: "groupName"
        },
        {
          type: "select",
          label: "客服",
          name: "serviceIds",
          options: [],
          placeholder:'请选择',
        },
        {
          type: "input",
          label: "联系号码",
          name: "telphone",
          placeholder: "请输入"
        }
      ],
      columns: [
        {
          title: "通话ID",
          dataIndex: "callId",
          key: "callId",
          scopedSlots: { customRender: "idSkip" }
        },
        {
          title: "主叫号码",
          dataIndex: "caller",
          key: "caller"
        },
        {
          title: "被叫号码",
          dataIndex: "called",
          key: "called"
        },
        {
          title: "通话类型",
          dataIndex: "callType",
          key: "callType",
          customRender: value => {
            let obj = {
              "2": "呼入",
              "1": "呼出"
            };
            return obj[value];
          }
        },
        {
          title: "通话时间",
          dataIndex: "callDate",
          key: "callDate"
        },
        {
          title: "客服",
          dataIndex: "serviceAcc",
          key: "serviceAcc"
        },
        {
          title: "通话时长",
          dataIndex: "cLength",
          key: "cLength"
        },
        {
          title: "质检状态",
          dataIndex: "qcType",
          key: "qcType",
          customRender: value => {
            let obj = {
              "0": "未质检",
              "1": "已质检"
            };
            return obj[value];
          }
        }
      ], // 表头
      dataSource: [], // 表格数据
      searchParams: {
        callDate: "2020-05-01,2020-05-11",
        qcStatus: 0,
        qcAcc: "ldkj001",
        callType: 1,
        serviceGroupIds: ["0012d22c3dd74f68879c75d19c78de44"],
        serviceIds: ["ldkj001"],
        telphone: "15606156246",
        currentPage: 1,
        pageSize: 10
      },
      defaultSearchFormValues:{}
    };
  },

  mounted() {
    this.getList();
    this.getStaffSkillGroups();
    this.getSessionServiceGroups();
  },
  methods: {
    //客服组列表
    getSessionServiceGroups(){
      api.sessionServiceGroups().then(res=>{
        console.log('客服组',res)
        if(res.data.status){
          // let newArr = res.data.list.map((item)=>{
          //   return{
          //     ...item,
          //     label:item.groupName,
          //     value:item.groupId
          //   }
          // })
          this.searchFormList[4].options = res.data.list;
        }
      })
    },
    //质检人和客服
    getStaffSkillGroups(type) {
      api.staffSkillGroups({ type: 0 }).then(res => {
        console.log("质检人和客服没有权限", res);
        if (res.data.status) {
          let newArr = res.data.list.map((item)=>{
            return{
              ...item,
              label:item.groupName,
              value:item.groupId
            }
          })
          this.searchFormList[2].options = newArr;
          this.searchFormList[5].options = newArr;
        }
      });
    },
    prevHandleSubmit(val){
      // console.log(val,'val')
      this.searchParams = Object.assign({},this.defaultSearchFormValues,val)
      this.getList();
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      }
      api.callphoneList(params).then(res => {
        if (res.data.status) {
          this.dataSource = res.data.list;
          this.pager = res.data.pager;
        }
      });
    },

    tabChange() {},
    editForm() {},
    onSubmit() {},
    qualityDetail(id) {
      this.qcId = id;
      this.detailsShow = true;
    },
    closeModal() {
      this.detailsShow = false;
    },
    searchFun(values) {
      // console.log("values", values);
    },
    onSelectChange() {},
    paginationChange(values) {
      this.pager = values;
      this.getList();
    }
  },
  watch: {},
  computed: {}
};
</script>

