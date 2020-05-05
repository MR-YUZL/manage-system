<template>
  <div>
    <SecondMenu :routes="custom" />
  </div>
</template>

<script>
import { custom } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    custom
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
