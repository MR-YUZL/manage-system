<template>
  <div class="model">
     <a-modal
     :width="modalProps.width"
      :title="modalProps.title"
      :visible="modalProps.visible"
      :footer="null"
      @handleSubmit="handleSubmit"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <slot name="content"></slot>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {},
  data(){
    return{
      modalProps: {}
    }
  },
  props:['currentModal'],
  created() {
    this.modalProps = this.currentModal
  },
  mounted() {},
  methods: {
    handleSubmit(values) {
      console.log(values,"handleSubmit====")
      this.$emit("toggleModal",false)
    },
    handleCancel() {
      this.modalProps.visible = false
      this.$emit("toggleModal",false)
    }
  }
};
</script>
