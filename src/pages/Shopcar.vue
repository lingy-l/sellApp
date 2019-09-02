<template>
  <footer>
    <transition name="slide-fade">
      <div style="width:100%" class="hide" v-show="hide&&foodstotal!==0">
        <div>
          <h4>购物车</h4>
          <Button icon="ios-trash-outline" @click="cleargoods">
            <span>清空购物车</span>
          </Button>
        </div>
        <table class="productlist">
          <tr v-for="good in shopcarlist" :key="good.id">
            <td>
              <img :src="good.icon" alt="图片加载失败" width="40px" height="40px" />
            </td>
            <td class="tcenter">
              <h4>{{good.name}}</h4>
              <p>
                &yen;{{good.price*good.num}} &nbsp;
                <del
                  v-show="good.oldPrice"
                >&yen;{{good.oldPrice*good.num}}</del>
              </p>
            </td>
            <td class="btn">
              <van-button plain color="#0178FE" @click="subtract(good.name)" v-show="good.num>0">-</van-button>
              <label v-show="good.num>0">{{good.num}}</label>
              <van-button color="#0178FE" @click="add(good.name)">+</van-button>
            </td>
          </tr>
        </table>
      </div>
    </transition>
    <div class="shopstrip">
      <div class="shopcar" @click="hide=!hide">
        <van-icon :name="iconurl" />
      </div>
      <label class="yen">&yen;{{foodstotal}}</label>|
      <span>另需配送费&yen;{{business.deliveryPrice}}元</span>
      <button class="btn" v-show="foodstotal<20">&yen;{{business.minPrice}}起送</button>
      <button class="btn bged4" v-show="foodstotal>=20">去结算</button>
    </div>
  </footer>
</template>

<script>
import { getSeller } from "../api/api";

export default {
  data() {
    return {
      hide: false
    };
  },
  created() {},
  methods: {
    //数量增加
    add(name) {
      this.$store.commit("changegoodsnum", {
        name,
        num: 1
      });
    },
    //数量减少
    subtract(name) {
      this.$store.commit("changegoodsnum", {
        name,
        num: -1
      });
    },
    cleargoods() {
      this.$store.commit("cleargoodsnum");
    }
  },
  computed: {
    //获取商品列表
    shopcarlist() {
      // console.log(this.$store.getters.shopcarlist);
      return this.$store.getters.shopcarlist;
    },
    iconurl() {
      if (JSON.stringify(this.shopcarlist) === '[]')
        return require("../assets/images/shopnull.svg");
      else return require("../assets/images/shopeve.svg");
    },
    foodstotal() {
      return this.$store.getters.shopcartotal;
    },
    business() {
      return this.$store.state.seller;
    }
  }
};
</script>

<style lang="less" Scoped>
footer {
  .hide {
    position: fixed;
    bottom: 50px;
    padding: 10px 20px;
    max-height: 200px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 1);
    div {
      display: flex;
      justify-content: space-between;
      h4 {
        line-height: 26px;
      }
    }
    .productlist {
      width: 100%;
      td.btn {
        text-align: right;
        .van-button {
          border-radius: 50%;
          height: 20px;
          width: 20px;
          padding: 0;
          line-height: 18px;
          span {
            display: inline-block;
            transform: translateY(-1px);
          }
        }
        label {
          display: inline-block;
          width: 20px;
          text-align: center;
        }
      }
    }
  }
  //购物车样式
  .shopstrip {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ccc;
    position: fixed;
    bottom: 0;
    background-color: rgb(19, 17, 17);
    .shopcar {
      width: 50px;
      height: 50px;
      display: inline-block;
      color: rgb(19, 17, 17);
      // background-color: rgb(54, 53, 53);
      background-color: #eee;
      box-shadow: 0px 0px 0px 5px rgb(19, 17, 17);
      border-radius: 50%;
      position: absolute;
      z-index: 3333;
      top: -14px;
      left: 32px;
      i {
        font-size: 40px;
        transform: translate(7%, 16%);
      }
    }
    label.yen {
      // text-indent: 100px;
      margin-left: 100px;
      display: inline-block;
      // width:130px;
      width: 30px;
    }
    button.btn {
      width: 100px;
      float: right;
      border: 0;
      background-color: rgb(54, 53, 53);
    }
    button.bged4 {
      color: #fff;
      font-size: 16px;
      background-color: rgb(245, 42, 42);
    }
  }
  //设置动画样式
  .slide-fade-enter-active {
    transition: all 0.5s linear;
  }
  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }
}
</style>