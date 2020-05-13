<template>
  <div class="informationList">
    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="知识库">
        <knowledge-base />
      </a-tab-pane>
      <a-tab-pane key="2" tab="更多信息">
        <more-information />
      </a-tab-pane>
      <a-tab-pane key="3" tab="常用语">
        <common-words />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import knowledgeBase from "./knowledgeBase/index"
import moreInformation from "./moreInformation/index"
import commonWords from "./commonWords"
export default {
  data: () => ({
    

    
 
  }),
  components: {
    knowledgeBase,
    moreInformation,
    commonWords
  },
  mounted() {
    
  },
  methods: {
   callback(key) {
      console.log(key);
    },
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
    .informationList{
        width: 300px;
        background: #FFFFFF;
    }
</style>
