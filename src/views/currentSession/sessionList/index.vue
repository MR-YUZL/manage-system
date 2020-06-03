<template>
  <div class="session_list_l">
    <div class="list_count">会话列表 ( {{55}} )</div>
    <div class="list_inf">
      <session-item :conversation="item" v-for="item in sessionList" :key="item.conversationID" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sessionItem from "./sessionItem";
export default {
  data: () => ({
    list: [
      {
        sendAppraiseFlag: 0,
        latestMsgType: "TIMTextElem",
        latestMsgTime: "45645465",
        latestMsgContent: "",
        latestMsgAccount: "",
        id: "",
        serviceAcc: "",
        guestName: "",
        status: "",
        round: "",
        guestAvatar: "",
        serviceAvatar: ""
      },
      {
        sendAppraiseFlag: 0,
        latestMsgType: "TIMTextElem",
        latestMsgTime: "45645465",
        latestMsgContent: "",
        latestMsgAccount: "",
        id: "C2Cuser0",
        serviceAcc: "",
        guestName: "",
        status: "",
        round: "",
        guestAvatar: "",
        serviceAvatar: ""
      }
    ]
  }),
  components: {
    sessionItem
  },
  mounted() {
    // console.log(this.conversationList)
    this.getSessionList();
  },
  methods: {
    getIsSDKReady() {
      console.log(this.sessionList, "**-*-*--*-*--*-*");
      if (this.conversationList && this.conversationList.length) {
        this.isCheckouting = true;
        this.$store
          .dispatch(
            "checkoutConversation",
            this.conversationList[0].conversationID
          )
          .then(() => {
            this.isCheckouting = false;
          })
          .catch(() => {
            this.isCheckouting = false;
          });
      }
    },
    getSessionList() {
      this.Request.get("/session/guest/my/all/list").then(res => {
        console.log("会话列表", res.data);
      });
    }
  },
  watch: {
    isSDKReady(a, b) {
      if (a) {
        this.getIsSDKReady();
      }
    },
    conversationList(a, b) {
      if (a) {
        this.conversationList = a;
      }
    }
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      isSDKReady: state => state.user.isSDKReady
    }),
    sessionList: function() {
      console.log(this.conversationList);
      let arr = []
      this.list.map(item => {
        this.conversationList.map(val => {
          if (item.id == val.conversationID) {
            let obj = {
              ...item,...val
            }
            arr.push(obj)
          }
        });
      });
      return arr
    }
  }
};
</script>
<style lang="less" scoped>
.session_list_l {
  .list_count {
    line-height: 45px;
    padding-left: 15px;
    color: #000000;
    border-bottom: 1px solid #e7e7e8;
    border-top: 1px solid #e7e7e8;
    border-left: 1px solid #e7e7e8;
  }
  .list_inf {
    // height: calc(100vh - 85px);
    height: calc(100% - 47px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
