<template>
  <div>
    <a-modal v-model="visibles" title="导出客户" @ok="handleOk" @cancel="handleCancel">
      <p>是否确认导出当前条件下的客户数据？</p>
      <p>本次导出共{{totalRecord}}条数据</p>
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
    totalRecord: Number
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  methods: {
    handleOk() {
      // let params = {
      //   dataSource:this.dataSource,
      //   queryType:'1',
      //   totalRecord:this.totalRecord
      // }
      // let url = '/customers/hfwCustomersInfo/exportJson?dataSource='+ this.dataSource + '&queryType='
      // document.location = url
      this.$emit('exportUrl')
    },
    handleCancel() {
      this.visibles = false
      this.$emit('closeUpdate')
    }
  }
};
</script>