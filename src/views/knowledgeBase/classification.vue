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
        <li v-for="(item,index) in firstLevel " :key="index" :class="{active:item.active == true}" @click="handleFirstLevel(index)">
          <span  v-if="!item.edit">{{item.groupName}}</span>
          <a-input @click.stop v-if="item.edit" v-model="editName"/> 
          <div class="sort-icon" @click.stop>  
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
  
  },
  data() {
    return {
      firstLevel:[],
      editName:'',
      firstAddShow:false,
      fristAdd:'',
    
      pid:'',
      firstIndex:'',
    }
  },
  watch:{
  
  },
  created(){
    this.getSortList()
  },
  mounted(){},
  methods: {
    getInit(){

    },
    getSortList(){
     
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/listJson').then(res => {
        if(res.data.status){
            let obj = res.data.list[0]
            obj['active'] = true
            this.$set(this.firstLevel,0,obj)
            this.firstLevel = [...res.data.list]
            this.$store.commit('getClassificationId',this.firstLevel[0].id)
        }
      })
    },
    handleFirstLevel(index){
      this.pid = this.firstLevel[index].id
      this.firstIndex = index
      this.firstLevel.map(item=>{
        item.active = false
        item.edit = false
      })
      let obj = this.firstLevel[index]
      obj['active'] = true
      this.$set(this.firstLevel,index,obj)
      this.$store.commit('getClassificationId',this.firstLevel[index].id)
     
    },
   
    
    saveTags(type,id,index){
      // id name  type pid   id 用于编辑  pid 用于新增 父类的
      if(this.editName ==''){
        this.$message.warn('分类名不能为空！')
        return false;
      }
      let params = {
        id,
        groupName:this.editName,
        
      }
      if(type=='first'){
        this.firstLevel[index].edit = false 
      }
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/saveJson',params).then(res => {
        if(type=='first'){
          this.firstLevel[index].groupName = res.data.data.groupName
        }
      })
      this.$forceUpdate()
    },
    saveNewTags(type){
      let params = {
        groupName:this.fristAdd,
        
      }
      if(this.fristAdd ==''){
        this.$message.warn('请输入分类名！')
        return false;
      }

      this.Request.post('/hfw/tsmHfwKnowlegeGroup/saveJson',params).then(res => {
        if(type=='first'){
          this.firstAddShow = false
          this.getSortList()
        //   this.firstLevel.push(res.data.data)
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
          that.Request.post('/hfw/tsmHfwKnowlegeGroup/delJson',{id}).then(res => {
            if(type=='first'){
              that.firstLevel.splice(index,1)
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
  border-right:1px solid #e6e6e6;
  .sort{
    // margin:0 15px;
    box-sizing: border-box;
    width:340px;
    ul{
    //   border-top:1px solid #e6e6e6;
       .all{
          line-height: 40px;
      }
    }
    li{
      cursor: pointer;
      padding-right:15px;
      padding-left:16px;
      height:60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    //   border-bottom:1px solid #e6e6e6;
    //   border-left:1px solid #e6e6e6;
    //   border-right:1px solid #e6e6e6;
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
        // display: block;
        i{
          margin:0 10px;
        }
      }
    }
    li.active{
    
      .sort-icon{
        display: block;
        i{
          margin:0 10px;
        }
      }
    }
    li:nth-of-type(2){
        // border-top:1px solid #e6e6e6;
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
