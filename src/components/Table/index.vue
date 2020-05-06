<template>
    <div class="table">
        <a-table :columns="columnsList" :dataSource="dataList" :pagination=false 
            :rowSelection=" paginationStatus.isSelect == true ? {selectedRowKeys: selectedRowKeys, onChange: onSelectChange}:null" :scroll="{x:1300}">
            <a slot="name" slot-scope="text">{{ text }}</a>
             <span slot="tags" slot-scope="tags">
                 <div>{{tags.tagsName}}</div>
                <a-tag
                    v-for="tag in tags.tagsList"
                    :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
                    :key="tag"
                >
                    {{tag.toUpperCase()}}
                </a-tag>
             </span>  
             <span slot="tels" slot-scope="tels">
                <a>图片</a>
                <span>{{tels}}</span>
             </span>  
             <span slot="action" slot-scope="action,records">
                 <!-- {{action}} -->
                 <span
                    v-for="(record,index) in action"
                    :key="record"
                    @click="actionFun(action,records,index)"
                    class="action"
                >
                    <a>{{record}}</a>
                </span>
                <!-- <a-divider type="vertical" /> -->
            </span> 
          
        </a-table>
        <div class="pagination">
          <a-pagination :total="50" showSizeChanger showQuickJumper :showTotal="total => `共 ${total} 条`" 
            @change="change" @showSizeChange="showSizeChange"/>
        </div>
        
    </div>
</template>
<script>
 
  export default {
    props: ['columnsList','paginationStatus'],
    data() {
      return {
        selectedRowKeys: [],
        dataList:[],
        //表格数据
        dataList1 : [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                tels:'18777777777',
                address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                tags: {
                    tagsName:'红牛',
                    tagsList:['nice', 'developer'],
                },
               
            },
            {
                key: '14',
                name: 'John Brown',
                age: 32,
                tels:'18777777778',
                address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                tags:{
                     tagsName:'红牛',
                     tagsList:['nice', 'developer'],
                } 
              
            },
           
        ],
      };
    },
    watch:{
        //监听表格数据请求传参变化
        paginationStatus:{
            handler(newVal,oldVal){
                if(JSON.stringify(newVal) != JSON.stringify(oldVal)){
                    this.getTableData()
                }
            
            },
            deep:true
        }
    },
    mounted(){
        console.log(this.paginationStatus)
        this.getTableData()
    },
    methods:{
        //页码改变的回调
        /*****
         * page 页数
         * pageSize  条数
         * 
         * *** */
        change(page, pageSize){
           
            this.paginationStatus.params.page= page
            this.paginationStatus.params.pageSize= pageSize
            console.log(this.paginationStatus)
          
            // this.getTableData()
        },

        //pageSize 变化的回调
        /***
         * current  页数
         * size     条数
         * **/
        showSizeChange(current, size){
            console.log(current, size)
            this.paginationStatus.params.page= current
            this.paginationStatus.params.pageSize= size
        },
        onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },

      //获取表格数据
      getTableData(){
        console.log('------')
        this.dataList = []
        if(this.paginationStatus.methods == 'get'){
            this.Request.get(this.paginationStatus.url,this.paginationStatus.params).then(res => {
                console.log(res)
            })
        }else if(this.paginationStatus.methods == 'post'){
            this.Request.post('/home/entp').then(res => {
                console.log(res)
            })
                    
        }
        //绑定操作的事件    
        this.dataList1.map(item => {
            item.action = this.paginationStatus.action,
            item.events = this.paginationStatus.events
            this.dataList.push(item)
        })
         
      },
     
      //操作事件
      actionFun(action,records,index){
          console.log(records.events[index])
          this.$emit('actionFn',records.events[index])

      }
    }    
    
  };
</script>
<style lang="less" scoped>
    .table{
        .action{
            padding: 0 10px;
            border-left:1px solid #e8e8e8;
            &:nth-of-type(1){
                border-left:1px solid  transparent;
            }
        }
    }
    .pagination{
      padding:20px 0;
      display:flex;
      justify-content:flex-end;
     
    }
</style>