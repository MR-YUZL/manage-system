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
      console.log(document.getElementsByClassName("image-look-monitor1"));
      let domArr = document.getElementsByClassName("image-look-monitor1");
      for (let i = 0; i < domArr.length; i++) {
        console.log(domArr[i]);
        domArr[i].addEventListener("click", function() {
          console.log(this);
          this_.$bus.$emit("imagePreview", {
            // url: this.payload.imageInfoArray[0].url
            url: this.src
          });
        });
      }
      // domArr.map(item => {
      //   item.addEventListener('click',function(){
      //     console.log(this)
      //   })
      // })
      // document
      //   .getElementById("image-look-monitor1")
      //   .addEventListener("click", function() {
      //     console.log(this.src);
      //     this_.$bus.$emit("imagePreview", {
      //       // url: this.payload.imageInfoArray[0].url
      //       url: this.src
      //     });

      //   },false);
    },
    aa() {
      console.log("清除");
    }
  }
};
</script>
