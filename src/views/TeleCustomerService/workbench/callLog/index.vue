<template>
  <div class="session_list_l">
    <div class="list_count">
         <a-tabs default-active-key="1" >
            <a-tab-pane key="1" tab="近期通话">
                <knowledge-base />
            </a-tab-pane>
            <a-tab-pane key="2" tab="外呼任务">
                <more-information />
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
// import sessionItem from './sessionItem'
export default {
  data: () => ({
      aa:'ddd'
    
 
  }),
  components: {
    // sessionItem
  },
  mounted() {
    console.log(this.conversationList)
    this.getSessionList()
  },
  methods: {
   getIsSDKReady(){
    this.isCheckouting = true
    this.$store
        .dispatch(
          'checkoutConversation',
          this.conversationList[0].conversationID
        )
        .then(() => {
          this.isCheckouting = false
        })
        .catch(() => {
          this.isCheckouting = false
        })
    },
    getSessionList(){
      this.Request.get('/session/guest/my/all/list').then(res => {
          console.log('会话列表',res.data)
        })  
    }
  },
  watch: {
    isSDKReady(a,b){
      console.log(a,b)
      if(a){
        this.getIsSDKReady()
      }
    },
    conversationList(a,b){
      console.log(a,b)
      if(a){
        this.conversationList = a
      }
    },
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      isSDKReady: state => state.user.isSDKReady,
    })
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
