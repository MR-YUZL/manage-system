<template>
  <div>
    <SecondMenu :routes="survey"/>
    889999
  </div>
</template>

<script>
import { survey } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    survey
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
