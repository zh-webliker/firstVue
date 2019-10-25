// 引入组件
import activeManage from './page/activeManage/index.vue'
import choManage from './page/choManage/index.vue'
import labelManage from './page/labelManage/index.vue'

export default [
  {
    // 配置路由，当路径为'/activeManage',使用组件activeManage
    path: '/activeManage',
    component: activeManage
  },
  {
    // 配置路由，当路径为'/choManage',使用组件choManage
    path: '/choManage',
    component: choManage
  },
  {
    // 配置路由，当路径为'/labelManage',使用组件labelManage
    path: '/labelManage',
    component: labelManage
  }

]
