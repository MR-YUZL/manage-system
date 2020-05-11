<template>
  <div class="sessionCenter">
    <user-inf />
    <current-conversation />
  </div>
</template>

<script>
import userInf from './userInf'
import currentConversation from './conversation/current-conversation'

export default {
  data: () => ({
    

    
 
  }),
  components: {
    userInf,
    currentConversation
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
    .sessionCenter{
        width: calc(100% - 550px);
        position: relative;
    }
</style>
