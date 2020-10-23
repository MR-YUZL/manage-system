<script>
export default {
  name: "RouteView",
  props: {},
  data() {
    return {};
  },
  render() {
    const notKeep = <router-view />;
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    );
    return notKeep;
  },
};
</script>
