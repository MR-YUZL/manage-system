<template>
  <div>
    <a-modal
      v-model="visibles"
      width="690px"
      title="列表字段设置"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <div class="cent">
        <div class="left_box">
          <div class="title_box">
            <a-checkbox :checked="hideCheckAll" @change="hideOnCheckAllChange">隐藏字段</a-checkbox>
          </div>
          <p v-if="removList.length === 0">无数据</p>
          <!-- <a-checkbox-group v-model="leftCheckList"> -->
          <ul>
            <li v-for="(item,index) in removList" :key="item.fieldId">
              <a-checkbox
                :checked="item.isChecked"
                @change="hideOnChange(index,$event)"
              >{{item.fieldName}}</a-checkbox>
            </li>
          </ul>
          <!-- </a-checkbox-group> -->
        </div>

        <div class="center_btn">
          <a-button type="primary" @click="rightToLeft">
            <a-icon type="left" />
          </a-button>
          <a-button type="primary" @click="leftToRight">
            <a-icon type="right" />
          </a-button>
        </div>

        <div class="right_box">
          <div class="title_box">
            <a-checkbox :checked="showCheckAll" @change="onCheckAllChange">显示字段</a-checkbox>
          </div>
          <p v-if="tableHeadList.length === 0">无数据</p>
          <!-- <a-checkbox-group v-model="checkList"> -->
          <ul>
            <li
              v-for="(item,index) in tableHeadList"
              :key="item.fieldId"
              draggable="true"
              @dragstart="dragstart(item)"
              @dragenter="dragenter(item)"
              @dragend="dragend(item)"
            >
              <a-checkbox
                :checked="item.isChecked"
                @change="showOnChange(index,$event)"
              >{{item.fieldName}}</a-checkbox>
            </li>
          </ul>
          <!-- </a-checkbox-group> -->
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      //穿梭框
      indeterminate: true,
      showCheckAll: false,
      hideCheckAll: false,
      tableHeadList: [], //展示的表头数组
      removList: [],
      checkList: [],
      leftCheckList: [],
      isActive: 0,
      oldVal: 0,
      newOld: 0,
      //穿梭框
      visibles: this.visible,
      direction: "",
    };
  },

  props: {
    visible: Boolean,
  },
  watch: {
    visible(val) {
      this.visibles = val;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      api.setFieldsJson().then((res) => {
        console.log("操作设置", res);
        this.tableHeadList = res.data.list.filter((v) => v.isShow == 1);
        this.removList = res.data.list.filter((v) => v.isShow == 0);
        this.tableHeadList = this.tableHeadList.map((v) => {
          return {
            ...v,
            isChecked: false,
          };
        });
        this.removList = this.removList.map((v) => {
          return {
            ...v,
            isChecked: false,
          };
        });
        console.log(this.tableHeadList, "this.tableHeadList",this.removList);
        // this.targetKeys = newArr.filter(v => v.isShow == 1).map(item => item.key);
      });
    },
    //显示全选
    onCheckAllChange(e) {
      this.showCheckAll = e.target.checked;
      if (e.target.checked) {
        this.tableHeadList.map((item) => {
          item.isChecked = true;
        });
         this.checkList = [...this.tableHeadList];
      } else {
        this.tableHeadList.map((item) => {
          item.isChecked = false;
        });
        this.checkList = [];
      }
      console.log(this.checkList,'显示栏全选反选后的值')
    },
    //隐藏全选
    hideOnCheckAllChange(e) {
      this.hideCheckAll = e.target.checked;
      if (e.target.checked) {
        this.removList.map((item) => {
          item.isChecked = true;
        });
        this.leftCheckList = [...this.removList];
      } else {
        this.removList.map((item) => {
          item.isChecked = false;
        });
        this.leftCheckList = [];
      }
      console.log(this.leftCheckList,'隐藏栏全选反选后的值')
    },
    showOnChange(ind, e) {
      console.log(ind, "index", e.target.checked);
      if (e.target.checked) {
        this.tableHeadList.map((item, index) => {
          if (index == ind) {
            this.tableHeadList[ind].isChecked = true;
            this.checkList.push(item);
          }
          if (
            item.isChecked &&
            this.checkList.length == this.tableHeadList.length
          ) {
              console.log('1==================')
            this.checkList = [...this.tableHeadList];
            this.showCheckAll = true;
          }
        });
        console.log(this.checkList,'显示栏单个选择后的值')
      } else {
        this.tableHeadList[ind].isChecked = false;
        this.checkList.splice(ind, 1);
        this.showCheckAll = false;
        console.log(this.checkList,this.tableHeadList,'显示栏单个取消选择后的值')
      }
      console.log(this.checkList, "this.checkList移动前的值");
    },
    hideOnChange(ind, e) {
      //   console.log(this.removList, "移动前的值");
      if (e.target.checked) {
        this.removList.map((item, index) => {
          if (index == ind) {
            this.removList[ind].isChecked = true;
            this.leftCheckList.push(item);
          }
          if (
            item.isChecked &&
            this.leftCheckList.length == this.removList.length
          ) {
            this.leftCheckList = this.removList;
            this.hideCheckAll = true;
          }
        });
        console.log(this.leftCheckList,'隐藏栏单个选择后的值')
      } else {
        this.removList[ind].isChecked = false;
        this.leftCheckList.splice(ind, 1);
        this.hideCheckAll = false;
        console.log(this.leftCheckList,'隐藏栏单个取消选择后的值')
      }
      console.log(this.leftCheckList, "this.leftCheckList移动前的值");
    },
    //右边移到左边
    rightToLeft() {
      this.checkList.map((item) => {
        item.isShow = 0
        this.removList.push({
          ...item,
          isChecked: false,
        });
      });
      this.removList.map((item) => {
        this.tableHeadList.map((its, index) => {
          if (item.fieldName === its.fieldName) {
            this.tableHeadList.splice(index, 1);
          }
        });
      });
      this.checkList = [];
    },

    //左边移到右边
    leftToRight() {
      this.leftCheckList.map((item) => {
        item.isShow = 1
        this.tableHeadList.push({
            ...item,
            isChecked: false,
        });
      });

      console.log("右边选中的", this.leftCheckList);
      this.leftCheckList.map((item) => {
        this.removList.map((its, index) => {
          if (item.fieldName === its.fieldName) {
            this.removList.splice(index, 1);
          }
        });
      });
      this.leftCheckList = [];
    },

    //开始移动
    dragstart(val) {
      this.oldVal = val;
      this.isActive = val;
      console.log("old", this.oldVal);
    },

    //移动结束
    dragend() {
      if (this.oldVal !== this.newOld) {
        let oldIndex = this.tableHeadList.indexOf(this.oldVal);
        let newIndex = this.tableHeadList.indexOf(this.newOld);
        let newItems = [...this.tableHeadList];
        console.log(oldIndex, newIndex);
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 增加新的节点
        newItems.splice(newIndex, 0, this.oldVal);
        this.tableHeadList = [...newItems];
        console.log(this.tableHeadList);
      }
    },

    //移动过程
    dragenter(val) {
      this.newOld = val;
      console.log("new", this.newOld);
    },
    //保存表头
    handleSubmit() {
      let newArr = [...this.tableHeadList,...this.removList];
      console.log("提交改变后的数组", newArr,this.removList);
      api.fieldsShowSave({ list: newArr }).then((res) => {
        if (res.data.status) {
          this.$message.success("保存成功");
          this.visibles = false;
          this.$emit("successLoadList", "setLable");
        }
      });
    },
    handleCancel() {
      this.visibles = false;
      this.$emit("closeUpdate");
    },
  },
};
</script>

<style lang="less" scoped>
.cent {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin: 0 auto;
  margin-top: 30px;
  .ant-checkbox-group {
    display: block;
  }
  .left_box,
  .right_box {
    overflow: hidden;
    .title_box {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 24px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    p {
      margin: 0;
      height: 30px;
      line-height: 30px;
      padding: 6px 15px 0;
      color: #909399;
      text-align: center;
    }
    width: 300px;
    height: 311px;
    border: 1px solid #ebeef5;
    ul {
      height: 263px;
      overflow-y: auto;
      li {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        box-sizing: border-box;
        padding-left: 24px;
        line-height: 30px;
        text-align: left;
      }
    }
  }
  .center_btn {
    display: flex;
    align-items: center;
    margin-right: 10px;
    button {
      margin-left: 10px;
    }
  }
}
</style>