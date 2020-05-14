<template>
  <div>
    <a-page-header title="公共常用语"/>
    <div class="common-phrases">
      <div class="side">
        <div class="side-head"><strong>常用语分类</strong><p><a-icon @click="addPhrases" type="plus" /></p></div>
        <div class="group">
          <p>全部分组</p>
          <ul>
            <li>
              <h6>未分组</h6>
              <span><a-icon type="edit" /><a-icon type="delete" /></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mian">
        main
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
        return {}
    },
    created(){},
    mounted(){},
    methods: {
      addPhrases(){

      }
    }
}
</script>

<style lang="less" scoped>
.common-phrases{
  display:flex;
  .side{
    padding:10px;
    width:175px;
    border-right:1px solid #e6e6e6;
    .side-head{
      display:flex;
      justify-content: space-between;
      width:100%;
      *{
        display:block;
      }
      i{
        cursor: pointer;
      }
    }
    .group{
    
     }
  }
  
}
</style>
