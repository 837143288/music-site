<template>
  <div class="music-player">
    <div class="avater">
      <img :src="$store.state.reMusicImg" alt="" />
    </div>
    <div class="info">
      <h2>{{ $store.state.reMusicName }}</h2>
      <p>{{ $store.state.reMusicSonger }}</p>
    </div>
    <div class="player-btn">
      <i class="btn-prev" @click="prevMusic"></i>
      <i class="btn-play" @click="playMusic">{{ btnPlay }}</i>
      <i class="btn-next" @click="nextMusic"></i>
    </div>
    <div class="progress-wrap">
      <p class="progress-time">{{ transTime($store.state.mDuration) }}</p>
      <div class="progress-wrap-bar">
        <!-- 进度条总宽 -->
        <div class="progress-bar" ref="musicWidth">
          <!-- 颜色进度条 -->
          <div class="bar-inner">
            <div class="progress" :style="{width: progressLong+'px'}" ref="musicBar"></div>
            <div class="progress-btn"></div>
          </div>
        </div>
      </div>
      <p class="progress-duartion">
        {{ transTime($store.state.reMusicDuration) }}
      </p>
    </div>
    <div class="volume-wrap"></div>
    <div class="tool"></div>
    <audio :src="$store.state.reMusicUrl" autoplay ref="audioRef"></audio>
  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      btnPlay: "",
      isPlayMusic: "",
      progressLong: '',
      isUrl: true, //设置无歌曲时进度条不可拖动
      value: 100, //音量
      showRightDialog: false, // 展示右边的歌单对话框
    };
  },
  mounted() {},
  methods: {
    //暂停 播放
    playMusic() {
      let reAudio = this.$refs.audioRef; //获取audio元素
      if (reAudio.paused) {
        reAudio.play();
        this.btnPlay = "";
        this.timer = setInterval(() => {
          this.$store.state.mDuration = this.$store.state.mDuration + 1000;
          console.log(this.$store.state.mDuration);
        }, 1000);
      } else {
        reAudio.pause();
        this.btnPlay = "";
        clearInterval(this.timer);
      }
    },
    //上一首
    prevMusic() {
      this.$store.state.mDuration = 0;
      let index = this.$store.state.reMusicIndex;
      if (index === 0) {
        this.$store.state.reMusicIndex = 0;
      } else {
        this.$store.state.reMusicIndex--;
        this.btnPlay = "";
      }
    },
    //下一首
    nextMusic() {
      this.$store.state.mDuration = 0;
      let index = this.$store.state.reMusicIndex;
      let reMusics = this.$store.state.reMusics;
      if (index === reMusics) {
        this.$store.state.reMusicIndex = reMusics;
      } else {
        this.$store.state.reMusicIndex++;
        this.btnPlay = "";
      }
    },
    //时间换算
    transTime(value) {
      let time = "";
      value /= 1000;
      let m = parseInt(value / 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(value % 60);
      s = s < 10 ? "0" + s : s;
      time = m + ":" + s;
      return time;
    },
  },
  created() {},
  props: {},
  computed: {
    /* 监听vuex中的播放暂停的变化 */
    isPlay() {
      return this.$store.state.isPlayMusic;
    },
    /* 监听播放时间 */
    /* 报错已分配计算属性“autoPlay”，但它没有setter 添加get set */
    autoPlay: {
      get() {
        return this.$store.state.mDuration;
      },
      set(v) {
        this.$store.state.mDuration = v;
      },
    },
  },
  watch: {
    /* 监听vuex中的数据变化 主页推荐单曲点击播放暂停功能 */
    isPlay(val) {
      let reAudio = this.$refs.audioRef;
      if (val) {
        reAudio.play();
        this.btnPlay = "";
        this.timer = setInterval(() => {
          this.$store.state.mDuration = this.$store.state.mDuration + 1000;
          console.log(this.$store.state.mDuration);
        }, 1000);
      } else {
        reAudio.pause();
        this.btnPlay = "";
        clearInterval(this.timer);
      }
    },
    /* 自动播放 监听音乐播放时间 监听进度条运动 */
    autoPlay(val) {
      if (
        this.transTime(val) ===
        this.transTime(this.$store.state.reMusicDuration)
      ) {
        /* 延时1秒执行 */
        this.autoPlay = setTimeout(() => {
          this.nextMusic();
        }, 1000);
      }
      this.progressLong = 450 * (val / this.$store.state.reMusicDuration) 
      console.log(this.progressLong);
    },
  },

  beforeDestory() {
    clearInterval(this.timer);
    clearInterval(this.autoPlay);
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
.music-player {
  display: flex;
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: bisque;
  padding: 0 10px 0 20px;
}
.avater {
  width: 60px;
  height: 60px;
  background-color: rosybrown;
  margin-top: 6px;
}
.avater img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: rosybrown;
}
.info {
  width: 120px;
  height: 50px;
  margin: 15px 15px 0 30px;
}
.info h2 {
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.info p {
  font-size: 12px;
  color: #999;
}
.player-btn {
  display: flex;
}
.player-btn i {
  font-family: "icomoon";
  font-style: normal;
  line-height: 72px;
  font-size: 35px;
  transition: all 0.2s ease 0;
}
.player-btn i:hover {
  color: #fa2800;
  transition: all 0.2s;
}
.player-btn .btn-play {
  display: block;
  font-size: 45px;
  margin: 0 12px 0;
}
.progress-wrap {
  display: flex;
  margin-left: 65px;
}
.progress-wrap p {
  line-height: 72px;
}
.progress-wrap-bar {
  width: 500px;
  height: 72px;
  display: flex;
  align-items: center;
}
.progress-bar {
  height: 3px;
  width: 100%;
  flex: 1;
  background-color: blue;
  border-radius: 2px;
  position: relative;
  margin: 0 25px;
}
.bar-inner {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}
.bar-inner .progress {
  z-index: 1;
  height: 3px;
  border-radius: 2px;
  background-color: #fa2800;
}
</style>