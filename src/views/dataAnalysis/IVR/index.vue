<template>
  <div>
    <a-page-header title="IVR导航分析" style="padding:16px 0;" />
    <FormModelSearchForm
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @prevHandleSubmit="prevHandleSubmit"
    />
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
        },

        {
          type: "select",
          name: "inputAccs",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "key",
          optionLabel: "id"
        }
      ],
      defaultSearchFormValues: {}
    };
  },
  components: {
    FormModelSearchForm
  },
  methods: {
    prevHandleSubmit() {}
  }
};
</script>

<style>
</style>