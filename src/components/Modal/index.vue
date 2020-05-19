<template>
  <div class="model">
     <a-modal
      :title="currentModal.title"
      :visible="currentModal.visible"
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
      
    }
  },
  props:['currentModal'],
  mounted() {},
  methods: {
    handleSubmit(values) {
      console.log(values,"handleSubmit====")
      this.$emit("toggleModal",false)
    },
    handleCancel() {
      this.$emit("toggleModal",false)
    }
  }
};
</script>
