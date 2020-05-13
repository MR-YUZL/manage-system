
<template>
    <div class='knowledgeBase'>
         <div class="search">
             <a-input-search placeholder="请输入关键词" style="width: 250px" @search="onSearch" />
         </div>
         <div class="content">
                <a-menu mode="inline" 
                    class="menu"
                    @click="handleChangeItem">
                    <template v-for="item in list">
                         <a-menu-item :key="item.id" v-if="!item.children || item.children.length == 0">
                            {{item.text}}
                        </a-menu-item>
                        <a-sub-menu v-if="item && item.children && item.children.length > 0" :key="item.id"> 
                            <span slot="title">{{item.text}}</span>
                            <a-menu-item v-for="(val) in item.children" :key="val.id">
                                <a-tooltip placement="bottomLeft">
                                    <template slot="title">
                                    {{val.text}}
                                    </template>
                                    {{val.text}}
                                </a-tooltip>
                            </a-menu-item>
                    </a-sub-menu>    
                    </template>
                </a-menu>
         </div>
    </div>
</template>

<script>

export default {
name:'knowledgeBase',
components: {},
data() {
    return {
        message:'',
        // openKeysList: [],
        list : [ {
            "id" : "9999",
            "text" : "未分组",
            "ext" : "",
            "state" : "",
            "attributes" : {
            "type" : "G"
            },
            "children" : []
        },{
            "id" : "222",
            "text" : "未分组222",
            "ext" : "",
            "state" : "",
            "attributes" : {
            "type" : "G"
            },
            "children" : [
                {
                    "id" : "229",
                    "text" : "飞洒地方dfafdsafdsfdf广泛受到法国大使馆犯得上广泛的孤独感",
                    "ext" : "",
                    "state" : "",
                    "attributes" : {
                    "type" : "G"
                    },
                },
                {
                    "id" : "2292",
                    "text" : "西方发达",
                    "ext" : "",
                    "state" : "",
                    "attributes" : {
                    "type" : "G"
                    },
                }
            ]
        } ],
    
    };
},
computed: {

},
watch: {},
//方法集合
methods: {
    selectFont(val){
        console.log(val)
        this.message = val
        this.$bus.$emit('message',this.message )
    },
    onSearch(value) {
      console.log(value);
    },
    //获取知识库信息
    getKnowledgeBase(){
        this.Request.get('hfw/tsmHfwKnowlegeGroup/listJson').then(res => {
          console.log('获取知识库信息',res.data)
        //   if(res.data.status){

        //   }
        })  
    },
    handleChangeItem(item, key, keyPath) {
        console.log(item, key, keyPath)
    
    },
   
},
created() {

},
mounted() {
    this.getKnowledgeBase()
},
 beforeDestroy() {
    this.$bus.$off('message',this.message )
  },
}
</script>
<style lang='less' scoped>
    .knowledgeBase{
       .search{
           text-align: center;
       }
       .content{
          padding: 15px 0; 
          .ant-menu-inline {
                border-right: 1px solid transparent;
            }
            .ant-menu-sub.ant-menu-inline > .ant-menu-item{
                padding-left: 24px !important;
            }
            .ant-menu-item,.ant-menu-submenu-title{
                height: 30px;
                line-height: 30px;
            }
        //   .title{
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     padding: 10px 0 0 0;
        //       span{
        //         font-size: 16px;
        //         font-weight: 500;
        //       }
              
        //   }
        //   .option{
        //       cursor: pointer;
        //       font-size: 14px;
        //       padding: 5px 0;
        //       overflow: hidden;
        //       text-overflow: ellipsis;
        //       white-space: nowrap;
        //   }
       }
       .ant-menu-submenu-title{
            padding-left: 0px !important;
            padding-right: 0px;
        }
    }
</style>