<template>
  <main class="card-container">
    <a-tabs type="card" :activeKey="activeName" @change="tabsChange">
      <a-tab-pane :key="1" tab="职位招聘">
        <section class="card_top">
          <a-page-header
            style="padding: 0px"
            title="返回"
            sub-title="招聘管理"
            @back="() => null"
          />
          <keep-alive>
            <div class="card_top_form" v-if="activeName === 1">
              <a-form layout="inline" :form="form" @submit="handleSubmit">
                <a-row :gutter="[20, 20]">
                  <a-col :md="6" :sm="24">
                    <a-form-item label="职位名称">
                      <Input
                        v-decorator="['name', { initialValue: '' }]"
                        placeholder="请输入"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="24">
                    <a-form-item label="对应岗位">
                      <Select v-decorator="['post']" :options="postOptions" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="24">
                    <a-form-item label="职位级别">
                      <Cascader
                        v-decorator="['level', { initialValue: [] }]"
                        :options.sync="levelOptions"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="24">
                    <a-form-item label="最低学历要求">
                      <Select
                        v-decorator="['education']"
                        :options="educationOptions"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="[20, 20]">
                  <a-col :md="6" :sm="24">
                    <a-form-item label="招聘部门">
                      <TreeSelect
                        placeholder="请选择"
                        :tree-data="treeList"
                        allow-clear
                        showSearch
                        treeNodeFilterProp="title"
                        :replaceFields="replaceFields"
                        tree-default-expand-all
                        v-decorator="['recruit']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="7" :sm="24">
                    <a-form-item label="时间区间">
                      <a-range-picker
                        v-decorator="['time']"
                        :format="dateFormat"
                        :valueFormat="dateFormat"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="7" :sm="24">
                    <a-form-item label="报名数区间">
                      <InputNum
                        v-decorator="[
                          'num',
                          {
                            initialValue: [0, 50],
                            rules: [
                              { required: true },
                              { validator: validatorNum },
                            ],
                          },
                        ]"
                        name="num"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <span
                      class="table-page-search-submitButtons"
                      style="float: right"
                    >
                      <a-button
                        type="primary"
                        html-type="submit"
                        v-permission:query
                        >查询</a-button
                      >
                      <a-button
                        style="margin-left: 8px"
                        @click="() => handleReset()"
                        v-permission:query
                        >重置</a-button
                      >
                    </span>
                  </a-col>
                </a-row>
              </a-form>

              <a-button
                class="card_top_add"
                type="primary"
                @click="showModal"
                v-permission:add
                >新建招聘</a-button
              >
            </div>
          </keep-alive>
        </section>
        <section class="card_bottom">
          <a-table
            :data-source="dataSource2"
            :columns="columns"
            :rowKey="(row) => row.id"
            :pagination="pagination"
            :loading="tableLoading"
          >
            <template slot="operation" slot-scope="text, record">
              <a
                href="javascript:;"
                @click="() => handleEdit(record)"
                v-permission:edit
                >编辑</a
              >
              <a-divider type="vertical" />
              <a-popconfirm
                v-permission:delete
                v-if="dataSource.length"
                title="确定要删除?"
                @confirm="() => onDelete(record.id)"
              >
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </template>
          </a-table>
        </section>
      </a-tab-pane>
      <a-tab-pane key="XJ" tab="宣讲会">
        <FormLayout
          :formList="formList"
          @submit="formSubmit"
          :total="dataSource3Length"
          v-if="activeName === 'XJ'"
        >
          <template #body>
            <a-table
              :data-source="dataSource3"
              :columns="columns"
              :rowKey="(row) => row.id"
              :pagination="false"
            >
              <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="() => handleEdit(record)"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="dataSource3.length"
                  title="确定要删除?"
                  @confirm="() => onDelete(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </template>
        </FormLayout>
      </a-tab-pane>
    </a-tabs>
    <Modal
      :title="title"
      :visible.sync="visible"
      @onSubmit="onSubmit"
      :cloneForm="cloneForm"
      :list="dataSource2"
    ></Modal>
  </main>
</template>

<script>
import {
  columns,
  treeList,
  condition,
  educationOptions,
  postOptions,
  formList,
  levelOptions,
} from "@/utils/name.js";
import { recruitTable } from "@/api/one";
export default {
  name: "one",
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      tableLoading: false,
      title: "新建招聘",
      dataSource: [],
      dataSource2: [],
      dataSource3: [],
      columns,
      treeList,
      cloneForm: {},
      condition,
      current: 1,
      pageSize: 5,
      dateFormat: "YYYY/MM/DD",
      replaceFields: {
        children: "test",
      },
      activeName: 1,
      levelOptions,
      educationOptions,
      postOptions,
      formList,
      dataSource3Length: 0,
      pagination: {
        total: 5,
        defaultPageSize: 5,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        onShowSizeChange: (current, pageSize) =>
          this.handleSizeChange(pageSize),
        onChange: (current, pageSize) => this.handleChange(current, pageSize),
      },
      form: this.$form.createForm(this, { name: "form" }),
    };
  },
  created() {},
  mounted() {
    this.requestTable();
    this.init();
  },
  watch: {
    levelOptions: {
      deep: true,
      handler(val, olVal) {
        console.log("val,olVal", val, olVal);
      },
    },
  },
  methods: {
    init() {
      this.formList[1].props.options = this.postOptions;
      this.formList[2].props.options = this.levelOptions;
      this.formList[3].props.options = this.educationOptions;
      this.formList[4].props.treeData = this.treeList;
      this.formList[5].rules = [
        { required: true },
        { validator: this.validatorNum2 },
      ];
    },
    tabsChange(Key) {
      this.activeName = Key;
    },
    requestTable() {
      this.tableLoading = true;

      recruitTable({
        current: this.current,
        pageSize: this.pageSize,
        condition: this.condition,
      }).then((res) => {
        if (res.code === 200) {
          let arr = res.result;
          this.pagination.total = res.total;
          this.dataSource = arr;
          this.dataSource2 = arr;

          this.tableLoading = false;
        }
      });
    },
    requestTable2(data) {
      recruitTable({
        ...data,
      }).then((res) => {
        if (res.code === 200) {
          let arr = res.result;
          this.dataSource3 = arr;
          this.dataSource3Length = res.total;
        }
      });
    },
    validatorNum(rule, value, callback) {
      if (value[1] > 50) {
        callback(new Error("最大不能超过50!"));
      } else {
        callback();
      }
    },
    validatorNum2(rule, value, callback) {
      if (value[1] > 50) {
        callback(new Error("最大不能超过50!"));
      } else {
        callback();
      }
    },
    handleReset() {
      // this.form.setFieldsValue({ num: [0, 50] });
      console.log(this.form.getFieldsValue());
      this.form.resetFields();
    },
    formSubmit(data) {
      this.requestTable2(data);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.requestTable();
    },
    handleChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.requestTable();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.condition = values;
          this.requestTable();
        } else {
        }
      });
    },
    onSubmit(data, title) {
      if (title === "新建招聘") {
        this.dataSource2.unshift(data);
        this.$message.success({ content: "新建成功" });
      } else {
        this.dataSource2 = this.dataSource2.map((v) => {
          if (v.id === data.id) {
            return data;
          } else {
            return v;
          }
        });
        //findIndexof 找到id 之后用splice替换
        this.$message.success({ content: "编辑成功" });
      }
    },
    handleEdit(record) {
      let obj = JSON.parse(JSON.stringify(record)); //需进行深拷贝，否则会在编辑时实时改变列表数据
      this.title = "编辑";
      this.visible = true;
      this.cloneForm = obj;
    },
    showModal() {
      this.title = "新建招聘";
      this.visible = true;
      this.cloneForm = {};
    },
    onDelete(id) {
      this.dataSource2 = this.dataSource2.filter((item) => item.id !== id);
      this.$message.success({ content: "删除成功" });
    },
  },
};
</script>

<style lang="less" scoped>
.card-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  .card_top {
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    position: relative;
    .card_top_form {
      height: 100%;
      width: 100%;
    }
    .card_top_add {
      position: absolute;
      right: 24px;
      bottom: 10px;
    }
  }
  .card_bottom {
    border-top: 2px solid rgba(65, 106, 115, 0.1);
  }
}
/deep/ .card-container .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin: 0px;
}

/deep/ .ant-form-inline .ant-form-item {
  display: flex;
}

/deep/ .ant-form-inline .ant-form-item .ant-form-item-control-wrapper {
  flex: 1 1;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
}

/deep/ .ant-tabs-bar {
  border-color: #fff;
  margin: 0px;
}

/deep/ .card-container .ant-tabs-card .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}
</style>
