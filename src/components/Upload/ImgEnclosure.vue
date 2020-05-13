<template>
  <div>
    <div v-if="accessoryArr.length>0">
      <div class="checkFile" v-for="(item,index) in accessoryArr" :key="index">
        <span v-if="isPicture(item.name)">
          {{item.name}}
          <a :href="item.url" target="_blank">查看</a>
          <a href="javascript:;" download="下载" @click="downloadImgByBlob(item.url,item.name)">下载</a>
        </span>
        <span v-else>
          {{item.name}}
          <a :href="item.url" download>下载</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgEnclosure",
  components: {},
  props: {
    accessoryArr: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    isPicture(name) {
      console.log(name);
      let tempArr = name.split(".");
      let tempArrLength = tempArr.length;
      let fileType = tempArrLength ? tempArr[tempArrLength - 1].toLowerCase() : "";
      if (fileType == "jpg" || fileType == "jpeg" || fileType == "png" || fileType == "gif") {
        return true;
      } else {
        return false;
      }
    },
    downIamge(imgsrc, name) {
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL();
        let a = document.createElement("a");
        let event = new MouseEvent("click");
        a.download = name;
        a.href = url;
        a.dispatchEvent(event);
      };
      image.src = imgsrc;
    },
    downloadImgByBlob(url, name) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为Blob
        canvas.toBlob(blob => {
          // blob转为同源url
          var blobUrl = window.URL.createObjectURL(blob);
          // 创建a链接
          var a = document.createElement("a");
          a.href = blobUrl;
          a.download = name;
          // 触发a链接点击事件，浏览器开始下载文件
          a.click();
        });
      };
      img.src = url;
      // 必须设置，否则canvas中的内容无法转换为blob
      img.setAttribute("crossOrigin", "Anonymous");
    }
  }
};
</script>
<style lang="less" scoped>
.checkFile {
  background: #f7f8fa;
  // padding:5px;
  // width:780px;
  a {
    color: #3f7bf5;
    padding: 5px;
  }
}
</style>
