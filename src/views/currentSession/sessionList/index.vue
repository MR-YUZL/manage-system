<template>
  <div class="session_list">
    <div class="list_count">
        会话列表 ( {{55}} )
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
import sessionItem from './sessionItem'
export default {
  data: () => ({
    

    
 
  }),
  components: {
    sessionItem
  },
  mounted() {
    console.log(this.conversationList)
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
    .session_list{
        background: #FFFFFF;
        width: 20%;
        .list_count{
            line-height: 45px;
            padding-left: 15px;
            color: #000000;
            border-bottom: 1px solid #E7E7E8;
            border-TOP: 1px solid #E7E7E8;
        }
        .list_inf{
            height: calc(100vh - 85px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
</style>
