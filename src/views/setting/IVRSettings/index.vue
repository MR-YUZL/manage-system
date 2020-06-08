<template>
    <div class="">
        <a-page-header title="语音导航设置" />
        <div class="voiceSet">
          <p>您还未开通IVR语音导航功能，请联系企蜂云专员</p>
          <P>4008363377</P>
          <img src="../../../assets/imgs/yuying.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props:{},
    data() {
        return {}
    },
    created(){},
    mounted(){},
    methods: {}
}
</script>

<style lang="less" scoped>
.voiceSet{
  width:100%;
  height:85vh;
   display:flex;
   *{
     display:block
   }
   flex-direction: column;
   justify-content: center;
   align-items: center;
   img{
    width:410px;
    height:315px;
   }
   p{
     color:#333333;
     font-size:14px;
     font-weight: 500;
   }
}
</style>
