<template>
  <div v-if="show">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "TabPane",
    data(){
      return {
        show: false //初始时将所有内容隐藏
      }
    },
    props:{
      actKey:{
        type: String,
        default: "1"
      }, label:{
        type: String,
        default: ""
      },
    },
    mounted(){
      this.$parent.updateNav();
    },
  }
</script>
