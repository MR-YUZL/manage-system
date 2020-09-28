<template>
  <div class="">
    <a-page-header title="会话辅助设置" />
    <div>
      <a-tabs :activeKey="activeKey" @change="clickTabs">
        <a-tab-pane key="2" tab="接入欢迎语"></a-tab-pane>
        <a-tab-pane key="0" tab="网页客服留言引导"></a-tab-pane>
        <a-tab-pane key="1" tab="微信公众号/小程序留言引导"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="tabCon">
      <p v-if="activeKey==2">接入人工坐席时，系统会向访客发出一条欢迎的消息</p>
      <p v-if="activeKey==0||activeKey==1">当客服不在线时自动进入留言模式，请设置留言引导语</p>
      <div>
        <a-form-model 
        ref="welcomeWords" 
        :rules="rules" 
        :model="wordsFormData" 
        :label-col="labelCol" 
        :wrapper-col="wrapperCol">
          <a-form-model-item :label="textName" prop="con">
            <a-textarea v-model="wordsFormData.con"  style="padding-top:4px" placeholder="您好，有什么可以帮助的吗？" :auto-size="{ minRows: 7 }" allow-clear :maxLength="50"></a-textarea>
          </a-form-model-item>
          <a-form-model-item>
            <a-button style="margin-left:535px;" type="primary" @click="saveData">保存</a-button>
          </a-form-model-item>
        </a-form-model>
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
        labelCol: { span: 2},
        wrapperCol: { span: 10 },
        activeKey:'2',
        wordsFormData:{
          con:'',
          id:''
        },
        rules:{
          con:[{required: true, message: '请输入分组名称',trigger: 'blur'}]
        },
        textName:'接入欢迎语'
      }
    },
    created(){
      this.getData()
    },
    mounted(){},
    methods: {
      clickTabs(key){
        this.activeKey = key
        this.textName = this.activeKey == 2?'接入欢迎语':'留言引导语'
        this.getData()
      },
      getData(){
        this.Request.get('/hfw/tsmHfwLeaveCommentsSet/infoJson?source='+this.activeKey).then(res=>{
          console.log('欢迎语言::',res.data.data.content)
          this.wordsFormData.con = res.data.data.content
          this.wordsFormData.id  = res.data.data.id
        })
      },
      saveData(){
        let params = {
          source:this.activeKey,
          content:this.wordsFormData.con,
          id:this.wordsFormData.id
        }
        this.Request.post('/hfw/tsmHfwLeaveCommentsSet/saveJson',params).then(res=>{
            console.log('保存',res)
            this.$message.success('保存成功')
        })
      }
    }
}
</script>

<style lang="less" scoped>
  .tabCon{
    padding-left:20px;
  }
</style>
