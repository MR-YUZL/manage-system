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
      </a-menu-item> -->
      <template v-for="it in listMenu">
              <a-menu-item
                v-if="!it.item || it.item.length === 0"
                :key="it.key"
              >
              
                <router-link :to="`/${it.key}`">
                <img :src="selection == it.key ? it.icon_s : it.icon" alt="">
                {{ it.title }}
                </router-link>
              </a-menu-item>

              <a-sub-menu
                v-if="it.item && it.item.length && it.item.length !== 0"
                :key="it.key"
              >
                
                <span slot="title"> <img :src="selection == it.key ? it.icon_s : it.icon" alt="" >{{ it.title }}</span>
                <a-menu-item v-for="item in it.item" :key="item.key">
                  <router-link :to="`/${item.key}`">
                    {{ item.title }}
                  </router-link>
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
    listMenu: [...listMenu],
    focus: "currentSession",
    openKeysList: [],
    selection:'currentSession'
  }),
  mounted() {
    const path = routeMatching(this.$route.path);
    console.log(path)
    listMenu.map(it => {
      if(it.item){
        it.item.map(val => {
          let routerArr = val.key.split('/')    
          if(routerArr[routerArr.length - 1]===path[path.length - 1] && routerArr[0] == path[0]){  //二级菜单选择校验
           
            this.openKeysList = [it.key]  //初始化二级菜单选择需要展开
            this.focus = val.key
            this.selection = it.key
          }
        })
      }
      else if(`/${it.key}` === path[path.length - 1] || it.key===path[path.length - 1]){
        this.focus = it.key
        this.selection = it.key
      }
      
    });
    this.$router.beforeEach((to, from, next) => {

      const path = routeMatching(to.path);
      listMenu.map(it => {
        if(it.item){
          it.item.map(val => {
            let routerArr = val.key.split('/')
            if(routerArr[routerArr.length - 1]===path[path.length - 1] && routerArr[0] == path[0]){
              this.focus = val.key
              this.selection = it.key
            }
          })
        }
        else if(`/${it.key}` === path[path.length - 1] || it.key===path[path.length - 1]){
          this.focus = it.key
          this.selection = it.key
        }
      });
      next();
    });
  },
  methods: {
    handleChangeItem(e) {
   
      let routerList = e.key.split('/')
      if(routerList.indexOf(this.openKeysList[0]) <= -1){  //校验点击的菜单是否为子菜单
        this.openKeysList = []
      }
      let routerArr = e.key.split('/')
      this.focus = e.key;
     
      this.selection = routerArr[0]
    },
    onOpenChange(openKeys) {
    
      this.openKeysList = [openKeys[openKeys.length - 1]] //展开事件触发的子菜单
     
    }
  }
};
</script>
