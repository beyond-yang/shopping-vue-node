import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  loading: './../src/static/loading-svg/loading-balls.svg'
})

// 分页插件
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
