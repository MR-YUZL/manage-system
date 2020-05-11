<template>
    <div class="user_data">
        <div class="header">
            <span>工单信息</span>
            <span class="save">新增工单</span>
        </div>
        <div class="content row_1" v-bind:class="{ expansion : active }">
            <a-icon :type="active ? 'up' : 'down'" class="icon" @click="showFn"/>
            <div class="content_item"  >
              <a-row type="flex" justify="space-between" align="bottom" >
                <a-col :span="20" v-for="(item,index) in userInfList" :key="index" class="item" @click="viewDetails(item)">
                  <div class="list">
                    <div class="item_left">{{item.key}}</div>
                    <div class="item_right item_1" v-if="item.status == 1">受理中</div>
                    <div class="item_right item_2" v-else-if="item.status == 2">已完结</div>
                  </div>
                </a-col>
                </a-row>  
            </div>
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
                    key:'名字safdffffasfdsafdsa股份的噶的噶阿发的所发生的',
                    status:'2',
                },
                {
                    key:'名字',
                    status:'1',
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
           
        },
        viewDetails(item){
            console.log(item,'viewDetails(item)')
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
        .row_1{
            position: relative;
            overflow: hidden;
        }
        .expansion{
           height: 40px;;
        }
        .content{
            
            // position: relative;
            
            .icon{
                position: absolute;
                right: 0;
                top: 18px;
            }
            .content_item{
                width: 93%;
                padding-top: 5px; 
                .item{
                
                    .list{
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        width: 100%;
                        
                        .item_left{
                            min-width: 0px;
                            overflow: hidden;
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #6D97F9;
                        }
                        .item_right{
                            padding:0 5px;
                            -ms-flex-negative: 0;
                            flex-shrink: 0;
                            text-align: right;
                            border: 1px solid #D3D3D3;
                            
                        }
                        .item_1{
                            color: #F8A28B;
                        }
                        .item_2{
                            color: #8BD6B8;
                        }
                    }
                display: flex; 
                padding-top: 12px; 
                
                
                }
            }
            
        }
    }
</style>