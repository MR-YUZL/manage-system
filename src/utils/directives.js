import Vue from 'vue'
import store from '@/store'

Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg //按钮操作
    const permissions = store.state.user.userInfo.permission //当前用户权限
    const pagePermission = vnode.context.$route.meta.permission //当前页权限id

    permissions.forEach(v => {
      if (!(v.page === pagePermission)) return

      if (!v.actions.includes(actionName)) {

        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    });
  }
})