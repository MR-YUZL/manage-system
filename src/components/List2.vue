<template>
  <div class="list2">
    <div class="list">
      <div class="header">一级分类</div>
      <a-spin :spinning="spinning1" class="dataLoading" tip="加载中..." />
      <template v-if="list.length > 0">
        <div
          :class="[
            'list--item',
            isClick === v.name ? 'list--click' : 'list--unClick',
          ]"
          v-for="v in list"
          :key="v.name"
          @click="() => handleClick(v.name)"
        >
          <template> {{ v.name }} ({{ v.num }}) </template>
        </div>
      </template>
    </div>
    <div class="list">
      <div class="header">渠道</div>
      <a-spin :spinning="spinning2" tip="加载中...">
        <template v-if="listChild.length">
          <div
            :class="[
              'list--item',
              isEdit === v.id ? 'list--click' : 'list--unClick',
            ]"
            v-for="v in listChild"
            :key="v.id"
          >
            <template v-if="isEdit !== v.id">
              {{ v.name }}
            </template>

            <a-input v-model="newUser" v-else style="width: 100px" />

            <span class="action">
              <a-icon
                :type="'check'"
                v-if="isEdit === v.id"
                style="margin-right: 10px"
                @click.stop="() => confirm(v.id)"
              />
              <a-icon
                :type="'edit'"
                style="margin-right: 10px"
                v-else
                @click.stop="() => edit(v.name, v.id)"
              />

              <a-popconfirm
                title="你确定要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(v.id)"
              >
                <a-icon type="delete" />
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-spin>
      <div class="add" v-if="listChild.length" @click.stop="handleAdd">
        添加渠道
      </div>
      <div class="noDataImg" v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List2",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    listChild: {
      type: Array,
      default: () => [],
    },
    spinning1: {
      type: Boolean,
      default: false,
    },
    spinning2: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClick: "", //被点击的父级名称
      newUser: "", //渠道修改名
      isEdit: "", //正在编辑的渠道id
    };
  },
  created() {},
  mounted() {},
  methods: {
    edit(name, id) {
      this.isEdit = id;
      this.newUser = name;
    },
    confirm(id) {
      if (
        this.listChild
          .filter((v) => v.id !== id)
          .findIndex((v) => v.name === this.newUser) === -1 &&
        this.newUser
      ) {
        this.isEdit = "";
        this.$emit("editChannel", this.newUser, id);
        return;
      }
      this.$message.error("禁止重名！");
    },
    handleClick(name) {
      this.isClick = name;
      this.$emit("getChannelId", name);
    },
    handleDelete(id) {
      this.$emit("deleteChannel", id);
    },
    handleAdd() {
      this.$emit("addChannel", this.isClick);
      this.$nextTick(() => {
        let arr = JSON.parse(JSON.stringify(this.listChild));
        this.isEdit = arr.pop().id;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list2 {
  display: flex;
  align-items: stretch;
  .list {
    position: relative;
    width: 100%;
    min-height: 120px;
    border: 1px solid rgb(235, 235, 235);
    margin: 0 0 -1px -1px;
    .header {
      width: 100%;
      height: 48px;
      line-height: 48px;
      padding: 0px 20px;
      border-bottom: 1px solid rgb(235, 235, 235);
      color: #000;
    }
    .dataNull,
    .dataLoading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .list--item {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      transition: all 0.3s linear;
      cursor: pointer;
    }
    .list--item:hover {
      background: rgb(235, 235, 235);
    }
    .list--click {
      background: rgb(235, 235, 235);
      color: #000;
    }
    .list--unClick {
      background: #ffffff;
    }
    .action {
      float: right;
    }
    .add {
      position: relative;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #1890ff;
      font-size: 24px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
