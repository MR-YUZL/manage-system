<template>
  <div class="power">
    <a-row
      type="flex"
      justify="space-between"
      :gutter="[20]"
      style="margin-bottom: 20px"
    >
      <a-col>
        <a-input-search
          placeholder="请输入用户名称"
          enter-button="查询用户"
          @search="onSearch"
      /></a-col>
      <a-col>
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
      </a-col>
    </a-row>

    <a-row :gutter="20" style="width: 100%; height: 100%">
      <a-col :md="11">
        <h1 class="userList">角色列表</h1>
        <List
          :list="userList"
          @getUserId="getUserId"
          @editUser="editUser"
          @deleteUser="deleteUser"
        ></List>
      </a-col>
      <a-col :md="2" style="height: 100%; position: relative">
        <a-icon
          type="right"
          :class="['iconRight', checkedKeys.length === 0 ? 'left' : '']"
        />
      </a-col>
      <a-col :md="11">
        <h1 class="powerList">权限列表</h1>

        <h1 class="powerList--none" v-if="checkedKeys.length === 0">
          <a-icon type="user" />请先选择用户
        </h1>

        <a-spin :spinning="powerLoading" v-else>
          <a-tree
            checkable
            :tree-data="treeData"
            defaultExpandAll
            checkStrictly
            :selectable="false"
            :checkedKeys="checkedKeys"
            @check="onCheck"
          >
          </a-tree>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { GetUserList, GetPowerList } from "@/api/four";
import { GetUserInfo } from "@/api/login";
import { treeData, data } from "@/utils/name";
export default {
  name: "power",
  components: {},
  props: {},
  data() {
    return {
      treeData,
      data,
      powerLoading: false,
      checkedKeys: [],
      userList: [],
      powerList: [],
    };
  },
  created() {},
  mounted() {
    this.requestUserList();
  },
  methods: {
    onSubmit() {
      let permissions = this.checkedKeys;
      let arr = [];
      permissions.forEach((ele) => {
        let item = ele.split("--");
        if (item.length === 1) {
            
        }
      });
      console.log("permissions", permissions);
    },

    onSearch(value) {
      GetUserList({ name: value }).then((res) => {
        if (res.code === 200) {
          let arr = res.result;
          this.userList = arr;
        }
      });
    },

    requestUserList() {
      GetUserList().then((res) => {
        if (res.code === 200) {
          let arr = res.result;
          this.userList = arr;
        }
      });
    },

    editUser(newVal, id) {
      this.userList = this.userList.map((v) => {
        if (v.username === id) {
          return { name: newVal, username: id };
        } else {
          return v;
        }
      });
    },

    deleteUser(id) {
      let that = this;
      this.$confirm({
        title: "您确定要删除此用户吗?",
        content: "删除后无法恢复",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              that.userList = that.userList.filter((v) => v.username !== id);
              resolve();
            }, 1000);
          });
        },
        onCancel() {},
      });
    },

    getUserId(id) {
      this.powerLoading = true;

      GetUserInfo({ username: id }).then((res) => {
        if (res.code === 200) {
          let arr = res.result.permission;

          let func = (arr) => {
            let array = [];
            for (let value of arr) {
              if (value.children) {
                let child = value.children.map((v) => {
                  return {
                    page: `${value.page}--${v.page}`,
                    actions: v.actions,
                  };
                });
                array.push(func(child), value.page);
              } else {
                value.actions.length !== 0
                  ? array.push(
                      value.actions.map((v) => `${value.page}--${v}`),
                      value.page
                    )
                  : array.push(value.page);
              }
            }
            return array;
          };

          this.checkedKeys = this.$utils.flatten(func(arr));
          this.powerLoading = false;
        }
      });
    },
    onCheck(checkedKeys, info) {
      this.checkedKeys = checkedKeys.checked;
      console.log('checkedKeys, info',checkedKeys, info)
    },
  },
};
</script>

<style lang="less" scoped>
.power {
  width: 100%;
  height: 100%;
  .userList,
  .powerList {
    text-align: center;
    height: 35px;
    line-height: 35px;
    background: #1890ff;
    font-size: 24px;
    color: #ffffff;
  }
  .powerList--none {
    text-align: center;
    font-size: 24px;
  }
  .iconRight {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform: scale(4);
    transition: all 0.3s linear;
  }
  .left {
    transform: rotate(180deg) scale(4);
  }
}
</style>
