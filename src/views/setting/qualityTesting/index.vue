<template>
    <div class="">
       <a-page-header title="质检设置" />
       <div>
          <a-tabs :activeKey="activeKey" @change="clickTabs">
            <a-tab-pane key="1" tab="会话质检项"></a-tab-pane>
            <a-tab-pane key="2" tab="电话质检项目"></a-tab-pane>
          </a-tabs>
          <div class="flex btnArea" >
            <p>当前评分项目总分范围：-5-15</p>
            <a-button type="primary" @click="addScoreItem">添加评分项</a-button>
          </div>
          <div>
            <a-table :columns="columns"  :data-source="dataSource">
                <div slot="action" slot-scope="row">
                  <span class="blue" style="margin-right:10px;" @click="editItem">编辑</span>
                  <span class="blue" @click="deleteItem">删除</span>
                </div>
            </a-table>
          </div>
          <div style="padding-bottom:50px;"><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div>
       </div>
        <a-modal title="添加评分项" :visible="addScoreShow" v-if="addScoreShow" @ok="handleAddScoreOk" @cancel="handleAddScoreCancel">
            <a-form-model ref="addScoreForm" 
            :model="addScoreFormData" 
            :rules="rules" 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol"
            >
              <a-form-model-item label="评分项" prop="name">
                <a-input v-model="addScoreFormData.name"/>
              </a-form-model-item>
              <a-form-model-item label="说明" prop="explain">
                <a-input v-model="addScoreFormData.explain"/>
              </a-form-model-item>
              <a-form-model-item label="评分类型" prop="type">
                <a-radio-group v-model="addScoreFormData.type" :default-value="1">
                  <a-radio :value="1"> 加分项</a-radio>
                  <a-radio :value="2"> 扣分项 </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="得分分值" prop="score">
                <a-input v-model="addScoreFormData.explain"/>
              </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
export default {
    name: "",
    components: {
      TablePagination
    },
    props:{},
    data() {
        return {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          activeKey:'1',
          addScoreShow:false,
          addScoreFormData:{
            name:'',
            explain:'',
            score:'',
            type:''
          },
          rules:{
            name: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
            explain: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
            score: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
            type: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
          },
          dataSource:[{}],
          pager: {
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            currentPage: 1,
            pageSize: 10,
            totalRecord: 0,
            totalPage: 0
          },
          columns:[
            {
              title: '评分项',
              dataIndex: 'name',
              key: '1',
              
            },
             {
              title: '说明',
              dataIndex: 'explain',
              key: '2',
              width: '20%',
            },
             {
              title: '评分类型',
              dataIndex: 'type',
              key: '3',
            },
            {
              title: '得分范围',
              dataIndex: 'scroe',
              key: '4',
            },
             {
              title: '操作',
              dataIndex: 'action',
              fixed:'right',
              key: '5',
              scopedSlots: { customRender: 'action' },
            }
          ]
        }
    },
    created(){},
    mounted(){},
    methods: {
      clickTabs(key){
        this.activeKey = key
      },
      paginationChange(){

      },
      handleAddScoreOk(){
        this.$refs.addScoreForm.validate(valid=>{
          if(valid){
            console.log(this.addScoreFormData)
          }
        })
      },
      handleAddScoreCancel(){
        this.addScoreShow = false
      },
      addScoreItem(){
        this.addScoreShow = true
      },
      editItem(){
        this.addScoreShow = true
      },
      deleteItem(){
          this.$message.success('删除成功')
      } 
    }
}
</script>

<style lang="less" scoped>
.btnArea{
  padding:20px;
  justify-content: space-between;;
}
</style>
