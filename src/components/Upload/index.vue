<template>
  <div class="uploadBox">
    <a-upload
      name="file"
      action="/fileupload/upload"
      :multiple="true"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :fileList="fileList"
      :accept="accept"
    >
      <a-button v-if="fileList.length < maxFiles">
        <a-icon type="upload" />上传文件
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
      fileList: [],
      accept: ".doc,.docx,.xls,.xlsx,.pdf,.png,.jpg",
      maxFiles: 5
    };
  },
  watch: {
    list(val, oldVal) {
      console.log(val, oldVal, "watch======");
      // debugger;
      // if(JSON.stringify(val) != JSON.stringify(oldVal)){
      //   this.updateDefaultFileList(val);
      // }
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
    },
    uploadParams: {
      type: Object
    }
  },
  created() {
    this.updateDefaultFileList(this.list);
    if(this.uploadParams && this.uploadParams["accept"]) {
      this.accept = this.uploadParams["accept"]
    }
    if(this.uploadParams && this.uploadParams["maxFiles"]) {
      this.maxFiles = this.uploadParams["maxFiles"]
    }
  },
  mounted() {
    this.$emit("change", this.defaultFileList);
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      let fileType = file.name.split(".").pop();
      const acceptFile = (this.accept.indexOf(fileType) > -1)
      if(!acceptFile) {
        this.$message.error("文件格式只支持"+this.accept);
      }
      if (!isLt2M) {
        this.$message.error("文件大小不超过2MB！");
      }
      return isLt2M && acceptFile;
    },
    updateDefaultFileList(list) {
      let tempList = [];
      list && list.length && list.map((item, index) => {
        if(item) {
          let temp = {
            uid: item.fileId?item.fileId:index,
            url: item.url,
            name: item.name?item.name:item.fileName
          };
          tempList.push(temp);
        }
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
        if(file.url && file.name) {
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