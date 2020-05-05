<template>
  <div>
    <SecondMenu :routes="setting" />
  </div>
</template>

<script>
import { setting } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    setting
  }),
  components: {
    SecondMenu
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
