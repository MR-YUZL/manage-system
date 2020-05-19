<template>
  <div class="sessionCenter">
    <user-inf />
    <current-conversation />
    <image-previewer />
  </div>
</template>

<script>
import userInf from './userInf'
import currentConversation from './conversation/current-conversation'
import imagePreviewer from './../../../components/message/image-previewer'

export default {
  data: () => ({
    

    
 
  }),
  components: {
    userInf,
    currentConversation,
    imagePreviewer
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
