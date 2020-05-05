<template>
  <div class="header">
    <div class="header_left">
      <div class="calling">
        <span></span>
        <span>通话中...</span>
        <span>02:30:22</span>
      </div>
      <a-button type="primary">结束通话</a-button>
    </div>
    <div class="header_right">
       <a-select style="width: 80px;margin-right:20px" @change="handleChange">
        <a-select-option value="jack">在线</a-select-option>
        <a-select-option value="lucy">忙碌</a-select-option>
        <a-select-option value="Yiminghe">离线</a-select-option>
      </a-select>
      
      <a-badge dot :count="4">
        <a-icon type="bell" :style="{ fontSize: '20px'}"  />
      </a-badge>
      <div class="line"></div>
      <div class="userInf">
         <a-avatar size="large"  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
         <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            科比 布莱恩特 <a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="onClick">
            <a-menu-item key="1">退出</a-menu-item>
            <a-menu-item key="2">2nd menu item</a-menu-item>
            <a-menu-item key="3">3rd menu item</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    
  }),
  
  mounted() {},
  methods: {
     handleChange(value) {
      console.log(`selected ${value}`);
    },
     onClick({ key }) {
      console.log(`Click on item ${key}`);
    },
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
    @secondWidth: 120px;
    .header{ 
        width           : 100%;
        line-height     : 50px;
        padding         : 4px 20px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header_left{
          display: flex;
          align-items: center;
          .calling{
            line-height: 30px;
            border:1px solid #B4B4B4
          }
        }
        .header_right{
          display: flex;
          align-items: center;
          .line{
            width: 2px;
            height: 30px;
            margin: 0 20px;
            background: #FAFAFA;
          }
          .userInf{
            display: flex;
            align-items: center;
          }
        }
    }
</style>
