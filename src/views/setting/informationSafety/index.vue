<template>
  <div>
      <a-page-header title="信息安全设置"/>
  <div class="securityInfom">
    <div class="inform-encryption">
        <h5>客户信息加密设置</h5>
        <div>功能开关<a-switch default-checked @change="onChange" />开启后电话号码中间4位用"*"作模糊处理</div>
        <a-button type="primary" @click="saveInformEncry">保存</a-button>
    </div>
    <div class="white-encryption">
      <h5>客户信息加密白名单</h5>
      <p>处于白名单内的客服，对于电话号码信息可见 ，不受加密设置影响</p>
      <div class="white-list">
        <a-radio-group v-model="radioValue" @change="onChange">
          <a-radio :style="radioStyle" :value="1">
            指定客服
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            指定客服組
          </a-radio>
        </a-radio-group>
        <div class="white-select">
          <div>
            <a-select placeholder="请选择" style="width: 200px" :disabled="radioValue==1?false:true">
              <a-select-option value="jack">Jack</a-select-option>
            </a-select>
          </div>
          <div>
            <a-select placeholder="请选择" style="width: 200px" :disabled="radioValue==2?false:true">
              <a-select-option value="jack">Jaadsfadsfck</a-select-option>
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
        radioValue:''
      }
    },
    created(){},
    mounted(){},
    methods: {
      // 客户信息加密设置
      saveInformEncry(){},
      //客户信息加密白名单
      saveWhiteList(){}
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
