<template>
  <div class="sessionList">
    <call-log />
    <person-inf />
    <knowledge-base />
  </div>
</template>

<script>
import callLog from "./callLog/index"
import personInf from "./personInf/index"
import knowledgeBase from "./knowledgeBase/index"
export default {
  data: () => ({
    

    
 
  }),
  components: {
    callLog,
    personInf,
    knowledgeBase
  },
  mounted() {
   
  },
  methods: {
  
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
 
</style>
