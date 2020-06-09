<template>
  <div class="qf-components-leftmenu">
    <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="[focus]"
      :openKeys="openKeysList"
      @openChange="onOpenChange"
      class="menu"
      @click="handleChangeItem"
    >
      <!-- <a-menu-item v-for="item in listMenu" :key="item.key">
        <router-link :to="`/${item.key}`">
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </a-menu-item>-->
      <template v-for="it in menuData">
        <a-menu-item v-if="!it.childs || it.childs.length === 0" :key="it.resourceString">
          <router-link :to="`/${it.resourceString}`">
            <!-- <img :src="selection == it.resourceString ? it.icon_s : it.icon" alt /> -->
            <img
              v-if="it.resourceId == 'current_session'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/conversation_s.png') : require('./../../assets/imgs/menu_icon/conversation.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'message_record'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/record_s.png') : require('./../../assets/imgs/menu_icon/record.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'telephone_customer_service'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/tel_s.png') : require('./../../assets/imgs/menu_icon/tel.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'customer_center'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/customer_s.png') : require('./../../assets/imgs/menu_icon/customer.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'history_session'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/history_s.png') : require('./../../assets/imgs/menu_icon/history.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'quality_test_parent'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/quality_s.png') : require('./../../assets/imgs/menu_icon/quality.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'work_order_manager'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/order_s.png') : require('./../../assets/imgs/menu_icon/order.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'data_analysis'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/data_s.png') : require('./../../assets/imgs/menu_icon/data.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'staff_management'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/staff_s.png') : require('./../../assets/imgs/menu_icon/staff.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'knowledge_base'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/knowledge_s.png') : require('./../../assets/imgs/menu_icon/knowledge.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'setting'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/setting_s.png') : require('./../../assets/imgs/menu_icon/setting.png')"
              alt
            />
            {{ it.resourceName }}
          </router-link>
        </a-menu-item>

        <a-sub-menu
          v-if="it.childs && it.childs.length && it.childs.length !== 0"
          :key="it.resourceString"
        >
          <span slot="title">
            <img
              v-if="it.resourceId == 'current_session'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/conversation_s.png') : require('./../../assets/imgs/menu_icon/conversation.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'message_record'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/record_s.png') : require('./../../assets/imgs/menu_icon/record.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'telephone_customer_service'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/tel_s.png') : require('./../../assets/imgs/menu_icon/tel.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'customer_center'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/customer_s.png') : require('./../../assets/imgs/menu_icon/customer.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'history_session'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/history_s.png') : require('./../../assets/imgs/menu_icon/history.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'quality_test_parent'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/quality_s.png') : require('./../../assets/imgs/menu_icon/quality.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'work_order_manager'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/order_s.png') : require('./../../assets/imgs/menu_icon/order.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'data_analysis'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/data_s.png') : require('./../../assets/imgs/menu_icon/data.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'staff_management'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/staff_s.png') : require('./../../assets/imgs/menu_icon/staff.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'knowledge_base'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/knowledge_s.png') : require('./../../assets/imgs/menu_icon/knowledge.png')"
              alt
            />
            <img
              v-if="it.resourceId == 'config'"
              :src="selection == it.resourceString ? require('./../../assets/imgs/menu_icon/setting_s.png') : require('./../../assets/imgs/menu_icon/setting.png')"
              alt
            />
            {{ it.resourceName }}
          </span>
          <a-menu-item v-for="item in it.childs" :key="item.resourceString">
            <router-link :to="`/${item.resourceString}`">{{ item.resourceName }}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { listMenu } from "./tyle";
import { routeMatching } from "./../../utils";
import "./index.less";
export default {
  name: "left-menu",
  data: () => ({
    // listMenu: [...listMenu],
    focus: "currentSession",
    openKeysList: [],
    selection: "currentSession",
    menuData: []
  }),
  created() {
    this.Request.post("/config/hfwConfigResource/menuJson").then(res => {
      console.log(res);
      console.log(listMenu);
      if (res.data.status) {
        this.menuData = res.data.list;
        console.log(this.menuData);
        this.initMenu(this.menuData);
      }
    });
  },
  mounted() {},
  methods: {
    initMenu(listMenu) {
      const path = routeMatching(this.$route.path);
      listMenu.map(it => {
        if (it.childs) {
          it.childs.map(val => {
            let routerArr = val.resourceString.split("/");
            if (
              routerArr[routerArr.length - 1] === path[path.length - 1] &&
              routerArr[0] == path[0]
            ) {
              //二级菜单选择校验

              this.openKeysList = [it.resourceString]; //初始化二级菜单选择需要展开
              this.focus = val.resourceString;
              this.selection = it.resourceString;
            }
          });
        } else if (
          `/${it.resourceString}` === path[path.length - 1] ||
          it.resourceString === path[path.length - 1]
        ) {
          this.focus = it.resourceString;
          this.selection = it.resourceString;
        }
      });
      this.$router.beforeEach((to, from, next) => {
        const path = routeMatching(to.path);
        listMenu.map(it => {
          if (it.childs) {
            it.childs.map(val => {
              let routerArr = val.resourceString.split("/");
              if (
                routerArr[routerArr.length - 1] === path[path.length - 1] &&
                routerArr[0] == path[0]
              ) {
                this.focus = val.resourceString;
                this.selection = it.resourceString;
              }
            });
          } else if (
            `/${it.resourceString}` === path[path.length - 1] ||
            it.resourceString === path[path.length - 1]
          ) {
            this.focus = it.resourceString;
            this.selection = it.resourceString;
          }
        });
        next();
      });
    },
    handleChangeItem(e) {
      let routerList = e.key.split("/");
      if (routerList.indexOf(this.openKeysList[0]) <= -1) {
        //校验点击的菜单是否为子菜单
        this.openKeysList = [];
      }
      let routerArr = e.key.split("/");
      this.focus = e.key;

      this.selection = routerArr[0];
    },
    onOpenChange(openKeys) {
      this.openKeysList = [openKeys[openKeys.length - 1]]; //展开事件触发的子菜单
    }
  }
};
</script>
