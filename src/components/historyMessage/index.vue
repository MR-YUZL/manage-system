<!--  -->
<template>
  <div class>
    <message-item v-for="message in historyList" :key="message.id" :message="message" />
  </div>
</template>

<script>
import messageItem from "./message-item";
export default {
  name: "",
  components: {
    messageItem
  },
  props:['historySessionList'],
  data() {
    return {
     
    };
  },
  computed: {
    historyList(){
      console.log('this.historySessionList',this.historySessionList)
      let arr = [...this.historySessionList]
       arr.forEach(item => {
      
         item.msgContent = typeof item.msgContent =="string" ? JSON.parse(item.msgContent)
                : item.msgContent;
              
        });
        
        console.log(arr)
        return arr.reverse()
    },
  },
  watch: {},
  //方法集合
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
</style>