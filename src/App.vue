<template>
  <div id="app">
    <!-- 头部 -->
    <HeadBar v-if="this.isRouterAlive"></HeadBar>
    <!-- 主体 -->
    <router-view v-if="this.isRouterAlive"></router-view>
    <!-- 播放器 -->
    <MusicPlayer></MusicPlayer>
    <!-- 尾部 -->
    <Foot></Foot>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
import MusicPlayer from "./components/MusicPlayer";
import Foot from "./components/Foot";
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  components: {
    HeadBar,
    MusicPlayer,
    Foot,
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style>
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
/* 给对应的元素加上router-link-active的class标签 */
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
/* 隐藏滚动条的同时有滚动效果 */
:root body::-webkit-scrollbar {
  display: none;
}
</style>
