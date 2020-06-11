<template>
  <div>
    <a-page-header title="跟进记录" style="padding:16px 0;" />
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
          <div slot="detailSkip" slot-scope="record,row">
            <span class="blue" @click="customerDetail(row.id)">{{row.custName}}</span>
          </div>
        </a-table>
      </div>
      <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
import Search from "@/components/Search/index";
import TablePagination from "@/components/Table/TablePagination";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      searchFormList: [
        {
          type: "compact",
          name: "queryText",
          compact: "input",
          compactName: "queryType",
          placeholder: "请输入",
          options:[ {
              label: "客户姓名",
              value: "1"
            }]
        },
        {
          type: "selectGroup",
          label: "客服姓名",
          name: "followAccs",
          mode: "multiple",
          list: [],
          placeholder:'请选择',
        },
        {
          type: "rangepicker",
          label: "跟进时间",
          name: "queryTimess",
          placeholder:'请选择',
        }
      ],
      columns: [
          {
            title: "跟进时间",
            dataIndex: "followDate",
            key: "followDate"
          },
          {
            title: "客户名称",
            dataIndex: "custName",
            key: "custName",
            scopedSlots: { customRender: 'detailSkip' },
          },
          {
            title: "有效联系",
            dataIndex: "followValid",
            key: "followValid",
            customRender: value => {
              let con = {
                children: (
                  <div>
                    {value == 0 && <div>是</div>}
                    {value == 1 && <div>否</div>}
                  </div>
                )
              };
              return con;
            }
          },
          {
            title: "客服姓名",
            dataIndex: "followAcc",
            key: "followAcc"
          },
          {
            title: "跟进记录",
            dataIndex: "followRecord",
            key: "followRecord"
          }
        ], // 表头
        dataSource: [], // 表格数据
        pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      },
      searchParams:{
        queryText:'测试'
      },
      defaultSearchFormValues: {
        queryType: "1"
      },
    };
  },
  components: {
    FormModelSearchForm,
    TablePagination,
  },
  mounted() {
    this.getList();
    this.getStaffSkillGroups()
  },
  methods: {
    prevHandleSubmit(val) {
      this.searchParams = Object.assign({}, this.searchParams, val);
      this.getList();
    },
    getList() {
      let params = {
        ...this.searchParams,
        ...this.pager
      }
      api.followRecordList(params).then(res => {
        console.log('回访记录',res)
        if(res.data.status){
          this.dataSource = res.data.list;
          this.pager = res.data.pager;
        }
      });
    },
    customerDetail(){},
    searchFun() {},
    onSelectChange() {},
    getStaffSkillGroups() {
      api.staffSkillGroups({ type: 1 }).then(res => {
        console.log("客服姓名有权限", res);
        if (res.data.status) {
          this.searchFormList[1].list = res.data.list;
        }
      });
    },
    paginationChange(values) {
      this.pager = values;
      this.getList();
    }
  }
};
</script>

<style>
</style>