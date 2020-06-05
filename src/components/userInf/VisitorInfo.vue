<template>
    <div class="user_data">
        <div class="header">
            <span class="titleH5"> 访客信息</span>
            <div>
              <span class="blue" @click="editClue">编辑</span>
              <span class="save" @click="saveClue" v-if="!vistorInfoObj.existClue">保存为线索</span>
            </div>
        </div>
        <div class="visitorInfo">
          <ul>
            <li>
              <span>所属客户</span>
              <p class="blue" @click="relatedCustomers" v-if="!vistorInfoObj.customer">关联客户</p>
              <p v-else>{{vistorInfoObj.custName}}</p>
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
         <a-modal title="关联客户" v-if="relatedCusModal"   :visible="relatedCusModal" @cancel="handleRelatedCusCancel" @ok="handleRelatedCusOk">
        <div><a-input-search v-model="relateSearchKey" placeholder="请输入客户名称" enter-button='查询' @search="onRelatedCusSearch" /></div>
        <div class="relateCus">
          <a-radio-group v-model="custId" >
            <a-radio :style="radioStyle"  v-for="(item,index) in relateRadio" :key="index" :value="item.custId">{{item.custName}}</a-radio>
          </a-radio-group>
        </div>
      </a-modal>
      <!-- 保存为线索 -->
      <Modal :currentModal="saveClueModal" v-if="saveClueModal.visible" @toggleModal="clueToggleModal" >
        <div slot="content">
          <BaseForm
            ref="baseForm"
            :formObject="formObjectClue"
            @toggleModal="clueToggleModal"
            @formSubmit="formSubmitClue">
          </BaseForm>
        </div>
      </Modal>
    </div>
</template>
<script>
import Modal from '../Modal/index'
import BaseForm from '../BaseForm/index'
export default {
    name:'visitorInfo',
    props:{
      guestId:{
        type:String,
        default:''
      }
    },
    components:{
      Modal,
      BaseForm
    },
    data(){
        return{
          relateRadio:[],
          vistorInfoObj:{existClue:''},
          radioStyle: {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          },
          labelCol: { span:6 },
          wrapperCol: { span: 14 },
          relatedCusModal:false,
          relateSearchKey:'',
          custId:'',
          saveClueModal:{
            visible:false,
            title:'保存为线索',
          },
          formObjectClue:{
            type:'modalForm',
            ref: "modalFormClue",
            sureBtn:'确定',
            defaultValues:{},
            modelList:[
               {
                type: "input",
                label: "姓名",
                placeholder: "请输入",
                ruleName: "linkName",
                rules: [{
                  required: true,
                  message: "请输入姓名",
                  trigger: "blur"
                }]
              },
              {
                type: "input",
                label: "手机号",
                placeholder: "请输入",
                ruleName: "phone",
              },
              {
                type: "input",
                label: "微信号",
                placeholder: "请输入",
                ruleName: "wechat",
              },{
                type: "input",
                label: "邮箱",
                placeholder: "请输入",
                ruleName: "email",
              },{
                type: "input",
                label: "QQ",
                placeholder: "请输入",
                ruleName: "qq",
              },{
                type: "input",
                label: "钉钉",
                placeholder: "请输入",
                ruleName: "dingding",
              },
              {
                type:"areaCascader",
                label:'所在地区',
                placeholder: "请选择",
                ruleName:'address',
                fieldNames: {
                  label: "name",
                  value: "adcode",
                  children: "districts"
                }
              },
            ]
          },
          type:''
      }
    },
    watch:{
      guestId(){
        this.getVisitorInfo()
      }
    },
    created(){
      this.getVisitorInfo()
    },
    methods:{
        // 获取访客信息
        getVisitorInfo(){
          this.Request.get('/hfw/workbench/getGuestInfo?guestId='+this.guestId).then(res => {
            console.log('访客信息',res.data)
            this.vistorInfoObj = res.data.data
          })   
        },
        actionFn(val){
          console.log('事件'+val)
        },
        //编辑访客资料
        editClue(){
          this.type='edit'
          this.saveClueModal.visible = true
          this.saveClueModal.title = '编辑访客资料'
          this.formObjectClue.modelList[0].label = '访客名称'
          this.formObjectClue.modelList[0].ruleName = 'guestName'
          this.formObjectClue.modelList[1].ruleName = 'telPhone'
          this.formObjectClue.defaultValues = {
            guestName:this.vistorInfoObj.name?this.vistorInfoObj.name:'',
            phone:this.vistorInfoObj.phone?this.vistorInfoObj.phone:'',
            dingding:this.vistorInfoObj.dingding?this.vistorInfoObj.dingding:'',
            qq:this.vistorInfoObj.qq?this.vistorInfoObj.qq:'',
            email:this.vistorInfoObj.email?this.vistorInfoObj.email:'',
            address:[this.vistorInfoObj.provinceId]
          }
           this.formObjectClue.modelList[7] = {}
        },
        //保存为线索
        saveClue(){
          this.type='save'
          this.saveClueModal.visible = true
          this.formObjectClue.defaultValues = {}
          this.formObjectClue.modelList[0].ruleName = 'linkName'
          this.formObjectClue.modelList[1].ruleName = 'phone'
          this.formObjectClue.modelList[7] = {
            type: "textarea",
            label: "咨询备注",
            placeholder: "请输入",
            ruleName: "remark",
            rules: [{
              required: true,
              message: "请输入备注",
              trigger: "blur"
            }]
          }
        },
        clueToggleModal(){
          this.saveClueModal.visible = false
          this.$refs.baseForm.resetForm()
        },
        formSubmitClue(formData){
          let data = formData
          let params = {
            guestId:this.guestId,
            ...data,
          }
          // if(address&&address.length>0){
          //   params.provinceId = address[0]?address[0]:''
          //   params.cityId = address[1]?address[1]:''
          //   params.countyId = address[2]?address[2]:''
          // }

          console.log('保存为线索的参数1',params,this.type)
          if(!data.phone&&!data.wechat&&!data.email&&!data.qq&&!data.dingding){
            this.$message.warn('请至少填写一个联系方式')
            return false;
          }
          // 字段查重
          // this.Request.post('/hfw/workbench/clueCensor',{checkKey:'22',type:'1'}).then(res => {
          //   console.log(res)
          // })
          if(this.type == 'edit'){ // 编辑访客信息
            this.Request.post('/hfw/workbench/saveGuestInfo',{...params}).then(() => {
              this.$message.success('保存成功')
              this.getVisitorInfo()
              this.saveClueModal.visible = false
            })
          }else if(this.type=='save'){  // 保存为线索
            this.Request.post('/hfw/workbench/saveClue',{...params}).then(() => {
              this.$message.success('保存成功')
              this.getVisitorInfo()
              this.saveClueModal.visible = false
            })
          }
          this.$forceUpdate()
        },
        // 关联客户
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
          let params = {
            guestId:this.guestId,
            custId:this.custId
          }
          this.Request.post('/hfw/workbench/associatedCustomers',params).then(res => {  // 关联客户Ok
            console.log('提交客户关联',res.data)
            this.relatedCusModal = false
            this.getVisitorInfo()
            this.relateRadio = []
          }) 
        },
        onRelatedCusSearch(){
          console.log('=====================',this.relateSearchKey)
          this.relateRadio = []
          this.Request.get('/hfw/workbench/blurMatchCustName?matchKey='+this.relateSearchKey).then(res => {
            let data = res.data.list
            if(data.length>0){
              this.relateRadio = data
            }
            console.log('模糊搜索',res.data)
          }) 
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
            // background:url("../../assets/imgs/bianqian.png") left center no-repeat;
            padding-left:10px;
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