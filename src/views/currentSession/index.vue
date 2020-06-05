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
          userSig:'eJwtzMEKgkAUheF3mW0hcx2vjkKbcBHiIjIE2wkz2iXMYZzKit49UZfnO-B-2TkvvKe2LGG*x9l23qT03VFDMz8GbWE9BnWrjSHFEgg4F4gBhMvjqNOTYgw*goxwUT0aspOHPJCcrw1qp*rFZXvsRpkrfeoFlPjua2Fe9moPny4*mmITtVBmVZpWO-b7A8XMMQE_'
        })
        .then(() => {
          this.$store.commit('toggleIsLogin', true)
          this.$store.commit('startComputeCurrent')
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
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
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
    kickedOutReason(type) {
      switch (type) {
        case this.TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
          return '由于多实例登录'
        case this.TIM.TYPES.KICKED_OUT_MULT_DEVICE:
          return '由于多设备登录'
        case this.TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
          return '由于 userSig 过期'
        default:
          return ''
      }
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
      
      // let res = await this.Request.get('/session/guest/my/all/list')
      // console.log(res)
      // console.log('res----------------------')

       this.$store.commit('updateConversationList', event.data)
      
      // if(res.data.status){
      //   console.log(event.data)
      //   console.log(res.data.list)
      //    this.$store.commit('updateConversationList', event.data)
      // }
      
    },
   
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
  
</style>
