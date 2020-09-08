<template>
    <div class="newsCenter">
      <a-page-header title="消息中心" style="padding:16px 16px;" />
      <div class="newsList">
        <ul v-if="newsList.length">
          <li v-for="(item,index) in  newsList" :key="index">
            <div class="flex"><h5>{{item.title}}</h5><span style="color:#9f9f9f">{{item.sendTime}}</span></div>
            <p>{{item.msgCenterContent}}</p>
          </li>
        </ul>
        <div class="noData" v-else>
          <img src="./../../assets/imgs/noData.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {}, 
    props:{},
    data() {
      return {
        newsList:{}
      }
    },
    created(){},
    mounted(){
      this.getNewsList()
    },
    methods: {
      getNewsList(){
       //sms/hfwMessageCenter/listPageJson
        this.Request.get('/sms/hfwMessageCenter/listPageJson').then(res=>{
          console.log('消息列表',res.data)
          this.newsList = res.data.list
        })
      }
    }
}
</script>

<style lang="less" scoped>
.newsCenter{
  background:#f1f2f5;min-height:100vh
}
.newsList{
  margin:10px;
  padding:20px 15px;
  background:#fff;  
  color:#404040;
  li{
    padding:0 15px;
    padding-bottom:0px;
    width:100%;
    padding-bottom:20px;
    border-bottom:1px solid #dedede;
    position: relative;
    .flex{
      display:flex;
      justify-content: space-between;
      height:40px;
      line-height:40px;
      margin-top:10px;
      h5{
        font-size:14px;
      }
      span{
        display: block;
        color:#999;
      }
    }
    p{
      margin:0;
      padding:0;
      line-height:22px;
      font-size:12px;
    }
  }
  li:after{
    position: absolute;
    left:0;
    top:17px;
    content:'';
    width:5px;
    height:5px;
    background:#3e7bf8;
    border-radius:50%;
  }
  .noData{
    text-align: center;
  }
}
</style>
