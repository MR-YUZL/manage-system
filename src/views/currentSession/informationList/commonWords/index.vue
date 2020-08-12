
<template>
  <div class="knowledgeBase">
    <div class="search">
      <a-input-search placeholder="请输入关键词" style="width: 250px" @search="onSearch" />
    </div>
    <div class="content">
      <a-menu mode="inline" class="menu" @click="handleChangeItem">
        <template v-for="item in list">
          <a-menu-item
            :key="item.id"
            v-if="!item.children || item.children.length == 0"
          >{{item.text}}</a-menu-item>
          <a-sub-menu v-if="item && item.children && item.children.length > 0" :key="item.id">
            <span slot="title">{{item.text}}</span>
            <a-menu-item v-for="(val) in item.children" :key="val.id">
              <span class="font">{{val.ext}}</span>
              <a-tooltip placement="bottomLeft">
                <template slot="title">{{val.text}}</template>
                <span>{{val.text}}</span>
              </a-tooltip>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "knowledgeBase",
  components: {},
  data() {
    return {
      message: "",
      // openKeysList: [],
      list: []
    };
  },
  computed: {
    visitorInf: state => state.basic.visitorInf,
  },
  watch: {},
  //方法集合
  methods: {
    onSearch(value) {
      if (value == "") {
        this.getList();
      } else {
        let list = this.list;

        let rebuildData = (value, arr) => {
          let newarr = [];
          arr.forEach(element => {
            if (element.children && element.children.length) {
              let ab = rebuildData(value, element.children);
              let obj = {
                ...element,
                children: ab
              };
              if (ab && ab.length) {
                newarr.push(obj);
              }
            } else {
              if (
                element.text.indexOf(value) > -1 ||
                element.ext.indexOf(value) > -1
              ) {
                newarr.push(element);
              }
            }
          });
          return newarr;
        };

        this.list = rebuildData(value, list);
      }
    },
    getList(value) {
      this.Request.get("/common/speech/tree/info").then(res => {
        if (res.data.status) {
          this.list = res.data.list;
        }
      });
    },

    handleChangeItem(key) {
      if (this.visitorInf.status) {
        this.message = this.mapData(this.list, key.key);
        this.$bus.$emit("message", this.message);
      }
    },
    mapData(list, key) {
      list.map(item => {
        if (item.id == key) {
          this.message = item.text;
        } else {
          if (item.children && item.children.length) {
            this.mapData(item.children, key);
          }
        }
      });
      return this.message;
    }
  },
  created() {},
  mounted() {
    this.getList();
  },
  beforeDestroy() {
    this.$bus.$off("message", this.message);
  }
};
</script>
<style lang='less' scoped>
.knowledgeBase {
  // height: calc(100vh - 70px);
  // overflow-y: auto;
  .search {
    text-align: center;
  }
  .content {
    padding: 15px 0;
    .ant-menu-inline {
      border-right: 1px solid transparent;
    }
    .ant-menu-sub.ant-menu-inline > .ant-menu-item {
      padding-left: 24px !important;
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      height: 30px;
      line-height: 30px;
    }
  }
  .ant-menu-submenu-title {
    padding-left: 0px !important;
    padding-right: 0px;
  }
  .font {
    padding-right: 10px;
    font-size: 12px;
  }
}
</style>