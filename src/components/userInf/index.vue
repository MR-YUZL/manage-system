<template>
  <!-- 访客信息，访客标签，工单信息，访问信息，服务小结整合 -->
  <div class="userInformation">
    <visitor-info :vistorInfoObj="visitorInfoData" @saveClue="saveClue" @relatedCustomers="relatedCustomers"/>
    <!-- <Tags /> -->
    <a-modal title="保存为线索" v-if="saveClueModal" okText="保存"   :visible="saveClueModal" @cancel="handleSaveClueCancel" @ok="handleSaveClueOk">
      <div class="saveClue">
        <a-form-model
          ref="ruleForm"
          :model="saveClueForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-form-model-item label="姓名：" prop="name">
              <a-input v-model="saveClueForm.guestName"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="手机号：" >
              <a-input v-model="saveClueForm.telPhone"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="微信号：" >
              <a-input v-model="saveClueForm.wechat"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="邮箱：" >
              <a-input v-model="saveClueForm.email"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="QQ：" >
              <a-input v-model="saveClueForm.qq"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="钉钉：">
              <a-input v-model="saveClueForm.dingding"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="所在地区：">
            <a-input v-model="saveClueForm.dingding"></a-input>
          </a-form-model-item>
          <a-form-model-item  label="咨询备注：" prop="remark">
            <a-input v-model="saveClueForm.remark"></a-input>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
    <a-modal title="关联客户" v-if="relatedCusModal"   :visible="relatedCusModal" @cancel="handleRelatedCusCancel" @ok="handleRelatedCusOk">
        <div><a-input-search v-model="relateSearchKey" placeholder="请输入客户名称" enter-button='查询' @search="onRelatedCusSearch" /></div>
        <div class="relateCus">
          <a-radio-group v-model="relateValue">
            <a-radio :style="radioStyle" :value="1">adf</a-radio>
            <a-radio :style="radioStyle" :value="2">aadf</a-radio>
          </a-radio-group>
        </div>
    </a-modal>
  </div>
</template>

<script>
import VisitorInfo from './VisitorInfo'
// import Tags from './Tags'
export default {
    name: "",
    components: {
      VisitorInfo,
      // Tags
    },
    props:{
      guestId:{  // 访客id
        type:String,
        default:''
      }
    },
    data() {
      return {
        labelCol: { span:6 },
        wrapperCol: { span: 14 },
        visitorInfoData:{},
        saveClueModal:false,
        relatedCusModal:false,
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },
        relateSearchKey:'',
        relateValue:'',
        saveClueForm:{
            guestName:'',
            telPhone:'',
            wechat:'',
            email:'',
            qq:'',
            dingding:'',
            provinceId:'',
            cityId:'',
            countyId:''
        },
        rules:{
          remark:[{required: true, message: '请输入咨询备注', trigger: 'blur' }],
          name:[{required: true, message: '请输入姓名', trigger: 'blur' }]
        }
      }
    },
    watch:{
      guestId(value,old){
        console.log('aa',value,'bb',old,'===============')
        if(value){
          this.getVisitorInfo()
        }
      }
    },
    created(){},
    mounted(){
      if(this.guestId){
        this.getVisitorInfo()
      }
    },
    methods: {
      getVisitorInfo(){
        this.Request.get('/hfw/workbench/getGuestInfo?guestId='+this.guestId).then(res => {
          console.log('访客信息',res.data)
          this.visitorInfoData = res.data.data
        })   
      },
      // 保存为线索
      saveClue(){
        this.saveClueModal = true
      },
      handleSaveClueCancel(){
        this.saveClueModal = false
      },
      handleSaveClueOk(){
        this.relatedCusModal = true
      },
      //关联客户
      relatedCustomers(){
        this.relatedCusModal = true
      },
      handleRelatedCusCancel(){
         this.relatedCusModal = false
      },
      onRelatedCusSearch(){
        this.Request.get('/hfw/workbench/blurMatchCustName?matchKey='+this.relateSearchKey).then(res => {
          console.log('模糊搜索',res.data)
        }) 
      },
      handleRelatedCusOk(){
         this.Request.get('/hfw/workbench/associatedCustomers?matchKey='+this.relateValue).then(res => {
          console.log('提交客户关联',res.data)
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
