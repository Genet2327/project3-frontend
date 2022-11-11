import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DatetimePicker from 'vuetify-datetime-picker'
 
Vue.use(DatetimePicker)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
