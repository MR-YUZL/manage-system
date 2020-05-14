<!-- 近期通话 -->
<template>
<div class='recentCalls'>
    <div v-for="(item,index) in recentCallsList" :key="index" class="recentCalls_item" @click="selectCallInf(index)" :class="{ 'choose': index == select }">
        <div><span>{{item.tel}}({{item.address}})</span><span>{{item.time}}</span></div>
        <div><span>{{item.name}}</span><span>{{item.timeLong}}</span></div>
        <div><span>{{item.type}}</span><span :class="item.callType == 1 || item.callType == 3 ? 'received':'missed'">{{item.callType== 1 ? '已接来电' : item.callType== 2 ? '未接来电' : '未接去电'}}</span></div>
    </div>
</div>
</template>

<script>

export default {
    name:'recentCalls',
    components: {},
    data() {
        return {
            select:0,
            recentCallsList:[
                {
                    tel:'122221212',
                    address:'杭州',
                    time:'2019 10:82',
                    timeLong:'00 :35:00',
                    type:'ivr导航',
                    callType:1
                },
                {
                    tel:'122221212',
                    address:'杭州',
                    time:'2019 10:82',
                    timeLong:'00 :35:00',
                    type:2,
                    callType:2
                },
            ]
        };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
        //获取通话列表
        getRecentCallsList(){
             this.Request.get('hfw/workbench/getCallRecords').then(res => {
                console.log('获取常用语',res.data)
                //   if(res.data.status){

                //   }
            }) 
        },
        selectCallInf(index){
            this.select = index
        }
    },
   
    mounted() {
        this.getRecentCallsList()
    },
}
</script>
<style lang='less' scoped>
    .recentCalls{
        .recentCalls_item{
            padding: 10px;
            cursor: pointer;
            div{
                display: flex;
                justify-content: space-between;
                padding: 2px 0;
                .received{
                    color: #CCCCCC;
                }
                .missed{
                    color: #F9764A;
                }
            }
        }
        .choose{
            background: #EDEDED;
        }
    }
</style>