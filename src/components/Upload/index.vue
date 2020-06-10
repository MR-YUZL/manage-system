<template>
  <div class="uploadBox">
    <a-upload
      name="file"
      action="/fileupload/upload"
      :multiple="true"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :fileList="fileList"
    >
      <a-button>
        <a-icon type="upload" />Upload
      </a-button>
    </a-upload>
  </div>
</template>
<script>
import ImgEnclosure from "./ImgEnclosure";
export default {
  components: { ImgEnclosure },
  data() {
    return {
      defaultFileList: [],
      fileList: []
    };
  },
  watch: {
    list(val, oldVal) {
      console.log(val, oldVal, "watch======");
      // this.updateDefaultFileList(val);
    }
  },
  props: {
    list: {
      type: Array,
      default: function(){
        return []
      }
    },
    propName: {
      type: String
    }
  },
  created() {
    this.updateDefaultFileList(this.list);
  },
  mounted() {
    this.$emit("change", this.defaultFileList);
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不超过2MB！");
      }
      return isLt2M;
    },
    updateDefaultFileList(list) {
      let tempList = [];
      list && list.map((item, index) => {
        let temp = {
          uid: index,
          url: item.url,
          name: item.name
        };
        tempList.push(temp);
      });
      this.fileList = tempList;
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      // 控制大于2M的附件。不显示
      if(info.file.size > 2*1024*1024) {
        return;
      }
      this.fileList = fileList
      let paramsFile = [];
      fileList.map(file => {
        if(file.url) {
          paramsFile.push(file)
        }
        if (file.response && file.response.status === "success") {
          // console.log(file.response, "data");
          paramsFile.push(Object.assign({uid:file.uid},file.response));
        }
      });
      // this.fileList = paramsFile
      console.log("paramsFile=========",paramsFile,fileList)
      this.$emit("change", paramsFile, this.propName);
    }
  }
};
</script>
<style lang="less" scoped>
.uploadBox {
  display: flex;
  flex-direction: column;
}
</style>