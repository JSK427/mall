<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper

  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
      // console.log(res);

    }).catch(err => {

    })

  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
