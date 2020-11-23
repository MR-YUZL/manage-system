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
          @click.self="() => handleClick(v.name)"
        >
          <template v-if="addType !== v.id">
            {{ v.name }} ({{ v.num }})
          </template>
          <a-input v-model="newType" v-else style="width: 120px" v-focus  />

          <a
            href="#"
            v-if="addType === v.id"
            style="margin-left: 10px"
            @click.stop="() => confirmType(v.id)"
            >保存</a
          >
          <span class="action" v-else>
            <a-icon
              :type="'edit'"
              style="margin-right: 10px"
              @click.stop="() => editType(v.name, v.id)"
            />

            <a-popconfirm
              title="你确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDeleteType(v.id)"
            >
              <a-icon type="delete" />
            </a-popconfirm>
          </span>
        </div>
      </template>

      <div class="add" v-if="list.length" @click.stop="handleAddType">
        添加分类
      </div>
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

            <a-input v-model="newUser" v-else style="width: 120px" v-focus />
            <a
              href="#"
              v-if="isEdit === v.id"
              style="margin: 0 10px"
              @click.stop="() => confirm(v.id)"
              >保存</a
            >
            <a href="#" v-if="isEdit === v.id" @click.stop="() => cancel(v.id)"
              >取消</a
            >
            <span class="action" v-else>
              <a-icon
                :type="'edit'"
                style="margin-right: 10px"
                @click.stop="() => edit(v.name, v.id)"
              />

              <a-popconfirm
                title="你确定要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDeleteChannel(v.id)"
              >
                <a-icon type="delete" />
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-spin>
      <div class="add" v-if="listChild.length" @click.stop="handleAddChannel">
        添加渠道
      </div>
      <div class="noDataImg" v-if="!spinning2 && !listChild.length"></div>
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
      addType: "", //正在添加分配
      newType: "", //分类修改名
    };
  },
  created() {},
  mounted() {},
  methods: {
    edit(name, id) {
      this.isEdit = id;
      this.newUser = name;
    },
    editType(name, id) {
      this.addType = id;
      this.newType = name;
    },
    cancel() {},
    confirm(id) {
      if (
        this.listChild
          .filter((v) => v.id !== id)
          .findIndex((v) => v.name === this.newUser) === -1
      ) {
        if (!this.newUser) {
          this.$message.error("请输入渠道名!");
          return;
        }

        this.isEdit = "";
        this.$emit("editChannel", this.newUser, id);
        this.newUser = "";
        return;
      }
      this.$message.error("禁止重名!");
    },
    confirmType(id) {
      if (
        this.list
          .filter((v) => v.id !== id)
          .findIndex((v) => v.name === this.newType) === -1
      ) {
        if (!this.newType) {
          this.$message.error("请输入渠道名!");
          return;
        }

        this.addType = "";
        this.$emit("editType", this.newType, id);
        this.newType = "";
        return;
      }
      this.$message.error("禁止重名!");
    },
    handleClick(name) {
      this.isClick = name;
      this.$emit("getChannelId", name);
    },
    handleDeleteChannel(id) {
      this.$emit("deleteChannel", id);
    },
    handleDeleteType(id) {
      this.$emit("deleteType", id);
    },
    handleAddType() {
      if (this.addType) {
        if (this.newType) {
          this.$message.error("请保存数据!");
          return;
        }
        if (!this.newType) {
          this.$message.error("请输入分类名称!");
          return;
        }
      }

      this.$emit("addType");
      this.$nextTick(() => {
        let arr = JSON.parse(JSON.stringify(this.list));
        this.addType = arr.pop().id;
      });
    },
    handleAddChannel() {
      if (this.isEdit) {
        if (this.newUser) {
          this.$message.error("请保存数据!");
          return;
        }
        if (!this.newUser) {
          this.$message.error("请输入渠道名!");
          return;
        }
      }

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
    padding-bottom: 40px;
    text-align: center;
    line-height: 120px;
    .header {
      width: 100%;
      height: 48px;
      line-height: 48px;
      padding: 0px 20px;
      border-bottom: 1px solid rgb(235, 235, 235);
      color: #000;
      text-align: left;
      font-size: 18px;
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
      text-align: left;
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
      position: absolute;
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
