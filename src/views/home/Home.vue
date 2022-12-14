<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>

    <Scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="contentScroll"
      @pullingUp="loadMore">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>

  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home";

// import BScroll from "better-scroll";

import HomeSwiper from "./childComps/HomeSwiper";
// import {HomeSwiper }from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        },

      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //事件监听
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
        default:
          break;
      }
    },

    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;

      }).catch(err => { })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page++
        this.$refs.scroll.finishPullUp()
      })
    },
    //backtop
    backClick() {
      // console.log(111);
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听滚动事件
    contentScroll(position) {
      // console.log(position);
      // if (position.y < -500) {
      //   this.isShowBackTop = true
      // } else {
      //   this.isShowBackTop = false
      // }
      this.isShowBackTop = (-position.y) > 1000
    },
    //上拉加载更多
    loadMore() {
      // console.log('loadmore');
      // console.log(this.currentType);
      this.getHomeGoods(this.currentType)

      //重新计算可滚动区域
      this.$refs.scroll.scroll.refresh()
    }
  }
};
</script>

<style scoped>
#home {
  /* 设置padding窗口就没有100vh->100vh(视口)*/
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
}

.tab-control {
  position: sticky;
  top: 44px;
}

.content {
  /* #方法一   使用calc动态计算*/
  /* height: calc(100% -93px);
  overflow: hidden;
  margin-top: 44px; */


  /* #方法二   定位 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
