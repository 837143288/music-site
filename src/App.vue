<template>
  <div id="app">
    <!-- 头部 -->
    <HeadBar></HeadBar>
    <!-- 主体 -->
    <router-view></router-view>
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
  components: {
    HeadBar,
    MusicPlayer,
    Foot,
  },
};
</script>

<style>
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
/* 给对应的元素加上router-link-active的class标签 */
.router-link-active {
  color: #fa2800;
}


:root {
  overflow-y: auto;
  overflow-x: hidden;
}
/* 隐藏滚动条的同时有滚动效果 */
:root body::-webkit-scrollbar {
  display: none;
}
</style>
