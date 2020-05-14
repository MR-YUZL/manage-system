<template>
  <div class="container">
    <a-page-header
      title="质检设置"
      sub-title="This is a subtitle"
      @back="() => null"
      style="padding:16px 0;"
    />
    <div class="tabs-container">
      <!-- 带tabs页面 -->
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Tab 1" force-render>
          <!-- 搜索头用组件 -->
          <Search ref="searchHeader" :tools="formList" @onSearch="searchFun" />
          <!-- 按钮区 -->
          <div class="button-area">
            <div class="left-side">
              <span>describe</span>
              <a-button @click="handleResetSearchForm">重置表单内容</a-button>
              <a-button>Default</a-button>
            </div>
            <div class="right-side">
              <a-button>Default</a-button>
              <a-button type="primary">Primary</a-button>
            </div>
          </div>
          <!-- 表格自己写 -->
          <a-table :columns="columns" :data-source="data" :pagination="false">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle">
              <a-icon type="smile-o" />Name
            </span>
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <a-icon type="down" />
              </a>
            </span>
          </a-table>
          <!-- 分页调用组件 -->
          <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
    <Upload />
    <!-- upload有初始值，这样应该可以 -->
    <!-- <a-form-item label="订单附件" :label-col="{ span: 2}" :wrapper-col="{ span: 10}">
      <Upload v-decorator="['accessoryArr']" :list="defaultFileList" />
    </a-form-item> -->
  </div>
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
import Search from "@/components/Search";
import Upload from "@/components/Upload";
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  props: {},
  components: {
    Search,
    TablePagination,
    Upload
  },
  data() {
    return {
      data,
      columns,
      formList: [
        {
          type: "input",
          title: "用户名:",
          placeholder: "请输入",
          key: "guestName"
          // defaultValue: '',
        },
        {
          type: "select",
          title: "留言状态:",
          key: "status",
          defaultValue: "",
          options: [
            { value: "", name: "全部" },
            { value: 0, name: "未处理" },
            { value: 1, name: "已处理" }
          ]
        },
        {
          type: "select",
          title: "来源终端:",
          key: "source",
          options: [
            { value: "", name: "全部" },
            { value: 0, name: "网页" },
            { value: 1, name: "微信小程序" },
            { value: 2, name: "微信公众号" },
            { value: 3, name: "安卓" },
            { value: 4, name: "ios" }
          ]
        },
        {
          type: "search",
          title: "筛选",
          btnType: "primary"
        }
      ],
      searchField: {},
      pager: {}
    };
  },
  methods: {
    callback() {},
    paginationChange() {},
    searchFun(values) {
      console.log(values)
      this.searchField = values
    },
    handleResetSearchForm() {
      this.$refs["searchHeader"].resetValues()
    },
    getListData() {
      this.Request.get("接口url地址", {
        ...this.pager, // pager对象
        ...this.searchField // 如果有搜索头，带上搜索头查询条件
      }).then(res => {
        let {
          data: { pager, list }
        } = res;
        // pager直接拿后端给的
        this.pager = Object.assign({}, this.pager, pager);
        // list要干嘛干嘛去
      });
    }
  }
};
</script>

<style lang="less">
.container {
  .button-area {
    display: flex;

    .left-side {
      flex: 1;
      text-align: left;
    }
    .right-side {
      flex-shrink: unset;
      text-align: right;
    }
  }
}
.tabs-container {
}
</style>