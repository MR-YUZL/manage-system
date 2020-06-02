<template>
    <div class="">
      <a-page-header title="技能组" />
      <div class='skillGroup'>
        <div class="skillGroupSide">
            <div class="addGroup">
              <div v-if="!addSkillShow" @click="addSkill" style="height:32px"><a-icon type="plus" />添加技能组</div>
              <div class="flex-between" v-if="addSkillShow">
                <a-input placeholder="请输入名称" style='width:150px;' v-model="addGroupName" /><a-icon type="check" @click="addSkillGroup"/><a-icon type="delete"  @click="deleteAddSkillGroup"/>
              </div>
            </div>
            <div class="searchGroup">
              <a-input-search v-model="groupName" placeholder="搜索技能组名称" style="width: 100%" @search="onSearch" />
            </div>
            <p class="title">技能组列表（{{skillGroups.length}}）</p>
            <ul>
              <li v-for="(item,index) in skillGroups" :key="index" :class="{'active':item.active}" @click="changeGroups(index,item.groupId)">
                <span v-if="!item.editShow">{{item.groupName}}</span>
                <span v-if="item.editShow"><a-input v-model="eidtName"  /></span>
                <a-icon v-if="item.editShow" type="check" @click='okSkillGroup(item.groupId)'/>
                <a-icon v-if="!item.editShow" type="edit" @click="editSkillGroup(index,item.groupName)"/>
                <a-icon type="delete"  @click="deleteSkillGroup(item.groupId)"/>
              </li>
            </ul>
        </div>
        <div class="skillGroupMain">
          <div class="flex-between"><a-input-search placeholder="请输入名称" v-model="userName" style='width:250px;' @search="searchMemmber"/><a-button type="primary" @click="staffManage">成员管理</a-button></div>
          <div class="ulstyle">
            <strong>成员：{{staffList.length}}人</strong>
            <ul>
              <li v-for="(item,index) in staffList" :key="index">
                <img :src="item.imgUrl" alt="">
                <div>
                  <p>{{item.userName}}</p>
                  <span>{{item.phone}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <a-modal title="成员管理（小组名称）" :visible="staffManageShow" v-if="staffManageShow" @cancel="handleCancelStaff" @ok="handleOkStaff">
        <a-transfer
          :data-source="allStaffList"
           show-search
          :target-keys="targetKeys"
          :render="item => item.title"
          :show-select-all="false"
          @change="handleChange"
          @search="handleSearch"
        />
     
      </a-modal>
    </div>
</template>
<script>

export default {
    name: "",
    components: {},
    props:{},
    data() {
        return {
          staffManageShow:false,
          groupName:'',
          addSkillShow:false,
          skillGroups:[],
          eidtName:'',
          addGroupName:'',
          staffList:[],
          targetKeys:[],
          // dataSource:[],
          // staffListAll:[],
          userName:'',
          currentGroupId:'',
          allStaffList:[]
      } 
    },
    computed:{
    },
    created(){
      this.getStaffSkillGroups()
      this.getStaffList('','all')
    },
    mounted(){},
    methods: {
      onSearch(){
        this.getStaffSkillGroups()
      },
      searchMemmber(){
        this.getStaffList(this.currentGroupId)
      },
      addSkill(){
        this.addSkillShow =  true
      },
      // 新增技能组
      addSkillGroup(){
        let params = {
          groupName:this.addGroupName
        }
        this.Request.post('/staff/hfwStaffSkillGroups/editJson',params).then(()=>{
          this.getStaffSkillGroups()
        })
      },
      deleteAddSkillGroup(){
        this.addSkillShow =  false
      },
      // 编辑技能组
      okSkillGroup(id){
        let params = {
          groupId:id,
          groupName:this.eidtName
        }
        this.Request.post('/staff/hfwStaffSkillGroups/editJson',params).then(()=>{
          this.getStaffSkillGroups()
        })
      },
      editSkillGroup(index,name){
        this.skillGroups[index].editShow=true
        this.eidtName = name
      },
      deleteSkillGroup(id){
        let params = {
          groupId:id
        }
        this.Request.post('/staff/hfwStaffSkillGroups/delJson',params).then(()=>{
          this.getStaffSkillGroups()
        })
      },
      //成员管理
      staffManage(){
        this.staffManageShow = true
      },
      // 获取技能组
      getStaffSkillGroups(){
        let params = {
          groupName:this.groupName
        }
        this.skillGroups = []
        console.log('咋地没东西了')
        this.Request.get('/staff/hfwStaffSkillGroups/listJson',params).then(res=>{
          console.log('技能组列表',res.data)
          let list = res.data.list
          list.map(item=>{
            this.skillGroups.push({
              groupId:item.groupId,
              groupName:item.groupName,
              active:false,
              editShow:false
            })
          })
          this.skillGroups[0].active = true
          this.getStaffList(this.skillGroups[0].groupId)
          this.currentGroupId = this.skillGroups[0].groupId
        })
      },
      // 获取技能组员工列表
      getStaffList(groupId,type){
        let params = {}
        if(type&&type=="all"){
             params = {}
        }else{
          params = {
            groupId, 
            userName:this.userName
          }
        }
        this.Request.get('/staff/hfwStaffSkillGroupsMember/staffList',params).then(res=>{
          console.log(res.data.list,'技能组员工列表')
          let list = res.data.list
          if(type&&type=="all"){
            this.allStaffList = list
            console.log('所有列表',list)
            this.allStaffList.map(item=>{
              item.title = item.userName
              item.key = item.userAccount
            })
          }else{
            this.staffList = list
            this.staffList.map(item=>{
              this.targetKeys.push(item.userAccount)
            })
          }
          this.$forceUpdate()
        })
      },
      // getStaffListAll(){
      //    this.Request.get('/staff/hfwStaffSkillGroupsMember/staffList',{}).then(res=>{
      //       console.log('所有的员工列表管理',res.data.list)
      //    })
      // },
      // 成员列表
       getMemberList(){
        this.Request.post('/staff/hfwStaffMemberRole/addressJson',{}).then(res=>{
          let list = res.data.list
          this.treeData = this.treeChangeData(list)
          console.log('批量匹配成员列表',list)
        })
      },
      changeGroups(index,id){
        this.skillGroups.map(item=>{
          item.active = false
        })
        this.skillGroups[index].active = true
        this.getStaffList(id)
        this.currentGroupId = id
        this.userName = ''
      },
      handleCancelStaff(){
        this.staffManageShow = false
      },
      handleOkStaff(){
        let params = {
          groupId:this.currentGroupId,
          staffs:[...this.targetKeys]
        }
        this.Request.post('/staff/hfwStaffSkillGroupsMember/staffGroupEdit',params).then(res=>{
          console.log(res.data,'保存成员管理')
          this.$message.success('成员保存成功!')
          this.getStaffList(this.currentGroupId)
          this.staffManageShow = false
        })
      },
      handleChange(targetKeys, direction, moveKeys){
        this.targetKeys = targetKeys;
      },
      handleSearch(){}
    }
}
</script>

<style lang="less" scoped>
.skillGroup{
  display:flex;
  .skillGroupSide{
    padding:15px 0;
    width:220px;
    border-right:1px solid #e9e9e9;
    .flex-between{
      align-items: center;
    }
    .addGroup{
     padding:0 15px;
     margin-bottom:10px;
    }
    .searchGroup{
      padding: 0 15px;
    }
    .title{
      font-weight:bold;
      margin:10px 0;
      padding:0 15px;
    }
    ul{
      li{
        margin: 10px 0;
        padding:10px 15px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        span{
          display:block;
          width:140px;
        }
        i{
          display:none;
        }
      }
      li.active,li:hover{
        background:#e4f6ff;
        i{
          display:block;
        }
      }
    }
  }
  .skillGroupMain{
    .ulstyle{
      padding:20px;
      strong{
        margin-bottom:40px;
        display:block;
      }
    }
    flex:1;
    .flex-between{
      padding:20px;
      border-bottom:1px solid #e9e9e9;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
      li{
        width:25%;
        display: flex;
        margin-bottom:40px;
        img{
          margin-right:10px;
          display:block;
          width:40px;
          height:40px;
          border-radius: 50%;;
        }
        p{
          margin-bottom:0;
          color:#333
        }
        span{
          color:#a6a6a6;
        }
      }
    }
  }
}
</style>
