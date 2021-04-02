<template>
  <transition name="lyric">
    <div class="music-player" v-show="this.$store.state.isMusicPlayer">
      <!-- 封面 -->
      <div class="avater">
        <img :src="$store.state.reMusicImg" alt="" />
      </div>
      <!-- 歌曲歌手 -->
      <div class="info">
        <h2>{{ $store.state.reMusicName }}</h2>
        <p>{{ $store.state.reMusicSonger }}</p>
      </div>
      <!-- 播放按钮 -->
      <div class="player-btn">
        <i class="btn-prev" @click="prevMusic"></i>
        <i class="btn-play" @click="playMusic">{{ btnPlay }}</i>
        <i class="btn-next" @click="nextMusic"></i>
      </div>
      <!-- 进度条 -->
      <div class="progress-wrap">
        <p>{{ transTime($store.state.mDuration) }}</p>
        <div class="progress-wrap-bar">
          <!-- 进度条总宽 -->
          <div class="progress-bar" ref="musicWidth">
            <!-- 进度条 -->
            <input
              type="range"
              class="musicBar"
              ref="musicBar"
              v-model="musicBar"
              min="0"
              max="600"
              @change="changeBar()"
              @input="inputBar()"
              :style="{
                background:
                  '-webkit-linear-gradient(#ff4e4e, #ff4e4e) 0% 0% / ' +
                  (musicBar * 100) / 600 +
                  '% 100% no-repeat',
              }"
            />
            <!-- 部分1： -webkit-linear-gradient(top, rgb(5, 156, 250), rgb(5, 156, 250)) 
               表示：渐变参数，从上到下开始渐变，从rgb(5, 156, 250)到rgb(5, 156, 250)变颜色，
               部分2：0% 0% 从左上角的(0%,0%)开始填充颜色
               部分3： 27% 100% 到整个而input的（27%，100%）填充颜色结束。 -->
          </div>
        </div>
        <p>{{ transTime($store.state.reMusicDuration) }}</p>
      </div>
      <!-- 音量 -->
      <div class="volume-wrap">
        <div class="volume-icon"></div>
        <div class="volume-slide" ref="volumeSlide">
          <!-- range 进度条类型 v-model可以与滑动的value值绑定 -->
          <!-- 音量调节 -->
          <input
            type="range"
            class="volumeBar"
            v-model="volume"
            min="0"
            max="100"
            :style="{
              background:
                '-webkit-linear-gradient(#ff4e4e, #ff4e4e) 0% 0% / ' +
                (volume * 100) / 100 +
                '% 100% no-repeat',
            }"
          />
        </div>
      </div>
      <!-- 歌词 -->
      <div class="lyric">
        <!-- 按钮 -->
        <div class="lyric-btn" @click="lyric()">词</div>
        <!-- 词板 -->
        <!-- transition v-show动画效果 -->
        <transition name="lyric">
          <div class="lyric-plate" v-show="isLyric" :key="1">
            <h4>歌词</h4>
            <div class="lyric-body" ref="lyric">
              <p
                v-for="(item, index) in this.$store.state.musicLyric"
                :key="index"
              >
                {{ item.text }}
              </p>
            </div>
          </div>
        </transition>
      </div>
      <audio
        :src="$store.state.reMusicUrl"
        autoplay
        ref="audioRef"
        @ended="end"
        @waiting="wait"
        @playing="playing"
      ></audio>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      btnPlay: "",
      volume: 100, //音量
      musicBar: 0, //进度条的value值
      isLyric: false,
      timer: null,
    };
  },
  mounted() {},
  methods: {
    //播放
    playing() {
      console.log("播放");
      clearInterval(this.timer);
      this.timer = setInterval(() => {
          this.$store.state.mDuration = this.$store.state.mDuration + 1000;
        }, 1000);
    },
    //等待加载
    wait() {
      console.log("缓存中...");
      clearInterval(this.timer);
    },
    //播放完毕
    end() {
      this.nextMusic();
    },
    /* 获取歌词 */
    //点击显示歌词
    lyric() {
      this.isLyric = !this.isLyric;
    },
    //滑动进度条
    inputBar() {
      /* 时间随进度条改变 */
      this.$store.state.mDuration =
        (this.$store.state.reMusicDuration / 600) * this.musicBar;
    },
    //点击进度条跳转位置
    changeBar() {
      this.$store.state.mDuration =
        (this.$store.state.reMusicDuration / 600) * this.musicBar;
      this.$refs.audioRef.currentTime = parseInt(
        this.$store.state.mDuration / 1000
      );
    },
    //暂停 播放
    playMusic() {
      let reAudio = this.$refs.audioRef; //获取audio元素
      if (this.$store.state.isPlayMusic) {
        reAudio.pause();
        this.$store.state.isPlayMusic = false;
        this.btnPlay = "";
        clearInterval(this.timer);

      } else {
        reAudio.play();
        this.$store.state.isPlayMusic = true;
        this.btnPlay = "";
        // this.timer = setTimeout(() => {
        //   this.$store.state.mDuration = this.$store.state.mDuration + 1000;
        // }, 1000);
      }
    },
    //上一首
    prevMusic() {
      clearInterval(this.timer);
      this.$store.state.musicLyric = []; //歌词
      let index = this.$store.state.reMusicIndex;
      if (index === 0) {
        this.$store.state.reMusicIndex = 0;
      } else {
        this.$store.state.reMusicIndex--; //歌曲下标
        this.btnPlay = "";
        this.$store.state.mDuration = 0; //时间
      }
    },
    //下一首
    nextMusic() {
      clearInterval(this.timer);
      this.$store.state.musicLyric = [];
      let index = this.$store.state.reMusicIndex;
      let reMusics = this.$store.state.reMusics;
      //console.log(reMusics);
      if (index === reMusics) {
        this.$store.state.reMusicIndex = reMusics;
      } else {
        this.$store.state.reMusicIndex++;
        this.btnPlay = "";
        this.$store.state.mDuration = 0;
      }
    },
    //时间换算
    transTime(value) {
      let time = "";
      value /= 1000;
      //parseInt 函数可解析一个字符串，并返回一个整数
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
    /* 监听v-modle绑定的音量值的变化 */
    watchVolume() {
      return this.volume;
    },
    /* 监听vuex中的播放暂停的变化 */
    watchPlay() {
      return this.$store.state.isPlayMusic;
    },
    /* 监听播放时间 */
    /* 报错已分配计算属性“autoPlay”，但它没有setter 添加get set */
    watchTime: {
      get() {
        return this.$store.state.mDuration;
      },
      set(v) {
        this.$store.state.mDuration = v;
      },
    },
  },
  watch: {
    /* 监听音量的变化并调整 */
    watchVolume(val) {
      this.$refs.audioRef.volume = val / 100;
    },
    /* 监听vuex中的数据变化 主页推荐单曲点击播放暂停功能 */
    watchPlay(val) {
      let reAudio = this.$refs.audioRef;
      if (val) {
        reAudio.play();
        this.btnPlay = "";
        // this.timer = setInterval(() => {
        //   this.$store.state.mDuration = this.$store.state.mDuration + 1000;
        //   //console.log(this.$store.state.mDuration);
        // }, 1000);
      } else {
        reAudio.pause();
        this.btnPlay = "";
        clearInterval(this.timer);
      }
    },
    /* 自动播放 监听音乐播放时间 监听进度条运动 */
    watchTime(val) {
      /* 进度条 */
      // if (
      //   this.transTime(val) == this.transTime(this.$store.state.reMusicDuration)
      // ) {
      //   // this.$store.state.mDuration = this.$store.state.reMusicDuration;
      //   /* 延时1秒执行 */
      //   this.autoPlay = setTimeout(() => {
      //     this.nextMusic();
      //   }, 1000);
      // }
      this.musicBar = 600 * (val / this.$store.state.reMusicDuration);
      /* 歌词滚动 */
      console.log(this.$store.state.musicLyric);
      for (let i = 0; i < this.$store.state.musicLyric.length - 1; i++) {
        if (Math.floor(val / 1000) == this.$store.state.musicLyric[i].time && this.$store.state.musicLyric[i].text != '') {
          Array.from(this.$refs.lyric.children).forEach(item => {
            item.style.cssText = ''
          })
          this.$refs.lyric.scrollTo({
            top:
              (i - 5) *
              ((this.$refs.lyric.scrollHeight) /
                this.$store.state.musicLyric.length),
            behavior: "smooth", //平滑滚动
          });
          this.$refs.lyric.children[i].style.cssText = 'color: #ff4e4e;transform: scale(1.1);'
        }
      }
    },
  },

  beforeDestory() {
    clearInterval(this.timer);
    clearInterval(this.autoPlay);
  },
};
</script>

<style scoped>
.music-player {
  display: flex;
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 0 10px 0 20px;
  z-index: 99;
  box-shadow: 0 5px 40px -1px rgb(2 10 18 / 10%);
}
.avater {
  width: 60px;
  height: 60px;
  margin-top: 6px;
}
.avater img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}
.info {
  width: 120px;
  height: 50px;
  margin: 15px 15px 0 30px;
  width: 8%;
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
  width: 8%;
}
.player-btn i {
  font-family: "icomoon";
  font-style: normal;
  line-height: 72px;
  font-size: 35px;
  transition: all 0.2s ease 0;
  cursor: pointer;
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
  width: 50%;
  margin: 0 65px;
}
.progress-wrap p {
  line-height: 74px;
}
.progress-wrap-bar {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
}
.progress-bar {
  position: relative;
  width: 100%;
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
.volume-wrap {
  display: flex;
  margin: 22px 0 0 0;
}
.volume-icon {
  font-family: "icomoon";
  font-size: 25px;
}
.volume-slide {
  position: relative;
  left: -8px;
  top: 2px;
}
/* 进度条样式 */
.musicBar {
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  height: 5px;
  width: 100%;
  border: none;
  border-radius: 5px;
}
/* 圆点样式 */
.musicBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background: #ff4e4e;
  border-radius: 6px;
  margin-top: -4px;
  border: 2.5px solid #ff4e4e;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
/* 轨道样式 */
.musicBar::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 5px;
}
/* 取消焦点边框 */
input[type="range"]:focus {
  outline: none;
}
/* 已达进度 */
input[type="range"]::-ms-fill-lower {
  background-color: #ff4e4e;
}
/* 未达进度 */
input[type="range"]::-ms-fill-upper {
  background-color: #aaa;
}
/* 音量进度条 */
.volumeBar {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100px;
  height: 6px;
  border: none;
  border-radius: 6px;
}
/* 圆点样式 */
.volumeBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background: #ff4e4e;
  border-radius: 6px;
  margin-top: -3px;
  border: 2.5px solid #ff4e4e;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
/* 轨道样式 */
.volumeBar::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}
.lyric {
  position: relative;
}
.lyric-btn {
  font-size: 20px;
  position: relative;
  left: 50px;
  top: 24px;
  cursor: pointer;
}
.lyric-btn:hover {
  color: #fa2800;
}
.lyric-plate {
  width: 300px;
  background-color: #fff;
  position: absolute;
  top: -520px;
  left: -200px;
  z-index: 99;
  transition: all 0.2s;
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0 5px 40px -1px rgb(2 10 18 / 10%);
}
.lyric-body {
  height: 400px;
  margin: 20px 0 10px 0;
  overflow: scroll;
}
/* 隐藏滚动条的同时有滚动效果 */
.lyric-body::-webkit-scrollbar {
  display: none;
}
.lyric-plate p {
  display: flex;
  justify-content: center;
  font-size: 14px;
  text-align: center;
  font-weight: 300;
  line-height: 32px;
  padding: 0 10px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
/* v-show动画效果 */
.lyric-enter,
.lyric-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.lyric-enter-to,
.lyric-leave {
  opacity: 1;
}
.lyric-enter-active,
.lyric-leave-active {
  transition: all 0.5s;
}
</style>