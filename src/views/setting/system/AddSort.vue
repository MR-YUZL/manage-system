<template>
  <div class="addSort">
    <div class="sort">
      <ul>
        <li class="active">
          <span>未分类</span>
          <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
        <li>
          <span>未分类</span>
          <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
      </ul>
    </div>
    <div class="sort">
       <ul>
        <li>
          <span>未分类</span>
          <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
      </ul>
    </div>
    <div class="sort">
       <ul>
        <li>
          <span>未分类</span>
           <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
      </ul>
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
    getSortList(){
      let params = {
        type:1,
        pid:'1'
      }
      this.Request.post('/config/system/findTypeListJson',params).then(res => {
        console.log('分类列表',res.data.list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addSort{
  display:flex;
  margin-right:20px;
  .sort{
    margin:0 15px;
    box-sizing: border-box;
    width:340px;
    ul{
      border-top:1px solid #e6e6e6;
    }
    li{
      cursor: pointer;
      padding-right:15px;
      padding-left:16px;
      height:60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #e6e6e6;
      border-left:1px solid #e6e6e6;
      border-right:1px solid #e6e6e6;
      .sort-icon{
        display: none;
      }

    }
    li:hover,li.active{
      padding-left:15px;
      border-left:2px solid #3f7af8;
      background:#f7f8fa;
      .sort-icon{
        display: block;
        i{
          margin:0 10px;
        }
      }
    }
  }
}
</style>
