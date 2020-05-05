<template>
  <div>
    <SecondMenu :routes="market" />
  </div>
</template>

<script>
import { market } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    market
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
