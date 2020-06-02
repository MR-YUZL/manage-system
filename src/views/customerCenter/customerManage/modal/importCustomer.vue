<template>
  <div>
    <a-modal v-model="visibles" title="导入客户" @cancel="handleCancel" :footer="null">
      <a-steps :current="current" size="small">
        <a-step title="上传文档" />
        <a-step title="匹配字段" />
        <a-step title="完成" />
      </a-steps>
      <div class="firstStep" v-if="step=='first'">
        <div>
          <p>一：下载员工导入模板，批量填写员工信息</p>
          <p>注意事项：</p>
          <div class="announcements">
            <p>1.模板中的表头名称不可更改，表头行不能删除</p>
            <p>2.其中必填项必须保留</p>
            <p>3.导入文件请勿超过3mb</p>
            <p>4.日期字段格式要求为yyyy-mm-dd</p>
            <p>5.单选多选字段必须填写已维护的数据项</p>
          </div>
          <p>二：上传需要导入的文件</p>
          <a-upload
            name="file"
            action="/imp/hfwImportFile/importJson"
            :multiple="true"
            :beforeUpload="beforeUpload"
            @change="handleChange"
            accept=".xls, .xlsx"
          >
            <a-button class="uploadBtn">
              <a-icon type="upload" />上传文件
            </a-button>
          </a-upload>
        </div>

        <div class="bottomBtn">
          <a-button type="primary" @click="uploadSuccessNext">下一步</a-button>
        </div>
        <div class="downloadTemplate">
          <a-button type="link" icon="download" @click="downloadTemplate">点击下载模板</a-button>
        </div>
      </div>
      <div class="secondStep" v-if="step=='second'">
        <p class="matchTotals">数据字段匹配(共2条)</p>
        <div class="importFlex">
          <span>导入字段</span>
          <span class="secFlex">匹配字段</span>
          <span>首条数据</span>
        </div>
        <div>
          <!-- listMatchCode -->
          <div class="tableFlex" v-for="(item,index) in fileInfos.listTitle" :key="index">
            <div>{{item}}</div>
            <div class="secFlex">
              <a-select
                style="width: 120px"
                @change="selectChange(index,$event)"
                v-model="fileInfos.listMatchCode[index]"
              >
                <a-select-option
                  :value="it.fieldCode"
                  v-for="(it,ind) in fileInfos.importFields"
                  :key="ind"
                >{{it.fieldName}}</a-select-option>
              </a-select>
            </div>
            <div>{{fileInfos.listData[index]}}</div>
          </div>
          <p>
            <a-checkbox @change="checkBoxChange">是否忽略第一行</a-checkbox>
          </p>
        </div>
        <div class="btnGroups">
          <a-button-group>
            <a-button type="primary" @click="prevStep">上一步</a-button>
            <a-button type="primary" @click="nexStep">下一步</a-button>
          </a-button-group>
        </div>
      </div>

      <div class="thirdStep" v-if="step=='third'">
        <a-result
          status="success"
          title="提交完成"
          sub-title=""
        >
          <template #extra>
            <a-button key="console" type="primary" @click="handleCancel">完成</a-button>
          </template>
        </a-result>
        
      </div>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      current: 0,
      fileList: [],
      selects: "",
      step: "first",
      dataType: "",

      matchData: [],
      visibles: this.visible,
      selectArr: [],
      requiredArr: [],
      firstCheck: 0,
      fileId: "",
      fileInfos: {}
    };
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  created() {},
  methods: {
    checkBoxChange(e) {
      if (e.target.checked) {
        this.firstCheck = 1;
      } else {
        this.firstCheck = 0;
      }
    },
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("文件大小不超过3MB！");
      }
      return isLt3M;
    },
    handleChange(info) {
      // let fileList = [...info.fileList];
      // 控制大于2M的附件。不显示
      // if(info.file.size > 2*1024*1024) {
      //   return;
      // }
      console.log("handleChange=====", info);
      // this.fileList = fileList;
      if (info.file.status === "done") {
        this.fileId = info.file.response.field;
        let fileInfo = info.file.response.fileInfos;

        fileInfo.importFields.unshift({
          fieldId: "",
          fieldCode: "",
          fieldName: "不导入该字段"
        });
        this.fileInfos = fileInfo;
      }
    },
    uploadSuccessNext() {
      if (JSON.stringify(this.fileInfos) == "{}") {
        this.$message.error("请上传文件");
      } else {
        this.current++;
        this.step = "second";
      }
    },
    selectChange(something, $event) {
      let fieldCodes = this.fileInfos.listMatchCode;
      this.fileInfos.listMatchCode[something] = $event;
    },
    prevStep(){
      this.step = "first";
      this.current--;
    },
    nexStep() {
      this.current++;
      console.log(this.fileInfos.listMatchCode, "selectArr");
      let arr = [...this.fileInfos.listMatchCode];
      arr = arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i] == arr[i + 1]) {
          this.$message.error(arr[i] + "重复选择");
          return;
        }
      }

      let params = {
        fileId: this.fileId,
        fieldsStr: this.fileInfos.listMatchCode.join(),
        firstCheck: this.firstCheck
      };
      console.log(params);
      api.matchJson(params).then(res => {
        if (res.data.status) {
          this.step = "third";
        }
      });
    },
    handleOk() {
      api.matchJson().then(res => {});
    },
    handleCancel() {
      this.visibles = false;
      this.step = "first";
      this.current = 0;
      this.$emit("closeUpdate");
    },
    downloadTemplate(){
      window.location.href = '/customers/hfwCustomersInfo/expTempExcel'
    },
  }
};
</script>
<style lang="less" scoped>
.firstStep {
  position: relative;
  margin-top: 30px;
  .downloadTemplate {
    position: absolute;
    right: 0;
    top: 0;
  }
  .announcements {
    padding-left: 20px;
  }
  .uploadBtn {
    margin: 10px 0;
  }
  .bottomBtn {
    text-align: right;
  }
  p {
    margin-bottom: 0;
    line-height: 22px;
  }
}
.secondStep {
  .btnGroups {
    text-align: right;
    button {
      margin-right: 10px;
    }
  }
  .matchTotals {
    margin-bottom: 0;
    padding: 20px 0 10px 20px;
  }
  .importFlex {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 10px;
    span {
      display: block;
      flex: 1;
    }
    .secFlex {
      flex: 2;
    }
  }
  .tableFlex {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 10px;
    div {
      flex: 1;
    }
    .secFlex {
      flex: 2;
    }
  }
}
.thirdStep {
  
}

</style>


<style>
.ant-result-success .ant-result-icon > .anticon{
  font-size: 40px;
}
.ant-result-title{
  font-size: 12px;
}
</style>