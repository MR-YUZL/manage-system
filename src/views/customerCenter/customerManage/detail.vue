<template>
  <div>
    <Modal :currentModal="currentModal" @toggleModal="toggleModal">
      <template v-slot:content>
        <!-- <BaseForm :formObject="formObject" :defaultValues="formAxiosReturnValues" @toggleModal="toggleModal" @formSubmit="formSubmit" /> -->
        <!-- <FormModelSearchForm :defaultFormValues="defaultSearchFormValues" :formList="searchFormList" /> -->
        <div class="btn-area">
          <a-button type="primary" @click="editCustomerModalShow">编辑</a-button>
          <a-button type="primary" @click="createContactModalShow($event,'contactModalInner')">新建联系人</a-button>
          <a-button v-if="dataSource=='2' || dataSource=='3' || dataSource=='4'" type="primary" @click="customerFollow">客户跟进</a-button>
        </div>
        <ul class="lastFollowFlex">
          <li>
            <span>客服负责人</span>
            <span>{{infos.principalAcc}}</span>
          </li>
          <li>
            <span>最近回访时间</span>
            <span>{{infos.lastVisitDate}}</span>
          </li>
          <li>
            <span>客户来访次数</span>
            <span>{{infos.visitCount}}</span>
          </li>
          <li>
            <span>客户创建时间</span>
            <span>{{infos.inputDate}}</span>
          </li>
        </ul>
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="客户相关">
            <div class="contactFlex">
              <div class="contactHead">联系人({{contactLength}})</div>
              <!-- <div
                style="cursor: pointer;"
                @click="createContactModalShow($event,'contactModalInner')"
              >
                <a-icon type="plus" />添加联系人
              </div> -->
            </div>
            <ul class="contactUl">
              <li v-for="(item,index) in infoContactsJson" :key="item.contactsId">
                <span>
                  {{item.contactsName}}
                  <a-button icon="edit" type="link" @click="editContact(item.contactsId)"></a-button>
                  <a-button icon="delete" type="link" @click="deleteContact(item.contactsId)"></a-button>
                </span>
                <span>
                  <i>手机号：{{item.phone}}</i>
                  <i>职务：{{item.duty}}</i>
                  <i>电话来访：{{item.phoneVisitCount}}</i>
                  <i>会话来访：{{item.sessionVisitCount}}</i>
                </span>
              </li>
            </ul>
            <!-- 服务小结 -->
            <ServiceSummary :guestId="detailId" :custId="detailId" />
            <!-- 跟进记录 -->
            <ServiceRecord :questionList="followList" />
            <!-- 工单信息 -->
            <OrderInf :guestId="detailId" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="资料">
            <div class="materialFlex">
              <li v-for="(item,index) in materialList" :key="index">{{item.fieldName}}：{{item.fieldValue}}</li>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="日志">
            <div class="logFlex">
              <li v-for="(item,index) in logList" :key="index">
                <span>{{item.logDate}}</span>
                <span>{{item.logContent}}</span>
              </li>
            </div>
          </a-tab-pane>
        </a-tabs>
        <Modal :currentModal="contactModalInner" v-if="contactModalInner.visible">
          <template v-slot:content>
            <CreateContact
              @closeCreateContact="closeCreateContact"
              :contactsId="contactsId"
              :custIdParams="obj"
              @successLoadList="successLoadList"
            />
          </template>
        </Modal>
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
      infoContactsJson: [],
      infos: {},
      questionList: [], //服务小结
      followList: [],
      userInfList: [],
      obj: {
        custId: this.detailId
      },
      currentModal: this.visibleProps,
      contactModalInner: { title: "新建联系人", visible: false },
      materialList: [],
      logList: [],
      contactLength: "",
      contactsId: ""
    };
  },
  components: {
    ServiceSummary,
    ServiceRecord,
    OrderInf,
    Modal,
    CreateContact
  },
  props: {
    detailId: String,
    visibleProps: Object,
    dataSource:String
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
    successLoadList() {
      this.contactModalInner.visible = false;
      this.getContactJson(this.obj);
    },
    getInfoTitle(params) {
      api.infoTitle(params).then(res => {
        console.log("头部", res);
        if (res.data.status) {
          this.infos = res.data.infos;
        }
      });
    },
    getContactJson(params) {
      api.contactInfo(params).then(res => {
        console.log("联系人列表", res);
        if (res.data.status) {
          this.infoContactsJson = res.data.list;
          console.log(this.infoContactsJson, "this.infoContactsJson");
          this.contactLength = res.data.list.length;
        }
      });
    },
    getMaterialInfo(params) {
      api.customerDetail(params).then(res => {
    
        if (res.data.status) {
        
          res.data.list.map((item,index) => {
            if(item.dataType == 2 || item.dataType == 3){
           
              if(item.fieldCode == "custArea"){
                let arr = item.fieldValue.split(',')
                let list = [...areaDictionary]
                let str;
                arr.map((val,i) => {
                  // list = list[i].districts
                  // console.log(list)
                  list.map((it,j) => {
                    if(val == it.adcode){
                      str = str ? str + ',' +it.name : it.name
                      list = it.districts
                    }
                  })
                  // this.findArea(list,val)
                  // console.log(this.findArea(list,val))
                  // if(list.adcode == val){
                  //   str = str + areaDictionary[Number(i)]
                  //   list = list[val]
                  // }
                  
                })
                item.fieldValue = str
              }else{
                item.options.map(val => {
                  if(val.optionId == item.fieldValue){
                    item.fieldValue = val.optionName
                  }
                })
              }
            }
          })
          this.materialList = res.data.list;

        }
      });
    },
    findArea(list,id){
      console.log(list,id)
      let str
      list.map(item => {
        if(item.adcode == id){
          if(item.districts){
            str = str + ',' +item.name
            return item.districts
          }else{
            return str
          }
          
        }
      })
    },
    getLogJson(params) {
      api.logJson(params).then(res => {
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
      let that = this
      this.$confirm({
        content: <div>删除联系人后将无法回复，是否确认删除该联系人</div>,
        onOk() {
          api.deleteContacts({ contactId: contactId }).then(res => {
            if (res.data.status) {
              that.$message.success("删除成功");
              that.getContactJson(that.obj);
            }
          });
        },
        onCancel() {

        }
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
        this.contactsId = ''
        this[name]['title'] = "新建联系人";
        this[name]["visible"] = true;
      } else {
        this["currentModal"]["visible"] = true;
      }
    },
    followCustomer() {},
    tabChange() {},
    getDetail(params) {
      api.customerDetail(params).then(res => {
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
      api.detailFollowRecord(params).then(res => {
        console.log("跟进记录", res);
        if (res.data.status) {
          if(res.data.list && res.data.list.length){
            this.followList = res.data.list;
          }
        }
      });
    },
    handleSubmit() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>

<style lang="less" scoped>
.btn-area {
  button {
    margin-left: 10px;
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
      i {
        font-style: normal;
        width:21%;
      }
      & i:first-child{
        width:35%;
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
</style>