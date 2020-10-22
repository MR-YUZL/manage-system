<template>
  <main class="card-container">
    <a-tabs type="card" :activeKey="defaultActiveKey" @change="tabsChange" :tabBarGutter="0">
      <a-tab-pane :key="1" tab="职位招聘" >
        <a-page-header
          style="padding: 10px 20px"
          title="返回"
          sub-title="招聘管理"
          @back="() => null"
        />

        <FormLayout2
          :formList="formList"
          @submit="formSubmit"
          @change="formChange"
          :total="dataSource2Length"
          :id="1"
        >
          <template #body>
            <a-button class="add_button" type="primary" @click="showModal"
              >新建招聘</a-button
            >
            <a-table
              :data-source="dataSource2"
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
                  v-if="dataSource.length"
                  title="确定要删除?"
                  @confirm="() => onDelete(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </template>
        </FormLayout2>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="宣讲会">
        <FormLayout2
          :formList="formList"
          @submit="formSubmit2"
          @change="formChange2"
          :total="dataSource3Length"
          :id="2"
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
        </FormLayout2>
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
  name: "two",
  components: {},
  props: {},
  data() {
    return {
      visible: false,
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
      current2: 1,
      pageSize2: 5,
      dateFormat: "YYYY/MM/DD",
      replaceFields: {
        children: "test",
      },
      defaultActiveKey: 1,
      levelOptions,
      educationOptions,
      postOptions,
      formList,
      dataSource3Length: 0,
      dataSource2Length: 0,
    };
  },
  created() {},
  mounted() {
    this.requestTable({
      condition: this.condition,
      current: this.current,
      pageSize: this.pageSize,
    });
    this.init();
  },
  watch: {
    formList: {
      handler(val, olVal) {},
    },
  },
  methods: {
    init() {
      this.$set(this.formList[1].props, "options", this.postOptions);
      this.$set(this.formList[2].props, "options", this.levelOptions);
      this.$set(this.formList[3].props, "options", this.educationOptions);
      this.$set(this.formList[4].props, "treeData", this.treeList);
      this.formList[5].rules = [
        { required: true },
        { validator: this.validatorNum2 },
      ];
    },
    tabsChange(Key) {
      this.defaultActiveKey = Key;
    },
    requestTable() {
      recruitTable({
        condition: this.condition,
        pageSize: this.pageSize,
        current: this.current,
      }).then((res) => {
        if (res.status === 200) {
          let arr = res.data.result;
          this.dataSource2Length = res.data.total;
          this.dataSource = arr;
          this.dataSource2 = arr;
        }
      });
    },
    requestTable2() {
      recruitTable({
        condition: this.condition,
        pageSize: this.pageSize2,
        current: this.current2,
      }).then((res) => {
        if (res.status === 200) {
          let arr = res.data.result;
          this.dataSource3 = arr;
          this.dataSource3Length = res.data.total;
        }
      });
    },
    validatorNum2(rule, value, callback) {
      if (value[1] > 50) {
        callback(new Error("最大不能超过50!"));
      } else {
        callback();
      }
    },
    formSubmit(data) {
      this.condition = data;
      this.requestTable();
    },
    formChange({ current, pageSize }) {
      this.current = current;
      this.pageSize = pageSize;
      this.requestTable();
    },
    formSubmit2(data) {
      this.condition = data;
      this.requestTable2();
    },
    formChange2({ current, pageSize }) {
      this.current2 = page;
      this.pageSize2 = size;
      this.requestTable2();
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
        this.$message.success({ content: "编辑成功" });
      }
    },
    handleEdit(record) {
      let obj = JSON.parse(JSON.stringify(record));
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
}
.add_button {
  float: right;
  margin-right: 24px;
  z-index: 10;
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
