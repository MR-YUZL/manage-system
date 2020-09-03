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
        <li v-for="(item,index) in firstLevel " :key="index" :class="{active:item.active}" @click.self="handleFirstLevel(index)">
          <span  v-if="!item.edit">{{item.name}}</span>
          <a-input v-if="item.edit"  v-model="editName"/> 
          <div class="sort-icon">
            <a-icon type="check" v-if="item.edit" @click="saveTags('first',item.id,index)"/>
            <a-icon type="edit" @click="editTags('first',index,item.name)" v-if="!item.edit"/>
            <a-icon type="delete" v-if="!item.edit" @click="delteTags('first',index,item.id)" />
            <a-icon type="close" v-if="item.edit" @click="closeTags('first',index)" />
          </div> 
        </li>
      </ul>
    </div>
    <div class="sort" v-if="firstLevel.length>0"> 
      <ul>
        <li class="firstLi">
          <div v-if="secondAddShow" class="firstLiDiv">
            <a-input  v-model="fristAdd" placeholder="请输入" /> 
            <div class="sort-icon">
              <a-icon type="check" @click="saveNewTags('second')"/>
              <a-icon type="delete" @click="deleteAddNewSort('second')"/>
            </div>
          </div>
          <div class="addSortStyle" @click="addSort('second')"  v-if="!secondAddShow"><a-icon type="plus" />添加分类</div>
        </li>
        <li v-for="(item,index) in secondLevel " :key="index" :class="{active:item.active}" @click.self="handleSecondLevel(index)">
          <span v-if="!item.edit" >{{item.name}}</span>
          <a-input v-if="item.edit" v-model="editName"/> 
          <div class="sort-icon">
            <a-icon type="check" v-if="item.edit" @click="saveTags('second',item.id,index)"/>
            <a-icon type="edit" @click="editTags('second',index,item.name)" v-if="!item.edit"/>
            <a-icon type="delete"  v-if="!item.edit"  @click="delteTags('second',index,item.id)" />
            <a-icon type="close" v-if="item.edit" @click="closeTags('second',index)" />
          </div>
        </li>
      </ul>
    </div>
    <div class="sort" v-if="threeLevelShow">
      <ul> 
         <li class="firstLi">
          <div v-if="threeAddShow" class="firstLiDiv">
            <a-input  v-model="fristAdd" placeholder="请输入" /> 
            <div class="sort-icon">
              <a-icon type="check" @click="saveNewTags('three')"/>
              <a-icon type="delete" @click="deleteAddNewSort('three')"/>
            </div>
          </div>
          <div class="addSortStyle" @click="addSort('three')"  v-if="!threeAddShow"><a-icon type="plus" />添加分类</div>
        </li>
        <li v-for="(item,index) in threeLevel " :key="index" :class="{active:item.active}"  @click.self="handlethreeLevel(index)">
          <span  v-if="!item.edit">{{item.name}}</span>
          <a-input v-if="item.edit" v-model="editName"/> 
          <div class="sort-icon">
            <a-icon type="check" v-if="item.edit" @click="saveTags('three',item.id,index)"/>
            <a-icon type="edit" @click="editTags('three',index,item.name)" v-if="!item.edit"/>
            <a-icon type="delete"  v-if="!item.edit"  @click="delteTags('three',index,item.id)" />
            <a-icon type="close" v-if="item.edit" @click="closeTags('three',index)" />
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
      default:function(){
        return []
      }
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
      threeLevelShow:false,
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
    list(value,old){
      console.log(value,'value',old,'old')
      if(value.length>0){
        this.firstLevel = [...this.list]
        this.firstLevel[0].active = true
        this.pid = this.firstLevel[0].id
        this.firstIndex = 0
        if(this.firstLevel[0].childList.length>0){
            this.secondLevel = this.firstLevel[0].childList
            this.secondIndex = 0
          if(this.secondLevel[0].childList.length>0){
            this.threeLevel = this.secondLevel[0].childList
            this.threeLevel[0].active = true
          }
        }else{
           this.secondLevel = []
        }
      }else{
        this.firstLevel = []
        this.secondLevel = []
        this.threeLevel = []
      }
    },
    currentType(){
      this.firstAddShow = false
      this.threeAddShow = false
      this.secondAddShow = false
    }
    // currentType(key){
    //     console.log(key,'我切换tab了')
    //     if(key==1||key==0){
    //       this.getSortList()
    //     }
    // }
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
        item.edit = false
      })
      this.firstLevel[index].active = true
      this.secondLevel = this.firstLevel[index].childList
      if( this.secondLevel&&this.secondLevel.length>0){
        this.secondLevel.map(item=>{
          item.active = false
        })
        // this.secondLevel[0].active = true
        // if(this.secondLevel[0].childList.length>0){
        //   this.threeLevel = this.secondLevel[0].childList
        // }
      }
      this.threeLevelShow = false
    },
    handleSecondLevel(index){
      // this.pid = this.secondLevel[index].id
      this.secondIndex = index
      this.secondLevel.map(item=>{
        item.active = false
        item.edit = false
      })
      this.secondLevel[index].active = true
      this.threeLevel = this.secondLevel[index].childList || []
      if( this.threeLevel.length>0){
        this.threeLevel.map(item=>{
          item.active = false
        })
      }
      this.threeLevelShow = true
    },
    handlethreeLevel(index){
      this.threeLevel.map(item=>{
        item.edit = false
      })
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
      }else if(type=='second'){ 
        this.secondLevel[index].edit = false 
        params.pid =  this.firstLevel[this.firstIndex].id
      }else if(type == 'three'){
        this.threeLevel[index].edit = false 
        params.pid =  this.secondLevel[this.secondIndex].id
      }
      this.Request.post('/config/system/saveJson',params).then(res => {
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
        name:this.fristAdd,
        type:this.currentType,
      }
      if(this.fristAdd ==''){
        this.$message.warn('请输入字段名！')
        return false;
      }
      if(type=='second'){
        params.pid = this.firstLevel[this.firstIndex].id
      }
      if(type == 'three'){
         params.pid = this.secondLevel[this.secondIndex].id
      }
      this.Request.post('/config/system/saveJson',params).then(res => {
        console.log('新增',res.data.data)
        if(type=='first'){
          this.firstAddShow = false
          this.firstLevel.push(res.data.data)
          this.firstLevel.map(item=>{
            item.active = false
          })
          this.firstLevel[this.firstLevel.length-1].active = true
          this.secondLevel = []
          this.threeLevel = []
        }else if(type == 'second'){
          this.secondAddShow = false
          this.secondLevel.push(res.data.data)
          this.secondLevel.map(item=>{
            item.active = false
          })
          this.secondLevel[this.secondLevel.length-1].active = true
          this.threeLevel = []
        }else if(type == 'three'){
          this.threeAddShow = false
          this.threeLevel.push(res.data.data)
          this.secondLevel[this.secondIndex].childList =  this.threeLevel
        }
      })
      this.$forceUpdate()
    },
    editTags(type,index,name){
       this.editName = name
      if(type=='first'){
        this.firstLevel.map(item=>{
          item.edit = false
        })
        this.firstLevel[index].edit = true
      }else if(type=='second'){
        this.secondLevel.map(item=>{
          item.edit = false
        })
        this.secondLevel[index].edit = true
      }else if(type=='three'){ 
         this.threeLevel.map(item=>{
          item.edit = false
        })
        this.threeLevel[index].edit = true
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
              that.secondLevel = []
            }
             if(type=='second'){
              that.secondLevel.splice(index,1)
               that.threeLevel = []
               that.threeLevelShow = false
            }
             if(type=='three'){
              that.threeLevel.splice(index,1)
            }
          })
          that.$forceUpdate()
        },
      });
    },
    closeTags(type,index){
      console.log(this.firstLevel,index)
      if(type=='first'){
        this.firstLevel[index].edit = false
      }
       if(type=='second'){
        this.secondLevel[index].edit = false
      }
       if(type=='three'){
        this.threeLevel[index].edit = false
      }
       this.$forceUpdate()

    },
    addSort(type){
      this.fristAdd = ''
      if(type=='first'){
        this.firstAddShow = true
        this.threeAddShow = false
        this.secondAddShow = false
      }
      if(type=='second'){
        this.secondAddShow = true
        this.firstAddShow = false
        this.threeAddShow = false
      }
      if(type=='three'){
        this.threeAddShow = true
        this.secondAddShow = false
        this.firstAddShow = false
      }
    },
    deleteAddNewSort(type){
      if(type=='first'){
        this.firstAddShow = false
      }
      if(type=='second'){
        this.secondAddShow = false
      }
      if(type=='three'){
        this.threeAddShow = false
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
    height:80vh;
    overflow-y:scroll;
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
    .firstLi{
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

.sort::-webkit-scrollbar
{
	width: 6px;
	height:6px;
	background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
.sort::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
.sort::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
</style>
