<template>
  <div>
    <a-modal
      v-model="visibles"
      title="导入结果"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :footer="null"
      width="600px"
    >
      <ul v-if="resultList.length" class="resultUl">
        <li v-for="(item,index) in resultList" :key="index">
          <span class="p1">
            {{item.impTime}}
            <span>操作人：{{item.inputAcc}}</span>
          </span>
          <span class="p1">
            共解析数据
            <i>{{item.totalNum}}</i>条，成功导入
            <i>{{item.successNum}}</i>条，导入失败
            <i>{{item.failNum}}</i>条
          </span>
          <a-button v-if="item.failNum" type="dashed" icon="download" @click="downFaild(item.fileId)">下载导入失败的数据</a-button>
        </li>
      </ul>
      <div v-else class="noDataImg"></div>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
import qs from "qs";
export default {
  data() {
    return {
      visibles: this.visible,
      resultList: []
    };
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  props: {
    visible: Boolean,
    pageSize: Number
  },
  mounted() {
    this.getResult();
  },
  methods: {
    getResult() {
      api.importResult().then(res => {
        console.log(res, "导入结果");
        if (res.data.status) {
          this.resultList = res.data.list;
        }
      });
    },
    handleSubmit() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    },
    downFaild(fileId){
      console.log(fileId,'fileId')
      let param = qs.stringify({
        fileId:fileId
      });
      let url = `/imp/hfwImportResult/expErrorExcel?${param}`;
      window.location.href = url;
    },
  }
};
</script>
<style lang="less" scoped>
.resultUl {
  li {
    margin-bottom: 20px;
    position: relative;
    .p1 {
      display: block;
      span {
        padding-left: 15px;
      }
      i {
        font-style: normal;
        color: #f00;
        padding: 0 2px;
      }
    }
    button{
      position: absolute;
      right: 0;
      top:0
    }
  }
}
.noDataImg{
  position: relative;
  top: -26px;
}
</style>