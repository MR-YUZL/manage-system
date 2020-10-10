<template>
  <div>
    <a-modal v-model="visibles" title="跟进客户" :footer="null" @cancel="handleCancel">
      <div>
        <div v-if="JSON.stringify(lastInfo)!='{}'">
          <p>最近跟进记录</p>
          <p class="info">
            <span>{{lastInfo.followDate}}</span>
            <span>{{lastInfo.followValid==0?'有效':'无效'}}联系</span>
            <span>回访客服：{{lastInfo.followAcc}}</span>
          </p>
          <p>{{lastInfo.followRecord}}</p>
        </div>
        <div class="nodata" v-else>
          该客户暂无跟进记录
        </div>
      </div>
      <BaseForm :formObject="formObject" @toggleModal="toggleModal" @formSubmit="formSubmit" />
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import moment from "moment";
import BaseForm from "@/components/BaseForm";
export default {
  data() {
    return {
      formObject: {
        ref: "followForm",
        type: "modalForm",
        sureBtn: "保存",
        modelList: [
          {
            type: "select",
            label: "有效联系",
            placeholder: "请选择",
            ruleName: "followValid",
            options: [
              { key: 1, value: "否" },
              { key: 0, value: "是" }
            ],
            rules: {
              required: true,
              message: "请选择有效联系",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "本次跟进记录",
            placeholder: "",
            ruleName: "followRecord",
            maxLength: 100
          },
          {
            type: "date",
            label: "下次跟进时间",
            placeholder: "请选择",
            ruleName: "nextFollowDate",
            format: "YYYY-MM-DD HH:mm:ss",
            options: [],
            disabledDate:this.getDisabledDate,
            disabledTime:this.disabledTime
          }
        ],
        defaultValues: {
          followValid: 0
        }
      },
      visibles: this.visible,
      lastInfo: {}
    };
  },
  components: {
    BaseForm
  },
  props: {
    visible: Boolean,
    followId: String
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  mounted() {
    this.getlastInfo({ custId: this.followId });
  },
  methods: {
    disabledTime(current){
      current = current?current:moment(new Date());
      console.log(current,'1')
      if (current && moment(current).format("l") == moment().format("l")) {
        let timeArr = moment().format("LTS").split(":");
        if(Number(timeArr[1])<5){
          timeArr[0]-=1;
          return {
            disabledMinutes: () =>
            [...this.range(0, 60).filter(item => item < timeArr[1]),...this.range(0, 60).filter(item => item > Number(timeArr[1]) + 60-5)]
          };
        }
        if(Number(timeArr[1])>5){
          return {
            disabledMinutes: () =>
              this.range(0, 60).filter(item => item < timeArr[1]-5)
          };
        }
        
      }
    },
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    getDisabledDate(current){
      return current < moment().subtract(1, 'day')//今天之前的年月日不可选，不包括今天
      // return current && current < moment().endOf('day');
    },
    formSubmit(values) {
      let params = {
        custId: this.followId,
        ...values
      };
      api.saveCustomerFollow(params).then(res => {
        console.log("跟进记录");
        if (res.data.status) {
          this.$message.success("保存成功");
          this.visibles = false;
          this.$emit("successLoadList","followCustomer");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    toggleModal(val) {
      this.$emit("closeUpdate");
    },
    getlastInfo(params) {
      api.lastInfo(params).then(res => {
        console.log(res, "最近跟进记录");
        if (res.data.status) {
          // todo 当跟进内容为空时，data都不返回。
          if (res.data.data) {
            this.lastInfo = res.data.data;
            // this.formObject.defaultValues = res.data.data;
          }
        }
      });
    },
    disabledDate(current) {
      return current && current < moment().endOf("day");
    },
    handleCancel() {
      this.$emit("closeUpdate");
    },
    handleSelectChange() {}
  }
};
</script>

<style lang="less" scoped>
.nodata{
  color: #999;
  font-size: 12px;
  text-align: center;
  padding-bottom: 20px;
}
.info {
  span {
    padding-right: 15px;
  }
}
</style>