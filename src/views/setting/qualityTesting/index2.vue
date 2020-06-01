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

          <FormModelSearchForm
            :defaultFormValues="defaultSearchFormValues"
            :formList="searchFormList"
          />
          <!-- 按钮区 -->
          <div class="button-area">
            <div class="left-side">
              <span>describe</span>
              <a-button @click="handleResetSearchForm">重置表单内容</a-button>
              <a-button @click="handleModalShow">Modal</a-button>
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
    <!-- <Upload /> -->
    <!-- upload有初始值，这样应该可以 -->
    <!-- <a-form-item label="订单附件" :label-col="{ span: 2}" :wrapper-col="{ span: 10}">
      <Upload v-decorator="['accessoryArr']" :list="defaultFileList" />
    </a-form-item>-->
    <Modal :currentModal="currentModal" @toggleModal="toggleModal">
      <template v-slot:content>
        <!-- <BaseForm :formObject="formObject" :defaultValues="formAxiosReturnValues" @toggleModal="toggleModal" @formSubmit="formSubmit" /> -->
        <FormModelSearchForm
          :defaultFormValues="defaultSearchFormValues"
          :formList="searchFormList"
        />
        <a-button @click="handleModalShow($event,'modalInner')">ModalInner</a-button>
        <Modal :currentModal="modalInner">
          <template v-slot:content>111</template>
        </Modal>
      </template>
    </Modal>
    <!-- <BaseForm :formObject="formObject" /> -->
    <BaseForm :formObject="formObject" @toggleModal="toggleModal" @formSubmit="formSubmit" />
    <a-checkbox-group :options="optionsWithDisabled" :default-value="['Apple','Pear']">
      <span slot="label" slot-scope="option" style="color: red">{{ option.value }}222</span>
    </a-checkbox-group>
    <a-select
      show-search
      placeholder="Select a person"
      option-filter-prop="children"
      style="width: 200px"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="tom">Tom</a-select-option>
    </a-select>
  </div>
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
import Search from "@/components/Search";
import Upload from "@/components/Upload";
import Modal from "@/components/Modal";
import BaseForm from "@/components/BaseForm";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import moment from "moment";
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
const optionsWithDisabled = [
  { label: "Apple2", value: "Apple" },
  { label: "Pear2", value: "Pear" },
  { label: "Orange2", value: "Orange" }
];
export default {
  props: {},
  components: {
    Search,
    TablePagination,
    Upload,
    Modal,
    BaseForm,
    FormModelSearchForm
  },
  data() {
    return {
      data,
      columns,
      formList: [
        {
          type: "compactSelectInput",
          keys: ["queryType", "queryText"],
          defaultValues: ["1", ""],
          options: [
            {
              label: "客户名称",
              value: "1"
            },
            {
              label: "联系人",
              value: "2"
            },
            {
              label: "联系电话",
              value: "3"
            }
          ]
        },
        {
          type: "inputRange",
          key: "inputRange",
          title: "inputRange",
          defaultValue: ["", ""]
        },
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
      pager: {},
      currentModal: {
        title: "modalTitle",
        visible: false
      },
      modalInner: { title: "modalInner", visible: false },
      formObject: {
        type: "modalForm",
        ref: "testModal",
        modelList: [
          {
            type: "input",
            label: "test",
            ruleName: "test",
            rules: [
              {
                required: true,
                message: "Please input Activity name",
                trigger: "blur"
              }
            ]
          },
          {
            type: "select",
            label: "有效联系",
            placeholder: "请选择",
            ruleName: "followValid",
            options: [
              { key: 1, value: "否" },
              { key: 0, value: "是" }
            ],
            rules: {
              required: true,
              message: "请选择有效联系",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "本次跟进记录",
            placeholder: "",
            ruleName: "followRecord",
            maxLength: 100
          },
          {
            type: "date",
            label: "下次跟进时间",
            placeholder: "请选择",
            ruleName: "followDate",
            format: "YYYY-MM-DD HH:mm:ss",
            options: [],
            rules: {
              required: true,
              message: "请选择跟进时间",
              trigger: "change"
            }
          },
          {
            type: "select",
            label: "baseFormSelect",
            ruleName: "baseFormSelect",
            options: [{ key: "0", value: "test" }],
            rules: [
              {
                required: true,
                message: "Please input Activity name",
                trigger: "blur"
              }
            ]
          },
          {
            type: "select",
            label: "testSelect",
            ruleName: "testSelect",
            showSearch: true,
            options: [{ key: "test", value: "test" }]
          },
          {
            type: "selectCascader",
            cascaderName: "baseFormSelect",
            label: "baseFormSelectCascader",
            ruleName: "baseFormSelectCascader",
            options: [{ key: "testInner", value: "testInner" }]
          },
          {
            type: "areaCascader",
            label: "areaCascader",
            ruleName: "areaCascader",
            fieldNames: {
              label: "name",
              value: "adcode",
              children: "districts"
            }
          },
          {
            type: "cascader",
            label: "cascader",
            ruleName: "cascader",
            fieldNames: {
              label: "name",
              value: "id",
              children: "childrens"
            },
            options: [
              {
                id: "241cf8dcda0d49dc91be9309d74d8da6",
                pid: "0",
                name: "一级分类1",
                inputAcc: "cszh01",
                childrens: [
                  {
                    id: "3fa56a87067240efb19134378a9e45b2",
                    pid: "241cf8dcda0d49dc91be9309d74d8da6",
                    name: "1-4",
                    inputAcc: "cszh01",
                    childrens: []
                  }
                ]
              }
            ]
          }
        ],
        defaultValues: {
          followValid: 0
        },
        testFunction() {
          alert(22222);
        }
      },
      formAxiosReturnValues: {
        id: "id_123",
        test: "hello"
      },
      searchFormList: [
        {
          name: "input",
          type: "input",
          label: "inputName",
          placeholder: "嘿嘿嘿"
        },
        {
          type: "select",
          name: "select",
          label: "selectName",
          options: [
            { id: "五个字长度", key: "select1" },
            { id: "1", key: "select2" }
          ],
          optionValue: "key",
          optionLabel: "id"
        },
        {
          type: "select",
          name: "select2",
          mode: "multiple",
          label: "selectName2",
          placeholder: "woqu"
        },
        {
          type: "datepicker",
          name: "datepicker",
          label: "datepickerName"
        },
        {
          type: "monthpicker",
          name: "monthpicker",
          label: "monthpickerName"
        },
        {
          type: "weekpicker",
          name: "weekpicker",
          label: "weekpickerName"
        },
        {
          type: "rangepicker",
          name: "rangepicker",
          label: "rangepickerName"
        },
        {
          type: "compact",
          name: "compactInputName",
          compact: "input",
          compactName: "compactSelectName",
          options: [
            { label: "select1", value: "select1" },
            { label: "select2", value: "select2" }
          ]
        },
        {
          type: "inputCompact",
          name: "inputCompact",
          label: "inputCompact"
        },
        {
          type: "selectGroup",
          name: "selectGroup",
          label: "selectGroup",
          mode: "multiple",
          list: [
            {
              groupName: "技能组2",
              groupId: "214231415",
              staffs: [
                {
                  name: "cszh012",
                  value: "cszh012"
                }
              ]
            },
            {
              groupName: "技能组1",
              groupId: "214231414",
              staffs: [
                {
                  name: "cszh011",
                  value: "cszh011"
                },
                {
                  name: "测试企蜂云账号5",
                  value: "cszh01"
                },
                {
                  name: "测试企蜂云账号3",
                  value: "cszh02"
                },
                {
                  name: "cszh03",
                  value: "cszh03"
                }
              ]
            }
          ]
        },
        {
          type: "areaCascader",
          name: "areaCascader",
          label: "areaCascader",
          fieldNames: { label: "name", value: "adcode", children: "districts" }
        }
      ],
      defaultSearchFormValues: {
        input: "test",
        select: "select2",
        datepicker: "2020-05-19"
        // monthpicker: moment("2019-02").format("YYYY-MM"),
        // weekpicker: "2020-05-19"
      },
      optionsWithDisabled
    };
  },
  methods: {
    callback() {},
    paginationChange() {},
    searchFun(values) {
      console.log(values);
      this.searchField = values;
    },
    handleResetSearchForm() {
      this.$refs["searchHeader"].resetValues();
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
    },
    toggleModal(value) {
      this.currentModal.visible = value;
    },
    formSubmit(values) {
      console.log(values, "formSubmit========");
    },
    handleModalShow(e, name) {
      if (name) {
        this[name]["visible"] = true;
      } else {
        this["currentModal"]["visible"] = true;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.formObject.defaultValues = Object.assign(
        {},
        this.formObject.defaultValues,
        { test: 333, areaCascader: ["130000", "131000", "131022"] }
      );
      this.formObject.defaultValues["updateTime"] = new Date().getTime();
      let filterItem = this.searchFormList.filter(it => it.name == "select2");
      if (filterItem) {
        filterItem[0].options = [
          { label: "五个字长度", value: "select1" },
          { label: "1", value: "select2" }
        ];
      }
      this.defaultSearchFormValues["input"] = "xxxxx";
      console.log(this.formAxiosReturnValues);
    }, 5000);
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