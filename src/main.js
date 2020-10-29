import Vue from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import store from './store/'
import utils from "@/utils/index";
import Antd from "ant-design-vue";
import echarts from 'echarts'

import 'echarts-liquidfill'
import "./utils/directives"
import "ant-design-vue/dist/antd.css";
import "./components";
import "./chartsComponents";
import "./layouts";
import './mock'
import './asyncRoute'
import '@/style/index.less' 

Vue.config.devtools = true
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils;
Vue.prototype.$echarts = echarts

Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");