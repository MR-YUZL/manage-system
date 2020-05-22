<template>
  <div>
    <a-page-header title="知识库" style="padding:16px 0;" />
    <div class="knowledgeBase">
        <classification />
        <knowledge />
    </div>
  </div>
</template>

<script>

import classification from './classification'
import knowledge from './knowledge'
import moment from "moment";
export default {
  components: {
   classification,
   knowledge
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
  .knowledgeBase{
      background: #fff;
  }
</style>
