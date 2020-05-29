<template>
  <div>
    <a-modal v-model="visibles" title="跟进客户" @ok="handleOk" @cancel="handleCancel">
      <div>
        <p>最近跟进记录</p>
        <p class="info">
          <span>{{lastInfo.followDate}}</span>
          <span>{{followValid}}联系</span>
          <span>回访客服：{{lastInfo.followAcc}}</span>
        </p>
        <p>{{lastInfo.followRecord}}</p>
      </div>
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" @submit="handleOk">
        <a-form-item label="有效联系">
          <a-select
            v-decorator="[
          'followValid',{initialValue:0}
        ]"
            placeholder
            @change="handleSelectChange"
          >
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="本次跟进记录">
          <a-textarea
            v-decorator="['followRecord',{ rules: [{ required: true, message: '请输入' }] }]"
            placeholder="请输入"
            allow-clear
            :maxLength="100"
          />
        </a-form-item>
        <a-form-item label="下次跟进时间">
          <a-date-picker show-time :disabledDate="disabledDate" v-decorator="[
              'nextFollowDate',
            ]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import moment from 'moment';
export default {
  data() {
    return {
      visibles: this.visible,
      form: this.$form.createForm(this, { name: "followCustomer" }),
      lastInfo:{}
    };
  },
  props: {
    visible: Boolean,
    followId:String
  },
  watch: {
    visible(val) {
      console.log(val)
      this.visibles = val;
    }
  },
  computed:{
    followValid(){
      var obj = {
        "0": "有效",
        "1": "无效",
      }
      return obj[this.lastInfo.followValid];
    }
  },
  mounted(){
    this.getlastInfo({custId:this.followId});
  },
  methods: {
    getlastInfo(params){
      api.lastInfo(params).then(res=>{
        console.log(res,'最近跟进记录')
        if(res.data.status){
          this.lastInfo = res.data.data;
        }
      })
    },
    disabledDate(current){
      return current && current < moment().endOf("day")
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        values.nextFollowDate = moment(values.nextFollowDate).format("YYYY-MM-DD HH:SS:MM")
        let params = {
          custId:this.followId,
          ...values
        }
        if (!err) {
          console.log(params, "values");
          api.saveCustomerFollow(params).then(res=>{
            console.log('跟进记录')
            if(res.data.status){
              this.$message.success('保存成功')
              this.visibles = false
              this.$emit("successLoadList");
            }
          })
        }
      });
    },
    handleCancel() {
      this.visibles = false
      this.$emit("closeUpdate");
    },
    handleSelectChange() {}
  }
};
</script>

<style lang="less" scoped>
.info{
  span{
    padding-right:15px;
  }
}
</style>