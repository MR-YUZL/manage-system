import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes/routes";
import "./assets/css/common.less";
// 有关antdUi组件
import "ant-design-vue/dist/antd.css";
import "./components";
import Antd from "ant-design-vue";
import './mock'

Vue.config.devtools = true
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(Antd);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
