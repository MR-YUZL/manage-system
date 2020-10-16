<template>
  <main class="layout">
    <header class="header">
      <a-form
        layout="inline"
        :form="form"
        :selfUpdate="true"
        @submit.prevent="() => handleSubmit()"
      >
        <a-row :gutter="[20, 20]">
          <a-col
            v-for="(v, index) in formList"
            style="height: 60px"
            :md="v.span || 6"
            :key="index"
            :sm="12"
          >
            <a-form-item :label="v.label">
              <component
                :is="v.component"
                v-decorator="[
                  v.field,
                  { initialValue: v.initialValue, rules: v.rules },
                ]"
                v-bind="v.props"
                :key="v.field"
              ></component>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="12">
            <span class="table-page-search-submitButtons" style="float: right">
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button
                style="margin-left: 8px"
                @click="() => form.resetFields()"
                >重置</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </header>
    <main class="main">
      <slot name="body"></slot>
    </main>
    <footer v-if="footer" class="footer">
      <a-pagination
        show-quick-jumper
        showSizeChanger
        :defaultPageSize="5"
        :pageSizeOptions="['5', '10', '15', '20']"
        :show-total="(total) => `共 ${total} 条数据`"
        :default-current="1"
        :total="total"
        @change="handleSubmit"
        @showSizeChange="handleSubmit"
      />
    </footer>
  </main>
</template>

<script>
export default {
  name: "FormLayout",
  props: {
    formList: {
      type: Array,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      current: 1,
      pageSize: 5,
      form: this.$form.createForm(this, { name: "formLayout" }),
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit(page, size) {
      let pageSize, current, condition;

      this.current = page || this.current;
      this.pageSize = size || this.pageSize;
      this.form.validateFields((err, values) => {
        if (!err) {
          condition = values;
          current = this.current;
          pageSize = this.pageSize;
          this.$emit("submit", { condition, pageSize, current });
        } else {
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    padding: 20px;
  }
  .main {
    width: 100%;
  }
  .footer {
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px;
  }
}
</style>
