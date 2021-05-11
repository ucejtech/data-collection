import Vue from 'vue'
import App from  '@/App.vue'
import router from './router/index';
import store from './store'
import 'izitoast/dist/css/iziToast.min.css';
import { AccumulationChartPlugin } from '@syncfusion/ej2-vue-charts';
import { hexToRgba } from './utils/hexToRgba';
import { currency } from './utils/currencyFormatter';



Vue.use(AccumulationChartPlugin)

Vue.prototype.$hexToRgba = hexToRgba
Vue.prototype.$currency = currency

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
