<template>
  <div style="width:100%" class="hide"> 
    <div>
      <h4>购物车</h4>
      <Button  icon="ios-trash-outline" @click="cleargoods">
        <span>清空购物车</span>
    </Button>
    </div>
    <table class="productlist">
      <tr v-for="good in shopcarlist" :key="good.id">
      <td><img :src="good.icon" alt="图片加载失败" width="40px" height="40px"/></td>  
        <td class="tcenter">
          <h4>{{good.name}}</h4>
          <p>
            &yen;{{good.price*good.num}} &nbsp;
            <del v-show="good.oldPrice">&yen;{{good.oldPrice*good.num}}</del>
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
</template>

<script>
import { getSeller } from "../api/api";

export default {
  data() {
    return {};
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
    }
  }
};
</script>

<style lang="less" Scoped>
.hide{
  padding:10px 20px;
  background-color: rgba(255, 255, 255, 1);
  div{
    display:flex;
    justify-content: space-between;
    h4{
    line-height:26px;
  }
  }
  .productlist{
    width:100%;
    td.btn{
      text-align: right;
      .van-button{
        border-radius: 50%;
        height:20px;
        width:20px;
        padding:0;
        line-height:18px;
        span{
    display: inline-block;
          transform: translateY(-1px)
        }
      }
      label{
        display:inline-block;
        width:20px;
    text-align: center;
      }
    }
  }
}
</style>