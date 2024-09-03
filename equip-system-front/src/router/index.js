import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 权限管理删除
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 权限管理删除
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'system',
  //   meta: { title: '系统管理', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'sysRole',
  //       name: 'SysRole',
  //       component: () => import('@/views/system/sysRole/list'),
  //       meta: { title: '角色管理', icon: 'table' }
  //     },
  //     {
  //       path: 'sysUser',
  //       name: 'SysUser',
  //       component: () => import('@/views/system/sysUser/list'),
  //       meta: { title: '用户管理', icon: 'user' }
  //     },
  //     {
  //       path: 'employee',
  //       name: 'Employee',
  //       component: () => import('@/views/system/employee/list'),
  //       meta: { title: '员工管理', icon: 'user' }
  //     },
  //     {
  //       name: 'sysMenu',
  //       path: 'sysMenu',
  //       component: () => import('@/views/system/sysMenu/list'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'el-icon-s-unfold'
  //       },
  //     },
  //     {
  //       path: 'assignAuth',
  //       component: () => import('@/views/system/sysRole/assignAuth'),
  //       meta: {
  //         activeMenu: '/system/sysRole',
  //         title: '角色授权'
  //       },
  //       hidden: true,
  //     }
  //   ]
  // },
  
  //完整路由，临时
  // {
  //   path: '/system',
  //   component: Layout,
  //   name: 'System',
  //   meta: { title: '系统管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'sysRole',
  //       name: 'sysRole',
  //       component: () => import('@/views/system/sysRole/list'),
  //       meta: { title: '角色管理', icon: 'table' }
  //     },
  //     {
  //       path: 'sysUser',
  //       name: 'sysUser',
  //       component: () => import('@/views/system/sysUser/list'),
  //       meta: { title: '用户管理', icon: 'tree' }
  //     },
  //     {
  //       name: 'sysMenu',
  //       path: 'sysMenu',
  //       component: () => import('@/views/system/sysMenu/list'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'el-icon-s-unfold'
  //       },
  //     },
  //     {
  //       path: 'assignAuth',
  //       component: () => import('@/views/system/sysRole/assignAuth'),
  //       meta: {
  //         activeMenu: '/system/sysRole',
  //         title: '角色授权'
  //       },
  //       hidden: true,
  //     },
  //     {
  //       path: 'sysEquip',
  //       name: 'sysEquip',
  //       component: () => import('@/views/system/sysEquip/list'),
  //       meta: { title: '设备管理', icon: 'tree' }
  //     },
  //     {
  //       path: 'sysTask',
  //       name: 'sysTask',
  //       component: () => import('@/views/system/sysTask/list'),
  //       meta: { title: '任务管理', icon: 'tree' }
  //     },
      
  //   ]

  // },
  // {
  //   path: '/equipment',
  //   component: Layout,
  //   name: 'Equipment',
  //   meta: { title: '设备管理', icon: 'el-icon-s-help' },
  //   children: [
      
  //     {
  //       path: 'equipmentExport',
  //       name: 'EquipmentExport',
  //       component: () => import('@/views/equipment/equipmentExport/list'),
  //       meta: { title: '设备出库', icon: 'tree' }
  //     },
  //     {
  //       path: 'equipmentIntake',
  //       name: 'EquipmentIntake',
  //       component: () => import('@/views/equipment/equipmentIntake/list'),
  //       meta: { title: '设备入库', icon: 'tree' }
  //     },
  //     {
  //       path: 'utilseEquip',
  //       name: 'UtilseEquip',
  //       component: () => import('@/views/equipment/utilseEquip/list'),
  //       meta: { title: '设备使用', icon: 'tree' }
  //     },
  //     {
  //       path: 'equipmentTransfer',
  //       name: 'EquipmentTransfer',
  //       component: () => import('@/views/equipment/equipmentTransfer/list'),
  //       meta: { title: '设备交接', icon: 'tree' }
  //     },
  //     {
  //       path: 'equipmentCare',
  //       name: 'EquipmentCare',
  //       component: () => import('@/views/equipment/equipmentCare/list'),
  //       meta: { title: '设备保养', icon: 'tree' }
  //     },
  //   ]

  // },

  // {
  //   path: '/detection',
  //   component: Layout,
  //   name: 'Detection',
  //   meta: { title: '检测', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'detection',
  //       name: 'Detection',
  //       component: () => import('@/views/detection/list'),
  //       meta: { title: '设备检测', icon: 'tree' }
  //     },
  //   ]

  // },
  // {
  //   path: '/dataQuery',
  //   component: Layout,
  //   name: 'DataQuery',
  //   meta: { title: '数据查询', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'idleEmployeeFinder',
  //       name: 'IdleEmployeeFinder',
  //       component: () => import('@/views/dataQuery/idleEmployeeFinder/list'),
  //       meta: { title: '空闲员工查询', icon: 'tree' }
  //     },
  //     {
  //       path: 'idleEquipmentFinder',
  //       name: 'IdleEquipmentFinder',
  //       component: () => import('@/views/dataQuery/idleEquipmentFinder/list'),
  //       meta: { title: '空闲设备查询', icon: 'tree' }
  //     },
  //     {
  //       path: 'taskDeviceQuery',
  //       name: 'TaskDeviceQuery',
  //       component: () => import('@/views/dataQuery/taskDeviceQuery/list'),
  //       meta: { title: '任务所使用设备查询', icon: 'tree' }
  //     },
  //   ]
  // }, 
  // {
  //   path: '/infoManager',
  //   component: Layout,
  //   name: 'InfoManager',
  //   meta: { title: '信息管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'statsViewer',
  //       name: 'StatsViewer',
  //       component: () => import('@/views/infoManager/statsViewer/list'),
  //       meta: { title: '查看统计', icon: 'tree' }
  //     },
  //     {
  //       path: 'employeeListManager',
  //       name: 'EmployeeListManager',
  //       component: () => import('@/views/infoManager/employeeListManager/list'),
  //       meta: { title: '员工名单管理', icon: 'tree' }
  //     },
  //     {
  //       path: 'equipmentListManager',
  //       name: 'EquipmentListManager',
  //       component: () => import('@/views/infoManager/equipmentListManager/list'),
  //       meta: { title: '设备名单管理', icon: 'tree' }
  //     },
  //   ]
  // },

  
  // 404 page must be placed at the end !!!
  // 权限管理删除
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
