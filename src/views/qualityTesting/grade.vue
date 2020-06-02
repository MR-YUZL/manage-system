<template>
  <div>
    <div class="totalScore">
      当前总分
      <span>{{qcObj.totalScore}}</span>
    </div>
    <div class="materialFlex">
      <li>上次检测人:{{qcObj.qcAcc}}</li>
      <li>被检测人:{{qcObj.serviceName}}</li>
      <li>检测时间:{{qcObj.qcDate}}</li>
    </div>
    <a-form-model ref="gradeForm" v-bind="formItemLayout" :model="gradeForm">
      <a-form-model-item
        v-for="(item,index) in gradeForm.gradelist"
        :label="item.gradeName"
        :key="item.id"
        :prop="'gradelist.' + index + '.gradeValue'"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <a-input v-model="item.gradeValue" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="评语">
        <a-input v-model="gradeForm.reniews" type="textarea" />
        </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit" @click="submitGrade('gradeForm')">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import BaseForm from "@/components/BaseForm";
export default {
  data() {
    return {
      gradeForm: {
        gradelist: [],
        reniews:''
      },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
    };
  },
  components: {
    BaseForm
  },
  props: {
    qcObj:Object
  },
  mounted() {
  },
  watch:{
    qcObj(val){
      this.gradeForm.gradelist = val.gradelist
    }
  },
  methods: {
    // getInfo(params) {
    //   api.QcDetail(params).then(res => {
    //     console.log("质检详情评分", res);
    //     if (res.data.status) {
    //       this.qcObj = res.data.data;
    //       this.gradeForm.gradelist = res.data.data.gradelist;
    //     }
    //   });
    // },
    submitGrade(formName) {
      this.$refs[formName].validate(valid => {
          console.log(valid)
        if (valid) {
            console.log(this.gradeForm,'this.gradeForm.gradelist')
            api.saveQc().then(res=>{
              if(res.data.status){
                this.$message.success('提交评分成功');
              }
            })
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.totalScore{
  text-align: center;
    span{
        color:#fd6769;
        font-size: 36px;
    }
}
.materialFlex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  li {
    width: 50%;
    margin-bottom: 10px;
  }
}
</style>