<template>
  <div class="merchants" id="merchant">
    <ul class="content">
      <div class="p20">
        <div class="flex">
          <div style="flex:1">
            <h3 class="mb10">{{business.name}}</h3>
            <p class="flex">
              <van-rate v-model="ratio" allow-half readonly />&nbsp;
              <span
                class="align-center"
              >({{business.ratingCount}})&emsp;月售{{business.sellCount}}单</span>
            </p>
          </div>

          <div class="tcenter">
            <van-icon name="like" color="#f00" size="24px" />
            <p>已收藏</p>
          </div>
        </div>
        <van-divider />
        <!-- 店铺信息 -->
        <van-row class="tcenter border-right">
          <van-col span="8">
            <p>起送价</p>
            <p>
              <span class="f18">{{business.minPrice}}</span>元
            </p>
          </van-col>
          <van-col span="8">
            <p>商家配送</p>
            <p>
              <span class="f18">{{business.deliveryPrice}}</span>元
            </p>
          </van-col>
          <van-col span="8">
            <p>平均配送时间</p>
            <p>
              <span class="f18">{{business.deliveryTime}}</span>分钟
            </p>
          </van-col>
        </van-row>
      </div>
      <!-- 隔断 -->
      <p class="bg"></p>
      <!-- 公告与活动 -->
      <van-list>
        <van-cell>
          <h3>公告与活动</h3>
          <p class="ced4 p10">{{business.bulletin}}</p>
        </van-cell>

        <van-cell v-for="des in business.supports" :key="des.type" class="active">
          <img :src="url(des.type)" alt />
          {{des.description}}
        </van-cell>
      </van-list>

      <!-- 隔断 -->
      <p class="bg"></p>
      <van-list>
        <van-cell>
          <h3>商家实景</h3>
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="pic in business.pics" :key="pic">
              <van-image :src="pic" />
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-list>
      <!-- 隔断 -->
      <p class="bg"></p>
      <van-list>
        <van-cell>
          <h3>商家信息</h3>
        </van-cell>

        <van-cell v-for="info in business.infos" :key="info">{{info}}</van-cell>
      </van-list>
    </ul>
  </div>
</template>

<script>
import { getSeller } from "../api/api";
//引入滚动插件
import BScroll from "better-scroll";

export default {
  data() {
    return {
      business: {}
    };
  },
  methods: {
    url(type) {
      return require("@/assets/images/" + type + ".png");
    }
  },
  computed: {
    ratio() {
      const num = (this.business.score + this.business.serviceScore) / 2;
      // ((this.business.ratingCount / this.business.sellCount) * 100) / 20;
      return num;
    }
  },
  created() {
    getSeller().then(data => {
      this.business = data;
    });
  },
  mounted() {
    let merchants = new BScroll("#merchant", {
      click: true
    });
  }
};
</script>

<style lang="less" Scoped>
.merchants {
  width: 100%;
  height:100%;
  overflow: auto;
  .van-cell.active {
    display: flex;
    .van-cell__value {
      align-self: center;
    }
    img {
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  .van-grid {
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>