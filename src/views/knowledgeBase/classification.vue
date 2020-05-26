<template>
  <div class="addSort">
    <div class="sort">
      <ul>
        <li class="firstLi">
          <div v-if="firstAddShow" class="firstLiDiv">
            <a-input  v-model="fristAdd" placeholder="请输入" /> 
            <div class="sort-icon">
              <a-icon type="check" @click="saveNewTags('first')"/>
              <a-icon type="delete" @click="deleteAddNewSort('first')"/>
            </div>
          </div>
          <div class="addSortStyle" @click="addSort('first')"  v-if="!firstAddShow"><a-icon type="plus" />添加分类</div>
        </li>
        <h3>全部分类</h3>
        <li v-for="(item,index) in firstLevel " :key="index" :class="{active:item.active}" @click="handleFirstLevel(index)">
          <span  v-if="!item.edit">{{item.groupName}}</span>
          <a-input v-if="item.edit" v-model="editName"/> 
          <div class="sort-icon">
            <a-icon type="check" v-if="item.edit" @click="saveTags('first',item.id,index)"/>
            <a-icon type="edit" @click="editTags('first',index,item.name)" v-if="!item.edit"/>
            <a-icon type="delete" @click="delteTags('first',index,item.id)" />
          </div> 
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
      type:Array,
      default:[]
    },
    currentType:{
      type:String,
      default:'0'
    }
  },
  data() {
    return {
      firstLevel:[],
      secondLevel:[],
      threeLevel:[],
      editName:'',
      firstAddShow:false,
      fristAdd:'',
      secondAddShow:false,
      secondAdd:'',
      pid:'',
      threeAddShow:false,
      threeAdd:'',
      firstIndex:'',
      secondIndex:'',
      threeIndex:''
    }
  },
  watch:{
    list(value){
      if(value.length>0){
        this.firstLevel = [...this.list]
        this.firstLevel[0].active = true
        this.pid = this.firstLevel[0].id
        this.firstIndex = 0
        if(this.firstLevel[0].childList.length>0){
            this.secondLevel = this.firstLevel[0].childList
            this.secondLevel[0].active = true
            this.pid = this.secondLevel[0].id
            this.secondIndex = 0
          if(this.secondLevel[0].childList.length>0){
            this.threeLevel = this.secondLevel[0].childList
            this.threeLevel[0].active = true

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
        type:this.currentType,
        pid:''
      }
      this.Request.post('/config/system/findTypeListJson',params).then(res => {
        console.log('分类列表',res.data.list)
      })
    },
    handleFirstLevel(index){
      this.pid = this.firstLevel[index].id
      this.firstIndex = index
      this.firstLevel.map(item=>{
        item.active = false
      })
      this.firstLevel[index].active = true
      this.secondLevel = this.firstLevel[index].childList
      if( this.secondLevel.length>0){
        this.secondLevel[0].active = true
        if(this.secondLevel[0].childList.length>0){
          this.threeLevel = this.secondLevel[0].childList
        }
      }
    },
    handleSecondLevel(index){
      // this.pid = this.secondLevel[index].id
  
      this.secondIndex = index
      this.secondLevel.map(item=>{
        item.active = false
      })
      this.secondLevel[index].active = true
      this.threeLevel = this.secondLevel[index].childList
    },
    handlethreeLevel(index){
      console.log(index)
    },
    saveTags(type,id,index){
      // id name  type pid   id 用于编辑  pid 用于新增 父类的
      console.log(this.currentType) 
      let params = {
        id,
        name:this.editName,
        type:this.currentType,
      }
      if(type=='first'){
        this.firstLevel[index].edit = false 
      }
      console.log('保存的参数',params)
      this.Request.post('/config/system/saveJson',params).then(res => {
        console.log('编辑过的',res.data.data)
        if(type=='first'){
          this.firstLevel[index].name = res.data.data.name
        }else if(type=='second'){
          this.secondLevel[index].name = res.data.data.name
        }else if(type=='three'){
          this.threeLevel[index].name = res.data.data.name
        }
      })
      this.$forceUpdate()
    },
    saveNewTags(type){
      let params = {
        groupName:this.fristAdd,
        // id:this.currentType,
      }
      if(this.fristAdd ==''){
        this.$message.warn('请输入字段名！')
        return false;
      }

      console.log(this.firstIndex,'这里是啥啥萨哈')

     
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/saveJson',params).then(res => {
        console.log('新增',res.data.data)
        if(type=='first'){
          this.firstAddShow = false
          this.firstLevel.push(res.data.data)
        }
      })
    },
    editTags(type,index,name){
       this.editName = name
      if(type=='first'){
        this.firstLevel.map(item=>{
          item.edit = false
        })
        this.firstLevel[index].edit = true
      }
      this.$forceUpdate()
    },
    delteTags(type,index,id){
      let that = this
       this.$confirm({
        content:<div style="color:red;">确定要删除这个分类吗？</div>,
        onOk() {
          that.Request.post('/config/system/delJson',{id}).then(res => {
            console.log('分类列表',res.data.list)
            if(type=='first'){
              that.firstLevel.splice(index,1)
              console.log('删除过的firstLever',that.firstLevel)
            }
            
          })
          that.$forceUpdate()
        },
      });
    },
    addSort(type){
      this.fristAdd = ''
      if(type=='first'){
        this.firstAddShow = true
      }
    },
    deleteAddNewSort(type){
      if(type=='first'){
        this.firstAddShow = false
      }
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
    li.firstLi{
      .firstLiDiv{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:100%;
      }
      .sort-icon{
        display: block;
        i{
          margin:0 10px;
        }
      }
      input{
        width:220px;
      }
      .addSortStyle{
        width:100%;
        height:100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
      }
    }
    li.firstLi:hover{
      background:#fff;
    }
  }
}
</style>
