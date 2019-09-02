import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'goods',
            component:Goods
        }
        ,{
            path:'/evaluation',
            name:'evaluation',
            component:()=>import('./pages/Evaluation.vue')
        }
        ,{
            path:'/shopcar',
            name:'shopcar',
            component:()=>import('./pages/Shopcar.vue')
        }
        ,{
            path:'/merchants',
            name:'merchants',
            component:()=>import('./pages/Merchants.vue')
        }
    ]
})
