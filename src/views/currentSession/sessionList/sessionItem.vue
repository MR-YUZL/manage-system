<template>
  <div class="session_item" 
  :class="{ 'choose': conversation.conversationID === currentConversation.conversationID }"
  @click="selectConversation">
    <div class="wrap">
        <div>
            <a-badge :count="conversation.unreadCount" :overflow-count="10">
                <a-avatar :size="45" 
                :src="conversation.userProfile.avatar ? 
                conversation.userProfile.avatar : require('./../../../assets/imgs/current_session/header.png')" />
            </a-badge>    
            
        </div>
       <div class="content">
            <div class="row-1">
                <div class="name">{{conversation.userProfile.nick || conversation.userProfile.userID}}</div>
                
            </div>
            <div class="row-2">
                <div class="summary" :title="conversation.lastMessage.messageForShow">{{messageForShow}}</div>
                <div class="date">{{date}}</div>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { isToday, getDate, getTime } from './../../../utils/date'
export default {
  data: () => ({
    

    
 
  }),
  props:['conversation'],
  components: {
    
  },
  mounted() {
    console.log(this.conversation)
    console.log(this.currentConversation)
    
  },
  methods: {
   selectConversation() {
      if (this.conversation.conversationID !== this.currentConversation.conversationID) {
        this.$store.dispatch(
          'checkoutConversation',
          this.conversation.conversationID
        )
      }
    },
  },
  watch: {},
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUserProfile: state => state.user.currentUserProfile
    }),
    ...mapGetters(['toAccount']),
   messageForShow() {
      if (this.conversation.lastMessage.isRevoked) {
        if (this.conversation.lastMessage.fromAccount === this.currentUserProfile.userID) {
          return '你撤回了一条消息'
        }
        if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
          return '对方撤回了一条消息'
        }
        return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`
      }
      return this.conversation.lastMessage.messageForShow
    },
    date() {
      if (
        !this.conversation.lastMessage ||
        !this.conversation.lastMessage.lastTime
      ) {
        return ''
      }
      const date = new Date(this.conversation.lastMessage.lastTime * 1000)
      if (isToday(date)) {
        return getTime(date,true)
      }
      return getDate(date)
    },
  }
};
</script>
<style lang="less" scoped>
    .session_item{
        padding: 15px 20px;
        cursor: pointer;
        overflow: hidden;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        .wrap{
            display: flex;
            .content{
                flex: 1;
                height: 40px;
                overflow: hidden;
                margin-left: 15px;
                .row-1{
                    display: flex;
                    line-height: 21px;
                    .name{
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        min-width: 0px;
                        font-size: 18px;
                        color:#000000;
                    }
                }
                .row-2{
                    display: flex;
                    font-size: 12px;
                    padding-top: 3px;
                    color: #9C9C9C;
                    .summary{
                        overflow: hidden;
                        min-width: 0px;
                        overflow: hidden;
                        flex: 1;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .date{
                        padding-left: 10px;
                        -ms-flex-negative: 0;
                        flex-shrink: 0;
                        text-align: right;
                    }
                }
            }
        }
    }
    .choose {
        background-color: #EDEDEE;
    }
</style>
