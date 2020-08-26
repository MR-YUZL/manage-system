
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
            v-if="!item.knowlegeBeanList || item.knowlegeBeanList.length == 0"
          >{{item.groupName || item.title}}</a-menu-item>
          <a-sub-menu
            v-if="item && item.knowlegeBeanList && item.knowlegeBeanList.length > 0"
            :key="item.id"
          >
            <span slot="title">{{item.groupName}}</span>
            <a-menu-item v-for="(val) in item.knowlegeBeanList" :key="val.id">
              <a-tooltip placement="bottomLeft">
                <template slot="title">{{val.content}}</template>
                {{val.title}}
              </a-tooltip>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    ...mapState({
      visitorInf: state => state.basic.visitorInf,
    })
  },
  watch: {},
  //方法集合
  methods: {
    onSearch(value) {
      let obj = {
        title: value
      };
      this.Request.get("/hfw/tsmHfwKnowlegeGroup/getListByTitle", obj).then(
        res => {
          if (res.data.status) {
            this.list = res.data.list;
          }
        }
      );
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
          this.message = item.content || item.groupName;
        } else {
          if (item.knowlegeBeanList && item.knowlegeBeanList.length) {
            this.mapData(item.knowlegeBeanList, key);
          }
        }
      });
      return this.message;
    }
  },
  created() {},
  mounted() {
    this.onSearch();
  },
  beforeDestroy() {
    this.$bus.$off("message", this.message);
  }
};
</script>
<style lang='less' scoped>
.knowledgeBase {
  //   height: calc(100vh - 70px);
  //   overflow-y: auto;
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
    //   .title{
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 10px 0 0 0;
    //       span{
    //         font-size: 16px;
    //         font-weight: 500;
    //       }

    //   }
    //   .option{
    //       cursor: pointer;
    //       font-size: 14px;
    //       padding: 5px 0;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //   }
  }
  .ant-menu-submenu-title {
    padding-left: 0px !important;
    padding-right: 0px;
  }
}
</style>