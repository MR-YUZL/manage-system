<template>
    <div class="user_data">
        <div class="header">
            <span class="titleH5"> 访客信息</span>
            <span class="save" @click="saveClue">保存为线索</span>
        </div>
        <div class="visitorInfo">
          <ul>
            <li>
              <span>所属客户</span>
              <p class="blue" @click="relatedCustomers">关联客户</p>
            </li>
            <li>
              <span>访客名称</span>
              <p >{{vistorInfoObj.name}}</p>
            </li>
            <li>
              <span>地区</span>
              <p >{{vistorInfoObj.country}}</p>
            </li>
            <li>
              <span>上次访问时间</span>
              <p >{{vistorInfoObj.lastServiceAcc}}</p>
            </li>
             <li>
              <span>上次接待时间</span>
              <p >{{vistorInfoObj.lastServiceTime}}</p>
            </li>
          </ul>
        </div>
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
          <a-radio-group v-model="custId" >
            <a-radio :style="radioStyle"  v-for="(item,index) in relateRedio" :key="index" :value="item.custId">{{item.custName}}</a-radio>
          </a-radio-group>
        </div>
      </a-modal>
    </div>
</template>
<script>
export default {
    props:{
      vistorInfoObj:{
        type:Object
      },
      relateRedio:{
        type:Array
      }
    },
    data(){
        return{
          radioStyle: {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          },
          labelCol: { span:6 },
          wrapperCol: { span: 14 },
          saveClueModal:false,
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
        },
        relatedCusModal:false,
        relateSearchKey:'',
        custId:''
      }
    },
    methods:{
        actionFn(val){
            console.log('事件'+val)
        },
        saveClue(){
          this.saveClueModal = true
          // this.$emit('saveClue')
        },
        handleSaveClueCancel(){
          this.saveClueModal = false
        },
        handleSaveClueOk(){
          this.$emit('handleSaveClueOk',this.saveClueForm)
        },
        relatedCustomers(){
          this.custId = ''
          this.relatedCusModal = true
        },
        handleRelatedCusCancel(){
          this.relatedCusModal = false
        },
        handleRelatedCusOk(){
          if(this.custId==''){
              this.$message.info('请选择要关联的客户')
          }
          this.$emit('handleRelatedCusOk',this.custId)
        },
        onRelatedCusSearch(){
          this.$emit('onRelatedCusSearch',this.relateSearchKey)
        },
    }
}
</script>
<style lang="less" scoped>
  .user_data{
    padding:20px;
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom:25px;
        .save{
            color:#3E7BF8;
            cursor: pointer;
            background:url("../../assets/imgs/bianqian.png") left center no-repeat;
            padding-left:35px;
        }
        .titleH5{
          background:url('../../assets/imgs/ly-user.png') left center no-repeat;
          padding-left:25px;
        }
    }
    .visitorInfo{
      li{
        color:#333333;
        display:flex;
        width:350px;
        flex-wrap:wrap;
        margin-bottom:15px;;
        span{
          display: block;
          width:150px;
        }
        p{
          margin-bottom:0;
        }
      }
    }
  }
  .relateCus{
    margin-top:10px;
  }
</style>