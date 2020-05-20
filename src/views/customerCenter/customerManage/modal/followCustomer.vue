<template>
  <div>
    <a-modal v-model="visibles" title="跟进客户" @ok="handleOk" @cancel="handleCancel">
      <div>
        <p>最近跟进记录</p>
        <p>
          <span>2019-05-07 16:33:00</span>
          <span>有效联系</span>
          <span>回访客服：陈冠希</span>
        </p>
        <p>回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注回访备注</p>
      </div>
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" @submit="handleOk">
        <a-form-item label="有效联系">
          <a-select
            v-decorator="[
          'followValid',
          { rules: [{ required: true, message: '请选择' }] },
        ]"
            placeholder
            @change="handleSelectChange"
          >
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="本次跟进记录">
          <a-textarea
            v-decorator="['followRecord',{ rules: [{ required: true, message: '请输入' }] }]"
            placeholder
            allow-clear
          />
        </a-form-item>
        <a-form-item label="下次跟进时间">
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="[
              'nextFollowDate',
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibles: this.visible,
      form: this.$form.createForm(this, { name: "followCustomer" })
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
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, "values");
        }
      });
    },
    handleCancel() {
      this.$emit("closeUpdate");
    },
    handleSelectChange() {}
  }
};
</script>

<style>
</style>