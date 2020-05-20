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
                 {
                    tel:'122221212',
                    address:'杭州',
                    time:'2019 10:82',
                    timeLong:'00 :35:00',
                    type:2,
                    callType:2
                },
                 {
                    tel:'122221212',
                    address:'杭州',
                    time:'2019 10:82',
                    timeLong:'00 :35:00',
                    type:2,
                    callType:2
                },
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
              
                 {
                    tel:'122221212',
                    address:'杭州',
                    time:'2019 10:82',
                    timeLong:'00 :35:00',
                    type:2,
                    callType:2
                },
                 {
                    tel:'122221212',
                    address:'杭州11111',
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
                console.log(res.data)
                //   if(res.data.status){
                    // this.recentCallsList = res.data.list
                    // this.callType
                    this.$store.commit('getCallStatus',{id:1,status:1})
                //   }
            }) 
        },
        selectCallInf(index){
            this.select = index
            let obj = {
                id:this.recentCallsList[index].id,
                status:this.recentCallsList[index].status
            }
            this.$store.commit('getCallStatus',obj)
        }
    },
   
    mounted() {
        console.log('近期通话')
        this.getRecentCallsList()
    },
}
</script>
<style lang='less' scoped>
    .recentCalls{
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
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