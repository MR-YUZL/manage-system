import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation'
import user from './modules/user'
import blacklist from './modules/blacklist'
import basic from './modules/basic'
//注入全局属性$message
import { message} from 'ant-design-vue'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  getters: {
    hidden(state) {
      // eslint-disable-next-line no-unused-vars
      const temp = state.current 
      if (typeof document.hasFocus !== 'function') {
        return document.hidden
      }
      return !document.hasFocus()
    }
  },
  mutations: {
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.destroy()
      }
      state.message = message.config({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
      // this.$message.success(
      //   'This is a prompt message for success, and it will disappear in 10 seconds',
      //   10,
      // );
    }
  },
  modules: {
    conversation,
    blacklist,
    user,
    basic
  }
})
