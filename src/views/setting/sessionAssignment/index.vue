<template>
  <div class="">
      <a-page-header title="会话分配规则" />
      <div>
        <h6 class="conversationTitle">会话分配规则</h6>
        <div class="conversationCon routineSet">
          <a-form-model>
             <p>常规分配方式</p>
             <a-form-model-item label="常规分配方式">
              <a-radio-group >
                <a-radio value="1">
                  客服均衡工作量（访客将优先分配给当天总会话接待量最少的客服）
                </a-radio>
                <br />
                <a-radio value="2">
                 当前同时接待量优先（访客优先分配给当前同时接待量最少的客服）
                </a-radio>
                 <br />
                <a-radio value="3">
                 在线轮流分配（系统将根据今日上线顺序依次轮流分配）
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <p class="pStyle">特殊分配规则<span>特殊分配规则优先级大于主要常规分配规则，若同时启用且满足，分配优先级以负责人优先>历史咨询优先</span></p>
            <a-form-model-item>
              <a-checkbox-group>
                <a-checkbox value="1">
                  负责人优先（如果访客接入时识别为客户，那么会优先分配至该客户负责人）
                </a-checkbox>
                 <br />
                <a-checkbox value="2">
                 历史咨询优先（如果访客非首次接入，那么会优先分配至曾经接待过的客服）
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary">保存</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <h6 class="conversationTitle">会话同时接待量</h6>
        <div class="conversationCon">
          <div><a-checkbox></a-checkbox>单个客服同时接待量上限<a-input :value="10" style="width:100px;"></a-input><span>同时接待量达到上限时，新接入的访客将进入排队队列</span></div>
          <p class="mt10"><a-button type="primary">保存</a-button></p>
        </div>
        <h6 class="conversationTitle">渠道分配接待组</h6>
        <div  class="conversationCon">
          <p class="pStyle"><span>开启渠道分配接待组，你可以将访客按照设定的规则分配给特定的客服组或者客服；不使用指定分配则默认分配给所有客服</span></p>
          <a-tabs :activeKey="activeKey" @change="clickTabs">
            <a-tab-pane key="1" tab="web分配"></a-tab-pane>
            <a-tab-pane key="2" tab="微信公众号分配"></a-tab-pane>
            <a-tab-pane key="3" tab="微信小程序分配"></a-tab-pane>
          </a-tabs>
          <div>
            <a-form-model :modal="channelFormData"  ref="channelForm">
              <a-form-model-item v-if="activeKey==1">
                <a-radio-group  v-model="channelFormData.distrb" @change="changeDistrbRadio">
                  <a-radio value="1">指定分配 </a-radio>
                  <a-radio value="2"> 导航分配 </a-radio>
                </a-radio-group>
              </a-form-model-item>
               <a-form-model-item>
                  功能开关 <a-switch default-checked @change="onChange" /> {{text}}
                </a-form-model-item>
              <div v-if="activeKey==2||activeKey==3||channelFormData.distrb==1">
               
                <div  class="channalFp">
                  <a-form-model-item>
                    <a-select default-value="lucy" style="width: 200px" @change="handleChange">
                      <a-select-option value="jack">指定客服 </a-select-option>
                      <a-select-option value="lucy">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item>
                    <a-select default-value="lucy" style="width: 200px" @change="handleChange">
                      <a-select-option value="jack">指定客服 </a-select-option>
                      <a-select-option value="lucy">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </div>
              <!-- 导航分配 -->
              <div v-if="channelFormData.distrb==2&&activeKey==1" class="navigationFp">
                <a-form-model-item label="问题一" :label-col="labelCol" :wrapper-col="wrapperCol">
                   <a-input style="width:300px;margin-right:20px;" v-model="channelFormData.options.name"> </a-input><a-icon type="delete" />
                </a-form-model-item>
                 <div  class="channalFp">
                  <a-form-model-item>
                    <a-select default-value="lucy" style="width: 200px" @change="handleChange">
                      <a-select-option value="jack">指定客服 </a-select-option>
                      <a-select-option value="lucy">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item>
                    <a-select default-value="lucy" style="width: 200px" @change="handleChange">
                      <a-select-option value="jack">指定客服 </a-select-option>
                      <a-select-option value="lucy">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </div>
              <a-form-model-item>
                <a-button type="primary">保存</a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
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
          labelCol: { span: 1 },
          wrapperCol: { span: 18 },
          activeKey:'1',
          text:'通过Web的访客将被分配为以下客服/客服组',
          channelFormData:{
            distrb:'1',
            options:{
              name:''
            }
          }
        }
    },
    created(){},
    mounted(){},
    methods: {
      clickTabs(key){
        this.activeKey = key
      },
      changeDistrbRadio(){
        if(this.activeKey == 1){
          this.text = this.channelFormData.distrb=="1"?'通过Web的访客将被分配为以下客服/客服组':'通过Web的访客根据所选问题将被分配为以下客服/客服组'
        }else if(this.activeKey == 2){
          this.text = '通过微信公众号的访客将被分配为以下客服/客服组'
        }else{
           this.text = '通过微信小程序的访客将被分配为以下客服/客服组'
        }
      },
      handleChange(){

      }
    }
}
</script>

<style lang="less" scoped>
  .conversationTitle{
    font-size:16px;
    height:53px;
    line-height:53px;
    border-bottom:1px solid #dedede;
    padding-left:20px;
  }
  .conversationCon{
    padding-left:20px;
    color:#333;
  }
  .pStyle{
    font-size:14px;
    span{
      color:#bfbfbf;
      font-size:12px;
    }
  }
  .mt10{
    margin:20px 0;
  }
  .channalFp{
    display:flex;
    margin-left:50px;
  }
  .navigationFp{
    
  }
</style>
<style lang="less">
.routineSet .ant-radio-wrapper,.routineSet .ant-checkbox-wrapper{
  margin-top:15px;
}
</style>
