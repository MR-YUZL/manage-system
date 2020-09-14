<template>
  <div class="addSort scroll">
    <div class="sort">
      <ul>
        <li class="firstLi" v-if="isShow">
          <div v-if="groupAddShow" class="firstLiDiv">
            <a-input  v-model="groupAdd" placeholder="请输入" :maxLength="10" style="width:200px;" /> 
            <div class="sort-icon" v-if="isShow">
              <a-icon type="check" @click="saveNewTags()"/>
              <!-- <a-icon type="delete" @click="deleteAddNewSort()"/> -->
              <a-icon type="close" @click="deleteAddNewSort()" />
            </div>
          </div>
          <div class="addSortStyle" @click="addSort()"  v-if="!groupAddShow"><a-icon type="plus" />   添加分类</div>
        </li>
        <li v-for="(item,index) in groupList " :key="index" :class="{active:item.active == true}" @click="handlegroupList(index)">
          <span  v-if="!item.edit">{{item.groupName}}</span>
          <a-input @click.stop v-if="item.edit" v-model="editName" :maxLength="10" style="width:200px;" /> 
          <div class="sort-icon" v-if="item.id!='' && isShow && !item.isEdit" @click.stop>  
            <a-icon type="check" v-if="item.edit" @click="saveTags('first',item.id,index)"/>
            <a-icon type="edit" @click="editTags(index,item.groupName)" v-if="!item.edit"/>
            <a-icon type="delete" @click="delteTags(index,item.id)" v-if="isLook" />
            <a-icon type="close" @click="closeTags(index,item.id)" v-if="!isLook"/>
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
  props:["isShow"],
  data() {
    return {
      groupList:[],
      editName:'',
      groupAddShow:false,
      groupAdd:'',
      pid:'',
      firstIndex:'',
      isEdit:true,
      isDelete:true,
      isLook:true
    }
  },
  watch:{},
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
            // let obj = res.data.list[0]
            // obj['active'] = true
            // this.$set(this.groupList,0,obj)
            this.groupList = [...res.data.list]
            this.groupList.unshift({groupName:'全部分类',id:'',active:false})
            let obj = this.groupList[0]
            obj['active'] = true
            this.$store.commit('getClassificationId',this.groupList[0].id)
        }
      })
    },
    handlegroupList(index){
      this.pid = this.groupList[index].id
      this.firstIndex = index
      this.groupList.map(item=>{
        item.active = false
        item.edit = false
      })
      let obj = this.groupList[index]
      
      obj['active'] = true
      this.$set(this.groupList,index,obj)
      this.$store.commit('getClassificationId',this.groupList[index].id)
      this.isLook = true
    },
   
    saveTags(type,id,index){
      // id name  type pid   id 用于编辑  pid 用于新增 父类的
      if(this.editName ==''){
        this.$message.warn('分类名不能为空！')
        return false;
      }
      if(this.groupList[index].groupName == this.editName){
        console.log('111')
        return false;
      }
      let params = {
        id,
        groupName:this.editName,
      }
      if(type=='first'){
        this.groupList[index].edit = false 
      }
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/saveJson',params).then(res => {
        if(type=='first'){
          this.groupList[index].groupName = res.data.data.groupName
        }
      })
      this.$forceUpdate()
    },
    saveNewTags(){
      let params = {
        groupName:this.groupAdd,
      }
      if(this.groupAdd ==''){
        this.$message.warn('请输入分类名！')
        return false;
      }
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/saveJson',params).then(() => {
        this.groupAddShow = false
        this.$message.success('操作成功！')
        this.getSortList()
      })
    },
    editTags(index,name){
      this.editName = name
      this.groupList.map(item=>{
        item.edit = false
      })
      this.groupList[index].edit = true
      this.isLook = false
      this.$forceUpdate()
    },
    delteTags(index,id){
      let that = this
       this.$confirm({
        content:<div style="color:red;">确定要删除这个分类吗？</div>,
        onOk() {
          that.Request.get('/hfw/tsmHfwKnowlegeGroup/delJson',{id}).then(() => {
            that.$message.success('刪除成功')
            that.getSortList()
          })
        },
      });
    },
    closeTags(index,id){
      
      this.editName = ''
      this.groupList.map(item=>{
        item.edit = false
      })
      this.isLook = true
    },
    addSort(){
      this.groupAdd = ''
      this.groupAddShow = true
    },
    deleteAddNewSort(){
      this.groupAddShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.addSort{
  display:flex;
  margin-right:20px;
  border-right:1px solid #e6e6e6;
  height: calc(100vh - 112px);
  overflow-x: auto;
  .sort{
    // margin:0 15px;
    box-sizing: border-box;
    width:300px;
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
        display: flex;
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
        display: flex;
        i{
          margin:0 10px;
        }
      }
      input{
        width:220px;
      }
      .addSortStyle{
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
