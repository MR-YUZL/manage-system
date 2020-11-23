<template>
  <div class="">
    <h1>账号管理{{ msg }}</h1>
    <List2
      :list="list"
      :listChild="listChild"
      :spinning1="spinning1"
      :spinning2="spinning2"
      @getChannelId="getChannelId"
      @editChannel="editChannel"
      @deleteChannel="deleteChannel"
      @addChannel="addChannel"
      @addType="addType"
      @editType="editType"
    ></List2>
  </div>
</template>

<script>
export default {
  name: "account",
  components: {},
  props: {},
  data() {
    return {
      msg: "",
      spinning1: false,
      spinning2: false,
      list: [
        //父级数据
        { name: "未分类", num: 2, id: "1" },
        { name: "新媒体平台", num: 2, id: "2" },
      ],
      listChild: [],
      listChild1: [
        //子级数据
        { name: "未命名1", id: "1" },
        { name: "未命名2", id: "2" },
        { name: "未命名3", id: "3" },
      ],
      listChild2: [
        { name: "渠道1", id: "1" },
        { name: "渠道2", id: "2" },
        { name: "渠道3", id: "3" },
      ],
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.msg = to.fullPath;
      },
    },
  },
  created() {},
  mounted() {
    this.msg = this.$route.fullPath;
  },
  methods: {
    getChannelId(id) {
      this.spinning2 = true;
      if (id === "未分类") {
        setTimeout(() => {
          this.listChild = this.listChild1;
          this.spinning2 = false;
        }, 1000);
      }

      if (id === "新媒体平台") {
        setTimeout(() => {
          this.listChild = this.listChild2;
          this.spinning2 = false;
        }, 1000);
      }
    },
    editType(name, id) {
      this.list = this.list.map((v) => {
        if (v.id === id) {
          return { name, id, num: 0 };
        }
        return v;
      });
      this.$message.success("保存成功");
    },
    editChannel(name, id) {
      this.listChild = this.listChild1.map((v) => {
        if (v.id === id) {
          return { name, id };
        }
        return v;
      });
      this.$message.success("保存成功");
    },
    deleteChannel(id) {
      this.listChild = this.listChild1.filter((v) => v.id !== id);
      this.$message.success("删除成功");
    },
    addChannel() {
      let arr = JSON.parse(JSON.stringify(this.listChild));
      arr.push({ name: "", id: `${arr.length + 1}` });

      this.listChild = arr;
      this.listChild1 = arr;
    },
    addType() {
      let arr = JSON.parse(JSON.stringify(this.list));
      arr.push({ name: "", num: 0, id: `${arr.length + 1}` });
      this.list = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
