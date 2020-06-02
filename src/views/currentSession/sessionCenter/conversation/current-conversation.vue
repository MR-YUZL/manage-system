<template>
  <div class="current-conversation-wrapper">
    <div class="current-conversation" @scroll="onScroll" v-if="showCurrentConversation">
      <div class="content">
        <div class="message-list" ref="message-list" @scroll="this.onScroll">
          <div class="more" v-if="!isCompleted">
            <a-button
              @click="$store.dispatch('getMessageList', currentConversation.conversationID)"
            >查看更多</a-button>
          </div>
          <div class="no-more" v-else>没有更多了</div>
          <history-message /> 
          <!-- <message-item v-for="message in currentMessageList" :key="message.ID" :message="message" /> -->
        </div>
        <div
          v-show="isShowScrollButtomTips"
          class="newMessageTips"
          @click="scrollMessageListToButtom"
        >回到最新位置</div>
      </div>
      <div class="footer" v-if="showMessageSendBox">
        <message-send-box />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MessageSendBox from "./../../../../components/message/message-send-box";
import MessageItem from "./../../../../components/message/message-item";
import historyMessage from "./../../../../components/historyMessage"

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
      data: [
        {
          ID: "C2C13800571501-158441420-10-0",
          conversationID: "C2C13800571501",
          conversationType: "C2C",
          time: 1590632962,
          sequence: 158441420,
          clientSequence: 158441420,
          random: 10,
          priority: "Normal",
          nick: "",
          avatar: "",
          _elements: [
            {
              type: "TIMCustomElem",
              content: {
                data:
                  {"msgText":"https://image1.aliyun.com","sendType":"manual","subMsgType":"image"},
                description: "",
                extension: ""
              }
            }
          ],
          isPlaceMessage: 0,
          isRevoked: false,
          geo: {},
          from: "13800571501",
          to: "13800571503",
          flow: "in",
          isSystemMessage: false,
          protocol: "JSON",
          isResend: false,
          isRead: false,
          status: "success",
          payload: {
            data:
              {"msgText":"https://image1.aliyun.com","sendType":"manual","subMsgType":"image"},
            description: "",
            extension: ""
          },
          type: "TIMCustomElem"
        },

        // {
        //   ID: "C2C13800571500-1847961126-10-0",
        //   conversationID: "C2C13800571500",
        //   conversationType: "C2C",
        //   time: 1590055345,
        //   sequence: 1847961126,
        //   clientSequence: 1847961126,
        //   random: 10,
        //   priority: "Normal",
        //   nick: "",
        //   avatar: "",
        //   _elements: [
        //     {
        //       type: "TIMCustomElem",
        //       content: {
        //         data:
        //           '{"msgText":"客服xxxx为您服务","sendType":"automatic","subMsgType":"prompts"}'
        //       }
        //     }
        //   ],
        //   isPlaceMessage: 0,
        //   isRevoked: false,
        //   geo: {},
        //   from: "13800571500",
        //   to: "13800571503",
        //   flow: "in",
        //   isSystemMessage: false,
        //   protocol: "JSON",
        //   isResend: false,
        //   isRead: false,
        //   status: "success",
        //   payload: {
        //     data:
        //       {"msgText":"客服xxxx为您服务","sendType":"automatic","subMsgType":"prompts"}
        //   },
        //   type: "TIMCustomElem"
        // },
        {
          ID: "C2C13800571500-1847961126-10-0",
          conversationID: "C2C13800571500",
          conversationType: "C2C",
          time: 1590055345,
          sequence: 1847961126,
          clientSequence: 1847961126,
          random: 10,
          priority: "Normal",
          nick: "",
          avatar: "",
          _elements: [
            {
              type: "TIMCustomElem",
              content: {
                data:
                  '{"msgText":"客服xxxx为您服务","sendType":"automatic","subMsgType":"prompts"}'
              }
            }
          ],
          isPlaceMessage: 0,
          isRevoked: false,
          geo: {},
          from: "13800571500",
          to: "13800571503",
          flow: "in",
          isSystemMessage: false,
          protocol: "JSON",
          isResend: false,
          isRead: false,
          status: "success",
          payload: {
            data:
              {"msgText":"客服xxxx为您服务","sendType":"automatic","subMsgType":"text"}
          },
          type: "TIMCustomElem"
        }
      ],
    };
  },
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUnreadCount: state =>
        state.conversation.currentConversation.unreadCount,
      currentMessageList: state => {
        state.conversation.currentMessageList.forEach(item => {
          if (item.type == "TIMCustomElem") {
            item.payload.data =
              typeof item.payload.data == "string"
                ? JSON.parse(item.payload.data)
                : item.payload.data;
          }
        });
        return state.conversation.currentMessageList
      },
      isCompleted: state => state.conversation.isCompleted
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
  watch: {
    currentUnreadCount(next) {
      if (!this.hidden && next > 0) {
        this.tim.setMessageRead({
          conversationID: this.currentConversation.conversationID
        });
      }
    },
    hidden(next) {
      if (!next && this.currentUnreadCount > 0) {
        this.tim.setMessageRead({
          conversationID: this.currentConversation.conversationID
        });
      }
    },
    
  },
  methods: {
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
        // height:calc(100% - 224px);
        -webkit-box-sizing: border-box;
        overflow-y: scroll;
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
}

.show-more {
  text-align: right;
  padding: 10px 20px 0 0;
}
</style>
