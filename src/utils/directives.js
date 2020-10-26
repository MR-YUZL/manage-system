import Vue from 'vue'
import store from '@/store'

Vue.directive('permission', {
  inserted: async (el, binding, vnode) => {
    const actionName = binding.arg //按钮操作
    const permissions = store.state.user.userInfo.permission //当前用户权限
    const pagePermission = vnode.context.$route.meta.permission //当前页权限id
    
    permissions.forEach(v => {
      if (v.children) {
        let arr = v.children
        let pageName = v.page
        let index = arr.findIndex(value => value.page === pagePermission)
        if (index === -1) return
        
        if (!v.children[index].actions.includes(`${pageName}--${pagePermission}--${actionName}`)) { //查看当前页有无权限
          el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
        }
      } else {
        if (!(v.page === pagePermission)) return //找寻当前页

        if (!v.actions.includes(`${pagePermission}--${actionName}`)) { //查看当前页有无权限
          el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
        }
      }
    });
  },
})