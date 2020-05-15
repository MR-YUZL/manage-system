<template>
  <div class="session_list_l">
    <div class="list_count">
         <a-tabs default-active-key="1" class="tabs">
            <a-tab-pane key="1" tab="近期通话" class="tans_">
                <recent-calls />
            </a-tab-pane>
            <a-tab-pane key="2" tab="外呼任务">
                <out-call-task />
            </a-tab-pane>
            
        </a-tabs>
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
            height: 100%;
            // line-height: 45px;
            // padding-left: 15px;
            // color: #000000;
            // border-bottom: 1px solid #E7E7E8;
            // border-top: 1px solid #E7E7E8;
            .tabs{
                height: 100%;
                .ant-tabs-bar{
                    border: 1px solid #E7E7E8 !important;
                }
                
            }
          
        }
        .list_inf{
            height: calc(100% - 60px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
    .ant-tabs-content{
        background: red !important;
    }
</style>
