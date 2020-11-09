<template>
  <a-form
    layout="inline"
    :form="form"
    :key="id"
    style="width: 100%; height: 100%"
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
          <!-- <component
            :is="v.component"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
            v-bind="v.props"
            :key="v.field"
          ></component> -->
          <Input
            v-if="v.component === 'Input'"
            v-bind="v.props"
            :key="v.field"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
          />
          <Select
            v-if="v.component === 'Select'"
            v-bind="v.props"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
          />
          <Cascader
            v-if="v.component === 'Cascader'"
            :options.sync="v.props.options"
            v-bind="v.props"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
          />
          <TreeSelect
            v-if="v.component === 'TreeSelect'"
            v-bind="v.props"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
          />
          <InputNum
            v-if="v.component === 'InputNum'"
            v-bind="v.props"
            v-decorator="[
              v.field,
              { initialValue: v.initialValue, rules: v.rules },
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :md="4" :sm="12">
        <span class="table-page-search-submitButtons" style="float: right">
          <a-button type="primary" html-type="submit" v-permission:query
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
</template>

<script>
export default {
  name: "Query",
  components: {},
  props: {
    formList: {
      type: Array,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: `formLayout` }),
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit() {
      let condition;
      this.form.validateFields((err, values) => {
        if (!err) {
          condition = values;

          this.$emit("submit", condition);
        } else {
        }
      });
    },
    handleReset() {
      // this.form.setFieldsValue({ num: [0, 50] });
      this.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
