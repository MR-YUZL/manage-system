<template>
  <a-modal v-model="visible" :title="title" :footer="null" :closable="false">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="form"
    >
      <a-form-model-item label="职位名称" ref="name" prop="name" has-feedback>
        <a-input v-model="form.name" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="对应岗位" ref="post" prop="post" has-feedback>
        <a-select v-model="form.post" placeholder="请选择">
          <a-select-option value="设计岗"> 设计岗 </a-select-option>
          <a-select-option value="开发岗"> 开发岗 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="职位级别" ref="level" prop="level" has-feedback>
        <a-select v-model="form.level" placeholder="请选择">
          <a-select-option value="低级"> 低级 </a-select-option>
          <a-select-option value="中级"> 中级 </a-select-option>
          <a-select-option value="高级"> 高级 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="招聘部门"
        ref="recruit"
        prop="recruit"
        has-feedback
      >
        <a-select v-model="form.recruit" placeholder="请选择">
          <a-select-option value="销售部"> 销售部 </a-select-option>
          <a-select-option value="开发部"> 开发部 </a-select-option>
          <a-select-option value="人事部"> 人事部 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="最低学历要求"
        ref="education"
        prop="education"
        has-feedback
      >
        <a-select v-model="form.education" placeholder="请选择">
          <a-select-option value="本科"> 本科 </a-select-option>
          <a-select-option value="大专"> 大专 </a-select-option>
          <a-select-option value="硕士"> 硕士 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="报名数" ref="num" prop="num" has-feedback>
        <a-input v-model="form.num" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 10, offset: 14 }">
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="hideModal"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { rules } from "@/utils/rules.js";
export default {
  name: "Modal",
  components: {},
  props: {
    title: {
      type: String,
      default: "新建招聘",
    },
    list: {
      type: Array,
      default: [],
    },
    visible: {
      type: Boolean,
      default: false,
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
      rules,
      form: {
        id: "",
        name: "",
        post: "",
        level: "",
        recruit: "",
        education: "",
        num: "",
      },
    };
  },
  watch: {
    cloneForm: {
      handler: function (val) {
        this.form = val;
      },
      deep: true,
    },
  },
  created() {
    let validatorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入职位名称!"));
      } else {
        let arr = this.list.filter((v) => this.form.id !== v.id);
        let name = arr.map((v) => v.name);
        if (name.indexOf(value) !== -1) {
          callback(new Error("职位名称已存在!"));
        } else {
          callback();
        }
      }
    };
    this.rules.name = [
      {
        required: true,
        validator: validatorName,
        trigger: "blur",
      },
    ];
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid, object) => {
        if (valid) {
          if (this.title === "新建招聘") {
            this.form.id = parseInt(Math.random() * 100);
          }
          this.$emit("onSubmit", this.form, this.title);
          this.$emit("update:visible", false);
        } else {
          return false;
        }
      });
    },
    hideModal() {
      this.$emit("update:visible", false);
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
