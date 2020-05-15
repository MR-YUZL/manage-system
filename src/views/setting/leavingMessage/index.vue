<template>
  <div class="">
    <a-page-header title="会话辅助设置" />
    <div>
      <a-tabs :activeKey="activeKey" @change="clickTabs">
        <a-tab-pane key="1" tab="  接入欢迎语"></a-tab-pane>
        <a-tab-pane key="2" tab="网页客服留言应道"></a-tab-pane>
        <a-tab-pane key="3" tab="微信公众号/小程序留言应道"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="tabCon">
      <p v-if="activeKey==1">接入人工坐席时，系统会向访客发出一条欢迎的消息</p>
      <p v-if="activeKey==2||activeKey==3">当客服不在线时自动进入留言模式，请设置留言引导语</p>
      <div>
        <a-form-model 
        ref="welcomeWords" 
        :rules="rules" 
        :model="wordsFormData" 
        :label-col="labelCol" 
        :wrapper-col="wrapperCol">
          <a-form-model-item :label="textName" prop="con">
            <a-textarea v-model="wordsFormData.con" placeholder="您好，有什么可以帮助的吗？" :auto-size="{ minRows: 7 }"></a-textarea>
          </a-form-model-item>
          <a-form-model-item>
            <a-button style="margin-left:100px;" type="primary">保存</a-button>
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
        activeKey:'1',
        wordsFormData:{
          con:''
        },
        rules:{
          con:[{required: true, message: '请输入分组名称',trigger: 'blur'}]
        },
        textName:'接入欢迎语'
      }
    },
    created(){},
    mounted(){},
    methods: {
      clickTabs(key){
        this.activeKey = key
        this.textName = this.activeKey == 1?'接入欢迎语':'留言引导语'
      }
    }
}
</script>

<style lang="less" scoped>
  .tabCon{
    padding-left:20px;
  }
</style>
