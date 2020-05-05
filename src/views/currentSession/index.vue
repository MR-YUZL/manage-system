<template>
  <div class="sessionList">
    <session-list />
    <session-center />
    <information-list />
  </div>
</template>

<script>
import sessionList from "./sessionList/index"
import sessionCenter from "./sessionCenter/index"
import informationList from "./informationList/index"
export default {
  data: () => ({
    

    
 
  }),
  components: {
    sessionList,
    sessionCenter,
    informationList
  },
  mounted() {
    this.login()
    this.initListener()
  },
  methods: {
   login(){
       this.tim.login({
          userID: 'user1',
          userSig: 'eJwtzE0LgkAUheH-MltDrjlznQQXLcSCVo1QugtmjItTDONXEP33RF2e58D7ZeVFhaPxLGX7ENhu2aTNu6eGFh4646Pt6HT7cI40SyMOEAvBI1yfnl5mViElYoIoVzUfR352BC4BtgY95*rd5cU4*ROUjYWD6oYEpmsc1EdlzyInPSVtcaMqqG2Vsd8fwhEw0w__'
        })
        .then(() => {
          console.log('成功')
        })
        .catch(error => {
          this.loading = false
          this.$store.commit('showMessage', {
            message: '登录失败：' + error.message,
            type: 'error'
          })
        })
    },
     initListener() {
      
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // 被踢出
      this.tim.on(this.TIM.EVENT.KICKED_OUT, this.onKickOut)
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
    
    },
    onReadyStateUpdate({ name }) {
      console.log(name)
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
            console.log(data)
            this.$store.commit('updateCurrentUserProfile', data)
          })
          .catch(error => {
            this.$store.commit('showMessage', {
              type: 'error',
              message: error.message
            })
          })
         
        this.$store.dispatch('getBlacklist')
       
      }
    },
    onKickOut(event) {
      this.$store.commit('showMessage', {
        message: `${this.kickedOutReason(event.data.type)}被踢出，请重新登录。`,
        type: 'error'
      })
      this.$store.commit('toggleIsLogin', false)
      this.$store.commit('reset')
    },
    onReceiveMessage({ data: messageList }) {
      console.log(messageList)
      console.log('收到新消息')
   
      this.$store.commit('pushCurrentMessageList', messageList)
    },
    onError({ data }) {
      if (data.message !== 'Network Error') {
        this.$store.commit('showMessage', {
          message: data.message,
          type: 'error'
        })
      }
    },
    onUpdateConversationList(event) {
      console.log('会话列表更新')
      console.log(event.data)
      console.log(this)
      this.$store.commit('updateConversationList', event.data)
    },
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
  .sessionList{
    display:flex
  }
</style>
