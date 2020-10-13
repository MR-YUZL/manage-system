<template>
  <main class="card-container">
    <a-tabs type="card">
      <a-tab-pane key="1" tab="职位招聘">
        <section class="card_top">
          <a-page-header
            style="padding: 0px"
            title="返回"
            sub-title="招聘管理"
            @back="() => null"
          />
          <div class="card_top_form">
            <a-form layout="inline" :form="form" @submit="handleSubmit">
              <a-row :gutter="28">
                <a-col :md="6" :sm="24">
                  <a-form-item label="职位名称">
                    <a-input v-decorator="['name']" placeholder="请输入" />
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="对应岗位">
                    <a-select
                      v-decorator="['post']"
                      placeholder="请输入"
                      style="width: 100%"
                    >
                      <a-select-option value="设计岗"> 设计岗 </a-select-option>
                      <a-select-option value="开发岗"> 开发岗 </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="职位级别">
                    <a-select v-decorator="['level']" placeholder="请输入">
                      <a-select-option value="低级"> 低级 </a-select-option>
                      <a-select-option value="中级"> 中级 </a-select-option>
                      <a-select-option value="高级"> 高级 </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="最低学历要求">
                    <a-select v-decorator="['education']" placeholder="请输入">
                      <a-select-option value="本科"> 本科 </a-select-option>
                      <a-select-option value="大专"> 大专 </a-select-option>
                      <a-select-option value="硕士"> 硕士 </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row style="margin-top: 20px" :gutter="28">
                <a-col :md="6" :sm="24">
                  <a-form-item label="招聘部门">
                    <a-select v-decorator="['recruit']" placeholder="请输入">
                      <a-select-option value="销售部"> 销售部 </a-select-option>
                      <a-select-option value="开发部"> 开发部 </a-select-option>
                      <a-select-option value="人事部"> 人事部 </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="时间区间">
                    <a-range-picker
                      v-decorator="['time']"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" html-type="submit">查询</a-button>
                    <a-button
                      style="margin-left: 8px"
                      @click="() => form.resetFields()"
                      >重置</a-button
                    >
                  </span>
                </a-col>
                <a-col :md="2" :sm="24" :offset="3">
                  <a-button
                    style="margin-left: 8px"
                    type="primary"
                    @click="showModal"
                    >新建招聘</a-button
                  >
                </a-col>
              </a-row>
            </a-form>
          </div>
        </section>
        <section class="card_bottom">
          <a-table
            :data-source="dataSource2"
            :columns="columns"
            :rowKey="(row) => row.id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" @click="() => handleEdit(record)">编辑</a>
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
        </section>
      </a-tab-pane>
      <a-tab-pane key="2" tab="宣讲会"> </a-tab-pane>
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
import { columns } from "@/utils/name.js";
import { recruitTable } from "@/api/one";
export default {
  name: "one",
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      title: "新建招聘",
      dataSource: [],
      dataSource2: [],
      columns,
      cloneForm: {},
      current: 1,
      pageSize: 5,
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
  },
  methods: {
    requestTable() {
      recruitTable({
        current: this.current,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.status === 200) {
          let arr = res.data.result;
          this.pagination.total = res.data.total;
          this.dataSource = arr;
          this.dataSource2 = arr;
        }
      });
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
          const { name, post, level, education, recruit, num } = values;
          for (let i in values) {
            if (values[i]) {
              this.dataSource2 = this.dataSource.filter(
                (item) => item[i].indexOf(values[i]) !== -1
              );
            }
          }
          if (!(name || post || level || education || recruit || num)) {
            this.dataSource2 = this.dataSource;
          }
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
  .card_top {
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    .card_top_form {
      height: 100%;
      width: 100%;
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

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
