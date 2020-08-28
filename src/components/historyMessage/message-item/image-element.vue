<template>
  <message-bubble :isMine='isMine' :message="message" :infoObj="infoObj">
     <!-- el-image在IE下会自动加上用于兼容object-fit的类，该类的样式在没设置图片宽高是会 GG -->
    <img class="image-element" :src="imageUrl" @load="onImageLoaded" @click="handlePreview" />
    <a-progress
      v-if="showProgressBar"
      :percent="percentage"
      :color="percentage => (percentage === 100 ? '#67c23a' : '#409eff')"
    />
  </message-bubble>  
</template>

<script>
import MessageBubble from '../message-bubble'
import { mapGetters } from 'vuex'
export default {
  name: 'ImageElemnt',
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    },
    infoObj: {
      type:Object
    }
  },
  components: {
    MessageBubble,
    
  },
  computed: {
    ...mapGetters(['imgUrlList']),
    imageUrl() {
      const url = this.payload.ImageInfoArray[0].URL
      if (typeof url !== 'string') {
        return ''
      }
      return url.slice(0, 2) === '//' ? `https:${url}` : url
    },
    showProgressBar() {
      return this.$parent.message.status === 'unSend'
    },
    percentage() {
      return Math.floor((this.$parent.message.progress || 0) * 100)
    }
  },
  methods: {
    onImageLoaded(event) {
      this.$bus.$emit('image-loaded', event)
    },
    handlePreview() {
      this.$bus.$emit('imagePreview', {
        url: this.payload.ImageInfoArray[0].URL
      })
    }
  }
}
</script>

<style lang="less" scoped>
.image-element {
  max-width: 250px;
  cursor : zoom-in
}
  

</style>
