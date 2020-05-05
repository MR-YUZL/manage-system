<template>
  <div>
    <SecondMenu :routes="asset" />
  </div>
</template>

<script>
import { asset } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    asset
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
