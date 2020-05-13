<template>
  <!-- 访客信息，访客标签，工单信息，访问信息，服务小结整合 -->
  <div class="userInformation">
    <visitor-info ref="visitorInfo" :vistorInfoObj="visitorInfoData" :relateRedio="relateRedio" @handleSaveClueOk="handleSaveClueOk" @handleRelatedCusOk="handleRelatedCusOk" @onRelatedCusSearch="relateSearchKey"/>
    <Tags :tags="tagsList" :selectTagList="selectTagList"  @submitTags="submitTags"/>
    <AccessInfo />
    <OrderInf :userInfList="userInfList"/>
    <ServiceSummary :questionList="questionList" />
    <!-- <ServiceSummary /> -->
  </div>
</template>

<script>
import AccessInfo from './AccessInfo'
import VisitorInfo from './VisitorInfo'
import Tags from './Tags'
import OrderInf from './OrderInf'
import ServiceSummary from './ServiceSummary'
export default {
    name: "",
    components: {
      VisitorInfo,
      Tags,
      AccessInfo,
      OrderInf,
      ServiceSummary
    },
    props:{
      guestId:{  // 访客id
        type:String,
        default:''
      }
    },
    data() {
      return {
        visitorInfoData:{},
        tagsList:[],
        selectTagList:[],
        relateRedio:[], // 关联客户rediolist
        questionList:[],//客服小结
        userInfList:[],//工单信息
        realteCustParams:{// 关联客户的参数
          guestId:'',
          custId:''
        },
      }
    },
    watch:{
      guestId(value,old){
        console.log('aa',value,'bb',old,'===============')
        if(value){
          this.getVisitorInfo()
          this.getTags()
          this.getWorkOrderList()
          this.getServiceList()
        }
      }
    },
    created(){
      this.getSelectTags()
    },
    mounted(){
      if(this.guestId!==''){
        this.getVisitorInfo()
        this.getTags()
        this.getWorkOrderList()
        this.getServiceList()
      }
    },
    methods: {
      getVisitorInfo(){
        this.Request.get('/hfw/workbench/getGuestInfo?guestId='+this.guestId).then(res => {
          console.log('访客信息',res.data)
          this.visitorInfoData = res.data.data
        })   
      },
      handleSaveClueOk(formData){
        console.log(formData)
        let params = {
          guestId:this.guestId,
          ...formData
        }
        //字段查重
        // this.Request.post('/hfw/workbench/clueCensor',{checkKey:'22',type:'1'}).then(res => {
        //   console.log(res)
        // })

        this.Request.post('/hfw/workbench/saveClue',{...params}).then(res => {
          console.log('标签tags',res.data)
          this.tagsList = res.data.data
             this.$refs.visitorInfo.saveClueModal = false
        })
        // 关闭保存为线索的弹窗
        // this.$refs.visitorInfo.saveClueModal = false
      },
      handleRelatedCusOk(custId){
        console.log('this.custId',custId,'===============')
        this.realteCustParams.guestId = this.guestId
        this.realteCustParams.custId = custId
        this.Request.post('/hfw/workbench/associatedCustomers',{...this.realteCustParams}).then(res => {  // 关联客户Ok
          console.log('提交客户关联',res.data)
          this.$refs.visitorInfo.relatedCusModal = false
          this.relateRedio = []
        }) 
      },
      relateSearchKey(relateSearchKey){
        console.log('=====================',relateSearchKey)
        this.relateRedio = []
        this.Request.get('/hfw/workbench/blurMatchCustName?matchKey='+relateSearchKey).then(res => {
          let data = res.data.list
          if(data.length>0){
            this.relateRedio = data
          }
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
          if(data.length>0){
            data.map((item)=>{
              this.selectTagList.push({
                key:item.id,
                value:item.name,
              })
            })
          }
         
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
        obj.tag.map( item => {
          params.tagIds.push(item.key)
        })
        this.Request.post('/hfw/workbench/saveGuestLabel',{...params}).then(res => {
          console.log('标签selectTags',res.data)
          this.getTags()
        })
      },
      // 获取工单信息
      getWorkOrderList(){
        this.Request.post('/hfw/workbench/getWorkFlowInfo?guestId=' + this.guestId).then(res => {
          console.log('工单信息',res.data.list)
          this.userInfList = res.data.list
        })
      },
      //获取服务小结
      getServiceList(){
        this.Request.post('/hfw/workbench/getServiceSummary?guestId=' + this.guestId).then(res => {
          console.log('服务小结',res.data.list)
          this.questionList = res.data.list
        })
      },
    }
}
</script>

<style lang="less" scoped>
  .relateCus{
    margin:10px 0 0 15px;
  }
</style>
<style lang="less">
  .saveClue .ant-form-item{
    margin-bottom:15px;
  }
</style>
