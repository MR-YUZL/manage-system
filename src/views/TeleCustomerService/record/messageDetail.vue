<template>
  <div class="messageDetail">
    <div v-if="telInf.callType == 1 || telInf.callType == 3">
      <div>通话时长</div>
      <div>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="咨询分类" prop="consuleId">
            <a-cascader
              v-model="form.consuleId"
              :options="options"
              :field-names="{label: 'name', value: 'id', children: 'childrens'}"
              placeholder
            />
          </a-form-model-item>
          <a-form-model-item label="问题解决" prop="solveStatus">
            <a-select v-model="form.solveStatus">
              <a-select-option value="0">未解决</a-select-option>
              <a-select-option value="1">已解决</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="备注" prop="remark">
            <a-input v-model="form.remark" type="textarea" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 15 }">
            <a-button type="primary" @click="onSubmit">保存并更新</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <div v-else>
      <img src="./../../../assets/imgs/tel_noData.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "messageDetail",
  components: {},
  props: {
    telInf: {
      type: Object
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      other: "",
      options: [],
      form: {
        solveStatus: undefined,
        consuleId: [
          "241cf8dcda0d49dc91be9309d74d8da6",
          "3fa56a87067240efb19134378a9e45b2"
        ],
        remark: ""
      },
      rules: {
        solveStatus: [
          { required: true, message: "请选择问题解决", trigger: "change" }
        ],

        consuleId: [
          { required: true, message: "请选择咨询分类", trigger: "change" }
        ]
      }
    };
  },
  created() {
    console.log("guestId", this.guestId);
    this.addServer();
  },
  mounted() {},
  methods: {
    async addServer() {
      let result = await this.Request.get("/hfw/workbench/getSummarySort");
      if (result.data.status) {
        this.options = result.data.list;
      }
    },
    onSubmit(e) {
      console.log(this.form);
      e.preventDefault();
      let _that = this;
      _that.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let [
            firstConsultId,
            secondConsultId,
            threeConsultId
          ] = this.form.consuleId;
          let obj = { ...this.form };
          obj.firstConsultId = firstConsultId;
          obj.secondConsultId = secondConsultId;
          obj.threeConsultId = threeConsultId;
          delete obj.consuleId;
          obj.guestId = this.guestId;
          console.log(obj);
          this.Request.post("/hfw/workbench/saveServiceSummary", obj).then(res => {
            if (res.data.status) {
              this.$message.success("操作成功！");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style lang="less">
.messageDetail .ant-modal-body {
  padding: 0;
}
</style>
