import tim from '../../utils/tim'
import TIM from 'tim-js-sdk'
import store from '..'
import { titleNotify } from '../../utils'
const conversationModules = {
  state: {
    currentConversation: {},
    currentMessageList: [],
    nextReqMessageID: '',
    isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
    conversationList: [],
    messageList:[],//获取对方新消息
  },
  getters: {
    toAccount: state => {
      if (!state.currentConversation || !state.currentConversation.conversationID) {
        return ''
      }
      switch (state.currentConversation.type) {
        case 'C2C':
          return state.currentConversation.conversationID.replace('C2C', '')
        case 'GROUP':
          return state.currentConversation.conversationID.replace('GROUP', '')
        default:
          return state.currentConversation.conversationID
      }
    },
    currentConversationType: state => {
      if (!state.currentConversation || !state.currentConversation.type) {
        return ''
      }
      return state.currentConversation.type
    },
    totalUnreadCount: state => {
      const result = state.conversationList.reduce((count, conversation) => {
        // 当前会话不计算总未读
        if (!store.getters.hidden && state.currentConversation.conversationID === conversation.conversationID) {
          return count
        }
        return count + conversation.unreadCount
      }, 0)
      titleNotify(result)
      return result
    },
    // 用于当前会话的图片预览
    imgUrlList: state => {
      return state.currentMessageList
        .filter(message => message.type === TIM.TYPES.MSG_IMAGE && !message.isRevoked) // 筛选出没有撤回并且类型是图片类型的消息
        .map(message => message.payload.imageInfoArray[0].url)
    }
  },
  mutations: {
    /**
     * 更新当前会话
     * 调用时机: 切换会话时
     * @param {Object} state
     * @param {Conversation} conversation
     */
    updateCurrentConversation(state, conversation) {
      state.currentConversation = conversation
      state.currentMessageList = []
      state.nextReqMessageID = ''
      state.isCompleted = false
    },
    /**
     * 更新会话列表
     * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
     * @param {Object} state
     * @param {Conversation[]} conversationList
     */
    updateConversationList(state, conversationList) {
      state.conversationList = conversationList
    },
    /**
     * 重置当前会话
     * 调用时机：需要重置当前会话时，例如：当前会话是一个群组，正好被踢出群时（被踢群事件触发），重置当前会话
     * @param {Object} state
     */
    resetCurrentConversation(state) {
      state.currentConversation = {}
    },
    /**
     * 将消息插入当前会话列表
     * 调用时机：收/发消息事件触发时
     * @param {Object} state
     * @param {Message[]|Message} data
     * @returns
     */
    pushCurrentMessageList(state, data) {
      state.messageList = Array.isArray(data) ?[...data] : [data]
    
      // 还没当前会话，则跳过
      if (!state.currentConversation.conversationID) {
        return
      }
      if (Array.isArray(data)) {
        // 筛选出当前会话的消息
        const result = data.filter(item => item.conversationID === state.currentConversation.conversationID)
        state.currentMessageList = [...state.currentMessageList, ...result]
      } else if (data.conversationID === state.currentConversation.conversationID) {
        state.currentMessageList = [...state.currentMessageList, data]
      }
    },
    /**
     * 从当前消息列表中删除某条消息
     * @param {Object} state
     * @param {Message} message
     */
    removeMessage(state, message) {
      const index = state.currentMessageList.findIndex(({ ID }) => ID === message.ID)
      if (index >= 0) {
        state.currentMessageList.splice(index, 1)
      }
    },
    reset(state) {
      Object.assign(state, {
        currentConversation: {},
        currentMessageList: [],
        nextReqMessageID: '',
        isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
        conversationList: []
      })
    }
  },
  actions: {
    /**
     * 获取消息列表
     * 调用时机：打开某一会话时或下拉获取历史消息时
     * @param {Object} context
     * @param {String} conversationID
     */
    getMessageList(context, conversationID) {
      console.log(context.state.isCompleted)
      if (context.state.isCompleted) {
        // context.commit('showMessage', {
        //   message: '已经没有更多的历史消息了哦',
        //   type: 'info'
        // })
        return
      }
      
      const { nextReqMessageID, currentMessageList } = context.state
      tim(store.state.basic.imInfo.SDKAppID).getMessageList({ conversationID, nextReqMessageID, count: 15 }).then(imReponse => {
        // 更新messageID，续拉时要用到
        context.state.nextReqMessageID = imReponse.data.nextReqMessageID
        context.state.isCompleted = imReponse.data.isCompleted
        // 更新当前消息列表，从头部插入
        context.state.currentMessageList = [...imReponse.data.messageList, ...currentMessageList]
      })
    },
    /**
     * 切换会话
     * 调用时机：切换会话时
     * @param {Object} context
     * @param {String} conversationID
     */
    checkoutConversation(context, conversationID) {
      // context.commit('resetCurrentMemberList')
      // 1.切换会话前，将切换前的会话进行已读上报
      if (context.state.currentConversation.conversationID) {
        const prevConversationID = context.state.currentConversation.conversationID
        tim(store.state.basic.imInfo.SDKAppID).setMessageRead({ conversationID: prevConversationID })
      }
      // 2.待切换的会话也进行已读上报
      tim(store.state.basic.imInfo.SDKAppID).setMessageRead({ conversationID })
      // 3. 获取会话信息
      return tim(store.state.basic.imInfo.SDKAppID).getConversationProfile(conversationID).then(({ data }) => {
        // 3.1 更新当前会话
        context.commit('updateCurrentConversation', data.conversation)
        // 3.2 获取消息列表
        context.dispatch('getMessageList', conversationID)
        // 3.3 拉取第一页群成员列表
        if (data.conversation.type === TIM.TYPES.CONV_GROUP) {
          return context.dispatch('getGroupMemberList', data.conversation.groupProfile.groupID)
        }
        return Promise.resolve()
      })
    }
  }
}

export default conversationModules
