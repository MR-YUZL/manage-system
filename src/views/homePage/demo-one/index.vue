<template>
  <div class="container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        ref="name"
        label="Activity name"
        :prop="'defaultValues.name'"
        :rules="{
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        }"
      >
        <a-input
          :value="form.defaultValues.name | valueFil"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </a-form-model-item>
      <a-form-model-item
        label="Activity form"
        prop="defaultValues.desc"
        :rules="{
          required: true,
          message: 'Please input activity form',
          trigger: 'blur',
        }"
      >
        <a-input v-model="form.defaultValues.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit" class="m-r-10">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      clearNum: "",
      form: {
        defaultValues: {
          name: "",
          desc: "",
        },
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          //   {
          //     min: 3,
          //     max: 5,
          //     message: "Length should be 3 to 5",
          //     trigger: "blur",
          //   },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
    };
  },
  filters: {
    valueFil(val) {
      var str = String(val);
      var len = str.length;
      if (len === 11) {
        var reg = str.slice(-7, -3);
        return str.replace(reg, "****");
      } else {
        return val;
      }
    },
  },
  created() {},
  mounted() {
    const a = 10;
    // var b = fn`total${a}(taasd${a * 10})asdjhkd`;
    // function fn(args) {
    //   var res = "";
    //   var i = 0;

    //   while (i < args.length) {

    //   }
    // }
    const b = "sahdkjaskbdkasbkdbjhjhgajsgfgasbads";
    console.log("b", b.replace(/s/g, "S"), b);
    function fn(arg, v) {
      console.log("args", arguments, arguments[0].raw);
      console.log("arg", arg, v);
    }
    fn`'123', 123${a + 10}hhh`;

    console.log("isNaN", Number.isNaN("a"), isNaN("a"));

    const file = new FormData();
  },
  methods: {
    handleChange(e) {
      this.$set(this.form.defaultValues, "name", e.target.value);
    },
    handleFocus(e) {
      if (
        /^(\d{11,12}|\d{7,8}|\d{3,4}-\d{7,8}|\d{3,4}-\d{7,8}-\d{1,4}|\d{7,8}-\d{1,4}|\d{11,12}-\d{1,4}|\d{3,4}-\d{3,4}-\d{3,4}|400\d{6,8})$/.test(
          this.form.defaultValues.name
        )
      ) {
        this.clearNum = this.form.defaultValues.name;
        this.$set(this.form.defaultValues, "name", "");
      }
    },
    handleBlur(e) {
      if (!e.target.value) {
        this.$set(this.form.defaultValues, "name", this.clearNum);
      }
    },
    handleChange2() {
      console.log("argshandleChange2", [...arguments]);
    },
    onChange() {
      console.log("argsonChange", [...arguments]);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("form", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.m-r-10 {
  margin-right: 15px;
}
</style>
