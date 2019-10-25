// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRuoter from 'vue-router'
import routeConfig from './router-config'

// 加载路由中间件
Vue.use(VueRuoter)
// Vue.config.productionTip = false
const router = new VueRuoter({
  routes: routeConfig
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
