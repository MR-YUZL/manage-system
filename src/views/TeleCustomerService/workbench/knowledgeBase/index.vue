<template>
  <div class="knowledgeBase informationList">
    <div class="operation">
        知识库
    </div>
    <div class="content">
        <knowledgeBase />
    </div>
  </div>
</template>

<script>


import knowledgeBase from './../../../currentSession/informationList/knowledgeBase/index'
export default {
  data: () => ({
    

    
 
  }),
  components: {
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
  .knowledgeBase{
      .operation{
          border:1px solid #e8e8e8;
          line-height: 43px;
          text-align: center;
        
      }
      .content{
         padding-top: 15px;
      }
  }
</style>
