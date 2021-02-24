<template>
  <div class="bg">
    <div class="MusicList">
      <!-- 歌单左侧 -->
      <div class="music-list-left">
        <!-- 歌单详情 -->
        <div class="details">
          <!-- 歌单信息 -->
          <div class="music-message">
            <img :src="musicMessage.coverImgUrl" alt="" />
            <div>
              <h2>{{ musicMessage.name }}</h2>
              <p class="music-message-update">
                更新时间：{{ musicUpdateTime }}
              </p>
              <p
                class="music-message-explain"
                :title="musicMessage.description"
              >
                {{ musicMessage.description }}
              </p>
            </div>
          </div>
          <!-- 歌曲列表 -->
          <div class="music-list">
            <ul class="music-list-lists" ref="musicListTop">
              <li class="music-list-table">
                <p class="music-list-song">歌曲</p>
                <p class="music-list-singer">歌手</p>
                <p class="music-list-album">专辑</p>
                <p class="music-list-time">时长</p>
              </li>
              <li
                v-for="(item, index) in musicList"
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
      <!-- 歌单右侧 -->
      <div class="music-list-right">
        <!-- 相关推荐 -->
        <div class="recommend">
          <h4>相关推荐</h4>
          <ul class="recommend-ul">
            <li
              class="recommend-li"
              v-for="(item, index) in similar"
              :key="index"
            >
              <img :src="item.coverImgUrl" alt="" class="recommend-img" />
              <div class="recommend-message">
                <p class="recommend-name">{{ item.name }}</p>
                <p class="">by {{ item.creator.nickname }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 评论 -->
        <div class="comments">
          <h4>精彩评论</h4>
          <ul>
            <li
              class="comments-li"
              v-for="(item, index) in comments"
              :key="index"
            >
              <img :src="item.user.avatarUrl" alt="" />
              <div class="comments-message">
                <h2>
                  {{ item.user.nickname }}<small> · {{ item.time }}前</small>
                </h2>
                <p>{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  name: "MusicList",
  data() {
    return {
      musicMessage: "",
      musicUpdateTime: "",
      musicListId: "",
      musicList: "",
      similar: "",
      comments: "",
      commentsTime: "",
    };
  },
  methods: {
    /* 获取歌单评论 */
    Comment() {
      let id = this.$store.state.musicListId;
      axios({
        url: "/comment/playlist?id=" + id,
        method: "post",
      })
        .then((res) => {
          console.log(res);
          this.comments = res.data.comments;
          let i = 0;
          for (i = 0; i < res.data.comments.length; i++) {
            //获取评论的更新时间
            let d = new Date(res.data.comments[i].time);
            console.log(res.data.comments[i].time);
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year=d.getFullYear()
            let hour = Math.floor(
              (res.data.comments[i].time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minute = Math.floor((res.data.comments[i].time % (1000 * 60 * 60)) / (1000 * 60));
            //获取当前时间
            let now = new Date();
            //判断时间前后
             if(year === now.getFullYear()) {
               if(month === now.getMonth() + 1) {
                if(day === now.getDate()) {
                  if(hour === now.getHours()) {
                    this.comments[i].time = now.getMinutes() - minute + "分钟"
                  } else {
                    this.comments[i].time = now.getHours() - hour + "小时"
                  }
                } else {
                  this.comments[i].time = now.getDate() - day + "天"
                }
              } else {
                this.comments[i].time = now.getMonth() - month + 1 + "月"
              } 
            } else {
              this.comments[i].time = now.getFullYear() - year + "年"
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 获取相似歌单 */
    MusicSimi() {
      let id = this.$store.state.musicListId;
      axios({
        url: "/related/playlist?id=" + id,
        method: "post",
      })
        .then((res) => {
          //console.log(res);
          this.similar = res.data.playlists;
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
    /* 获取歌单内容信息 */
    MusicList() {
      let id = this.$store.state.musicListId;
      axios({
        url: "/playlist/detail?id=" + id,
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.playlist);
          this.musicMessage = res.data.playlist;
          //将毫秒转换成日期,获取月日
          let d = new Date(res.data.playlist.updateTime);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          this.musicUpdateTime = month + "月" + day + "日";
          //获取歌单的所有歌曲
          this.musicListId = res.data.playlist.trackIds[0].id;
          let i = 1;
          for (i = 1; i <= res.data.playlist.trackIds.length - 1; i++) {
            this.musicListId += "," + res.data.playlist.trackIds[i].id;
          }
          //console.log(this.musicListId);
          axios({
            url: "/song/detail?ids=" + [this.musicListId],
            method: "post",
          })
            .then((res) => {
              //console.log(res);
              this.musicList = res.data.songs;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.MusicList();
    this.MusicSimi();
    this.Comment();
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
  src: url("../fonts/icomoon.eot?evtv7");
  src: url("../fonts/icomoon.eot?evtv7#iefix") format("embedded-opentype"),
    url("../fonts/icomoon.ttf?evtv7") format("truetype"),
    url("../fonts/icomoon.woff?evtv7") format("woff"),
    url("../fonts/icomoon.svg?evtv7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.bg {
  padding: 70px 0 30px 0;
  background-color: rgb(250, 250, 250);
}
.MusicList {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  padding-bottom: 30px;
}
.music-list-left {
  width: 900px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding-bottom: 10px;
}
/* 歌单信息 */
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.music-list {
  width: 860px;
  margin: 0 20px;
  margin-top: 20px;
  padding-bottom: 20px;
}
.music-list-lists li {
  height: 50px;
  display: flex;
  line-height: 50px;
  font-size: 14px;
  color: #4a4a4a;
  border-radius: 2px;
}
/* 一行显示不下 显示省略号 */
.music-list-lists li div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-list-lists .music-list-table {
  color: #999;
  background-color: #fafafa;
}
.music-list-lists li:nth-of-type(odd) {
  background-color: #f7f7f7;
}
.music-list-lists li:nth-of-type(even) {
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
  padding: 0 60px 0 25px;
}
.music-list-singer {
  width: 230px;
  padding-right: 25px;
}
.music-list-album {
  width: 200px;
  padding-right: 25px;
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
}
.music-list-li:hover .playqwe {
  transition: all 0.1s;
  visibility: visible;
}
/*  */
.music-list-right {
  margin: 20px 0 0 20px;
}
.recommend,
.comments {
  width: 280px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding: 20px;
}
.comments {
  margin-top: 20px;
}
.comments h4 {
  margin-bottom: 15px;
}
.recommend h4 {
  margin-bottom: 15px;
}
.recommend-li {
  display: flex;
  margin-bottom: 12px;
}
.recommend-li img {
  width: 50px;
  height: 50px;
  background-color: bisque;
  border-radius: 8px;
  margin-right: 10px;
}
.recommend-message p {
  font-size: 14px;
}
.recommend-name {
  line-height: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.comments-li {
  display: flex;
  margin-bottom: 30px;
}
.comments-li img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comments-message {
  margin-left: 10px;
}
.comments-message h2 {
  font-size: 14px;
}
.comments-message h2 small {
  font-weight: normal;
  color: #a5a5c1;
}
.comments-message p {
  background-color: #f5f5f5;
  color: #666;
  margin-top: 8px;
  font-size: 12px;
  width: 180px;
  padding: 5px;
}
</style>