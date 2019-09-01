//引入vue
import Vue from 'vue'
//引入路由router
import router from './router'
//引入仓库store
import store from './store'
//引入父组件App
import App from './App.vue'
//引入UI框架 和css文件
import iview from 'iview'
import 'iview/dist/styles/iview.css'
//引入懒加载组件
import { Lazyload } from 'vant';

//引入UI框架 和css文件
import Vant from 'vant';
import 'vant/lib/index.css';

//注册组件
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
