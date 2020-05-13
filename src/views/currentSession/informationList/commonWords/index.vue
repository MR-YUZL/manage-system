
<template>
    <div class='commonWords'>
         <div class="search">
             <a-input-search placeholder="请输入关键词" style="width: 250px" @search="onSearch"  />
         </div>
         <div class="content">
             <div v-for="(item,index) in list" :key="index">
                 <div class="title">{{item.title}}</div>
                 <div v-for="(val,i) in item.list" :key="i" class="option" @click="selectFont(val)">
                     <a-tooltip placement="bottomLeft">
                        <template slot="title">
                        {{val}}
                        </template>
                        {{val}}
                    </a-tooltip>
                 </div>
             </div>
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
        list:[{
            title:'fdsafdsf',
            list:['ffsafddsafsafdsafdsafdsafdsafdsafdsfadsfsaefasdf嘎嘎嘎efasdf嘎嘎嘎efasdf嘎嘎嘎efasdf嘎嘎嘎','fsadfasdfsadfsdaf']
        },{
            title:'fdsafdsf',
            list:['ffsafddsafsafdsa','fsadfasdfsadfsdaf']
        },{
            title:'fdsafdsf',
            list:['ffsafddsafsafdsa','fsadfasdfsadfsdaf']
        }]
    };
},
computed: {},
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
},
created() {

},
mounted() {

},
 beforeDestroy() {
    this.$bus.$off('message',this.message )
  },
}
</script>
<style lang='less' scoped>
    .commonWords{
       .search{
           text-align: center;
       }
       .content{
          padding: 15px; 
          .title{
              font-size: 16px;
              padding: 15px 0 0 0;
              font-weight: 500;
          }
          .option{
              cursor: pointer;
              font-size: 14px;
              padding: 5px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
          }
       }
    }
</style>