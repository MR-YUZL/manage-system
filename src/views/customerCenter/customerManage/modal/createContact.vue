<template>
  <div>
    <a-modal v-model="visibles" title="创建联系人" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item v-for="(item,index) in formList" :key="index" :label="item.fieldName">
          <a-input
            v-if="item.dataType==1"
            v-decorator="[item.fieldCode, { rules: [{ required: item.isRequired?true:false, message: '不能为空' }] }]"
            style="width: 200px"
            placeholder="请输入"
          />

          <a-select
            v-if="item.dataType==2"
            style="width: 170px"
            @change="onChange($event,item)"
            v-decorator="[item.fieldCode, { rules: [{ required: item.isRequired?true:false, message: '请选择' }] }]"
          >
            <a-select-option
              v-for="(item,index) in item.child"
              :key="index"
              :value="item.value"
            >{{item.name}}</a-select-option>
          </a-select>

          <a-cascader
            v-if="item.dataType==3"
            :options="options"
            placeholder="请选择省市"
            @change="cityChange"
          />
          
          <a-range-picker
            v-if="item.dataType==4"
            format="YYYY-MM-DD"
            style="width:240px"
            v-decorator="[
              item.fieldCode,{ rules: [{ required: item.isRequired?true:false, message: '请选择日期' }] }
            ]"
            allowClear
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      visibles: this.visible,
      valueObj: {},
      form: this.$form.createForm(this, { name: "createCustomer" }),
      formList: [],
      options: [
        {
          value: "浙江",
          label: "浙江",
          children: [
            {
              value: "杭州",
              label: "杭州",
              children: [
                {
                  value: "西湖",
                  label: "西湖"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },

  mounted() {
    this.getForm();
  },
  methods: {
    getForm() {
      api.setFieldsJson({ state: 1 }).then(res => {
        console.log(res, "创建联系人");
        if (res.data.status) {
          this.formList = res.data.list;
        }
      });
    },
    cityChange(value) {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          api.createLinkMan().then(res => {});
        }
      });
    },
    handleSelectChange() {},
    onChange() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>