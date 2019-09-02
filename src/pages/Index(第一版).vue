<template>
  <div class="index flex direction-column">
    <!-- 蒙版层 -->
    <div class="overlay" v-show="show"  @click="close">
      <h3>{{business.name}}</h3>
      <van-rate v-model="business.score" allow-half readonly />
      <van-divider>优惠信息</van-divider>
      <p class="active" v-for="des in business.supports" :key="des.type">
        <img :src="url(des.type)" alt="">
        {{des.description}}
      </p>
      <van-divider>商家公告</van-divider>

      {{business.bulletin}}
      <img src="../assets/images/close.svg" alt width="24px"/>
    </div>
    <!-- 头部：商家信息，优惠信息， 公告 -->
    <header>
      <img class="bgimg" :src="business.avatar" alt="图片加载失败！" />
      <!-- 商家信息 -->
      <div class="business flex justify-between">
        <div class="info flex">
          <!-- 商家头像 -->
          <img :src="business.avatar" alt="图片加载失败！" />
          <div>
            <!-- 商家名称 -->
            <h3>
              <span class="bd f00cf">品牌</span>
              {{business.name}}
            </h3>
            <p>
              <!-- 配送描述 -->
              <span>{{business.description}}</span>/
              <span>{{business.deliveryTime}}</span>分钟送达
            </p>
            <p>
              <span class="bd fffc0">减</span>
              <span v-for="des in business.supports" :key="des.type" v-show="des.type===0">{{des.description}}</span>
            </p>
          </div>
        </div>
        <p class="align-end">
          <van-button round type="danger" size="small" @click="open" v-show="business.supports">
            {{business.supports.length}}个
            <van-icon name="arrow" />
          </van-button>
        </p>
      </div>
      <!-- 商家公告 -->
      <van-notice-bar
        mode="link"
        :text="business.bulletin"
        left-icon="volume-o"
        background="rgba(0, 0, 0, 0.2)"
        color="#ddd"
      />
    </header>
    <!-- 导航 -->
    <van-tabbar route :fixed="false" active-color="#f00">
      <van-tabbar-item replace to="/">商品</van-tabbar-item>
      <van-tabbar-item replace to="/evaluation">评论</van-tabbar-item>
      <van-tabbar-item replace to="/merchants">商家</van-tabbar-item>
    </van-tabbar>
    <section class="content">
      <!--内容设置 路由出口 -->
      <router-view></router-view>
    </section>

    <!-- 购物车 -->
    <footer>

      <span>&yen;0</span>|
      <span>另需配送费&yen;{{business.deliveryPrice}}元</span>
      <button></button>

      <!-- <van-goods-action>
        <van-goods-action-icon to="/shopcar" icon="cart-o" text="购物车" info="5" />
        <span class="total">&yen;0</span>
        <span>另需配送费&yen;{{business.deliveryPrice}}元</span>
        <span>{{business.minPrice}}元起送</span>
        <van-goods-action-button type="danger" text="去结算" />
      </van-goods-action>-->
    </footer> 
  </div>
</template>

<script>
import "../assets/styles/comm.css";
import { getSeller } from "../api/api";
export default {
  name: "index",
  data() {
    return {
      business: {
        // name: "", //商家名称
        // description: "", //配送
        // deliveryTime: "", //送达时间
        // score: "", //口味评分
        // serviceScore: "", //服务评分
        // rankRate: "", //等级评分
        // minPrice: "", //起送价
        // deliveryPrice: "", //配送费
        // ratingCount: "", //评价人数
        // sellCount: "", //销售总数
        // bulletin: "", //商家公告
        // supports: [], //特色支持
        // avatar: "", //头像
        // pics: "", //商家店面图片
        // infos: "" //其他信息
      },
      show: false
    };
  },
  components: {},
  methods:{
    url(type){
      return require("@/assets/images/"+type+".png")
    },
    open(){
      this.show=true;
    },
    close(){
      this.show=false;
    }
  },
  created() {
    getSeller().then(data => {
      this.business = data;
    });
  }
};
</script>

<style lang="less" Scoped>
.index {
  width: 100%;
  height: 100%;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;
    padding:50px;
    line-height:30px;
    color:#ddd;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    h3,.van-rate{
      text-align: center;
    }
    img{
      align-self: center;
    }
    p.active{
      display: flex;
      img{
        margin-right:5px;
      }
    }
  }
  header {
    flex: 0 0 152px;
    color: #ddd;
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    .bgimg {
      width: 100%;
      height: 100%;
      filter: blur(10px);
      top: 0;
      left: 0;
      position: absolute;
      z-index: -1;
    }
    .business {
      padding: 20px;
      .info {
        img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        div {
          h3 {
            color: #eee;
            line-height: 30px;
          }
          p {
            line-height: 24px;
          }
        }
      }
      p button {
        background-color: rgba(0, 0, 0, 0.2);
        border: none;
        i {
          transform: translateY(2px);
        }
      }
    }
    .van-notice-bar {
      height: 31px;
    }
  }
  .van-tabbar {
    font-size: 14px;
    font-weight: bold;
  }
  .content {
    flex: 1;
    overflow: scroll;
  }
  footer {
    flex: 0 0 36px;
    position: relative;
    background-color:rgba(0,0,0,0.7);
    padding-left:60px;
    &:after{
      content:'';
      width:40px;
      height:40px;
      display:inline-block;
      background:url('../assets/images/shopping_cart.svg') center;
      background-color:rgb(54, 53, 53);
      box-shadow: 0px 0px 0px 5px rgba(0,0,0,0.7);
      background-size:80%;
      border-radius: 50%;
      position: absolute;
      top:-14px;
      left:32px;
    }
  }
}
</style>