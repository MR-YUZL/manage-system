<template>
  <div class="list">
    <div
      :class="[
        'list--item',
        isClick === v.username && !isEdit ? 'list--click' : 'list--unClick',
        isHover === v.username && !isEdit ? 'list--hover' : 'list--unHover',
      ]"
      v-for="v in list"
      :key="v.username"
      @mouseenter="isHover = v.username"
      @mouseout="isHover = ''"
      @click="() => handleClick(v.username)"
    >
      <template v-if="isEdit !== v.username">
        {{ v.name }}
      </template>

      <a-input v-model="newUser" v-else style="width: 100px" />

      <span class="action"
        ><a-icon
          :type="isEdit === v.username ? 'check' : 'edit'"
          v-show="v.name !== '超级管理员'"
          style="margin-right: 10px"
          @click.stop="() => edit(v.name, v.username)" />
        <a-icon
          type="delete"
          v-show="v.name !== '超级管理员'"
          @click.stop="() => handleDelete(v.username)"
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isClick: "",
      newUser: "",
      isEdit: "",
      isConfirm: false,
      isHover: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    edit(name, id) {
      this.isEdit = id;
      this.isConfirm = !this.isConfirm;

      if (this.isConfirm) {
        this.newUser = name;
      } else {
        this.isEdit = "";
        this.$emit("editUser", this.newUser, id);
      }
    },
    handleClick(username) {
      this.isClick = username;
      this.$emit("getUserId", username);
    },
    handleDelete(id) {
      this.$emit("deleteUser", id);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 100%;

  .list--item {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 18px;
    transition: all 0.3s linear;
  }
  .list--hover {
    background: rgba(24, 144, 255, 0.6) !important;
  }
  .list--unHover {
    background: #ffffff;
  }
  .list--click {
    background: rgba(24, 144, 255);
    color: #ffffff;
  }
  .list--unClick {
    background: #ffffff;
  }
  .action {
    float: right;
  }
}
&:not(:last-child) {
  border-bottom: 1px solid #e8e8e8;
}
</style>
