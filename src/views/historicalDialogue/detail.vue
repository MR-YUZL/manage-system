<template>
  <div>
    <a-modal
      title="记录"
      :footer="null"
      width="880px"
      v-if="detailsShow"
      :visible="detailsShow"
      @cancel="handleCancel"
    >
      <div class="record-detail">
        <div class="message">
          <MessageDetail
            :recordList="recordList"
            :handleRecordBtn="handleRecordBtn"
            :handleResult="handleResultCon"
            @setHandleResult="setHandleResult"
          />
        </div>
        <div class="information scroll">
          <UserInformation :guestId="guestId" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailsShow: false,
      recordList: [],
      guestId: "",
      handleRecordBtn: "",
      handleResultCon: ""
    };
  },
  methods: {
    handleCancel() {},
    setHandleResult() {}
  }
};
</script>

<style></style>
