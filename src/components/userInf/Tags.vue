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
              {{item}}
            </a-tag>
          </div>
        </div>
        <div class="aaa">
          <Modal  :currentModal="tagsModal">
              <div slot="content">
                <BaseForm 
                  :formObject="formObjectTags"
                  @toggleModal="clueToggleModal"
                  @formSubmit="formSubmitTags">
                </BaseForm>
              </div>
          </Modal>
        </div>
    </div>
</template>
<script>
import Modal from '../Modal/index'
import BaseForm from '../BaseForm/index'
export default {
  name:'tags',
  props:{
    guestId:{  // 访客id
      type:String,
      default:''
    }
  },
  components:{
    Modal,
    BaseForm
  },
  data(){
      return{
          allTags:[],
          tagsList:[],
          visible:false,
          active:true,
          tagsModal:{
            title:'',
            visible:false
          },
          formObjectTags:{
            type:'modalForm',
            ref: "modalFormTags",
            sureBtn:'确定',
            defaultValues:{},
            modelList:[
              {
                type: "tag",
                label: "访客标签",
                ruleName: "linkName",
                options:[]
              },
             ]
          }
      }
    },
    created(){
      
    },
    methods:{
      //访客设置标签时获取单位下所有维护的访客标签
      getAllTags(){
        this.allTags=[]
        this.Request.get('/hfw/workbench/getAllGuestLabel').then(res => {
          let data = res.data.list
          if(data.length>0){
            data.map((item)=>{
              this.allTags.push({
                key:item.id,
                value:item.name,
              })
            })
          }
          this.formObjectTags.modelList[0].options =  this.allTags
          console.log('所有标签',data)
        })
      },
      //获取tags  参数  guestId  访客id
      getTags(){
        this.Request.get('/hfw/workbench/getGuestLabel?guestId='+this.guestId).then(res => {
          console.log('标签tags',res.data)
          this.tagsList = res.data.data
        })
      },
      tagsFn(){
       this.getAllTags()
       this.tagsModal.visible = true
      },
      showFn(){
        this.active = !this.active
      },
      // formData(data){
      //   this.$emit('submitTags',data.data)
      //   this.modelObj.visible = data.visible
      // },
      formSubmitTags(data){
        console.log('提交的数据',data)
        // let obj = data
        // let params = {
        //   guestId:this.guestId,
        //   tagIds:[]
        // }
        // obj.tag.map( item => {
        //   params.tagIds.push(item.key)
        // })
        // this.Request.post('/hfw/workbench/saveGuestLabel',{...params}).then(res => {
        //   console.log('标签selectTags',res.data)
        //   this.getTags()
        // })
      },
      clueToggleModal(){
        this.tagsModal.visible = false
      }
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
</style>