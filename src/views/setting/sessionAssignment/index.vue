<template>
  <div class="">
      <a-page-header title="会话分配设置" />
      <div>
        <h6 class="conversationTitle">会话分配规则</h6>
        <div class="conversationCon routineSet">
          <a-form-model>
             <p>常规分配方式</p>
             <a-form-model-item label="常规分配方式">
              <a-radio-group v-model="sessionAssignParams.DATA_80010">
                <a-radio value="3">
                  客服均衡工作量（访客将优先分配给当天总会话接待量最少的客服）
                </a-radio>
                <br />
                <a-radio value="2">
                 当前同时接待量优先（访客优先分配给当前同时接待量最少的客服）
                </a-radio>
                 <br />
                <a-radio value="1">
                 在线轮流分配（系统将根据今日上线顺序依次轮流分配）
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
             <!-- DATA_80011  特殊分配规则（负责人优先）  DATA_80012 特殊分配规则（历史咨询优选）   -->
            <p class="pStyle">特殊分配规则<span>特殊分配规则优先级大于主要常规分配规则，若同时启用且满足，分配优先级以负责人优先>历史咨询优先</span></p>
            <a-form-model-item>
              <a-checkbox-group v-model="sessionAssignParams.specialDistri">
                <a-checkbox value="DATA_80011">
                  负责人优先（如果访客接入时识别为客户，那么会优先分配至该客户负责人）
                </a-checkbox>
                 <br />
                <a-checkbox value="DATA_80012">
                 历史咨询优先（如果访客非首次接入，那么会优先分配至曾经接待过的客服）
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveConversation">保存</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <h6 class="conversationTitle">会话同时接待量</h6>
        <div class="conversationCon">
          <div><a-checkbox v-model="sessionVolumeParams.DATA_80013"></a-checkbox><span style="padding:0 8px;">单个客服同时接待量上限</span><a-input v-model="sessionVolumeParams.DATA_80014" style="width:100px;"></a-input><span style="padding:0 8px">同时接待量达到上限时，新接入的访客将进入排队队列</span></div>
          <p class="mt10"><a-button type="primary" @click="saveSessionVolume">保存</a-button></p> 
        </div>
        <h6 class="conversationTitle">渠道分配接待组</h6>
        <div  class="conversationCon">
          <p class="pStyle"><span>开启渠道分配接待组，你可以将访客按照设定的规则分配给特定的客服组或者客服；不使用指定分配则默认分配给所有客服</span></p>
          <a-tabs :activeKey="activeKey" @change="clickTabs" type="editable-card" >
            <a-tab-pane key="1" tab="web分配">
              <a-form-model :modal="webParams" ref="channelForm">
                <a-form-model-item>
                  <a-radio-group  v-model="webParams.DATA_80024">
                    <a-radio value="0">指定分配 </a-radio>
                    <a-radio value="1"> 导航分配 </a-radio>
                  </a-radio-group>
                </a-form-model-item>

                <!-- 指定分配form -->
                <div  v-if="webParams.DATA_80024 == '0'">
                  <a-form-model-item >
                  功能开关<a-switch v-model="webParams.appointParams.DATA_80025"/> 通过Web的访客根据所选问题将被分配为以下客服/客服组
                  </a-form-model-item>
                  <div class="channalFp">
                    <a-form-model-item>
                      <a-select v-model="webParams.appointParams.DATA_80026" style="width: 150px" @change="handleWebChange"  placeholder="请选择">
                        <a-select-option value="1">指定客服 </a-select-option>
                        <a-select-option value="0">指定客服组</a-select-option>
                      </a-select>
                    </a-form-model-item>
                    <a-form-model-item v-if="webParams.appointParams.DATA_80026=='0'">
                      <a-select v-model="webParams.appointParams.DATA_80027" style="width: 300px" mode="multiple" placeholder="请选择">
                        <a-select-option v-for="(item,index) in customerGroupList" :key="index" :value="item.groupId">{{item.groupName}}</a-select-option>
                      </a-select>
                    </a-form-model-item>
                    <a-form-model-item  v-if="webParams.appointParams.DATA_80026=='1'">
                      <a-select v-model="webParams.appointParams.DATA_80027" style="width: 300px"  mode="multiple" placeholder="请选择">
                        <a-select-option v-for="(item) in customerList" :key="item.userAccount" :value="item.userAccount">{{item.userName}}</a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </div>
                </div>

                <!-- 导航分配form -->
                <div  v-if="webParams.DATA_80024 == '1'">
                  <a-form-model-item>
                    功能开关 <a-switch v-model="webParams.navigationParams.DATA_80028" /> 通过Web的访客根据所选问题将被分配为以下客服/客服组
                  </a-form-model-item> 
                  <div v-for="(item,index) in webParams.navigationParams.questionList" :key="index">
                    <a-form-model-item :label='"问题"+(index+1)'  :label-col="labelCol" :wrapper-col="wrapperCol">
                      <div class="flex"> <a-input placeholder="请输入问题标题" v-model="item.question"></a-input> <a-icon type="delete" class="deleteQues" @click="deleteQuestion(index)"/></div>
                    </a-form-model-item>
                    <div class="channalFp">
                      <a-form-model-item>
                        <a-select v-model="item.assignmentWay" style="width: 150px" @change="handleQuestionChange(index)"  placeholder="请选择">
                          <a-select-option :value="1">指定客服 </a-select-option>
                          <a-select-option :value="0">指定客服组</a-select-option>
                        </a-select>
                      </a-form-model-item>
                      <a-form-model-item v-if="item.assignmentWay==0">
                        <a-select v-model="item.assignmentValues" style="width: 300px" mode="multiple" placeholder="请选择">
                          <a-select-option v-for="(item,index) in customerGroupList" :key="index" :value="item.groupId">{{item.groupName}}</a-select-option>
                        </a-select>
                      </a-form-model-item>
                      <a-form-model-item v-if="item.assignmentWay==1">
                        <a-select v-model="item.assignmentValues" style="width: 300px"  mode="multiple" placeholder="请选择">
                          <a-select-option v-for="(item) in customerList" :key="item.userAccount" :value="item.userAccount">{{item.userName}}</a-select-option>
                        </a-select>
                      </a-form-model-item>
                   </div> 
                  </div>
                  <p><span class="blue" @click="addQuestion">添加问题</span>最多可设置10个问题</p>
                </div>
              </a-form-model>
            </a-tab-pane>
            <a-tab-pane key="2" tab="微信公众号分配">
              <a-form-model :modal="weixinParams"  ref="channelForm">
                <a-form-model-item>
                  功能开关 <a-switch v-model="weixinParams.DATA_80015"  />  通过微信公众号的访客将被分配为以下客服/客服组
                </a-form-model-item>
                <div class="channalFp" v-if="weixinParams.DATA_80015">
                  <a-form-model-item>
                    <a-select v-model="weixinParams.DATA_80016" style="width: 150px" @change="handleGongZChange" placeholder="请选择">
                      <a-select-option value="1">指定客服 </a-select-option>
                      <a-select-option value="0">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                   <a-form-model-item v-if="weixinParams.DATA_80016=='0'">
                    <a-select v-model="weixinParams.DATA_80017" style="width: 300px" mode="multiple" placeholder="请选择">
                      <a-select-option v-for="(item,index) in customerGroupList" :key="index" :value="item.groupId">{{item.groupName}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item  v-if="weixinParams.DATA_80016=='1'">
                    <a-select v-model="weixinParams.DATA_80017" style="width: 300px"  mode="multiple" placeholder="请选择">
                      <a-select-option v-for="(item) in customerList" :key="item.userAccount" :value="item.userAccount">{{item.userName}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </a-form-model>
            </a-tab-pane>
            <a-tab-pane key="3" tab="微信小程序分配">
              <a-form-model :modal="weixinAppletParams"  ref="channelForm">
                <a-form-model-item>
                  功能开关 <a-switch v-model="weixinAppletParams.DATA_80018"  /> 通过微信小程序的访客将被分配为以下客服/客服组
                </a-form-model-item>
                <div class="channalFp" v-if="weixinAppletParams.DATA_80018">
                  <a-form-model-item>
                    <a-select v-model="weixinAppletParams.DATA_80019" style="width: 150px" @change="handleApplyetChange" placeholder="请选择">
                      <a-select-option value="1">指定客服 </a-select-option>
                      <a-select-option value="0">指定客服组</a-select-option>
                    </a-select>
                  </a-form-model-item>
                   <a-form-model-item v-if="weixinAppletParams.DATA_80019=='0'">
                    <a-select v-model="weixinAppletParams.DATA_80020" style="width: 300px" mode="multiple" placeholder="请选择">
                      <a-select-option v-for="(item,index) in customerGroupList" :key="index" :value="item.groupId">{{item.groupName}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item  v-if="weixinAppletParams.DATA_80019=='1'">
                    <a-select v-model="weixinAppletParams.DATA_80020" style="width: 300px"  mode="multiple" placeholder="请选择">
                      <a-select-option v-for="(item) in customerList" :key="item.userAccount" :value="item.userAccount">{{item.userName}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </a-form-model>
            </a-tab-pane>
          </a-tabs>
          <a-button type="primary" @click="saveChnnalDistribu">保存</a-button>
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
          wrapperCol: { span: 8},
          activeKey:'1',
          channelFormData:{
            distrb:'1',
            options:{
              name:''
            }
          },
          sessionAssignParams:{
            DATA_80010:'',    //常规分配方式
            specialDistri:[]  //特殊分配规则
          },
          sessionVolumeParams:{  // 会话量
            DATA_80013:false,   // 是否开启会话同时接待量
            DATA_80014:'',  //单个客服同时接待量上限
          },
          webParams:{
            DATA_80024:0, //0指定分配、1导航分配
            appointParams:{
              DATA_80025:'',
              DATA_80026:undefined,
              DATA_80027:[]
            },
            navigationParams:{
              DATA_80028:'',
              questionList:[{
                assignmentValues:[],
                assignmentWay:0,
                question:''
              }]
            }
          },
          weixinParams:{
            DATA_80015:false,
            DATA_80016:undefined,
            DATA_80017:undefined
          },
          weixinAppletParams:{
            DATA_80018:false,
            DATA_80019:undefined,
            DATA_80020:undefined
          },
          customerList:[],
          customerGroupList:[]
        }
    },
    created(){
      this.getData()
      this.getCustomer()
      this.getCustomerGroup()
      this.getQuestionList()
    },
    mounted(){},
    methods: {
       getData(){
          this.sessionAssignParams.specialDistri = []
         // DATA_80011  特殊分配规则（负责人优先）  DATA_80012 特殊分配规则（历史咨询优选）   DATA_80010  常规分配方式   
         // DATA_80013 是否开启会话同时接待量    DATA_80014单个客服同时接待量上限


         //DATA_80015是否开启微信公众号分配    DATA_80016 微信公众号分配方式      DATA_80017微信公众号分配客服组(客服)
         //DATA_80018 是否开启微信小程序分配   DATA_80019 微信小程序分配方式    DATA_80020微信小程序分配客服组(客服)

         //DATA_80024 WEB分配策略 0指定分配、1导航分配   DATA_80025是否开启WEB指定分配 0未开启、1已开启    DATA_80026 WEB指定分配方式 0客服组、1客服   DATA_80027  WEB指定分配客服组(客服)  DATA_80028 是否开启WEB导航分配
        
        let params = {
          dictionaryCodes:['DATA_80010','DATA_80011','DATA_80012','DATA_80013','DATA_80014','DATA_80015','DATA_80016','DATA_80017','DATA_80018','DATA_80019','DATA_80020',
          'DATA_80024','DATA_80025','DATA_80026','DATA_80027','DATA_80028'],
        }
        console.log(params)
        this.Request.post('/data/dictionary/list',params).then(res => {
          console.log('字典表sss',res)
          let data = res.data.list
          let objValue = {}
          data.map( item => {
            objValue[item.dictionaryCode] = item.dictionaryValue
          })
          // 常规分配方式回显值
          this.sessionAssignParams["DATA_80010"] = objValue['DATA_80010']
          if(objValue['DATA_80011'] == 1){
            this.sessionAssignParams.specialDistri.push('DATA_80011')
          }
          if(objValue['DATA_80012'] == 1){
            this.sessionAssignParams.specialDistri.push('DATA_80012')
          }
          //会话同时接待量
          this.sessionVolumeParams["DATA_80013"] = objValue['DATA_80013']=='1'?true:false
          this.sessionVolumeParams["DATA_80014"] = objValue['DATA_80014']
          //微信公众号
          this.weixinParams["DATA_80015"] = objValue["DATA_80015"]=='1'?true:false
          this.weixinParams["DATA_80016"] = objValue["DATA_80016"]
          this.weixinParams["DATA_80017"] = objValue["DATA_80017"]!=''?objValue["DATA_80017"].split(","):[]
          //微信小程序
          this.weixinAppletParams["DATA_80018"] = objValue["DATA_80018"]=='1'?true:false
          this.weixinAppletParams["DATA_80019"] = objValue["DATA_80019"]
          this.weixinAppletParams["DATA_80020"] = objValue["DATA_80020"]!=''?objValue["DATA_80020"].split(","):[]
          //web分配
          this.webParams["DATA_80024"] = objValue["DATA_80024"]
            // 指定分配
          this.webParams.appointParams["DATA_80025"] = objValue["DATA_80025"]=='1'?true:false
          this.webParams.appointParams["DATA_80026"] = objValue["DATA_80026"]
          this.webParams.appointParams["DATA_80027"] = objValue["DATA_80027"]!=''?objValue["DATA_80027"].split(","):[]
            // 导航分配
          this.webParams.navigationParams["DATA_80028"] = objValue["DATA_80028"]=='1'?true:false
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
      clickTabs(key){
        this.activeKey = key
      },
      handleWebChange(){
        this.webParams.appointParams.DATA_80027 = []
      },
      handleQuestionChange(index){
        this.webParams.navigationParams.questionList[index].assignmentValues = []
      },
      handleGongZChange(){
        this.weixinParams.DATA_80017 = []
      },
      handleApplyetChange(){
        this.weixinAppletParams.DATA_80020 = []
      },
      addQuestion(){
        let questionList = this.webParams.navigationParams.questionList
        if(questionList.length == 10||questionList.length>10){
          this.$message.success('最多只能添加10个！')
          return false
        }
        questionList.push({
          assignmentValues:[],
          assignmentWay:0,
          question:''
        })
      },
      deleteQuestion(index){
        if(this.webParams.navigationParams.questionList.length == 1){
          return false
        }
         this.webParams.navigationParams.questionList.splice(index,1)
      },
      saveField(params){
        this.Request.post('/data/dictionary/save',params).then(()=>{
          this.$message.success('保存成功！')
        })                                                                                                                                        
      },
      // 保存会话分配规则
      saveConversation(){
        // 0未启用、1已启用
        let params = {
          DATA_80010:this.sessionAssignParams.DATA_80010,
          DATA_80011:0,
          DATA_80012:0
        }
        let specialDistri =  this.sessionAssignParams.specialDistri
        specialDistri.map(item=>{
          if(item=='DATA_80011'){
            params.DATA_80011 = 1
          }else if(item=='DATA_80012'){
            params.DATA_80012 = 1
          }
        })
        this.saveField(params)
      },
      // 会话同时接待量
      saveSessionVolume(){
        let params = {
          DATA_80013:this.sessionVolumeParams.DATA_80013?'1':'0',
          DATA_80014:this.sessionVolumeParams.DATA_80014
        }
        this.saveField(params)
      },
      saveQuestion(){
        let question = this.webParams.navigationParams.questionList
        let params = {
          questionList:[
            ...question
          ]
        }
        console.log(params,'问题列表保存参数')
        this.Request.post('/navigation/assignment/save',params).then((res)=>{
          console.log(res,'问题保存成功')
        })
      },
      getQuestionList(){
        this.Request.post('/navigation/assignment/question/list').then((res)=>{
          console.log(res,'获取问题列表')
          let data = res.data.list
          let question = []
          data.map(item=>{
            question.push({
              assignmentValues:item.assignmentValues,
              assignmentWay:item.assignmentWay,
              question:item.question
            })
          })
          this.webParams.navigationParams.questionList = question
        })
      },
      // 渠道分配
      saveChnnalDistribu(){
        let key = this.activeKey
        let params = {}
        let webParams = this.webParams
        if(key=='1'){
          if(webParams.DATA_80024 == '0'){
            params = {
              DATA_80024: webParams.DATA_80024,
              DATA_80025: webParams.appointParams.DATA_80025?"1":"0",
              DATA_80026: webParams.appointParams.DATA_80026,
              DATA_80027: webParams.appointParams.DATA_80027.length>0?webParams.appointParams.DATA_80027.join(','):'',
            } 
          }
          if(webParams.DATA_80024 == '1'){
            params={
              DATA_80024: webParams.DATA_80024,
              DATA_80028: webParams.navigationParams['DATA_80028']?'1':'0',
            }
            this.saveQuestion()
          }
          console.log('保存的参数 web分配',params)
        }else if(key==2){
          let weixinParams=this.weixinParams
          params = {
            DATA_80015:weixinParams.DATA_80015?'1':'0',
            DATA_80016:weixinParams.DATA_80016,
            DATA_80017:weixinParams.DATA_80017.length?weixinParams.DATA_80017.join(','):''
          }
           console.log('保存的参数2',params)
        }else if(key == 3){
          let weixinAppletParams = this.weixinAppletParams
           params = {
            DATA_80018:weixinAppletParams.DATA_80018?'1':'0',
            DATA_80019:weixinAppletParams.DATA_80019,
            DATA_80020:weixinAppletParams.DATA_80020.length?weixinAppletParams.DATA_80020.join(','):''
          }
          console.log('保存的参数3',params)
        }
        this.saveField(params)
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
    // margin-left:50px;
    &>div{
      margin-right:10px;
    }
  }
  .navigationFp{
    
  }
  .deleteQues{
    margin-left:10px;
    font-size:20px;
    margin-top:5px;
    color:#aaa;
    cursor: pointer;
  }
</style>
<style lang="less">
.routineSet .ant-radio-wrapper,.routineSet .ant-checkbox-wrapper{
  margin-top:15px;
}
</style>
