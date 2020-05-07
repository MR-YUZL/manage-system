<template>
    <div class="user_data">
        <div class="header">
            <span>访客信息</span>
            <span class="save">保存为线索</span>
        </div>
        <div class="content">
            <a-row type="flex" justify="space-between" align="bottom">
                <a-col :span="10" v-for="(item,index) in userInfList" :key="index" class="item">
                    <div class="item_left">{{item.key}}</div>
                    <div class="item_right" v-if="!item.event">{{item.value}}</div>
                    <div class="item_right focus" v-else @click="actionFn(item.action)">{{item.value}}</div>
                </a-col>
            </a-row>    
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userInfList:[
                {
                    key:'名字',
                    value:'kobe',
                    event:true,
                    action:'relation'
                },
                {
                    key:'nikename',
                    value:'小飞侠',
                    event:false
                },
                {
                    key:'上次访问时间',
                    value:'范德萨发萨芬的身份',
                    event:false
                },
                {
                    key:'nikename',
                    value:'范德萨发萨芬的身份',
                    event:false
                },
                {
                    key:'名字',
                    value:'韦斯特布鲁克',
                    event:true
                },
            ]
        }
    },
    methods:{
        actionFn(val){
            console.log('事件'+val)
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
            .save{
                color:#3E7BF8;
                cursor: pointer;
            }
        }
        .content{
            .item{
               display: flex; 
               padding-top: 10px; 
               .item_left{
                   width: 40%;
               }
               .item_right{
                   width: 60%;
                   padding-left: 20px;
               }
               .focus{
                   cursor: pointer;
                   color:#3E7BF8;
               }
            }
        }
    }
</style>