<template>
    <div class="">
       <a-page-header title="质检设置" />
       <div>
          <a-tabs :activeKey="activeKey" @change="clickTabs">
            <a-tab-pane :key="0" tab="会话质检项"></a-tab-pane>
            <a-tab-pane :key="1" tab="电话质检项目"></a-tab-pane>
          </a-tabs>
          <div class="flex btnArea" >
            <p>当前评分项目总分范围：{{range}}</p>
            <a-button type="primary" @click="addScoreItem">添加评分项</a-button>
          </div>
          <div> 
            <a-table :columns="columns"  :data-source="dataSource"  :pagination="false" :rowKey="record => record.id">
                <div slot="action" slot-scope="text,record,index">
                  <span class="blue" style="margin-right:10px;" @click="editItem(record)">编辑</span>
                  <span class="blue" @click="deleteItem(record.id)">删除</span>
                </div>
            </a-table>
          </div>
          <!-- <div style="padding-bottom:50px;"><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div> -->
       </div>
        <a-modal title="添加评分项" :visible="addScoreShow" v-if="addScoreShow" @ok="handleAddScoreOk" @cancel="handleAddScoreCancel">
            <a-form-model ref="addScoreForm" 
            :model="addScoreFormData" 
            :rules="rules" 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol"
            >
              <a-form-model-item label="评分项" prop="gradeName">
                <a-input v-model="addScoreFormData.gradeName"/>
              </a-form-model-item>
              <a-form-model-item label="说明" prop="gradeExplain">
                <a-input v-model="addScoreFormData.gradeExplain"/>
              </a-form-model-item>
              <a-form-model-item label="评分类型" prop="gradeType">
                <a-radio-group v-model="addScoreFormData.gradeType" :default-value="1">
                  <a-radio :value="0"> 加分项</a-radio>
                  <a-radio :value="1"> 扣分项 </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="得分分值" prop="gradeLimit">
                <a-input-number v-model="addScoreFormData.gradeLimit"/>
              </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
// import TablePagination from "@/components/Table/TablePagination";
export default {
    name: "",
    components: {
      // TablePagination
    },
    props:{},
    data() {
        return {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          activeKey:0,
          addScoreShow:false,
          addScoreFormData:{
            gradeName:'',
            gradeExplain:'',
            gradeLimit:'',
            gradeType:0
          },
          editScoreId:'',
          scroeType:'',
          range:'',
          rules:{
            gradeName: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
            gradeExplain: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
            gradeType: [
              { required: true, message: '请选择  ', trigger: 'blur' },
            ],
            gradeLimit: [
              { required: true, message: '请输入  ', trigger: 'blur' },
            ],
          },
          dataSource:[{}],
          // pager: {
          //   pageSizeOptions: ["10", "20", "30", "40", "50"],
          //   currentPage: 1,
          //   pageSize: 10,
          //   totalRecord: 0,
          //   totalPage: 0
          // },
          columns:[
            {
              title: '评分项',
              dataIndex: 'gradeName',
              key: '1',
            },
             {
              title: '说明',
              dataIndex: 'gradeExplain',
              key: '2',
              width: '20%',
            },
             {
              title: '评分类型',
              dataIndex: 'gradeType',
              key: '3',
              customRender:(value)=>{
                let obj = {
                  '0':'加分项',
                  '1':'扣分项'
                }
                return obj[value]
              }
            },
            {
              title: '得分范围',
              dataIndex: 'gradeLimit',
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
    created(){
      this.getList()
    },
    mounted(){},
    methods: {
      getList(){
        this.Request.get('/config/qc/getListJson?type='+this.activeKey).then(res => {
          console.log('质检设置list',res)
          let list = res.data.list
          this.dataSource = list
          this.range = res.data.totalGradeMin + '~' + res.data.totalGradeMax
        })
      },
      clickTabs(key){
        this.activeKey = key
      },
      paginationChange(){

      },
      handleAddScoreOk(){
        this.$refs.addScoreForm.validate(valid=>{
          if(valid){
            console.log(this.addScoreFormData)
            let params = {...this.addScoreFormData,type:this.activeKey}
            if(this.scroeType == 'edit'){
              params.id = this.editScoreId
            }
            this.Request.post('/config/qc/saveGrade',params).then(res => {
              console.log('质检设置保存',res)
              this.$message.success('保存成功')
              this.addScoreFormData = {
                  gradeName:'',
                  gradeExplain:'',
                  gradeLimit:'',
                  gradeType:0
              }
              this.$refs.addScoreForm.resetFields()
              this.addScoreShow = false
              this.getList()
            })
          }
        })
      },
      handleAddScoreCancel(){
        this.addScoreShow = false
        this.addScoreFormData = {
          gradeName:'',
          gradeExplain:'',
          gradeLimit:'',
          gradeType:0
        }
        this.$refs.addScoreForm.resetFields()
      },
      addScoreItem(){
        this.addScoreShow = true
        this.scroeType = 'add'
      },
      editItem(record){
         console.log('编辑================',this.scroeType)
        this.addScoreShow = true
        this.scroeType = 'edit'
        let {gradeName,gradeExplain,gradeLimit,gradeType,id} = record
        this.addScoreFormData = {
            gradeName,
            gradeExplain,
            gradeLimit,
            gradeType,
          }
        this.editScoreId = id 
         
      },
      deleteItem(id){
        let that = this
         this.$confirm({
            title: '',
            content: <div style="color:red;">删除评分项会改变现有评分内容，是否确认删除？</div>,
            onOk() {
              that.Request.post('/config/qc/deleteGrade',{id}).then(res => {
                that.$message.success('删除成功')
                that.getList()
                console.log(res)
              })
            },
            onCancel() {
           
            },
          });
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
