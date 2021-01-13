import Vue from 'vue'
import App from './App.vue'
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue)
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
