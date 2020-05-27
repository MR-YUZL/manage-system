<template>
  <div>
    <!-- {{ num }} -->
    <a-button type="primary" @click="click" >Primary</a-button>
    <Table :columns-list="columnsList" :pagination-status="paginationStatus" @actionFn="actionFn" />
    
  </div>
</template>

<script>
import Table from "./../../../components/Table"
export default {
  data: () => ({
    //分页请求参数
    paginationStatus:{
      url:'xxxxxxxx',
      method:'',
      isSelect:true,
      params:{
        id:'1',
        state:'aaaa',
        page:1,
        pageSize:10
      },
      action:['编辑','删除'],
      events:['update','delete']
    },

    
  //表头数据
  columnsList : [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address 1',
       width: 280,
      // ellipsis: true,
    },
    {
      title: 'Long Column Long Column Long Column',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
    },
    {
      title: 'Long Column',
      dataIndex: 'address',
      key: 'address 4',
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'tels',
      key: 'tels',
      // ellipsis: true,
      scopedSlots: { customRender: 'tels' },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      scopedSlots: { customRender: 'tags' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      scopedSlots: { customRender: 'action' },
    },
  ],
 
  }),
  components: {
    Table
  },
  mounted() {
    
  },
  methods: {
    click(){
      this.paginationStatus = {
      url:'aaaaa',
      methods:'post',
      params:{
        id:'2',
        state:'2222'
       },
      action:['编辑','删除'],
      events:['update','delete']
      }
      
    },
    actionFn(data){
      console.log(data)
      this.paginationStatus = {
        url:'bbbb',
        method:'',
        params:{
          id:'2',
          state:'bbbb'
        },
        action:['编辑','删除'],
        events:['update','delete']
      }
    }
  },
  watch: {},
  computed: {
    num() {
      return this.$store.state.count;
    }
  }
};
</script>
