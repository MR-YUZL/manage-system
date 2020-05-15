<template>
  <div>
    <a-modal v-model="visibles" title="设置负责人" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="指定客服人员">
          <a-input
            v-decorator="['principals', { rules: [{ required: true, message: '请选择客服人员或请选择客服组' }] }]"
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
      form: this.$form.createForm(this, { name: "setManager" }),
      visibles: this.visible
    };
  },
  props: {
    visible: Boolean,
    custIds: Array
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  methods: {
    handleSubmit() {
      let params = {
        custIds: this.custIds
      };
      api.setPrincipalJson().then(res => {
        console.log(res);
      });
    },
    handleCancel() {
      this.visibles = false;
    }
  }
};
</script>