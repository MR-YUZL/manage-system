<template>
  <a-form-model
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
    :maskClosable="false"
    ref="form"
  >
    <a-form-model-item
      :label="v.label"
      :ref="v.ref"
      :prop="v.ref"
      has-feedback
      v-for="(v, index) in list"
      :key="index"
    >
      <a-input
        v-model="form[v.ref]"
        v-bind="v.props"
        v-if="v.component === 'Input'"
      />

      <a-select
        v-model="form[v.ref]"
        v-bind="v.props"
        v-if="v.component === 'Select'"
        :placeholder="v.props.placeholder"
      >
        <a-select-option
          :value="v.value"
          v-for="(v, index) in v.options"
          :key="index"
        >
          {{ v.title }}
        </a-select-option>
      </a-select>

      <a-tree-select
        v-model="form[v.ref]"
        v-bind="v.props"
        v-if="v.component === 'TreeSelect'"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: "FormModal",
  components: {},
  props: {
    rules: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Array,
      default: [],
    },
    cloneForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        id: "",
      },
    };
  },
  watch: {
    cloneForm: {
      handler: function (val) {
        this.form = val;
      },
      deep: true,
      immediate: true,
    },
    form: {
      handler: function (val) {
        this.change(val);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(val) {
      if (!val.id) {
        val.id = parseInt(Math.random() * 100);
      }

      this.$emit("update:formData", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
