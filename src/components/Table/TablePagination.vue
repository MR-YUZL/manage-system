<template>
  <div class="page_pagination">
    <a-pagination
      :showQuickJumper="true"
      showSizeChanger
      :total="pager.totalRecord"
      v-model="pager.currentPage"
      @change="onChange"
      :pageSize="pager.pageSize"
      @showSizeChange="onShowSizeChange"
      :pageSizeOptions="pager.pageSizeOptions"
      :showTotal="total => `共有 ${pager.totalRecord} 条`"
    >
      <!-- <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      </template>-->
    </a-pagination>
  </div>
</template>
<script>
export default {
  props: {
    parentPager: {
      type: Object
    }
  },
  watch: {
    parentPager(val) {
      console.log(val,"=============")
      this.pager = Object.assign({}, this.pager, val);
    }
  },
  data() {
    return {
      pager: {
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        totalPage: 0
      }
    };
  },
  mounted() {},
  methods: {
    onChange(currentPage, pageSize) {
      this.pager = Object.assign({},this.pager,{currentPage,pageSize})
      this.$emit("paginationChange",this.pager)
    },
    onShowSizeChange(currentPage, pageSize) {
      this.pager = Object.assign({},this.pager,{currentPage,pageSize})
      this.$emit("paginationChange",this.pager)
    }
  }
};
</script>
<style lang="less" scoped>
</style>