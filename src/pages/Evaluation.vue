<template>
  <div class="evaluation" id="evaluation">
    <ul class="content">
    <!-- 店铺评分信息 -->
    <van-row class="score">
      <van-col span="8" class="left">
        <p class="cffd" style="font-size:18px">{{(business.score+business.serviceScore)/2}}</p>
        <p>综合评分</p>
        <p class="ccc">高于周边商家{{business.rankRate}}%</p>
      </van-col>
      <van-col offset="1" span="14">
        <table width="100%">
          <tr>
            <td>口味评分</td>
            <td>
              <van-rate
                v-model="business.score"
                allow-half
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </td>
            <td class="cffd">{{business.score}}</td>
          </tr>
          <tr>
            <td>服务评分</td>
            <td>
              <van-rate
                v-model="business.serviceScore"
                allow-half
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </td>
            <td class="cffd">{{business.serviceScore}}</td>
          </tr>
          <tr>
            <td>送达时间</td>
            <td class="ccc">{{business.deliveryTime}}分钟</td>
            <td></td>
          </tr>
        </table>
      </van-col>
    </van-row>
    <!-- 隔断 -->
    <p class="bg"></p>
    <!-- 评论 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell>
        <van-button size="small" type="info" @click="all">全部&nbsp;{{clone.length}}</van-button>
        <van-button size="small" color="skyblue" @click="nice">满意&nbsp;{{clone.length-downTotal}}</van-button>
        <van-button size="small" color="#ccc" @click="bad">不满意&nbsp;{{downTotal}}</van-button>
      </van-cell>
      <van-cell>
        <van-checkbox v-model="checked" checked-color="#ccc" @change="checkbox">只看有内容的评价</van-checkbox>
      </van-cell>
      <van-cell v-for="item in list" :key="item.username">
        <img :src="item.avatar" alt="头像加载失败" />
        <div class="content">
          <p class="flex justify-between">
            {{item.username}}
            <span>{{date(item.rateTime)}}</span>
          </p>
          <p class="flex">
            <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" readonly />
            &nbsp;{{item.deliveryTime}}分钟送达
          </p>
          <p>{{item.text}}</p>
          <p>
            <van-icon name="good-job" color="#2d8cf0" style="top:2px"  v-show="item.rateType===0" />
            <Icon type="md-thumbs-down" v-show="item.rateType===1" color="#ccc" />
            <van-tag plain v-for="tag in item.recommend" :key="tag">{{tag}}</van-tag>
          </p>
        </div>
      </van-cell>
    </van-list>
    </ul>
  </div>
</template>

<script>
import { getSeller, getRatings } from '../api/api';
import moment from 'moment'
//引入滚动插件
import BScroll from "better-scroll";
export default {
  data() {
    return {
      business: {},
      list: [],
      loading: false,
      finished: false,
      checked: false,
      clone: [],
      state:1
    };
  },
  methods: {
    onLoad() {
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      this.finished = true;
    },
    checkbox() {
      //定义一个新数组
      let Newarr=[];
      //判定当前list内容
      if(this.state===1){
         Newarr = this.allCon.filter(val => {
          return val;
        });
      }else if(this.state===2){
        Newarr = this.niceCon.filter(val => {
          return val;
          });
      }else if(this.state===3){
        Newarr = this.badCon.filter(val => {
          return val;
          });
      }
        //根据选中情况返回需要显示的list
      if (this.checked) {
        this.list = Newarr.filter(val => {
          return val.text;
          });
      } else {
        this.list=Newarr;
      }
    },
    all(){
      this.state=1
      this.checkbox();
    },
    nice(){
      this.state=2
      this.checkbox();
    },
    bad(){
      this.state=3;
      this.checkbox();
    },
    date(time){
     return moment(time).format('Y-M-D H:m')
    }
  },
  computed: {
    downTotal() {
      let downSum = 0;
      for (const item of this.clone) {
        if (item.rateType === 1) {
          downSum++;
        }
      }
      return downSum;
    },
    //返回全部list
    allCon() {
      return this.clone.filter(val => {
          return val;
        });
    },
    //返回满意list
    niceCon() {
      //获取所有满意
        return this.clone.filter(val => {
          if(val.rateType===0)return val;
        });
    },
    //返回不满意的list
    badCon() {
     return this.clone.filter(val => {
          if(val.rateType===1)return val;
        });
    }
  },
  created() {
    getSeller().then(data => {
      this.business = data;
    });
    getRatings().then(data => {
      this.list = data;
      this.clone = this.list;
    });
  },
  mounted() {
    let evaluation = new BScroll("#evaluation", {
      click: true
    });
  }
};
</script>

<style lang="less" Scoped>
.evaluation {
  height:100%;
  overflow: auto;
  .score {
    padding: 10px;
    border-bottom: 1px solid #eee;
    .van-col.left {
      text-align: center;
      line-height: 25px;
      border-right: 1px solid #eee;
    }
  }
  .van-cell {
    display: flex;
    .van-cell__value button {
      margin-right: 10px;
    }
    .van-cell__value {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 10px;
      }
      div.content {
        flex: 1;
        .van-tag {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>