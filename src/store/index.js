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
        message.destroy()
      }
      let config = {
        content: options.message,
        type: options.type || 'success',
        duration: options.duration || 2,
        // offset: 40
      }
     
      if(options.type == 'warning'){
        state.message = message.warning(config)
      }else if(options.type == 'info'){
        state.message = message.info(config)
      }else if(options.type == 'error'){
        state.message = message.error(config)
      }else{
        state.message = message.success(config)
      }

      
    
    }
  },
  modules: {
    conversation,
    blacklist,
    user,
    basic
  }
})
