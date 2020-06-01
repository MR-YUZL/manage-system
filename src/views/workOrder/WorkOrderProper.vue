<template>
    <div class="">
        <a-tabs default-active-key="1" :animated="false">
          <a-tab-pane key="1" tab="工单属性">
            <div class="workOrder">
              <div class="title"><p>工单信息</p><p><a-button type="primary">提交</a-button></p></div>
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
                    <a-select v-model="level" default-value="低" style="width:150px;">
                      <a-select-option value="0">低</a-select-option>
                      <a-select-option value="1">中</a-select-option>
                      <a-select-option value="2">高</a-select-option>
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
                    <a-select v-model="typeId" default-value="低" style="width:150px;">
                      <a-select-option value="0">低</a-select-option>
                      <a-select-option value="1">中</a-select-option>
                      <a-select-option value="2">高</a-select-option>
                    </a-select>
                  </p>
                </li>
              </ul>
              <div class="title"><p>客户信息</p></div>
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
            咨询记录
          </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    name: "wor",
    components: {},
    props:{
      workOrderId:{
        type:String,
        default:function(){
          return ''
        }
      }
    },
    data() {
        return {
          info:{},
          level:'',
          typeId:'',
          customerInfo:{}
        }
    },
    watch:{
      workOrderId(value){
        if(value){
          this.getWorkOrderDetails()
          this.getCustomerList()
        }
      }
    },
    created(){
      this.getWorkOrderDetails()
      this.getCustomerList()
    },
    mounted(){},
    methods: {
      getWorkOrderDetails(){
        let params = {
          id:this.workOrderId
        }
        this.Request.get('/workflow/infoJson',params).then(res=>{
          console.log('工单信息',res.data,'=====================')
          this.info = res.data.data
          this.level = this.info.level
          this.typeId = this.info.typeId
        })
      },
      getCustomerList(){
        let params = {
          custId:''
        }
        this.Request.get('/customers/hfwCustomersInfo/infoJson',params).then(res=>{
          console.log('客户信息',res.data,'=====================')
          this.customerInfo = res.data.data
     
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
    margin-bottom:5px;
    display:flex;
    span{
      display: block;
      width:100px;
    }
  }
}
</style>
