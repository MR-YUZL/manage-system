<template>
  <div>
    <a-page-header title="留言记录" style="padding:16px 0;" />
    <div class="">
        
    </div>
  </div>
</template>

<script>


import moment from "moment";
export default {
  components: {
   
  },
  data(){
    return {
     
    }
  },
  mounted() {
   
  },
  methods: {
   
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
  .page_pagination{
    margin:10px 0;
    display: flex;
    justify-content: flex-end;
  }
  .record-detail{
    display:flex;
    .message{
      width:380px;
      border-right:1px solid #e6e6e6;
    }
    .information{
      margin-left:48px;
      width:384px;
    }
  }
</style>
