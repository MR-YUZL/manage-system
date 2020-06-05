<template>
  <div class="session_list_l">
    <div class="list_count">会话列表 ( {{this.penddingList.length + this.endList.length}} )</div>
    <div class="list_inf scroll">
      <session-item :conversation="item" v-for="item in penddingList" :key="item.conversationID" />
      <div class="separate">
        <div></div>以下的会话已结束
        <div></div>
      </div>
      <session-item :conversation="item" v-for="item in endList" :key="item.conversationID" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sessionItem from "./sessionItem";
import moment from "moment";
export default {
  data: () => ({
    list: [
      {
        sendAppraiseFlag: 0,
        latestMsgType: "TIMTextElem",
        latestMsgTime: "45645465",
        latestMsgContent: "",
        latestMsgAccount: "",
        id: "1",
        serviceAcc: "",
        guestName: "科比",
        status: "",
        round: "",
        guestAvatar: "",
        serviceAvatar: "",
        guestId: "user0",
        guestLastMsgTime: "1591145530",
        endTime: "",
        beginTime: "1591175927"
      },
      {
        sendAppraiseFlag: 0,
        latestMsgType: "TIMTextElem",
        latestMsgTime: "45645465",
        latestMsgContent: "",
        latestMsgAccount: "",
        id: "C2Cuser0",
        serviceAcc: "",
        guestName: "老詹hahhahahh",
        status: "",
        round: "",
        guestAvatar: "",
        serviceAvatar: "",
        guestId: "user0",
        guestLastMsgTime: "1591167374",
        endTime: "1591173766",
        beginTime: "1591172766"
      }
    ],
    penddingList: [],
    endList: []
  }),
  components: {
    sessionItem
  },
  mounted() {
    // console.log(this.conversationList)
    this.getSessionList();
  },
  methods: {
    moment,
    sum() {
      this.list = [];
    },
    getIsSDKReady() {
      if (this.penddingList && this.penddingList.length) {
        this.isCheckouting = true;
        this.$store
          .dispatch("checkoutConversation", this.penddingList[0].conversationID)
          .then(() => {
            this.isCheckouting = false;
          })
          .catch(() => {
            this.isCheckouting = false;
          });
        let obj = {
          guestId: this.penddingList[0].guestId,
          beginTime: this.penddingList[0].beginTime,
          guestName: this.penddingList[0].guestName,
          endTime: this.penddingList[0].endTime
        };
        this.$store.commit("getVisitorInf", obj);
      } else if (this.endList && this.endList.length) {
        this.isCheckouting = true;
        this.$store
          .dispatch("checkoutConversation", this.endList[0].conversationID)
          .then(() => {
            this.isCheckouting = false;
          })
          .catch(() => {
            this.isCheckouting = false;
          });
        let obj = {
          guestId: this.endList[0].guestId,
          beginTime: this.endList[0].beginTime,
          guestName: this.endList[0].guestName,
          endTime: this.endList[0].endTime
        };
        this.$store.commit("getVisitorInf", obj);
      }
    },
    //获取会话列表
    getSessionList() {
      this.Request.get("/session/guest/my/all/list").then(res => {
        // console.log("会话列表", res.data);
      });
    },
    //结束会话
    endSession(sessionId, endWay) {
      let params = {
        sessionId,
        endWay
      };
      this.Request.get("/session/end", params).then(res => {
        // console.log("会话列表", res.data);
      });
    },

    //超时处理
    timeoutHandler(arr) {
      this.penddingList = [...arr];
      // arr.map((item, index) => {
      //     if (moment().format("X") - item.guestLastMsgTime > 5 * 60) {
      //       this.penddingList.splice(index, 1);
      //       this.endList.push(item);
      //       this.endSession(item.id, 2);
      //     }
      // });
      let date = moment().format("X");
      let timer = setInterval(() => {
        this.penddingList.map((item, index) => {
          if (moment().format("X") - item.guestLastMsgTime > 5 * 60) {
            this.penddingList.splice(index, 1);
            let data = { ...item };

            data["endTime"] = moment().format("X");

            this.endList = [...this.endList, data];
            if (this.visitorInf.guestId == item.guestId) {
              let obj = {
                guestId: data.guestId,
                beginTime: data.beginTime,
                guestName: data.guestName,
                endTime: data.endTime
              };

              this.$store.commit("getVisitorInf", obj);
            }
            this.endSession(item.id, 2);
          }
        });
        if (!this.penddingList.length) {
          clearInterval(timer);
        }
      }, 1000);
    },
    getGuestInf(guestId) {}
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
    },
    sessionList(a, b) {
      if (a.length) {
        if (a[0].length) {
          this.timeoutHandler(a[0]);
        }
        this.endList = [...a[1]];
      }
    }
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      isSDKReady: state => state.user.isSDKReady,
      visitorInf: state => state.basic.visitorInf
    }),
    sessionList: function() {
      this.penddingList = [];
      this.endList = [];
      let arr = [[], []];
      console.log(this.list, this.conversationList);
      this.list.map(item => {
        this.conversationList.map(val => {
          if (item.guestId == val.userProfile.userID) {
            let obj = {
              ...item,
              ...val
            };

            if (item.endTime) {
              arr[1].push(obj);
            } else {
              arr[0].push(obj);
            }
          }
        });
      });
      this.conversationList.forEach(item => {
        if (item.lastMessage.type == "TIMCustomElem") {
          if (item.lastMessage.payload.data.subMsgType == "createsession") {
            //自定义创建会话消息
            if (arr[1] && arr[1].length) {
              arr[1].map((val, index) => {
                if (val.guestId == item.userProfile.userID) {
                  this.Request.get("/guest/session/question/list", {
                    guestId: val.guestId
                  }).then(res => {
                    if (res.data.status) {
                      let obj = { ...val, ...res.data.sessionInfo };

                      arr[0].push(obj);
                    }
                  });
                  arr[1].splice(index, 1);
                }
              });
            } else {
              this.Request.get("/guest/session/question/list", {
                guestId: val.guestId
              }).then(res => {
                if (res.data.status) {
                  let obj = { ...val, ...res.data.sessionInfo };
                  arr[0].push(obj);
                }
              });
            }
          }

          if (
            item.lastMessage.payload.data.subMsgType == "stopsession" ||
            item.lastMessage.payload.data.subMsgType == "transfer"
          ) {
            //自定义停止会话消息  //自定义转接消息
            arr[0].map((val, index) => {
              if (val.guestId == item.userProfile.userID) {
                arr[0].splice(index, 1);
                let data = { ...val };

                data["endTime"] = moment().format("X");

                arr[1] = [...this.endList, data];
                if (this.visitorInf.guestId == item.guestId) {
                  let obj = {
                    guestId: data.guestId,
                    beginTime: data.beginTime,
                    guestName: data.guestName,
                    endTime: data.endTime
                  };

                  this.$store.commit("getVisitorInf", obj);
                }
                let status = item.lastMessage.payload.data.subMsgType == "stopsession" ? 0 : 1
                this.endSession(item.id, status);
              }
            });
          }
        }
      });
      return arr;
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
    .separate {
      text-align: center;
      font-size: 12px;
      color: #b1b1b1;
      display: flex;
      align-items: center;
      & > div {
        width: 80px;
        height: 1px;
        margin: 0 10px;
        border-top: 1px solid #b1b1b1;
      }
    }
  }
}
</style>
