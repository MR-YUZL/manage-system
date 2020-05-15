<template>
  <div>
    <a-modal v-model="visible" title="导入客户" @ok="handleOk" :footer="null">
      <a-steps :current="1" size="small">
        <a-step title="上传文档" />
        <a-step title="匹配字段" />
        <a-step title="完成" />
      </a-steps>
      <div class="firstStep" v-if="step=='first'">
        <div>
          <p>下载员工导入模板，批量填写员工信息</p>
          <p>注意事项：</p>
          <div>
            <p>1.模板中的表头名称不可更改，表头行不能删除</p>
            <p>2.其中必填项必须保留</p>
            <p>3.导入文件请勿超过3mb</p>
            <p>4.日期字段格式要求为yyyy-mm-dd</p>
            <p>5.单选多选字段必须填写已维护的数据项</p>
          </div>
          <p>上传需要导入的文件</p>
          <a-upload
            name="file"
            action="http://up.test.com/fileupload/upload"
            :multiple="true"
            :beforeUpload="beforeUpload"
            @change="handleChange"
            :fileList="fileList"
            accept=".xls, .xlsx"
          >
            <a-button>
              <a-icon type="upload" />上传文件
            </a-button>
          </a-upload>
        </div>

        <a-button type="primary" @click="step='second'">下一步</a-button>
      </div>
      <div class="secondStep" v-if="step=='second'">
        <!-- <a-table :columns="columns" :data-source="matchData"></a-table> -->
        <DataTable :tableConfig="tableConfig" ></DataTable>
        <a-button-group>
          <a-button type="primary" @click="step='first'">上一步</a-button>
          <a-button type="primary" @click="nexStep">下一步</a-button>
        </a-button-group>
      </div>

      <div class="thirdStep" v-if="step=='third'">
        <div>
          <a-icon type="check-circle" theme="filled" />
          <p>提交完成</p>
        </div>
        <a-button type="primary" @click="handleOk">完成</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileId:'',
      fileList:[],
      step: "first",
      tableConfig:{
        rowKey: "id",
        columns: [
          {
            title: "导入字段",
            dataIndex: "fieldName",
            key: "fieldName"
          },
          {
            title: "匹配字段",
            dataIndex: "add",
            key: "add"
          },
          {
            title: "首条数据",
            dataIndex: "add",
            key: "add"
          }
        ],
        list: [],
        align: "center",
      },
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("文件大小不超过3MB！");
      }
      return isLt3M;
    },
    handleChange(info){
      let fileList = info.fileList;
      console.log(info)
      this.fileList = fileList;
      this.fileId = fileList[0].response.fileId
      this.fileObj = info.file
      console.log(this.fileId)
    },
    nexStep() {
      this.step = "third";
      // api.importJson({file:this.fileObj}).then(res=>{

      // })
      let fileInfos =   {
          rows:'',
          importFields : [ {
            state:'0',
            isRequired:'0',
            isDefined:'0',
            dataType:1,
            fieldCode : "linkName",
            fieldName : "联系人",
          }]
        }
      this.tableConfig.list = fileInfos.importFields
    },
    handleOk() {
      api.matchJson().then(res=>{

        })
    }
  }
};
</script>