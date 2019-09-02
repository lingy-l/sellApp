<template>
  <div class="index flex direction-column">
    <!-- 蒙版层 -->
    <div class="overlay" v-show="show" @click="close">
      <h3>{{business.name}}</h3>
      <van-rate v-model="business.score" allow-half readonly />
      <van-divider>优惠信息</van-divider>
      <p class="active" v-for="des in business.supports" :key="des.type">
        <img :src="url(des.type)" alt />
        {{des.description}}
      </p>
      <van-divider>商家公告</van-divider>
      {{business.bulletin}}
      <p style="text-align:center;font-size:26px;">
        <van-icon name="cross" />
      </p>
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
            <div class="flex justify-between">
              <p>
                <span class="bd fffc0">减</span>
                <span
                  v-for="des in business.supports"
                  :key="des.type"
                  v-show="des.type===0"
                >{{des.description}}</span>
              </p>
              <p class="align-end">
                <van-button round type="danger" size="small" @click="open">
                  {{len}}个
                  <van-icon name="arrow" />
                </van-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 商家公告 -->
      <van-notice-bar
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
    <!-- 购物车   购物车静态样式 -->
    <div class="shoplist">
      <Shopcar></Shopcar>
    </div>
  </div>
</template>

<script>
// 引入公共样式
import "../assets/styles/comm.css";
//引入axios组件  需求模块
import { getSeller } from "../api/api";
//引入购物车子组件
import Shopcar from "./Shopcar";

export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    //获取活动数量
    len() {
      if (Array.isArray(this.business.supports))
      return this.business.supports.length;
    },
    //获取商家信息
    business() {
      return this.$store.state.seller;
    }
  },
  components: { 
    Shopcar//注册子组件
     },
  methods: {
    //活动图标
    url(type) {
      return require("@/assets/images/" + type + ".png");
    },
    //蒙层开启
    open() {
      this.show = true;
    },
    //蒙层关闭
    close() {
      this.show = false;
    }
  },
  created() {
    //初始化vuex商家信息
    getSeller().then(data => {
      this.$store.commit("initseller", data);
    });
  }
};
</script>

<style lang="less" Scoped>
.index {
  width: 100%;
  height: 100%;
  // 蒙层样式
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;
    padding: 50px;
    line-height: 30px;
    color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3,
    .van-rate {
      text-align: center;
    }
    img {
      align-self: center;
    }
    p.active {
      display: flex;
      img {
        margin-right: 5px;
      }
    }
  }
  //头部样式
  header {
    flex: 0 0 132px;
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
      padding: 10px 20px;
      .info {
        img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        div {
          flex: 1;
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
  //导航样式
  .van-tabbar {
    font-weight: bold;
    height: 40px;
    .van-tabbar-item{
      font-size:14px;
    }
  }
  //内容样式
  .content {
    flex: 1;
    overflow: hidden;
  }
  
  .shoplist {
    flex:0 0 50px;
  }
}
</style>