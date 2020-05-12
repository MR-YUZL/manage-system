import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import { router } from "./routes/routes";
import "./assets/css/common.less";
// 有关antdUi组件
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import Request from './api/api'
import './api/index'
import validateRules from './utils/validateRules'
import tim from './utils/tim'
import TIM from 'tim-js-sdk'


Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.prototype.Request = Request;
Vue.prototype.validateRules = validateRules

document.cookie = "JSESSIONID=DEAA57760654FD26DF7874865AECF2A4";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
