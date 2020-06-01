<template>
  <div>
    <a-modal v-model="visibles" title="跟进客户" :footer="null" @cancel="handleCancel">
      <div>
        <p>最近跟进记录</p>
        <p class="info">
          <span>{{lastInfo.followDate}}</span>
          <span>{{lastInfo.followValid==0?'有效':'无效'}}联系</span>
          <span>回访客服：{{lastInfo.followAcc}}</span>
        </p>
        <p>{{lastInfo.followRecord}}</p>
      </div>
      <BaseForm :formObject="formObject" @toggleModal="toggleModal" @formSubmit="formSubmit" />
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import moment from "moment";
import BaseForm from "@/components/BaseForm";
export default {
  data() {
    return {
      formObject: {
        ref: "followForm",
        type: "modalForm",
        sureBtn: "保存",
        modelList: [
          {
            type: "select",
            label: "有效联系",
            placeholder: "请选择",
            model: undefined,
            ruleName: "followValid",
            options: [
              { key: 1, value: "否" },
              { key: 0, value: "是" }
            ],
            rules: {
              required: true,
              message: "请选择有效联系",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "本次跟进记录",
            placeholder: "",
            model: undefined,
            ruleName: "followRecord",
            maxLength:100
          },
          {
            type: "date",
            label: "下次跟进时间",
            placeholder: "请选择",
            model: undefined,
            ruleName: "followDate",
            format: "YYYY-MM-DD HH:mm:ss",
            options: [],
            rules: {
              required: true,
              message: "请选择跟进时间",
              trigger: "change"
            }
          }
        ],
        defaultValues: {
          followValid: "0"
        }
      },
      visibles: this.visible,
      lastInfo: {}
    };
  },
  components: {
    BaseForm
  },
  props: {
    visible: Boolean,
    followId: String
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  mounted() {
    this.getlastInfo({ custId: this.followId });
  },
  methods: {
    formSubmit(values) {
      let params = {
        custId: this.followId,
        ...values
      };
      api.saveCustomerFollow(params).then(res => {
        console.log("跟进记录");
        if (res.data.status) {
          this.$message.success("保存成功");
          this.visibles = false;
          this.$emit("successLoadList");
        }else{
          this.$message.error(res.data.msg);
        }
      });
      
    },
    toggleModal(val) {
      this.$emit("closeUpdate");
    },
    getlastInfo(params) {
      api.lastInfo(params).then(res => {
        console.log(res, "最近跟进记录");
        if (res.data.status) {
          this.lastInfo = res.data.data;
          this.formObject.defaultValues = res.data.data;
        }
      });
    },
    disabledDate(current) {
      return current && current < moment().endOf("day");
    },
    handleCancel() {
      this.$emit("closeUpdate");
    },
    handleSelectChange() {}
  }
};
</script>

<style lang="less" scoped>
.info {
  span {
    padding-right: 15px;
  }
}
</style>