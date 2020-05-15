<template>
  <div class="table">
    <!-- pagination 为false的时候不进行分页 -->
    <!--  rowSelection  列表项是否可选择-->
    <!-- hideDefaultSelections  去掉『全选』『反选』两个默认选项 -->
    <!-- rowKey设置唯一标识 -->
    <!-- scroll 设置滚动条-->
    <!-- @onPageChange  切换页面的方法     @onShowSizeChange 改变每页多少数字-->
    <!-- :columns="tableConfig.columns" -->
    <!-- customRender 返回复杂的结构 -->
    <ATable
      class="data-table"
      :rowKey="tableConfig.rowKey"
      :dataSource="tableConfig.list"
      :loading="tableConfig.loading"
      :pagination="!tableConfig.pagination ? false : Object.assign({}, {showSizeChanger:true,showTotal: total => `共 ${tableConfig.pagination.total} 条`,pageSizeOptions:['20','50','100']},tableConfig.pagination)"
      :scroll="tableConfig.scroll"
      :rowSelection="tableConfig.rowSelection?{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}:null"
      @change="onPageChange"
    >
      <ATableColumn
        v-for="(columns) in tableConfig.columns"
        :title="columns.title"
        :key="columns.key"
        :width="columns.width"
        :dataIndex="columns.key"
        :customRender="columns.customRender"
        :filters="columns.filters"
        class="column"
        :align="tableConfig.align?tableConfig.align:'left'"
      >
        <template slot-scope="text,record">
          <!-- {{columns}} -->
          <!-- 链接 -->
          <a
            v-if="columns.type === 'link'"
            :href="columns.prop"
            target="_blank"
            style="color:#409eff"
          >{{record[columns.dataIndex]}}{{record[columns.prop]}}</a>
          <!-- slot插槽 基本上是适配操作列的 -->
          <span v-else-if="columns.slotName">
            <slot :name="columns.slotName" :row="record" />
          </span>
          <span v-else>{{ record[columns.dataIndex]}}</span>
        </template>
      </ATableColumn>
    </ATable>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    tableConfig: {
      type: Object,
      default: {
        rowSelection: false
      }
    }
  },
  data() {
    return {
      selectedRowKeys: []
    };
  },
  created() {
    // console.log(this.tableConfig,'this.tableConfig')
  },
  mounted() {},
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      this.$emit("onSelectChange", selectedRows);
    },
    // page切换
    onPageChange(page, pageSize) {
      this.$emit("onPageChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin: 10px 0;
  background: #fff;
  a,
  a:visited {
    color: #1890ff;
  }
  tbody {
    color: #333;
  }
}
.column {
  color: #333;
}
</style>
<style lang="less">
.table .ant-table-thead > tr > th,
.table .ant-table-tbody > tr > td {
  padding: 15px 15px;
}
</style>
