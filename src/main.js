import Vue from "vue";
import App from "./App.vue";
import {
  router
} from "./routes/routes";
import "./assets/css/common.less";
import store from './store/'
import utils from "@/utils/index";
import "./utils/directives"
// 有关antdUi组件
import "ant-design-vue/dist/antd.css";
import "./components";
import "./layouts";
import Antd from "ant-design-vue";
import './mock'

Vue.config.devtools = true
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils;

Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");