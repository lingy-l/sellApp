import Vue from 'vue'
import router from './router'
import App from './App.vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import { Lazyload } from 'vant';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
