<template>
    <div class="tags">
        <div class="header">
          <span class="tagsIcon">访客标签</span>
          <span class="setting" @click="tagsFn">设置标签</span>  
        </div>
        <div class="tag_item" v-bind:class="{ expansion : active }">
          <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn"  v-if="tagsList && tagsList.length" />
          <div class="tag">
            <a-tag v-for="(item,index) in tagsList" :key="index">
              {{item.name}}
            </a-tag>
          </div>
        </div>
        <div class="aaa">
          <a-modal title="访客标签"  :visible="tagsModalShow" @cancel="handleCancelTags" @ok="handleOkCancelTags">
              <div class="flex" >
                <div style="width:150px;">访客标签：</div>
                <div >
                  <template v-for="(tag,index) in allTags" style="margin-bottom:10px;">
                    <a-checkable-tag
                      :key="tag.id"
                      v-model="tag.checked"
                      @change="checked => handleChange(tag, checked,index)"
                    >
                    {{ tag.name }}
                    </a-checkable-tag>
                  </template>
                </div>
              </div>
          </a-modal>
        </div>
    </div>
</template>
<script>
export default {
  name:'tags',
  props:{
    guestId:{  // 访客id
      type:String,
      default:''
    }
  },
  components:{
  },
  data(){
      return{
          tagsModalShow:false,
          allTags:[],
          tagsList:[],
          visible:false,
          active:true,
          tagsModal:{
            title:'访客标签',
            visible:false
          },
      }
    },
    watch:{
      guestId(){
        this.getTags()
      }
    },
    created(){
      this.getTags()
    },
    methods:{
      //访客设置标签时获取单位下所有维护的访客标签
      getAllTags(){
        this.allTags=[]
        this.Request.get('/hfw/workbench/getAllGuestLabel').then(res => {
          let data = res.data.list
          if(data.length>0){
            this.tagsModalShow = true
            this.allTags = data
           this.allTags.map(it=>{
             if(this.tagsList.length>0){
               this.tagsList.map(item=>{
              if(it.name == item.name){
                  it.checked = true
                }
              })
             }
           })
          }else{
            this.tagsModalShow = false
            this.$message.warning('请联系管理员-前往系统属性设置维护访客标签选项值!')
          }
        })
      },
      //获取tags  参数  guestId  访客id
      getTags(){
        this.Request.get('/hfw/workbench/getGuestLabel?guestId='+this.guestId).then(res => {
          console.log('标签tags',res.data)
          this.tagsList = res.data.list
        })
      },
      // 设置访客标签
      tagsFn(){
       this.getAllTags()
       
      },
      handleCancelTags(){
        this.tagsModalShow = false
      },
      handleOkCancelTags(){
       
        let params = {
          guestId:this.guestId,
          tagIds:[]
        }
         this.allTags.map(item=>{
          if(item.checked){
            params.tagIds.push(item.id)
          }
        })
        console.log('选中的标签',params.tagIds)
        if( !params.tagIds.length){
          this.$message.warn('请选择要设置的标签');
          return false
        }
        this.Request.post('/hfw/workbench/saveGuestLabel',params).then(res => {
          console.log('标签selectTags',res.data)
          this.$message.success('设置标签成功！')
          this.tagsModalShow = false
          this.getTags()
        })
      },
      showFn(){
        this.active = !this.active
      },
      handleChange(tag, checked,index) {
        this.allTags[index].checked = checked
        this.$forceUpdate()
      },
    }
}
</script>
<style lang="less" scoped>
.tagsIcon{
  padding-left:24px;
  background:url('../../assets/imgs/text-icon2.png') left center no-repeat;
}
    .tags{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            margin-bottom:23px;
            .setting{
                color:#3E7BF8;
                cursor: pointer;
            }
        }
        .tag_item{
            position: relative;
            overflow: hidden;
            min-height: 37px;
            .icon{
              position: absolute;
              right: 0;
              top: 0px;
            }
            .tag{
              width: 93%;
              display: flex;
              flex-wrap: wrap;
              span{
                display:block;
                margin-right:10px;
                background:#e5f2ff;
                padding:0 20px;
                height:26px;
                line-height:26px;
                border-radius:30px;
                margin-bottom:20px;
                color:#3e7bf8;
                border:none;
              }
            }
        }
        .expansion{
          height: 37px;
        }
    }
</style>
<style lang="less">
  .ant-tag, .ant-tag a, .ant-tag a:hover{
    margin-right:10px;
    background:#e5f2ff;
    padding:0 20px;
    height:26px;
    line-height:26px;
    border-radius:30px;
    margin-bottom:20px;
    color:#3e7bf8;
    border:none;
    margin-bottom:0;
  }
  .ant-tag-checkable-checked{
    background:#3e7bf8;
    color:#fff;
  }
  .ant-tag-checkable{ margin-bottom:10px;}
</style>