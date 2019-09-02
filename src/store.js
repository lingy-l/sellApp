//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

//在vue上注册vuex
Vue.use(Vuex)

//创建仓库  抛出仓库
export default new Vuex.Store({
    //状态定义的位置  类似于vue的data
    state: {
        goods: [],
        seller:{}
    },
    //通知，改变state的唯一方式   参数类似于vue的methods
    mutations: {
        //初始化goods
        initgoods(state, newgoods) {
            state.goods = newgoods;
        },
        //初始化seller
        initseller(state, newseller) {
            state.seller = newseller;
        },
        //改变商品的数量
        changegoodsnum(state, obj) {
            //根据商品名和商品数量
            for (const good of state.goods) {
                for (const food of good.foods) {
                    if (food.name === obj.name) {
                        food.num += obj.num
                        //操作完成后  跳出函数
                        return
                    }
                }
            }
        },
        //重置商品数量
        cleargoodsnum(state) {
            //根据商品名和商品数量
            for (const good of state.goods) {
                for (const food of good.foods) {
                        food.num = 0;
                    
                }
            }
        }
    },
    //vuex   的计算属性，类似于vue的computed
    getters: {
        shopcarlist(state) {
            for (const good of state.goods) {
                return good.foods.filter(val => {
                    if (val.num > 0) {
                        return val
                    }
                })
            }
        },
        shopcartotal(state){
            let total=0;
            for (const good of state.goods) {
                 good.foods.filter(val => {
                    if (val.num > 0) {
                        total+=(val.price*val.num)
                    }
                })
            }
            return total;
        }
    }
});