<template>
    <div class="accessInf">
        <div class="header">
          <span class="accessIcon">访问信息</span>
        </div>
        <div class="accessInf_item">
            <ul>
              <li>
                <span>接入来源</span>
                <p>adsfadsfa</p>
              </li>
              <li>
                <span>来源终端</span>
                <p>dasfasdfasdf来源终端</p>
              </li>
               <li>
                <span>地域&ip地址</span>
                <p></p>
              </li>
               <li>
                <span>发起咨询页</span>
                <p></p>
              </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          
            

        }
    },
   
    mounted(){
      
    },
    components:{
       
    },
    methods:{
      
     
    }
}
</script>
<style lang="less" scoped>
    .accessInf{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            .setting{
              color:#3E7BF8;
              cursor: pointer;
            }
            .accessIcon{
              padding-left:26px;
              background:url('../../assets/imgs/tips.png') left center no-repeat;
            }
        }
        .accessInf_item{
          padding-top: 15px;
          li{
            display: flex;
            margin-bottom:15px;
            span{
              display:block;
              width:90px;
            }
            p{
              margin-bottom:0;
            }
          }
        }
    }
</style>