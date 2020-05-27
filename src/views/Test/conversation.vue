<!-- 会话页 -->
<template>
    <div class='conversation'>
        
    </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid';
export default {
name:'',
components: {},
data() {
    return {
        getNavigationList:[],
        getNavigationStatus:false,
        uuid:'',
    };
},
computed: {},
watch: {},
//方法集合
methods: {
    setLocalStorage(){
        let str = uuidv1()
        localStorage.setItem(this.$route.query.url,str.replace(/-/g,''))
    },
    getNavigation(){
        let params = {
            orgId:'880b29c1dae1463ab411e42bac8cdaad',
            channelId:'afdb8a0e562c4c0085d4d135216f2c80',
            guestId:this.uuid
        }
        this.Request.get('/guest/session/question/list',params).then(res => {
            console.log(res)
            if(res.data.status){
                this.getList = res.data.list;
                this.getNavigationStatus = res.data.webNavigationFlag
            }
        })
    },
    customerService(){
        let params = {
            orgId:'880b29c1dae1463ab411e42bac8cdaad',
            channelId:'afdb8a0e562c4c0085d4d135216f2c80',
            guestId:this.uuid,
            questionId:'',   //咨询问题ID
            newGuestFlag:1   //是否是新访客, 1新访客, 0旧访客
        }
        this.Request.get('/guest/session/service/acc/assign',params).then(res => {




            
            console.log(res.data)
            if(res.data.status){
                
            }
        })
    },
    createIM(){
        let params = {
            orgId:'880b29c1dae1463ab411e42bac8cdaad',
            channelId:'afdb8a0e562c4c0085d4d135216f2c80',
            guestId:this.uuid
        }
        this.Request.get('/guest/session/im/account/create',params).then(res => {
            console.log(res.data)
            if(res.data.status){
                
            }
        })

    },
    createSig(){
        let params = {
            orgId:'880b29c1dae1463ab411e42bac8cdaad',
            imAccount:'',
            imPassword:''
        }
        this.Request.get('/guest/session/im/query/user/sig',params).then(res => {
            console.log(res.data)
            if(res.data.status){
                
            }
        })
    }
},
created() {
    
},
mounted() {
    if(localStorage.getItem(this.$route.query.url)){
         this.uuid = localStorage.getItem(this.$route.query.url)
    }else{
        this.setLocalStorage()
        this.uuid = localStorage.getItem(this.$route.query.url)
    }
    // this.getNavigation()
    // this.customerService()
    this.createIM()
   
},
}
</script>
<style lang='less' scoped>

</style>