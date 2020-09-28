<template>
  <message-bubble :isMine="isMine" :message="message" :infoObj="infoObj">
    <div v-html="payload.text"></div>
  </message-bubble>
</template>

<script>
import MessageBubble from "../message-bubble";
export default {
  components: {
    MessageBubble
  },
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
      type: Object
    }
  },
  computed: {},
  mounted() {
    this.handlePreview();
  },
  methods: {
    handlePreview() {
      let this_ = this;
      let domArr = document.getElementsByClassName("image-look-monitor");
      for (let i = 0; i < domArr.length; i++) {
        domArr[i].addEventListener("click", function() {
          this_.$bus.$emit("imagePreview", {
            // url: this.payload.imageInfoArray[0].url
            url: this.src
          });
        });
      }
    },
  }
};
</script>
