<template>
  <div class="bg">
    <div class="m">
      <!-- 音乐排行榜 左侧列 -->
      <div class="music-top">
        <div class="feature-top">
          <p class="top-p">音乐特色榜</p>
          <ul class="top-ul">
            <li
              v-for="(item, index) in Tops.slice(0, 4)"
              :key="index"
              @click="topMessage(item.id)"
            >
              <img class="top-img" :src="item.coverImgUrl" alt="" />
              <div>
                <p class="top-name">{{ item.name }}</p>
                <p class="top-update">{{ item.updateFrequency }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="media-top">
          <p class="top-p">全球媒体榜</p>
          <ul class="top-ul">
            <li
              v-for="item in Tops.slice(5, 31)"
              :key="item.id"
              @click="topMessage(item.id)"
            >
              <img class="top-img" :src="item.coverImgUrl" alt="" />
              <div>
                <p class="top-name">{{ item.name }}</p>
                <p class="top-update">{{ item.updateFrequency }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 排行榜详情 右侧列 -->
      <div class="musics">
        <div class="top-right">
          <!-- 排行榜信息 -->
          <div class="music-message">
            <img :src="topImg" alt="" />
            <div>
              <h2>{{ topName }}</h2>
              <p class="music-message-update">更新时间：{{ topUpdateTime }}</p>
              <p class="music-message-explain">{{ topExplain }}</p>
            </div>
          </div>
          <!-- 歌曲列表 -->
          <div class="music-list">
            <ul class="music-list-top" ref="musicListTop">
              <li class="music-list-table">
                <p class="music-list-song">歌曲</p>
                <p class="music-list-singer">歌手</p>
                <p class="music-list-album">专辑</p>
                <p class="music-list-time">时长</p>
              </li>
              <li
                v-for="(item, index) in topMusics"
                :key="index"
                :data-musicid="item.id"
                :data-index="index"
                class="music-list-li"
              >
                <div class="music-list-song">
                  <a>{{ item.name }}</a>
                </div>
                <p class="playqwe" @click="playMusic(item.id, index)"></p>
                <div class="music-list-singer">
                  <a>{{ item.ar[0].name }}</a>
                </div>
                <div class="music-list-album">
                  <a>{{ item.al.name }}</a>
                </div>
                <div class="music-list-time">
                  <a>
                    {{
                      Math.floor(
                        (item.dt % ("1000" * "60" * "60")) / ("1000" * "60")
                      ) +
                      ":" +
                      (Math.floor((item.dt % ("1000" * "60")) / "1000") >= 10
                        ? Math.floor((item.dt % ("1000" * "60")) / "1000")
                        : "0" +
                          Math.floor((item.dt % ("1000" * "60")) / "1000"))
                    }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  name: "Top",
  data() {
    return {
      Tops: "",
      TopId: "19723756",
      topImg: "",
      topName: "",
      topUpdateTime: "",
      topExplain: "",
      topMusics: "",
    };
  },
  methods: {
    /* 点击歌曲播放 */
    playMusic(Id, index) {
      //将播放暂停和true false绑定
      this.$store.state.musicLyric = [];
      let ismusic = this.$store.state.isPlayMusic;
      this.$store.state.isMusicPlayer = true;
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
      this.$store.state.reMusicIndex = index;
      this.$store.state.reMusicId = Id;
    },
    /* 获取排行榜 */
    musicTop() {
      axios({
        url: "/toplist",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.list[0].id);
          this.Tops = res.data.list;
          this.TopId = res.data.list[0].id;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    //点击top修改页面
    topMessage(e) {
      axios({
        url: "/playlist/detail?id=" + e,
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.playlist);
          this.topImg = res.data.playlist.coverImgUrl;
          this.topName = res.data.playlist.name;
          this.topExplain = res.data.playlist.description;
          //将毫秒转换成日期,获取月日
          let d = new Date(res.data.playlist.updateTime);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          this.topUpdateTime = month + "月" + day + "日";
          this.topMusics = res.data.playlist.tracks;
        })
        .catch((err) => {
          //console.log(err);
        });
        //跳转到页面顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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
  created() {
    this.musicTop();
    this.topMessage(19723756);
  },
  updated: function () {
    //下一首的点击上限
    if (this.$refs.musicListTop) {
      this.$store.state.reMusics = this.$refs.musicListTop.children.length - 2;
      //console.log(this.$store.state.reMusics);
    }
  },
};
</script>

<style scoped>
.bg {
  padding: 70px 0 30px 0;
  background-color: rgb(250, 250, 250);
}
.m {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 30px;
}
.music-top {
  width: 280px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding-bottom: 10px;
}
.top-p {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0 10px 15px;
}
.feature-top .top-p {
  padding: 20px 15px 10px;
}
.top-ul li {
  display: flex;
  padding: 10px 0 10px 15px;
  transition: all 0.2s;
}
.top-ul li:hover {
  background-color: #3dd1a51c;
  transition: all 0.2s;
  z-index: 99;
}
.top-img {
  width: 60px;
  height: 60px;
}
.top-ul li div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-name {
  font-weight: 550;
  font-size: 14px;
  padding: 6px 0 0 5px;
}
.top-update {
  font-size: 13px;
  color: #999;
  padding: 0 0 6px 5px;
}
.musics {
  width: 900px;
  margin: 20px 0 0 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
}
.music-message {
  display: flex;
}
.music-message img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin: 20px 40px 20px 20px;
}
.music-message div {
  position: relative;
  top: 50px;
}
.music-message-update {
  position: relative;
  top: 30px;
}
.music-message-explain {
  position: relative;
  top: 60px;
  display: block;
  width: 600px;
}
.music-list {
  width: 860px;
  margin: 0 20px;
  margin-top: 20px;
  padding-bottom: 20px;
}
.music-list-top li {
  height: 50px;
  display: flex;
  line-height: 50px;
  font-size: 14px;
  color: #4a4a4a;
  border-radius: 2px;
}
/* 一行显示不下 显示省略号 */
.music-list-top li div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-list-top .music-list-table {
  color: #999;
  background-color: #fafafa;
}
.music-list-top li:nth-of-type(odd) {
  background-color: #f7f7f7;
}
.music-list-top li:nth-of-type(even) {
  background-color: #fff;
}
.music-list-li {
  transition: all 0.2s;
  position: relative;
}
.music-list-li:hover {
  transition: all 0.2s;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.2);
  transform: scaleY(1.05);
  z-index: 1;
}
.music-list-song {
  width: 380px;
  padding: 0 20px 0 25px;
}
.music-list-singer {
  width: 230px;
  padding-right: 20px;
}
.music-list-album {
  width: 200px;
  padding-right: 20px;
}
.music-list-time {
  width: 50px;
}
.playqwe {
  font-family: "icomoon";
  font-size: 30px;
  position: absolute;
  left: 330px;
  visibility: hidden;
  cursor: pointer;
}
.music-list-li:hover .playqwe {
  transition: all 0.1s;
  visibility: visible;
}
</style>