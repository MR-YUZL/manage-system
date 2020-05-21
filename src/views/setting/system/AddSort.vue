<template>
  <div class="addSort">
    <div class="sort">
      <ul>
        <li><div><a-icon type="plus" />添加分类</div></li>
        <li v-for="(item,index) in firstLevel " :key="index" :class="{active:item.active}" @click="handleFirstLevel(index)">
          <span  v-if="!item.edit">{{item.name}}</span>
          <a-input v-if="item.edit" type="text" :value="item.name" /> 
          <div class="sort-icon">
            <a-icon type="check" v-if="item.edit" @click="saveTags('first',item.pid,index)"/>
            <a-icon type="edit" @click="editTags('first',index)" v-if="!item.edit"/>
            <a-icon type="delete" @click="delteTags('first',index)" /></div>
        </li>
      </ul>
    </div>
    <div class="sort" > 
      <ul style="margin-bottom:0;">
        <li><div><a-icon type="plus" />添加分类</div></li>
      </ul>
      <ul v-if="secondLevel.length>0">
        <li v-for="(item,index) in secondLevel " :key="index" :class="{active:item.active}" @click="handleSecondLevel(index)">
          <span>{{item.name}}</span>
          <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
      </ul>
    </div>
    <div class="sort" v-if="secondLevel.length>0&&threeLever.length>0">
      <ul>
        <li><div><a-icon type="plus" />添加分类</div></li>
        <li v-for="(item,index) in threeLever " :key="index" :class="{active:item.active}"  @click="handleThreeLever(index)">
          <span>{{item.name}}</span>
          <div class="sort-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "addSort",
  components: {},
  props:{
    list:{
      list:{
        type:Array,
        default:[]
      }
    }
  },
  data() {
    return {
      firstLevel:[],
      secondLevel:[],
      threeLever:[]
    }
  },
  watch:{
    list(value,old){
      console.log(1,value,2,old)
      if(value.length>0){
        this.firstLevel = [...this.list]
        this.firstLevel[0].active = true
        if(this.firstLevel[0].childList.length>0){
            this.secondLevel = this.firstLevel[0].childList
            this.secondLevel[0].active = true
          if(this.secondLevel[0].childList.length>0){
            this.threeLever = this.secondLevel[0].childList
            this.threeLever[0].active = true
          }
        }
      }
    }
  },
  created(){
    this.getInit()
  },
  mounted(){},
  methods: {
    getInit(){

    },
    getSortList(){
      let params = {
        type:1,
        pid:'1'
      }
      this.Request.post('/config/system/findTypeListJson',params).then(res => {
        console.log('分类列表',res.data.list)
      })
    },
    handleFirstLevel(index){
      this.firstLevel.map(item=>{
        item.active = false
      })
      this.firstLevel[index].active = true
      this.secondLevel = this.firstLevel[index].childList
      // if( this.secondLevel.length>0){
      //   this.secondLevel[0].active = true
      // }
    },
    handleSecondLevel(index){
      this.secondLevel.map(item=>{
        item.active = false
      })
      this.secondLevel[index].active = true
      this.threeLever = this.secondLevel[index].childList
     
    },
    handleThreeLever(index){
      console.log(index)
    },
    saveTags(type,pid,index){
      console.log(pid,index)
      if(type=='first'){
        this.firstLevel.map(item=>{
          item.edit = false
        })
      }
      this.$forceUpdate()
    },
    editTags(type,index){
      console.log(index)
      if(type=='first'){
        this.firstLevel.map(item=>{
          item.edit = false
        })
        this.firstLevel[index].edit = true
      }
      this.$forceUpdate()
    },
    delteTags(type,index){
      let that = this
       this.$confirm({
        content:<div style="color:red;">确定要删除这个分类吗？</div>,
        onOk() {
          if(type=='first'){
            that.firstLevel.splice(index,1)
            console.log('删除过的firstLever',that.firstLevel)
          }
          that.$forceUpdate()
        },
      });
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
      input{
        width:220px;
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
