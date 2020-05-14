<template>
  <div class="session_list_l">
    <div class="list_count">
         <a-tabs default-active-key="1" >
            <a-tab-pane key="1" tab="近期通话">
                <recent-calls />
            </a-tab-pane>
            <a-tab-pane key="2" tab="外呼任务">
                <out-call-task />
            </a-tab-pane>
            
        </a-tabs>
    </div>
    <div class="list_inf">
        <session-item 
        :conversation="item"
        v-for="item in conversationList"
        :key="item.conversationID"
        />
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import outCallTask from './outCallTask'
import recentCalls from './recentCalls'
export default {
  data: () => ({
  
    
 
  }),
  components: {
    outCallTask,
    recentCalls
  },
  mounted() {
  
  },
  methods: {
   
  },
  watch: {
  
  },
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
    .session_list_l{
     
        .list_count{
            // line-height: 45px;
            // padding-left: 15px;
            // color: #000000;
            // border-bottom: 1px solid #E7E7E8;
            // border-top: 1px solid #E7E7E8;
            .ant-tabs{
                .ant-tabs-bar{
                    background: pink;
                    border: 1px solid #E7E7E8 !important;
                }
            }
        }
        .list_inf{
            // height: calc(100vh - 85px);
            height: calc(100% - 60px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
</style>
