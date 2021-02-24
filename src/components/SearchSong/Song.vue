<template>
  <div class="song">
    <ul class="songul" ref="musicListTop">
      <li class="first">
        <p class="search-song">歌曲</p>
        <p class="search-singer">歌手</p>
        <p class="search-album">专辑</p>
        <p class="search-time">时长</p>
      </li>
      <li
        v-for="(item, index) in $store.state.searchSongs"
        :key="item.id"
        class="searchList"
        :data-musicid="item.id"
        :data-index="index"
      >
        <div class="search-song">
          <a>{{ item.name }}</a>
        </div>
        <p class="playqwe" @click="playMusic(item.id, index)"></p>
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
    /* 点击歌曲播放 */
    playMusic(Id, index) {
      //将播放暂停和true false绑定
      let ismusic = this.$store.state.isPlayMusic;
      if (Id != this.$store.state.reMusicId) {
        this.$store.state.mDuration = 0;
        this.$store.state.isPlayMusic = true;
      } else {
        if (ismusic) {
          this.$store.state.isPlayMusic = false;
        } else {
          this.$store.state.isPlayMusic = true;
        }
      }
      //console.log(this.$store.state.isPlayMusic);
      this.$store.state.reMusicIndex = index;
      this.$store.state.reMusicId = Id;
      this.$store.commit("getMusic");
      console.log(this.$store.state.reMusicIndex);
    },
  },
  computed: {
    lsUpDown() {
      return this.$store.state.reMusicIndex;
    },
  },
  watch: {
    //监听上一首按钮
    lsUpDown(val) {
      /* 根据自定义属性获取元素 */
      let index = document.querySelector("li[data-index= '" + val + "' ]");
      /* 根据元素获取自定义属性的值 */
      let id = index.dataset.musicid;
      this.$store.state.reMusicId = id;
      this.$store.commit("getMusic");
      //console.log(index);
    },
  },
  updated: function () {
    //下一首的点击上限
    this.$store.state.reMusics = this.$refs.musicListTop.children.length - 2;
    //console.log(this.$store.state.reMusics);
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../../fonts/icomoon.eot?evtv7");
  src: url("../../fonts/icomoon.eot?evtv7#iefix") format("embedded-opentype"),
    url("../../fonts/icomoon.ttf?evtv7") format("truetype"),
    url("../../fonts/icomoon.woff?evtv7") format("woff"),
    url("../../fonts/icomoon.svg?evtv7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
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
.playqwe {
  font-family: "icomoon";
  font-size: 30px;
  position: absolute;
  left: 530px;
  visibility: hidden;
  cursor: pointer;
}
.searchList:hover .playqwe {
  transition: all 0.1s;
  visibility: visible;
}
</style>