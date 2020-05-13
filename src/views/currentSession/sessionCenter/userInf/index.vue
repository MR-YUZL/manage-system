<template>
  <div class="userInf">
    <div class="content">
        <div class="left">
            <img :src="require('./../../../../assets/imgs/current_session/app.png')" alt="">
            <div class="user" @click="userInf">
                <div class="name">科比布莱恩特dddd</div>
                <a-icon :type="isShow ? 'down' : 'up'" class="icon"/>
            </div>
            <div class="time">当前会话时长：{{'5分6秒'}}</div>
        </div>
        
        <div class="right">
            <span>转接</span>
            <span >新增工单</span>
            <span >结束服务</span>
        </div>
    </div>
    <div v-if="isShow" class="information">
        <visitor-info ref="visitorInfo" :vistorInfoObj="visitorInfoData" :relateRedio="relateRedio" @handleSaveClueOk="handleSaveClueOk" @handleRelatedCusOk="handleRelatedCusOk" @onRelatedCusSearch="relateSearchKey"/>
        <Tags :tags="tagsList" :selectTagList="selectTagList"  @submitTags="submitTags" />
        <!-- <access-info />
        <order-inf />
        <service-summary /> -->
    </div>
  </div>
</template>

<script>
import VisitorInfo from './../../../../components/userInf/VisitorInfo'
import Tags from './../../../../components/userInf/Tags'
// import AccessInfo from './../../../../components/userInf/AccessInfo'
// import orderInf from './../../../../components/userInf/OrderInf'
// import ServiceSummary from './../../../../components/userInf/ServiceSummary'
export default {
  data: () => ({
    isShow:false,
    visitorInfoData:'',
    relateRedio:[], // 关联客户rediolist
    selectTagList:[],
    tagsList:[]
  }),
  components: {
    VisitorInfo,
    Tags,
    // AccessInfo,
    // orderInf,
    // ServiceSummary
  },
  mounted() {
    
  },
  methods: {
    userInf(){
        this.isShow = !this.isShow
    },
     getVisitorInfo(){
        this.Request.get('/hfw/workbench/getGuestInfo?guestId='+this.guestId).then(res => {
          console.log('访客信息',res.data)
          this.visitorInfoData = res.data.data
        })   
    },
    handleSaveClueOk(){
        // 关闭保存为线索的弹窗
        this.$refs.visitorInfo.saveClueModal = false
      },
      handleRelatedCusOk(con){
        console.log('this.relateValue',con,'===============')
        this.Request.get('/hfw/workbench/associatedCustomers?matchKey='+con).then(res => {
          console.log('提交客户关联',res.data)
        }) 
      },
      relateSearchKey(relateSearchKey){
        console.log('=====================',relateSearchKey)
        this.Request.get('/hfw/workbench/blurMatchCustName?matchKey='+relateSearchKey).then(res => {
          console.log('模糊搜索',res.data)
        }) 
      },
       //获取tags  参数  guestId  访客id
      getTags(){
        this.Request.get('/hfw/workbench/getGuestLabel?guestId='+this.guestId).then(res => {
          console.log('标签tags',res.data)
          this.tagsList = res.data.data
        })
      },
      //访客设置标签时获取单位下所有维护的访客标签
      getSelectTags(){
        this.Request.get('/hfw/workbench/getAllGuestLabel').then(res => {
          let data = res.data.list
          data.map((item)=>{
            this.selectTagList.push({
              key:item.id,
              value:item.name,
            })
          })
          console.log('所有标签',data)
        })
      },
      submitTags(data){
        console.log('提交的数据',data)
        let obj = data
        let params = {
          guestId:this.guestId,
          tagIds:[]
        }
        obj.selectedTags.map( item => {
          params.tagIds.push(item.key)
        })
        this.Request.post('/hfw/workbench/saveGuestLabel',{...params}).then(res => {
          console.log('标签selectTags',res.data)
          this.getTags()
        })
      },
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
    .userInf{
       .content{
           line-height: 45px;
           display: flex;
            justify-content: space-between;
            border: 1px solid #E7E7E8;
            padding: 0 0 0 10px;
            background: #FFFFFF;
            .left{
                display: flex;
                align-items: center;
                img{
                    width: 22px;
                    height: 22px;
                    
                }
                .user{
                  display: flex;
                  align-items: center; 
                  cursor: pointer;
                  .name{
                      min-width: 0px;
                      max-width: 82px;
                      overflow: hidden;
                      -webkit-box-flex: 1;
                      -ms-flex: 1;
                      flex: 1;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      margin-left: 5px;
                  }
                }
                
                .time{
                    margin-left: 20px;
                }
            }
            .right{
                span{
                    margin: 0 10px;
                    color: #3E7BF8;
                    border-bottom: 1px solid #3E7BF8;
                    cursor: pointer;
                }
            }
       }
       .information{
           position: relative;
           z-index:  10;
           background: white;
           padding-bottom: 20px;
           box-shadow: 0 5px 10px rgba(51, 51, 51, .25);
       }
    }
</style>
