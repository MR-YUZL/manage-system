<template>
  <div>
    <a-modal v-model="visibles" title="删除" @ok="handleOk" @cancel="handleCancel">
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
      api.delCustomer({custIds:this.custIds}).then(res=>{
        if(res.data.status){
          this.$message.success('删除成功')
          this.visibles = false
          this.$emit('successLoadList')
        }
      })
    },
    handleCancel() {
      this.visibles = false
      this.$emit('closeUpdate')
    }
  }
};
</script>