<template>
  <div class="userInf">
    <div class="content">
        <div class="left">
            <img :src="require('./../../../../assets/imgs/current_session/app.png')" alt="">
            <div class="user" @click="userInf">
                <div class="name">科比布莱恩特dddd</div>
                <span></span>
                <a-icon :type="isShow ? 'down' : 'up'" class="icon"/>
            </div>
            <div class="time">当前会话时长：{{'50分16秒'}}</div>
        </div>
        
        <div class="right">
            <span @click="transfer">转接</span>
            <span @click="newAddOrder">新增工单</span>
            <span @click="endServer">结束服务</span>
        </div>
    </div>
    <div v-if="isShow" class="information">
        <visitor-info ref="visitorInfo" :vistorInfoObj="visitorInfoData" :relateRedio="relateRedio" @handleSaveClueOk="handleSaveClueOk" @handleRelatedCusOk="handleRelatedCusOk" @onRelatedCusSearch="relateSearchKey"/>
        <Tags :tags="tagsList" :selectTagList="selectTagList"  @submitTags="submitTags" />
      
    </div>
    <Modal  :currentModal="currentModal" @toggleModal="toggleModal" v-if="currentModal.visible">
        <template slot="content">
            <base-form :formObject="currentModal" @toggleModal="toggleModal" @formSubmit="formSubmit" v-if="currentModal.visible" />
        </template>
        
    </Modal>
  </div>
</template>

<script>
import VisitorInfo from './../../../../components/userInf/VisitorInfo'
import Tags from './../../../../components/userInf/Tags'
import Modal from './../../../../components/Modal'
import baseForm from './../../../../components/BaseForm/BaseFrom'

export default {
  data: () => ({
    isShow:false,
    visitorInfoData:'',
    serviceAcc:'',//客服账号
    arr:[],
    relateRedio:[], // 关联客户rediolist
    selectTagList:[],
    tagsList:[],
    currentModal:{},
    endServerObj:{
      title:'结束服务',
      visible:false,
      ref:'endServer',
      type :'modalForm',
      modelList:[
        {
          type:'cascader',
          ruleName:'cascader',
          label:'咨询分类',
          placeholder:'请选择',
          model:undefined,
          ruleName:'consultId', 
          fieldNames:{label: 'name', value: 'id', children: 'childrens'},
          options:[] ,
          rules:{
            required: true,
            message: '请选择咨询分类',
            trigger: 'change',
          }
        },
        {
          type:'select',
          label:'问题解决',
          placeholder:'请选择',
          model:undefined,
          ruleName:'status', 
          options:[{key:'1',value:'已解决'},{key:'0',value:'未解决'}],
          rules:{
            required: true,
            message: '请选择问题解决',
            trigger: 'change',
          }
        },
        {
          type:'textarea',
          label:'文本框',
          model:'',
          ruleName:'advisoryRemark'
        },
      ],
    },

    transferObj:{
      title:'转接',
      visible:false,
      ref:'transfer',
      type :'modalForm',
      width:'500px',
      
      modelList:[
        {
          type:'cascader',
          label:'指定客服人员',
          placeholder:'请选择',
          model:undefined,
          ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          options:[],
          fieldNames:{label: 'text', value: 'id', children: 'children'},
          rules:{
            required: true,
            message: '请指定客服人员',
            trigger: 'change',
          }
        }
      ],
    },
     modelObj1:{
              title:'新增',
              visible:false,
              ref:'model',
              modelList:[
          
              {
                  type:'input',
                  label:'工单标题',
                  model:'',
                  ruleName:'title',
                  placeholder:'请输入',
                  rules:{
                    required: true,
                    message: '请输入工单标题',
                    trigger: 'blur',
                  }
              },
                {
                  type:'upload',
                  label:'工单内容',
                  ruleName:'content',
                  action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',//配置文件上传路径
                  placeholder:'请输入',
                  model:'',
                  rules:{
                    required: true,
                    message: '请输入工单内容',
                    trigger: 'blur',
                  }
              },
               {
                  type:'radio',
                  label:'工单优先级',
                  model:'1',
                  ruleName:'radio',
                  options:[{key:'1',value:'低'},{key:'2',value:'中'},{key:'3',value:'高'}],
                  rules:{
                    required: true,
                    message: '请选择工单优先级',
                    trigger: 'blur',
                  }
              },
              {
                  type:'select',
                  label:'工单受理组',
                  placeholder:'请选择',
                  model:undefined,
                  ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
                  options:[{key:'r',value:'111'},{key:'y',value:'222'}],
                  rules:{
                    required: true,
                    message: '请选择工单受理组',
                    trigger: 'change',
                  }
              },
               {
                  type:'select',
                  label:'工单受理人',
                  placeholder:'请选择',
                  model:undefined,
                  ruleName:'receiverAcc', //receiverAcc 工单受理人账号
                  options:[{key:'c',value:'111'},{key:'d',value:'222'}],
                  rules:{
                    required: true,
                    message: '请选择工单受理人',
                    trigger: 'change',
                  }
              },
               {
                  type:'select',
                  label:'工单分类',
                  placeholder:'请选择',
                  model:undefined,
                  ruleName:'typeId', //typeId 分类id
                  options:[{key:'111',value:'111'},{key:'222',value:'222'}],
              
              },
                 {
                  type:'select',
                  label:'关联客户',
                  placeholder:'请选择',
                  model:undefined,
                  ruleName:'receiverAcc', //receiverAcc 工单受理人账号
                  options:[{key:'a',value:'111'},{key:'b',value:'222'}],
                  rules:{
                    required: true,
                    message: '请选择工单关联客户',
                    trigger: 'change',
                  }
              },
            
            ]
          },
  }),
  components: {
    VisitorInfo,
    Tags,
    Modal,
    baseForm
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
      //新增工单
      newAddOrder(){
         this.modelObj1.visible = true 
         this.currentModal = this.modelObj1
    
      },
      toggleModal(data){
        console.log(data)
       this.currentModal = {}
       switch(data.ref){
          case 'transfer':
            this['transferObj']['visible'] = data.visible
            break;
          case 'endServer':
             this['endServerObj']['visible'] = data.visible
             break;
          
        }
   },
   formSubmit(data){
       console.log(data)
       this.currentModal = {}
       let url = ''
       let obj = data.obj
       switch(data.ref){
          case 'transfer':
             this['transferObj']['visible'] = data.visible
             obj = {
               serviceAcc: obj.receiverGroupId[obj.receiverGroupId.length - 1],
               sessionId:''
             }
             url = '/session/transfer/to'
             break; 
           case 'endServer':
             this['endServerObj']['visible'] = data.visible
             let [firstConsuleId,secondConsuleId,threeConsuleId] = obj.consuleId
             obj.firstConsuleId = firstConsuleId
             obj.secondConsuleId = secondConsuleId
             obj.threeConsuleId = threeConsuleId
             delete obj.consuleId
             obj = {
               sessionId:'',
               status:obj.status,
               advisoryRemark:obj.advisoryRemark
             }
             url = '/session/end'
             break;      
        }
      
      
        console.log(obj)
        this.Request.post(url,obj).then(res => {
            if(res.data.status){
                 this.$message.success('操作成功！');
            }
        })
   },
      //转接
      async transfer(){
        let obj = {
          sessionId:1
        }
        let result = await this.Request.get('/session/transfer/service/acc/search',obj)
        // if(result.data.status){
        //   if(result.data.list.length){
            this.getCustomer()
            this['transferObj']['visible'] = true 
            this.currentModal = this.transferObj
        //   }else{
        //     this.$message.warning('当前没有其他客服在线，无法转接！');
        //   }
          
        // }else{
        //   this.$message.warning(result.data.msg);
        // }
     
      },
     
      //获取客服列表
      getCustomer(){
        this.Request.get('/session/transfer/tree/info').then(res => {
          let re = res.data
          if(re.status){
            // let result = this.recursion(re.list)
            this.transferObj.modelList[0].options = re.list
      
          }
        
        })
      },
      //递归客户列表
      recursion(list,index){
        // console.log(list)
        let arr = list
        let obj = {}
        list.map((item,index) =>{
        
          if(item.state == "closed"){
            item.value = item.id
            item.label = item.text
            delete item.id
            delete item.text
            
          
            this.recursion(item.children,index)
          }
          else{
            item.value = item.id
            item.label = item.text
            delete item.id
            delete item.text
          }
        })
         return arr
      },
      //结束服务
      endServer(){
        this.getSummarySort()
        this.endServerObj.visible = true 
        this.currentModal = this.endServerObj
      },
      getSummarySort(){
        this.Request.get('/hfw/workbench/getSummarySort').then(res => {
          let re = res.data
          if(re.status){
            console.log(re)
            this.endServerObj['modelList'][0]['options'] = re.list
           
      
          }
        
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
              width: calc(100% - 200px);
                display: flex;
                align-items: center;
                img{
                    width: 22px;
                    height: 22px;
                    
                }
                .user{
                  display: flex;
                  align-items: center; 
                  width: calc(100% - 400px);
                  max-width: 120px;
                  position: relative;
                  cursor: pointer;
                  .name{
                    min-width: 20px;
                    overflow: hidden;
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .icon{
                    position: absolute;
                    right: -25px;
                  }
                }
                
                .time{
                    margin-left: 70px;
                    white-space: nowrap;
                }
            }
            .right{
                span{
                    margin: 0 10px;
                    color: #3E7BF8;
                    border-bottom: 1px solid #3E7BF8;
                    cursor: pointer;
                    white-space: nowrap;
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
