import Vue from "vue";
import store from "@/store";

Vue.directive("permission", {
  inserted: async (el, binding, vnode) => {
    const actionName = binding.arg; //按钮操作
    const permissions = store.state.user.userInfo.permission; //当前用户权限
    // const pagePermission = vnode.context.$route.meta.permission
    const page = vnode.context.$route.name; //当前页权限id

    permissions.forEach((v) => {
      if (v.children) {
        let arr = v.children;
        let pageName = v.page;
        let index = arr.findIndex((value) => value.page === page);
        if (index === -1) return;

        if (
          !v.children[index].actions.includes(
            `${pageName}--${page}--${actionName}`
          )
        ) {
          //查看当前页有无权限
          (el.parentNode && el.parentNode.removeChild(el)) ||
            (el.style.display = "none");
        }
      } else {
        if (!(v.page === page)) return; //找寻当前页

        if (!v.actions.includes(`${page}--${actionName}`)) {
          //查看当前页有无权限
          (el.parentNode && el.parentNode.removeChild(el)) ||
            (el.style.display = "none");
        }
      }
    });
  },
});

Vue.directive("focus", {
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
});

Vue.directive("label", {
  componentUpdated: function(el, binding, vode) {},
});
