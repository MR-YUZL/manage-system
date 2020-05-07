<template>
    <div class="user_data">
        <div class="header">
            <span>访客信息</span>
            <span class="save">新增工单</span>
        </div>
        <div class="content">
            <a-row type="flex" justify="space-between" align="bottom">
                <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn"/>
                <a-col :span="10" v-for="(item,index) in userInfList" :key="index" class="item">
                    <div class="list">
                        <div class="item_left">{{item.key}}</div>
                        <div class="item_right" v-if="item.status == 1">受理中</div>
                        <div class="item_right" v-else-if="item.status == 2">已完结</div>
                    </div>
                </a-col>
            </a-row>    
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:false,
            userInfList:[
                {
                    key:'名字',
                    status:'2',
                },
                {
                    key:'nikename',
                    status:'1',
                },
                {
                    key:'上次访问时间',
                    status:'1',
                },
                {
                    key:'nikename',
                    status:'2',
                },
                {
                    key:'名字',
                    status:'1',
                },
            ]
        }
    },
    methods:{
         showFn(){
            
            this.active = !this.active
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
            width: 93%;
            position: relative;
            .item{
                
                .list{
                    display: flex;
                    cursor: pointer;
                    
                    .item_left{
                        min-width: 0px;
                        overflow: hidden;
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .item_right{
                        padding-left: 10px;
                        -ms-flex-negative: 0;
                        flex-shrink: 0;
                        text-align: right;
                    }
                }
               display: flex; 
               padding-top: 10px; 
               
               
            }
        }
    }
</style>