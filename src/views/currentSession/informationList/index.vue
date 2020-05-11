<template>
  <div class="informationList">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="知识库">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="更多信息" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="常用语">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// import sessionList from "./sessionList/index"

export default {
  data: () => ({
    

    
 
  }),
  components: {
    
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
    .informationList{
        width: 300px;
    }
</style>
