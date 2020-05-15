<template>
  <div>
    <a-modal v-model="visible" title="删除" @ok="handleOk" @cancel="handleCancel">
      <p>删除客户后将无法回复，是否确认删除所选客户</p>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
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
    handleOk() {
      api.delCustomer(this.custIds).then(res=>{

      })
    },
    handleCancel() {
      this.visibles = false;
    }
  }
};
</script>