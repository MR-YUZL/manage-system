<template>
  <div>
      <a-page-header title="信息安全设置"/>
  <div class="securityInfom">
    <div class="inform-encryption">
        <h5>客户信息加密设置</h5>
        <div>功能开关<a-switch  :checked="DATA_10024_value=='1'?true:false"  @change="changeChecked" />开启后电话号码中间4位用"*"作模糊处理</div>
        <a-button type="primary" @click="saveInformEncry">保存</a-button>
    </div>
    <div class="white-encryption">
      <h5>客户信息加密白名单</h5>
      <p>处于白名单内的客服，对于电话号码信息可见 ，不受加密设置影响</p>
      <div class="white-list">
        <a-radio-group v-model="radioValue" @change="changeRadio">
          <a-radio :style="radioStyle" :value="1">
            指定客服
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            指定客服組
          </a-radio>
        </a-radio-group>
        <div class="white-select">
          <div>
            <a-select placeholder="请选择"  v-model="DATA_40037" style="width: 200px" :disabled="radioValue==1?false:true">
              <a-select-option v-for="(item) in customerList" :key="item.userAccount" :value="item.userAccount">{{item.userAccount}}</a-select-option>
            </a-select>
          </div>
          <div>
            <a-select placeholder="请选择" style="width: 200px" v-model="DATA_70037" :disabled="radioValue==2?false:true">
              <a-select-option v-for="(item,index) in customerGroupList" :key="index" :value="item.groupId">{{item.groupName}}</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
       <a-button type="primary" @click="saveWhiteList">保存</a-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props:{},
    data() {
      return {
        radioStyle: {
          display: 'block',
          height: '55px',
          lineHeight: '30px',
        },
        radioValue:'',
        DATA_10024_value:'0',
        DATA_40037:'',
        DATA_70037:'',
        customerList:[],
        customerGroupList:[]
      }
    },
    created(){
      this.getData()
      this.getCustomer()
      this.getCustomerGroup()
    },
    mounted(){},
    methods: {
      getData(){
         // 客戶信息加密設置DATA_10024_value， 指定客服DATA_40037，指定客服组DATA_70037
        let params = {
          dictionaryCodes:['DATA_10024','DATA_40037','DATA_70037'],
        }
        console.log(params)
        this.Request.post('/data/dictionary/list',params).then(res => {
          console.log('字典表',res)
          let data = res.data.list
          data.map( item => {
            if(item.dictionaryCode == 'DATA_10024'){
              this.DATA_10024_value = item.dictionaryValue
              console.log('this.DATA_10024_value ',this.DATA_10024_value )
            }
             if(item.dictionaryCode == 'DATA_40037'){
              this.DATA_40037 = item.dictionaryValue
              console.log('this.DATA_10024_value ',this.DATA_10024_value )
            }
             if(item.dictionaryCode == 'DATA_70037'){
              this.DATA_70037 = item.dictionaryValue
            }
          })
        })
      },
      saveData(params){
        this.Request.post('/data/dictionary/save',params).then(res => {
          console.log('保存',res)
        })
      },
      getCustomer(){
        this.Request.get('/staff/hfwStaffMember/service/acc/list').then(res => {
          console.log('客服',res)
          this.customerList = res.data.list
        })
      },
      getCustomerGroup(){
        this.Request.get('/staff/hfwStaffSkillGroups/listJson').then(res => {
          console.log('客服组',res)
          this.customerGroupList = res.data.list
        })
      },
      changeRadio(){
        
      },
      changeChecked(value){
        this.DATA_10024_value = value?"1":"0"
      },
      // 客户信息加密设置
      saveInformEncry(){
        let params = {
          DATA_10024:this.DATA_10024_value
        }
        this.saveData(params)
      },
      //客户信息加密白名单
      saveWhiteList(){
        let params = {
          DATA_40037:this.DATA_40037,
          DATA_70037:this.DATA_70037
        }
        this.saveData(params)
      }
    }
}
</script>
<style lang="less" scoped>
.securityInfom{
  padding-left:30px;
  h5{
    padding-top:20px;
    color:#4c4c4c;
    font-size:16px;
  }
  p{color:#bfbfbf;}
  .inform-encryption{
    padding-bottom:70px;
    border-bottom:1px dashed #e6e6e6;
    div{
      margin:35px 0;
      vertical-align: middle;
      button{
        margin:0 10px;
      }
    }
  }
  .white-encryption{
    padding-top:40px;
  }
}
  .white-list{
    display:flex;
    margin-top:44px;
    .white-select{
      margin-left:20px;
      div{
        margin-bottom:10px;
      }
    }
  }
</style>
