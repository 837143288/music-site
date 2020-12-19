<template>
  <div class="song">
    <ul class="songul">
      <li class="first">
        <p class="search-song">歌曲</p>
        <p class="search-singer">歌手</p>
        <p class="search-album">专辑</p>
        <p class="search-time">时长</p>
      </li>
      <li
        v-for="item in $store.state.searchSongs"
        :key="item.id"
        class="searchList"
      >
        <div class="search-song">
          <a>{{ item.name }}</a>
        </div>
        <div class="search-singer">
          <a>{{ item.artists[0].name }}</a>
        </div>
        <div class="search-album">
          <a>{{ item.album.name }}</a>
        </div>
        <div class="search-time">
          <a>
            {{
              Math.floor(
                (item.duration % ("1000" * "60" * "60")) / ("1000" * "60")
              ) +
              ":" +
              (Math.floor((item.duration % ("1000" * "60")) / "1000") >= 10
                ? Math.floor((item.duration % ("1000" * "60")) / "1000")
                : "0" + Math.floor((item.duration % ("1000" * "60")) / "1000"))
            }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  name: "Song",
  data() {
    return {};
  },
  created() {},
  methods: {
    SearchSong() {
      axios({
        url: "/search?keywords= " + this.$store.state.searchName,
        method: "post",
      })
        .then((res) => {
          console.log(res.data.result.songs);
          this.searchSongs = res.data.result.songs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.song ul li {
  height: 50px;
  display: flex;
  background-color: #fafafa;
  line-height: 50px;
  font-size: 14px;
  color: #4a4a4a;
}
.song ul .first {
  background-color: #fafafa;
  color: #999;
}
.song ul .searchList {
  transition: all 0.15s;
}
.song ul .searchList:hover {
  transition: all 0.15s;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.2);
  transform: scaleY(1.1);
  z-index: 99;
}
.songul li:nth-of-type(odd) {
  background-color: #f7f7f7;
}
.songul li:nth-of-type(even) {
  background-color: #fff;
}
.searchList div {
  overflow: hidden;
  text-overflow: ellipsis; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.searchList a {
  cursor: pointer;
}
.searchList a:hover {
  color: #fa2800;
}
.search-song {
  width: 550px;
  margin-left: 35px;
}
.search-singer {
  width: 275px;
}
.search-album {
  width: 275px;
}
.search-time {
  width: 50px;
}
.search-time a {
  cursor: default;
}
.search-time a:hover {
  color: #4a4a4a;
}
</style>