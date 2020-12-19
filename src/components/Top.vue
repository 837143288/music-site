<template>
  <div class="top">
    <div class="myaudio">
      <audio
        @timeupdate="updateProgress"
        controls
        ref="audioRef"
        style="display: none"
      >
        <source :src="fileurl" type="audio/mpeg" />
        您的浏览器不支持音频播放
      </audio>
      <div class="audio-right">
        <span
          :class="
            audioStatus !== 'stop' ? 'icon-zanting' : ' icon-weibiaoti518'
          "
          @click="playAudio"
          class="dialogAudioPlay iconfont"
        ></span>


        
        <div class="progress-bar-bg">
          <van-slider @change="onChange" button-size="15px" v-model="value" />
        </div>
        <div class="audio-time" style="min-height: 10px">
          <span class="audio-length-current" id="audioCurTime">{{
            videoStart
          }}</span
          >/
          <span class="audio-length-total">{{ transTime(duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: ["fileurl", 'duration'],
  data: function () {
    return {
      audioStatus: "stop",
      videoStart: "00:00",
      value: 0,
    };
  },
  methods: {
    //播放暂停控制
    playAudio(e) {
      let recordAudio = this.$refs.audioRef; //获取audio元素
      if (recordAudio.paused) {
        recordAudio.play();
        this.audioStatus = "run";
      } else {
        recordAudio.pause();
        this.audioStatus = "stop";
      }
    },
    //更新进度条与当前播放时间
    updateProgress(e) {
      var value = e.target.currentTime / this.duration;
      this.value = value * 100;
      if (e.target.currentTime > this.duration) {
        this.audioStatus = "stop";
        this.value = 0;
        this.videoStart = this.transTime(0);
        return;
      }
      this.value = value * 100;
      this.videoStart = this.transTime(this.$refs.audioRef.currentTime);
    },
    /**
     * 音频播放时间换算
     * @param {number} value - 音频当前播放时间，单位秒
     */
    transTime(value) {
      var time = "";
      var h = parseInt(value / 3600);
      value %= 3600;
      var m = parseInt(value / 60);
      m = m < 10 ? "0" + m : m;
      var s = parseInt(value % 60);
      s = s < 10 ? "0" + s : s;
      time = m + ":" + s;
      return time;
    },
    // 进度条
    onChange(val) {
      let recordAudio = this.$refs.audioRef; //获取audio元素
      if (!recordAudio.paused || recordAudio.currentTime != 0) {
        recordAudio.currentTime = (recordAudio.duration * val) / 100;
        this.videoStart = this.transTime((val / 100) * this.duration);
      }
    },
  },
};
</script>

<style scoped>
.dialogAudioPlay {
  cursor: pointer;
  color: #fff;
  font-size: 20px;
}
.progress-bar-bg {
  background-color: #fff;
  flex: 1;
  position: relative;
  height: 2px;
  top: 50%;
  margin-top: -1px;
  cursor: pointer;
  margin: 0 10px;
}
.progress-bar-bg .van-slider__bar {
  background-color: #a4e354;
}
.progress-bar-bg span {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  background-color: #fff;
  position: absolute;
  left: 0%;
  top: 50%;
  margin-top: -5px;
  margin-left: -5px;
  cursor: pointer;
}
.progress-bar {
  background-color: #fff;
  width: 0%;
  height: 2px;
}
.audio-time {
  overflow: hidden;
  color: #fff;
  font-size: 14px;
}
.audio-time span {
  color: #fff;
}
.audio-length-total {
  float: right;
}
.audio-length-current {
  float: left;
}
.audio-right {
  width: 100%;
  margin-top: 10px;
  height: 49px;
  line-height: 49px;
  background: #7eb637;
  border-radius: 6px;
  display: flex;
  padding: 0 15px;
}
</style>