<template>
  <div class="sessionList">
    <session-list v-show="status" @isStatus="isStatus" />
    <session-center v-if="status" />
    <information-list v-show="status" />
    <div class="noData" v-show="!status">
      <img src="./../../assets/imgs/current_session/session_img.png" alt />
    </div>
  </div>
</template>

<script>
import sessionList from "./sessionList/index";
import sessionCenter from "./sessionCenter/index";
import informationList from "./informationList/index";
import {mapState} from 'vuex'
export default {
  data: () => ({
    status: false,
    infoObj: {}
  }),
  components: {
    sessionList,
    sessionCenter,
    informationList
  },
  mounted() {
    if(this.imInfo.SDKAppID){
      this.$store.commit("toggleIsSDKReady", true);
    }else{
      this.getIM()
    }
   
  },
  destroyed(){
    this.$store.commit("toggleIsSDKReady", false);
    // if(this.imInfo.SDKAppID){
    //   console.log('------------',this.imInfo.SDKAppID)
    //    this.tim(this.imInfo.SDKAppID).off(
    //     this.TIM.EVENT.CONVERSATION_LIST_UPDATED,
    //     this.onUpdateConversationList
    //   );
    //   // this.initListener()
    // }
    // // if(this.isSDKReady){
    // //   this.$store.dispatch("logout")
    // // }
  },
  methods: {
    // listLength(e){
    //   this.status = e
    // },
    isStatus(a) {
      console.log(a);

      this.status = a;
    },
    getIM() {
      this.Request.get("/api/chat/customer/status/query").then(res => {
        if (res.data.status) {
          this.getSig(
            res.data.imAccount,
            res.data.imPassword,
            res.data.serviceAccInfo.orgId
          );
        }
      });
    },
    getSig(imAccount, imPassword, orgId) {
      let params = {
        imAccount,
        imPassword
      };
      this.Request.get("/guest/session/im/query/user/sig", params).then(res => {
        if (res.data.status) {
          this.infoObj = {
            userID: imAccount,
            userSig: res.data.userSig,
            SDKAppID: res.data.sdkAppid,
            orgId: orgId
          };
          this.$store.commit("getImInfo", this.infoObj);
          this.login();
          this.initListener();
        }
      });
    },
    login() {
      this.tim(this.infoObj.SDKAppID)
        .login({
          userID: this.infoObj.userID,
          userSig: this.infoObj.userSig
        })
        .then(() => {
          this.$store.commit("toggleIsLogin", true);
          this.$store.commit("startComputeCurrent");
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.$store.commit("showMessage", {
            message: "登录失败：" + error.message,
            type: "error"
          });
        });
    },
    initListener() {
      console.log('initListener')
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim(this.imInfo.SDKAppID).on(
        this.TIM.EVENT.SDK_READY,
        this.onReadyStateUpdate,
        this
      );
      // SDK NOT READT
      this.tim(this.imInfo.SDKAppID).on(
        this.TIM.EVENT.SDK_NOT_READY,
        this.onReadyStateUpdate,
        this
      );
      // 被踢出
      this.tim(this.imInfo.SDKAppID).on(
        this.TIM.EVENT.KICKED_OUT,
        this.onKickOut
      );
      // SDK内部出错
      this.tim(this.imInfo.SDKAppID).on(this.TIM.EVENT.ERROR, this.onError);
      // 收到新消息
      this.tim(this.imInfo.SDKAppID).on(
        this.TIM.EVENT.MESSAGE_RECEIVED,
        this.onReceiveMessage
      );
      // 会话列表更新
      this.tim(this.imInfo.SDKAppID).on(
        this.TIM.EVENT.CONVERSATION_LIST_UPDATED,
        this.onUpdateConversationList
      );
    },
    onReadyStateUpdate({ name }) {
      console.log('*******')
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false;
      this.$store.commit("toggleIsSDKReady", isSDKReady);

      if (isSDKReady) {
        this.tim(this.imInfo.SDKAppID)
          .getMyProfile()
          .then(({ data }) => {
            this.$store.commit("updateCurrentUserProfile", data);
          })
          .catch(error => {
            this.$store.commit("showMessage", {
              type: "error",
              message: error.message
            });
          });

        this.$store.dispatch("getBlacklist");
      }
    },
    onKickOut(event) {
      this.$store.commit("showMessage", {
        message: `${this.kickedOutReason(event.data.type)}被踢出，请重新登录。`,
        type: "error"
      });
      this.$store.commit("toggleIsLogin", false);
      this.$store.commit("reset");
    },
    kickedOutReason(type) {
      switch (type) {
        case this.TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
          return "由于多实例登录";
        case this.TIM.TYPES.KICKED_OUT_MULT_DEVICE:
          return "由于多设备登录";
        case this.TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
          return "由于 userSig 过期";
        default:
          return "";
      }
    },
    onReceiveMessage({ data: messageList }) {
      console.log(messageList);
      console.log("收到新消息");

      this.$store.commit("pushCurrentMessageList", messageList);
    },
    onError({ data }) {
      if (data.message !== "Network Error") {
        this.$store.commit("showMessage", {
          message: data.message,
          type: "error"
        });
      }
    },
    onUpdateConversationList(event) {
      console.log("会话列表更新");
      console.log(event.data);

      this.$store.commit("updateConversationList", event.data);
    }
  },
  watch: {},
  computed: {
    ...mapState({
      isSDKReady: state => state.user.isSDKReady,
      imInfo:state => state.basic.imInfo
    })
  }
};
</script>
<style lang="less" scoped>
.sessionList {
  .data {
    width: 100%;
  }
}
</style>
