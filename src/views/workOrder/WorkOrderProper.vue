<template>
    <div class="">
        <a-tabs default-active-key="1" :animated="false">
          <a-tab-pane key="1" tab="工单属性">
            <div class="workOrder">
              <div class="title"><p>工单信息</p><p><a-button type="primary" @click="modifyWorkOrder">提交</a-button></p></div>
              <ul>
                <li>
                  <span>工单编号</span>
                  <p>{{info.code}}</p>
                </li>
                <li>
                  <span>创建时间</span>
                  <p>{{info.inputTime}}</p>
                </li>
                <li>
                  <span>发起人</span>
                  <p>{{info.inputAcc}}</p>
                </li>
                <li> 
                  <span>状态</span>
                  <p>{{changeType(info.status)}}</p>
                </li>
                 <li>
                  <span>优先级</span>
                  <p> 
                    <a-select v-model="level" style="width:150px;">
                      <a-select-option :value="0">低</a-select-option>
                      <a-select-option :value="1">中</a-select-option>
                      <a-select-option :value="2">高</a-select-option>
                    </a-select>
                  </p>
                </li>
                <li> 
                  <span>受理组</span>
                  <p>{{info.receiverGroupId}}</p>
                </li>
                <li>  
                  <span>受理人</span>
                  <p>{{info.receiverAcc}}</p>
                </li>
                 <li>
                  <span>工单分类</span>
                  <p>
                    <a-cascader v-model="typeId" :options="classifyList" placeholder="请选择" style="width:200px;" />
                  </p>
                </li>
                <li v-for="(item,index) in filedValue" :key="index" >
                  <span>{{item.fieldName}}</span>
                  <p>{{item.fieldValue}}</p>
                </li>
              </ul>
              <div class="title" style="margin-top:30px;"><p>客户信息</p></div>
              <ul>
                <li>
                  <span>客户名称</span>
                  <p>{{customerInfo.custName}}</p>
                </li>
                <li>
                  <span>客户级别</span>
                  <p>{{customerInfo.custLevel}}</p>
                </li>
                <li>
                  <span>行业</span>
                  <p>{{customerInfo.custTrade}}</p>
                </li>
                <li>
                  <span>所在地区</span>
                  <p>{{customerInfo.custAreaProvince}}{{customerInfo.custAreaCity}}{{customerInfo.custAreaCounty}}</p>
                </li>
                <li>
                  <span>客户经理</span>
                  <p>{{customerInfo.custManager}}</p>
                </li>
                <li>
                  <span>详细地址</span>
                  <p>{{customerInfo.custAddress}}</p>
                </li>
                <li>
                  <span>备注</span>
                  <p>{{customerInfo.custRemarks}}</p>
                </li>
                <li>
                  <span>公司电话</span>
                  <p>{{customerInfo.custPhone}}</p>
                </li>
               </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="咨询记录">
            <div style="padding:10px;">
              <historyMessage />
            </div>
          </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import historyMessage from "@/components/historyMessage"
export default {
    name: "wor",
    components: {
      historyMessage
    },
    props:{
      workOrderId:{
        type:String,
        default:function(){
          return ''
        }
      },
      orderInfo:{
        type:Object,
        defautl:{}
      }
    },
    data() {
        return {
          info:{},
          level:'',
          typeId:[],
          customerInfo:{},
          classifyList:[],
          classify:'',
          filedValue:[],
          custId:''
        }
    },
    watch:{
      workOrderId(value){
        if(value){
          // this.getWorkOrderDetails()
          this.getCustomerList()
        }
      },
      orderInfo(){
        this.info  = this.orderInfo
        this.level = this.orderInfo.level
        this.typeId[0] = this.orderInfo.typeId
        this.filedValue = this.orderInfo.filedValue
      }
    },
    created(){
      // this.getWorkOrderDetails()
      this.getCustomerList()
      this.getClassification()
      this.info = this.orderInfo
      this.level = this.orderInfo.level
      this.typeId[0] = this.orderInfo.typeId
      this.filedValue = this.orderInfo.filedValue
    },
    mounted(){},
    methods: {
      // getWorkOrderDetails(){
      //   let params = {
      //     id:this.workOrderId
      //   }
      //   this.Request.get('/workflow/infoJson',params).then(res=>{
      //     console.log('工单信息222',res.data,'=====================')
      //     this.info = res.data.data
      //     this.level = this.info.level
      //     this.typeId[0] = this.info.typeId
      //     this.filedValue = this.info.filedValue
      //   })
      // },
      getCustomerList(){
        let params = {
          custId:''  // 工单信息中取这个值
        }
        this.Request.get('/customers/hfwCustomersInfo/infoJson',params).then(res=>{
          console.log('客户信息',res.data,'=====================')
          this.customerInfo = res.data.data
        })
      },
       // 查询分类
      getClassification(){
        this.Request.get('/config/system/findTypeListJson',{}).then(res=>{
          console.log('分类列表',res.data)
          let list = res.data.list
          this.classifyList  = this.treeChangeData(list)
        })
      },
      changeType(type){  //操作类型,0-创建，1-跟进，2-转交，3-完结，4-重启
        let obj = {
                '0':'未受理',
                '1':'受理中',
                '2':'已完成',
              }

        return obj[type]    
      },
      treeChangeData(array){
        array.map((item) => {
          item['value'] = item.id;
          item['label'] = item.name; 
          item['children'] = item.childList;
          if(item.childList.length>0){
            this.treeChangeData(item.childList);
          }
        })
        return array;
      },
      modifyWorkOrder(){
        let params = {
          level:this.level,
          typeId:this.typeId.join(',')
        }
        this.Request.post('/workflow/updateWorkflow',params).then(res=>{
            this.$message.success('修改成功')
        })
      }
    }
}
</script>

<style lang="less" scoped>
.workOrder{
   padding:20px;
  .title{
    font-size:14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width:100%;
  }
  li{
    margin-bottom:15px;
    display:flex;
    span{
      display: block;
      width:100px;
    }
    p{
      margin-bottom:0;
    }
  }
}
</style>
