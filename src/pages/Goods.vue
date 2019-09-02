<template>
  <div class="goods">
    <van-sidebar v-model="activeKey" id="leftScroll">
      <ul class="content">
        <van-sidebar-item
          @click="slider(item.name)"
          :title="item.name"
          :info="total(item.foods)"
          v-for="item in goods"
          :key="item.name"
        />
        <!-- 预留购物车空间 -->
    <!-- <div style="height:50px"></div> -->
      </ul>
    </van-sidebar>

    <div class="rightgoods" id="rightScroll">
      <ul class="content">
        <van-panel :title="item.name" v-for="item in goods" :key="item.id" :id="item.name">
          <van-card
            :price="good.price"
            :desc="good.description"
            :title="good.name"
            :thumb="good.icon"
            v-for="good in item.foods"
            :key="good.name"
            lazy-load
          >
            <div slot="tags">
              月售{{good.sellCount}}份
              &emsp;
              好评率{{good.rating}}%
            </div>
          <!-- 数量 -->
            <div slot="num">
              <van-button plain color="#0178FE" @click="subtract(good.name)" v-show="good.num>0">-</van-button>
              <label v-show="good.num>0">{{good.num}}</label>
              <van-button color="#0178FE" @click="add(good.name)">+</van-button>
            </div>
            <div slot="origin-price" v-show="good.oldPrice">&yen;{{good.oldPrice}}</div>
          </van-card>
        </van-panel>
     <!-- 预留购物车空间 -->
    <!-- <div style="height:50px"></div> -->
      </ul>
    </div>
  </div>
</template>

<script>
//引入ajax
import { getGoods } from "../api/api";
//引入滚动插件
import BScroll from "better-scroll";

export default {
  data() {
    return {
      activeKey: 0,
      value: 0
    };
  },
  methods: {
    //数量增加
    add(name) {
      this.$store.commit('changegoodsnum',{
        name,num:1
      })
    },
    //数量减少
    subtract(name) {
      this.$store.commit('changegoodsnum',{
        name,num:-1
      })
    },
    //左侧数量合计
    total(foods) {
      let sum = 0;
      for (const food of foods) {
        sum += food.num;
      }
      if (sum !== 0) {
        return sum;
      }
    },
    //右侧滑动选中左侧对应导航
    slider(name){
      this.rightScroll.scrollToElement('#'+name,400)
    }
  },
  computed: {
    //获取商品列表
    goods(){
      return this.$store.state.goods;
    }
  },
  created() {
    //从后台接收数据
    if(this.$store.state.goods.length===0){
      getGoods().then(data => {
      data.forEach(v => {
        //增加一个num属性，保存数量
        v.foods.forEach(val => {
          val.num = 0;
        });
      });
      //使用vuex的方法更新state中goods的值
      this.$store.commit('initgoods',data)
    });
    }
    
  },
  mounted() {
    //初始化滚屏插件
    let leftScroll = new BScroll("#leftScroll",{
      click:true,
      //当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      probeType:3
    });

    this.rightScroll = new BScroll("#rightScroll",{
      click:true,
      probeType:3
    });
    //右侧监听滚动事件on(type, fn, context) 
    this.rightScroll.on('scroll', (pos)=>{
      //获取当前y轴偏移量，使用绝对值获取正值，方便操作
      let _y=Math.abs(pos.y);
      //循环数组，判定条件
      for (let item of this.curArray) {
        if(_y>=item.min&&_y<item.max){
          //设置左侧导航选中
          this.activeKey=item.select;
          //完成后终止循环
          break;
        }
      }
      //scrollToElement(el, time, offsetX, offsetY, easing)滚动到的目标元素
      // if(this.activeKey>3){//前四项在当前页
        leftScroll.scrollToElement(document.querySelectorAll('#leftScroll  .van-sidebar-item')[this.activeKey],400)
      // }else{//前四项在当前页，不用移动，回来时，回到第一个位置
      //   leftScroll.scrollToElement(document.querySelectorAll('#leftScroll  .van-sidebar-item')[0],400)
      // }
      
    })
  },
  updated(){
    //DOM更新后，只获取一次
    if(!this.curArray){
      this.curArray=[];//定义一个数据
      let totalHeight=0;//定义一个变量，接总高度
      for(const [index, obj]  of this.goods.entries()){
        //获取dom距离滚动条顶部滚动距离
        let height=document.querySelector('#'+obj.name).offsetHeight;
        this.curArray.push({min:totalHeight,max:totalHeight+height,select:index});
        totalHeight+=height;
      }
    }
  }
};
</script>

<style lang="less" Scoped>
.goods {
  display: flex;
  // width:100%;
  height: 100%;
  .van-sidebar {
    height: 100%;

    flex: 0 0 85px;
    overflow: auto;
    .van-sidebar-item--select{
      border-color:transparent;
    }
    a.van-sidebar-item:active,a.van-sidebar-item:hover{
      color:#333;
    }
  }
  .rightgoods {
    overflow: auto;
    height: 100%;
    flex: 1;
    width: 0;
    .van-card__bottom {
      .van-card__num {
        .van-button--normal {
          width: 22px;
          height: 22px;
          line-height: 20px;
          border-radius: 50%;
          padding: 0px 5px;
          span{
            display:inline-block;
            transform: translateY(-1px)
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
}
</style>