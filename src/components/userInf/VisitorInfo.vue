<template>
    <div class="user_data">
        <div class="header">
            <span class="titleH5"> 访客信息</span>
            <span class="save" @click="saveClue">保存为线索</span>
        </div>
        <div class="visitorInfo">
          <ul>
            <li>
              <span>所属客户</span>
              <p class="blue" @click="relatedCustomers">关联客户</p>
            </li>
            <li>
              <span>访客名称</span>
              <p >{{vistorInfoObj.name}}</p>
            </li>
            <li>
              <span>地区</span>
              <p >{{vistorInfoObj.country}}</p>
            </li>
            <li>
              <span>上次访问时间</span>
              <p >{{vistorInfoObj.lastServiceAcc}}</p>
            </li>
             <li>
              <span>上次接待时间</span>
              <p >{{vistorInfoObj.lastServiceTime}}</p>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:{
      vistorInfoObj:{
        type:Object
      }
    },
    data(){
        return{
        }
    },
    methods:{
        actionFn(val){
            console.log('事件'+val)
        },
        saveClue(){
          this.$emit('saveClue')
        },
        relatedCustomers(){
          this.$emit('relatedCustomers')
        }
    }
}
</script>
<style lang="less" scoped>
  .user_data{
    padding:20px;
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom:25px;
        .save{
            color:#3E7BF8;
            cursor: pointer;
            background:url("../../assets/imgs/bianqian.png") left center no-repeat;
            padding-left:35px;
        }
        .titleH5{
          background:url('../../assets/imgs/ly-user.png') left center no-repeat;
          padding-left:25px;
        }
    }
    .visitorInfo{
      li{
        color:#333333;
        display:flex;
        width:350px;
        flex-wrap:wrap;
        margin-bottom:15px;;
        span{
          display: block;
          width:150px;
        }
        p{
          margin-bottom:0;
        }
      }
    }
  }
</style>