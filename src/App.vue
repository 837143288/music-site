<template>
  <div id="app">
    <!-- 头部 -->
    <div id="HeadBar">
      <div class="w">
        <div class="logo"></div>
        <div class="head">
          <router-link to="/FindMusic" tag="div" class="findmusic"
            >发现音乐</router-link
          >
          <router-link to="/Top" tag="div" class="top">排行榜</router-link>
          <router-link to="/SongList" tag="div" class="song-list"
            >歌单</router-link
          >
          <router-link to="/MyMusic" tag="div" class="my-music"
            >我的音乐</router-link
          >
        </div>
        <div class="search">
          <span @click="SearchSong"></span>
          <input @keyup.enter="SearchSong" ref="search" type="text" />
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <router-view> </router-view>
    <!-- 播放器 -->
    <div class="player">
      <MusicPlayer></MusicPlayer>
    </div>
    <!-- 尾部 -->
    <Foot></Foot>
  </div>
</template>

<script>
import MusicPlayer from "./components/MusicPlayer";
import Foot from "./components/Foot";
import axios from "@/plugins/axios.js";
export default {
  name: "App",
  components: {
    MusicPlayer,
    Foot,
  },
  methods: {
    SearchSong() {
      this.$store.state.searchName = this.$refs.search.value;
      this.$store.commit("SearchSong");
      if (this.$route.path !== "/SearchSong/Song") {
        this.$router.push({ path: "/SearchSong/Song" });
      }
    },
  },
};
</script>

<style>
@import url("./assets/css/base.css");
@import url("./assets/css/index.css");

/* 给对应的元素加上router-link-active的class标签 */
.router-link-active {
  background-color: black;
}
</style>
