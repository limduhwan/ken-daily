// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ClientTable} from 'vue-tables-2'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

Vue.use(VueTabs)
Vue.use(ClientTable)
Vue.config.productionTip = false
Vue.config.devtools = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

//npm install bootstrap
//npm install vue-tables-2
//npm install vue-nav-tabs
//npm i bootstrap-vue
//npm i vue
//npm i vuetable
