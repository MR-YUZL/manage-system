import Vue from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import store from './store/'
import utils from "@/utils/index";
import Antd from "ant-design-vue";
import echarts from 'echarts'
import axios from 'axios'
import Viewer from 'v-viewer'

import 'viewerjs/dist/viewer.css'
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

Vue.prototype.$axios = axios
Vue.prototype.$utils = utils;
Vue.prototype.$echarts = echarts

// (function (doc, win) {
//   console.log('doc,win', doc, win)
// })(document, window);
Vue.use(Viewer);
Vue.use(Antd);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");