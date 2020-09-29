<template>
  <div>
    <Modal :currentModal="currentModal" @toggleModal="toggleModal">
      <template v-slot:content>
        <!-- <BaseForm :formObject="formObject" :defaultValues="formAxiosReturnValues" @toggleModal="toggleModal" @formSubmit="formSubmit" /> -->
        <!-- <FormModelSearchForm :defaultFormValues="defaultSearchFormValues" :formList="searchFormList" /> -->
        <div class="custDetailBtns">
          <div class="tagHeader">
            <a-icon class="user" type="user" />{{infos.custName}}
          </div>
          <div class="btn-area">
            <a-button  @click="tagsFn">设置标签</a-button>
            <a-button  @click="editCustomerModalShow"
              >编辑</a-button
            >
            <a-button
              
              @click="createContactModalShow($event, 'contactModalInner')"
              >新建联系人</a-button
            >
            <a-button
              v-if="dataSource == '2' || dataSource == '3' || dataSource == '4'"
              
              @click="customerFollow"
              >客户跟进</a-button
            >
          </div>
        </div>
        <div class="tag_item_list">
          <div class="tag_item" v-bind:class="{ expansion: active }">
              <a-icon
                :type="active ? 'down' : 'up'"
                class="icon"
                @click="showFn"
                v-if="tagsList && tagsList.length"
              />
              <div class="tag">
                <a-tag v-for="(item, index) in tagsList" :key="index">
                  {{ item.name }}
                </a-tag>
              </div>
            </div>
        </div>
        <ul class="lastFollowFlex">
          <li>
            <span>客服负责人</span>
            <span>{{ infos.principalAcc }}</span>
          </li>
          <li>
            <span>最近跟进时间</span>
            <span>{{ infos.lastFollowDate }}</span>
          </li>
          <li>
            <span>客户来访次数</span>
            <span>{{ infos.visitCount }}</span>
          </li>
          <li>
            <span>客户创建时间</span>
            <span>{{ infos.inputDate }}</span>
          </li>
        </ul>
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="客户相关">
            <div class="commonTab scroll">
              <div class="contactFlex">
                <div class="contactHead">联系人({{ contactLength }})</div>
                <!-- <div
                  style="cursor: pointer;"
                  @click="createContactModalShow($event,'contactModalInner')"
                >
                  <a-icon type="plus" />添加联系人
                </div> -->
              </div>
              <ul class="contactUl">
                <li
                  v-for="(item, index) in infoContactsJson"
                  :key="item.contactsId"
                >
                  <span>
                    {{ item.contactsName }}
                    <a-button
                      icon="edit"
                      type="link"
                      @click="editContact(item.contactsId)"
                    ></a-button>
                    <a-button
                      icon="delete"
                      type="link"
                      @click="deleteContact(item.contactsId)"
                    ></a-button>
                  </span>
                  <span>
                    <i>手机号：{{ item.phone }}</i>
                    <i class="duty" :title="item.duty">职务：{{ item.duty }}</i>
                    <i>电话来访：{{ item.phoneVisitCount }}</i>
                    <i>会话来访：{{ item.sessionVisitCount }}</i>
                  </span>
                </li>
              </ul>
              <!-- 服务小结 -->
              <ServiceSummary :guestId="detailId" :custId="detailId" />
              <!-- 跟进记录 -->
              <ServiceRecord :questionList="followList" />
              <!-- 工单信息 -->
              <OrderInf :guestId="detailId" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="资料">
            <div class="materialFlex commonTab scroll">
              <li v-for="(item, index) in materialList" :key="index">
                {{ item.fieldName }}：{{ item.fieldValue }}
              </li>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="日志">
            <div class="logFlex commonTab scroll">
              <li v-for="(item, index) in logList" :key="index">
                <span>{{ item.logDate }}</span>
                <span>{{ item.logContent }}</span>
              </li>
            </div>
          </a-tab-pane>
        </a-tabs>
        <Modal
          :currentModal="contactModalInner"
          v-if="contactModalInner.visible"
        >
          <template v-slot:content>
            <CreateContact
              @closeCreateContact="closeCreateContact"
              :contactsId="contactsId"
              :custIdParams="obj"
              @successLoadList="successLoadList"
            />
          </template>
        </Modal>
        <a-modal
          title="客户标签"
          :visible="tagsModalShow.visible"
          @cancel="handleCancelTags"
          @ok="handleOkCancelTags"
        >
          <div class="tagflex">
            <div style="width: 150px">客户标签：</div>
            <div v-if="allTags.length > 0">
              <template
                v-for="(tag, index) in allTags"
                style="margin-bottom: 10px"
              >
                <a-checkable-tag
                  :key="tag.value"
                  v-model="tag.checked"
                  @change="(checked) => handleChange(tag, checked, index)"
                >
                  {{ tag.name }}
                </a-checkable-tag>
              </template>
            </div>
            <div v-else>请联系管理员前往系统属性维护客户标签数据</div>
          </div>
        </a-modal>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import api from "@/api/customerCenter";
import OrderInf from "@/components/userInf/OrderInf";
import ServiceSummary from "@/components/userInf/Summary";
import ServiceRecord from "@/components/userInf/ServiceRecord";
import CreateContact from "@/views/customerCenter/customerManage/modal/createContact";
import { areaDictionary } from "@/utils/areaDictionary";
export default {
  data() {
    return {
      active: true,
      allTags: [],
      tagsList: [],
      infoContactsJson: [],
      infos: {},
      questionList: [], //服务小结
      followList: [],
      userInfList: [],
      obj: {
        custId: this.detailId,
      },
      currentModal: this.visibleProps,
      contactModalInner: { title: "新建联系人", visible: false },
      tagsModalShow: { visible: false },
      materialList: [],
      logList: [],
      contactLength: "",
      contactsId: "",
    };
  },
  components: {
    ServiceSummary,
    ServiceRecord,
    OrderInf,
    Modal,
    CreateContact,
  },
  props: {
    detailId: String,
    visibleProps: Object,
    dataSource: String,
  },
  created() {
    this.getTags();
  },
  watch: {
    guestId() {
      this.getTags();
    },
  },
  mounted() {
    // this.getServiceList();
    this.getDetail(this.obj);
    this.getContactJson(this.obj);
    this.getMaterialInfo(this.obj);
    this.getFollowRecord(this.obj);
    this.getInfoTitle(this.obj);
    this.getLogJson(this.obj);
  },
  methods: {
    showFn() {
      this.active = !this.active;
    },
    successLoadList() {
      this.contactModalInner.visible = false;
      this.getContactJson(this.obj);
    },
    getInfoTitle(params) {
      api.infoTitle(params).then((res) => {
        console.log("头部", res);
        if (res.data.status) {
          this.infos = res.data.infos;
        }
      });
    },
    getContactJson(params) {
      api.contactInfo(params).then((res) => {
        console.log("联系人列表", res);
        if (res.data.status) {
          this.infoContactsJson = res.data.list;
          console.log(this.infoContactsJson, "this.infoContactsJson");
          this.contactLength = res.data.list.length;
        }
      });
    },
    getMaterialInfo(params) {
      api.customerDetail(params).then((res) => {
        if (res.data.status) {
          res.data.list.map((item, index) => {
            if (item.dataType == 2 || item.dataType == 3 || item.dataType == 6) {
              if (item.fieldCode == "custArea") {
                let arr = item.fieldValue;
                let list = [...areaDictionary];
                let str;
                arr.map((val, i) => {
                  list.map((it, j) => {
                    if (val == it.adcode) {
                      str = str ? str + "," + it.name : it.name;
                      list = it.districts;
                    }
                  });
                });
                item.fieldValue = str;
              } else {
                item.options.map((val) => {
                  if (val.optionId == item.fieldValue) {
                    item.fieldValue = val.optionName;
                  }
                });
              }
            }
          });
          this.materialList = res.data.list;
        }
      });
    },
    findArea(list, id) {
      console.log(list, id);
      let str;
      list.map((item) => {
        if (item.adcode == id) {
          if (item.districts) {
            str = str + "," + item.name;
            return item.districts;
          } else {
            return str;
          }
        }
      });
    },
    getLogJson(params) {
      api.logJson(params).then((res) => {
        console.log("日志", res);
        if (res.data.status) {
          this.logList = res.data.list;
          // this.logList = [{
          //   logDate:'2020-2-11 16:22:33',
          //   logContent:'客户名称设置'
          // }]
        }
      });
    },
    editCustomerModalShow() {
      console.log(this.obj, "详情的custId");
      this.$emit("editCustomerShow", this.obj);
    },
    customerFollow() {
      this.$emit("customerFollowShow", this.obj.custId);
    },
    editContact(contactsId) {
      this.contactsId = contactsId;
      this.contactModalInner.title = "编辑联系人";
      this.contactModalInner.visible = true;
    },
    deleteContact(contactId) {
      let that = this;
      this.$confirm({
        content: <div>删除联系人后将无法回复，是否确认删除该联系人</div>,
        onOk() {
          api.deleteContacts({ contactId: contactId }).then((res) => {
            if (res.data.status) {
              that.$message.success("删除成功");
              that.getContactJson(that.obj);
            }
          });
        },
        onCancel() {},
      });
    },
    editCustomer() {},
    // createLinkman() {},
    toggleModal(value) {
      // this.currentModal.visible = value;
      // this.$emit("closeUpdate");
    },
    closeCreateContact() {
      this.contactModalInner.visible = false;
    },
    createContactModalShow(e, name) {
      if (name) {
        this.contactsId = "";
        this[name]["title"] = "新建联系人";
        this[name]["visible"] = true;
      } else {
        this["currentModal"]["visible"] = true;
      }
    },
    followCustomer() {},
    tabChange() {},
    getDetail(params) {
      api.customerDetail(params).then((res) => {
        console.log("客户详情", res);
      });
    },
    //获取服务小结
    // getServiceList() {
    //   this.Request.post(
    //     "/hfw/workbench/getServiceSummary?custId=" + this.detailId
    //   ).then(res => {
    //     console.log("服务小结",res.data.status, res.data.list);
    //     if(res.data.status){
    //       this.questionList = res.data.list;
    //     }
    //   });
    // },
    //获取跟进记录
    getFollowRecord(params) {
      api.detailFollowRecord(params).then((res) => {
        console.log("跟进记录", res);
        if (res.data.status) {
          if (res.data.list && res.data.list.length) {
            this.followList = res.data.list;
          }
        }
      });
    },
    handleSubmit() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    },
    //客户标签
    tagsFn() {
      this.getAllTags();
      this.tagsModalShow.visible = true;
    },
    //客户设置标签时获取单位下所有维护的客户标签
    getAllTags() {
      this.allTags = [];
      this.Request.get("/customers/hfwCustomersLabels/labelListJson").then(
        (res) => {
          let data = res.data.list;
          if (data && data.length > 0) {
            // this.tagsModalShow.visible = true;
            this.allTags = data;
            this.allTags.map((it) => {
              if (this.tagsList && this.tagsList.length > 0) {
                this.tagsList.map((item) => {
                  if (it.name == item.name) {
                    it.checked = true;
                  }
                });
              }
            });
            console.log(this.tagsList,'this.tagsList')
          }
        }
      );
    },
    //获取tags  参数  guestId  客户id
    getTags() {
      this.Request.get(
        "/customers/hfwCustomersInfo/searchListJson?custId=" + this.detailId
      ).then((res) => {
        console.log("标签tags", res.data);
        this.tagsList = res.data.labels;
      });
    },
    handleCancelTags() {
      this.tagsModalShow.visible = false;
    },
    handleOkCancelTags() {
      let params = {
        custId: this.detailId,
        labels: [],
      };
      this.allTags.map((item) => {
        if (item.checked) {
          params.labels.push(item.value);
        }
      });
      console.log("选中的标签", params.labels);
      if (!params.labels.length) {
        this.$message.warn("请选择要设置的标签");
        return false;
      }
      this.Request.post("/customers/hfwCustomersLabels/saveJson", params).then(
        (res) => {
          console.log("标签selectTags", res.data);
          this.$message.success("设置标签成功！");
          this.tagsModalShow.visible = false;
          this.getTags();
        }
      );
    },
    handleChange(tag, checked, index) {
      console.log(tag, checked, index, "dianji");
      this.allTags[index].checked = checked;
      this.allTags = [...this.allTags];
      this.$forceUpdate()
    },
  },
};
</script>

<style lang="less" scoped>
.tagflex {
  display: flex;
  .ant-tag,
  .ant-tag a,
  .ant-tag a:hover {
    margin-right: 10px;
    background: #e5f2ff;
    padding: 0 20px;
    height: 26px;
    line-height: 26px;
    border-radius: 30px;
    margin-bottom: 20px;
    color: #3e7bf8;
    border: none;
    margin-bottom: 10px;
  }
  .ant-tag-checkable-checked {
    background: #3e7bf8;
    color: #fff;
  }
}
.tag_item_list{
  margin-top: 16px;
  .tag_item {
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    min-height: 37px;
    .icon {
      position: absolute;
      right: 0;
      top: 0px;
    }
    .tag {
      width: 93%;
      display: flex;
      flex-wrap: wrap;
      span {
        display: block;
        margin-right: 10px;
        background: #e5f2ff;
        padding: 0 20px;
        height: 26px;
        line-height: 26px;
        border-radius: 30px;
        margin-bottom: 12px;
        color: #3e7bf8;
        border: none;
      }
    }
  }
}
.custDetailBtns {
  display: flex;
  justify-content: space-between;
  .tagHeader {
    width: 338px;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .user {
      font-size: 18px;
      margin-right: 2px;
    }
    .expansion {
      height: 37px;
    }
  }
  .btn-area {
    button {
      margin-left: 10px;
    }
  }
}
.lastFollowFlex {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 20px;
  li {
    flex: 1;
    span {
      display: block;
    }
    span:first-child {
      color: #808080;
      margin-bottom: 5px;
    }
    span:last-child {
      color: #333;
    }
  }
}
.contactFlex {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .contactHead {
    background: url(../../../assets/imgs/ly-user.png) no-repeat 0 center;
    padding-left: 22px;
  }
}
.contactUl {
  padding: 0 20px;
  li {
    padding: 10px 0;
    span {
      display: block;
      .duty{
        width: 166px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        font-style: normal;
        width: 21%;
      }
      & i:first-child {
        width: 35%;
      }
    }
    span:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
}
.materialFlex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 45%;
    padding-top: 10px;
  }
}
.logFlex {
  li {
    padding-top: 10px;
    span:last-child {
      padding-left: 10px;
    }
  }
}
.commonTab{
  height: 556px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>