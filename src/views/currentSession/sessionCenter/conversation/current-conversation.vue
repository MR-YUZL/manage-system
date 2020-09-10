<template>
  <div class="current-conversation-wrapper">
    <div
      class="current-conversation"
      @scroll="onScroll"
      v-if="showCurrentConversation"
    >
      <div class="content">
        <div
          class="message-list scroll"
          ref="message-list"
          @scroll="this.onScroll"
        >
          <div class="more" v-if="!this.status">
            <a-button @click="getMOreFn">查看更多</a-button>
          </div>
          <div class="no-more" v-else>没有更多了</div>
          <!-- <history-message
            :historySessionList="historySessionList"
            v-if="isSave"
          /> -->
          <message-item
            v-for="message in progressSessionList"
            :key="message.ID"
            :message="message"
          />
        </div>
        <div
          v-show="isShowScrollButtomTips"
          class="newMessageTips"
          @click="scrollMessageListToButtom"
        >
          回到最新位置
        </div>
      </div>
      <div class="footer" v-if="showMessageSendBox">
        <message-send-box />
        <div class="mask" v-if="!visitorInf.status">当前对话已结束</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MessageSendBox from "./../../../../components/message/message-send-box";
import MessageItem from "./../../../../components/message/message-item";
import historyMessage from "./../../../../components/historyMessage";
import { deleteHistory, arrEmpty } from "@/utils/index";
import moment from "moment";

export default {
  name: "CurrentConversation",
  components: {
    MessageSendBox,
    MessageItem,
    historyMessage
  },
  data() {
    return {
      isShowScrollButtomTips: false,
      preScrollHeight: 0,
      showConversationProfile: false,
      timeout: "",
      messageList: [],
      status: false,
      historySessionList: [], //历史消息会话列表
      progressSessionList: [], //实时消息会话列表
      isSave: false
    };
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      currentUnreadCount: state =>
        state.conversation.currentConversation.unreadCount,
      imInfo: state => state.basic.imInfo,
      visitorInf: state => state.basic.visitorInf,
      currentMessageList: state => {
        state.conversation.currentMessageList.forEach(item => {
          if (item.type == "TIMCustomElem") {
            item.payload.data =
              typeof item.payload.data == "string"
                ? JSON.parse(item.payload.data)
                : item.payload.data;
          }
        });
        return state.conversation.currentMessageList;
      },
      isCompleted: state => state.conversation.isCompleted,
      selectStatus: state => state.basic.selectStatus,
      historyList: state => state.basic.historyList,
      isSDKReady: state => state.user.isSDKReady,
    }),
    ...mapGetters(["toAccount", "hidden"]),
    // 是否显示当前会话组件
    showCurrentConversation() {
      return !!this.currentConversation.conversationID;
    },
    name() {
      if (this.currentConversation.type === "C2C") {
        return this.currentConversation.userProfile.nick || this.toAccount;
      } else if (this.currentConversation.type === "GROUP") {
        return this.currentConversation.groupProfile.name || this.toAccount;
      } else if (this.currentConversation.conversationID === "@TIM#SYSTEM") {
        return "系统通知";
      }
      return this.toAccount;
    },
    showMessageSendBox() {
      return this.currentConversation.type !== this.TIM.TYPES.CONV_SYSTEM;
    }
  },
  mounted() {
    this.$bus.$on("image-loaded", this.onImageLoaded);
    this.$bus.$on("scroll-bottom", this.scrollMessageListToButtom);
    if (this.currentConversation.conversationID === "@TIM#SYSTEM") {
      return false;
    }
  },
  updated() {
    this.keepMessageListOnButtom();
    // 1. 系统会话隐藏右侧资料组件
    // 2. 没有当前会话时，隐藏右侧资料组件。
    //    背景：退出群组/删除会话时，会出现一处空白区域
    if (
      this.currentConversation.conversationID === "@TIM#SYSTEM" ||
      typeof this.currentConversation.conversationID === "undefined"
    ) {
      this.showConversationProfile = false;
    }
  },
  destroyed() {
    this.$bus.$emit(
      "currentUnreadCount",
      this.currentConversation.conversationID
    );
  },
  watch: {
    currentMessageList(a, b) {
      console.log(a, b, this.historyList);
      this.$store.commit("getSelectStatus", false);
      this.progressSessionList = [];
      this.historySessionList = [];
      if (a.length) {
        if (this.historyList && this.historyList.length) {
          let progressSessionList = [...a];
          let historySessionList = [...this.historyList];
          a.forEach((item, index) => {
            //校验是否存在历史消息和实时消息重合情况
            // console.log(
            //   this.historyList[0].msgTime / 1000 > item.time,
            //   this.historyList[0].msgTime / 1000 == item.time
            // );
            if (this.historyList[0].msgTime / 1000 > item.time) {
              progressSessionList.splice(index, 1, "");
            } else if (item.time == this.historyList[0].msgTime / 1000) {
              historySessionList.forEach((val, i) => {
                let msgKey = val.msgKey.replace(/_/g, "-").split("-");
                let str = msgKey[0] + "-" + msgKey[1];
                if (item.ID.indexOf(str) > -1) {
                  progressSessionList.splice(index, 1, "");
                }
              });
            }
          });
          progressSessionList.forEach(item => {
            if (item) this.progressSessionList.push(item);
          });
          this.historySessionList = historySessionList;
          console.log(this.progressSessionList, this.historySessionList);
          let arr = []
          if (this.historySessionList.length) {
            this.progressSessionList.forEach((item, inde) => {
              if (this.historySessionList[0].msgTime / 1000 < item.time) {
                arr.push(item);
              }
            });
            console.log(arr)
            if (arr.length && arr.length > 15) {
              this.isSave = false;
            } else {
              this.isSave = true;
            }
          } else {
            this.isSave = false;
          }
        } else {
          this.progressSessionList = [...a];
        }
      }
    },
    //历史消息数据变化检测
    historyList: {
      handler(a, b) {
        if (this.selectStatus) {
          this.historySessionList = [];
        }
        console.log(
          a.length,
          this.historySessionList.length,
          !this.selectStatus
        );
        if (
          a &&
          a.length &&
          this.historySessionList.length &&
          !this.selectStatus
        ) {
          let arr = [...a];
          // console.log('1-=-===============')
          a.forEach((item, index) => {
            if (
              item.msgTime == this.historySessionList[0].msgTime &&
              item.id == this.historySessionList[0].id
            ) {
              arr.splice(index, 1);
            }
          });
          this.historySessionList = [...this.historySessionList, ...arr];
          // this.historySessionList = [...a]
        } else {
          // console.log('2-=-===============')
          this.status = false;
          this.progressSessionList = [];
          this.historySessionList = [...a];
        }
      }
      // immediate: true,
      // deep: true
    },
    currentUnreadCount(next) {
      if (!this.hidden && next > 0 && this.isSDKReady) {
        this.tim(this.imInfo.SDKAppID).setMessageRead({
          conversationID: this.currentConversation.conversationID
        });
        this.$bus.$emit(
          "currentUnreadCount",
          this.currentConversation.conversationID
        );
      }
    },
    hidden(next) {
      if (!next && this.currentUnreadCount > 0 && this.isSDKReady) {
        this.tim(this.imInfo.SDKAppID).setMessageRead({
          conversationID: this.currentConversation.conversationID
        });
        this.$bus.$emit(
          "currentUnreadCount",
          this.currentConversation.conversationID
        );
      }
    }
  },
  methods: {
    moment,
    //获取更多
    getMOreFn() {
      //一旦历史消息时间与腾讯云消息时间有大于等于情况，均拉去历史消息
      if (this.historyList.length) {
        console.log(
          this.currentMessageList[0].time,
          this.historySessionList[0].msgTime,
          this.historySessionList[this.historySessionList.length - 1].msgTime ,
          this.progressSessionList[0].time,
          this.progressSessionList[this.progressSessionList.length - 1].time
        );
        if (this.progressSessionList.length) {
          if (
            this.historySessionList.length &&
            this.historySessionList[0].msgTime / 1000 >
              this.currentMessageList[0].time
          ) {
            console.log("3-=-===============");
            this.searchChatRecords();
            this.isSave = true;
          } else if (
            this.historySessionList.length &&
            this.historySessionList[0].msgTime / 1000 <
              this.currentMessageList[0].time
          ) {
            console.log("4-=-===============");
            this.$store.dispatch(
              "getMessageList",
              this.currentConversation.conversationID
            );
            this.isSave = false;
          } else {
            console.log("5-=-===============");
            this.searchChatRecords();
            this.$store.dispatch(
              "getMessageList",
              this.currentConversation.conversationID
            );
            this.isSave = true;
          }
        } else {
          this.searchChatRecords();
          this.isSave = true;
        }
      } else {
        this.$store.dispatch(
          "getMessageList",
          this.currentConversation.conversationID
        );
        this.status = this.isCompleted;
      }
    },
    //获取历史消息
    searchChatRecords() {
      console.log(
        this.historySessionList,
        this.historySessionList[this.historySessionList.length - 1].msgTime,
        this.historySessionList[0].msgTime
      );
      let params = {
        orgId: this.visitorInf.orgId,
        visitorAccount: this.visitorInf.guestImAccount,
        msgTimeEnd: moment(
          this.historySessionList[this.historySessionList.length - 1].msgTime
        ).format("YYYY-MM-DD HH:mm:ss.SSS"),
        pageSize: 20
      };

      this.Request.get("/session/chat/record/search", params).then(res => {
        if (res.data.status) {
          let data = res.data;
          let list = [...data.list];
          console.log(list.length);
          let arr = deleteHistory(list, this.imInfo.userID);
          this.historySessionList.map(item => {
            arr.map((val, index) => {
              if (val.id == item.id) {
                arr.splice(index, 1, "");
              }
            });
          });
          arr = arrEmpty(arr);
          console.log(arr, arr.length);
          if (arr.length) {
            list.forEach((item, index) => {
              if (
                (item.msgTime == this.historySessionList[0].msgTime &&
                  item.id == this.historySessionList[0].id) ||
                item.subMsgType == "queuinglocation"
              ) {
                arr.splice(index, 1, "");
              }
            });
            console.log(arr, arr.arr);
            arr = arrEmpty(arr);
            this.historySessionList = [...this.historySessionList, ...arr];
            // this.$store.commit("getHistoryList", data.list);
          } else {
            this.status = true;
          }
        }
      });
    },
    onScroll({ target: { scrollTop } }) {
      let messageListNode = this.$refs["message-list"];
      if (!messageListNode) {
        return;
      }
      if (
        this.preScrollHeight - messageListNode.clientHeight - scrollTop <
        20
      ) {
        this.isShowScrollButtomTips = false;
      }
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    keepMessageListOnButtom() {
      let messageListNode = this.$refs["message-list"];
      if (!messageListNode) {
        return;
      }
      // 距离底部20px内强制滚到底部,否则提示有新消息
      if (
        this.preScrollHeight -
          messageListNode.clientHeight -
          messageListNode.scrollTop <
        20
      ) {
        this.$nextTick(() => {
          messageListNode.scrollTop = messageListNode.scrollHeight;
        });
        this.isShowScrollButtomTips = false;
      } else {
        this.isShowScrollButtomTips = true;
      }
      this.preScrollHeight = messageListNode.scrollHeight;
    },
    // 直接滚到底部
    scrollMessageListToButtom() {
      this.$nextTick(() => {
        let messageListNode = this.$refs["message-list"];
        if (!messageListNode) {
          return;
        }
        messageListNode.scrollTop = messageListNode.scrollHeight;
        this.preScrollHeight = messageListNode.scrollHeight;
        this.isShowScrollButtomTips = false;
      });
    },
    showMore() {
      this.showConversationProfile = !this.showConversationProfile;
    },
    onImageLoaded() {
      this.keepMessageListOnButtom();
    }
  }
};
</script>

<style lang="less" scoped>
/* 当前会话的骨架屏 */
.current-conversation-wrapper {
  width: 100%;
  height: calc(100% - 47px);
  background-color: #f5f5f5;
  color: #1c2438;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 47px;
  .current-conversation {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    height: 100%;
    // height: 80vh;
    .content {
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      height: calc(100% - 177px);
      // overflow-y: scroll;
      position: relative;
      .message-list {
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        overflow-y: auto;
        padding: 0 20px;
        .more {
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          font-size: 12px;
          .ant-btn {
            color: #409eff;
            background: #f5f5f5;
            border-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        }

        .no-more {
          color: #a5b5c1;
          padding: 10px 10px;
          display: flex;
          justify-content: center;
          font-size: 12px;
        }
      }
      .newMessageTips {
        position: absolute;
        cursor: pointer;
        padding: 5px;
        width: 120px;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 5px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #e9eaec;
        background-color: #fff;
        color: #2d8cf0;
      }
    }
  }
}

.footer {
  border-top: 1px solid #e7e7e7;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #949bb1;
    opacity: 0.4;
  }
}

.show-more {
  text-align: right;
  padding: 10px 20px 0 0;
}
</style>
