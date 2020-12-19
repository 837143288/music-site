<template>
  <div>
    <audio :src="music" id="audio"></audio>
    <div class="audio-box bbb">
      <span class="time-font">
        {{
          second / 60 > 9 ? parseInt(second / 60) : "0" + parseInt(second / 60)
        }}:{{
          second % 60 >= 10
            ? parseInt(second % 60)
            : "0" + parseInt(second % 60)
        }}
      </span>
      <el-progress
        :percentage="progressing_audio"
        status="success"
        :stroke-width="4"
        style="
          margin-top: 0.1rem;
          margin-left: 0.3rem;
          float: left;
          width: 4.14rem;
        "
      ></el-progress>
      <img
        :src="audioPlayShow ? imgA : imgB"
        class="rong-circle-control"
        @click="controlAudio()"
      />
    </div>
  </div>
</template>

<script>
import tryaudio from "../assets/img/Reverse.mp3";
import audioStart from "../assets/img/qwe.png";
import audioStop from "../assets/img/asd.png";
export default {
  name: "",
  props: {
    params: {
      type: Object,
      default: () => ({
        message: "hello",
      }),
    },
  },
  data() {
    return {
      progressing_audio: 0,
      music: tryaudio,
      playFlag: false,
      audioPlayShow: true,
      timer: "",
      "length-music": 0,
      second: 0,
      imgA: audioStart,
      imgB: audioStop,
    };
  },
  methods: {
    controlAudio: function () {
      if (!this.params) {
        return false;
      } else {
        //console.log(this.params);
        this.music = this.params.url;
        let audio0 = document.getElementById("audio");
        let leng = audio0.duration;
        //console.log(audio0.duratuion);
        if (this.audioPlayShow) {
          audio0.play();

          this.audioPlayShow = false;
          this.timer = setInterval(() => {
            //console.log(1 / leng);
            this.progressing_audio =
              (this.progressing_audio / 100 + 0.1 / leng) * 100;
            this.second = this.second + 0.1;
            if (this.progressing_audio >= 100) {
              clearInterval(this.timer);
              this.progressing_audio = 0;
              this.second = 0;
            }
            //console.log(this.progressing_audio);
          }, 100);
        } else {
          audio0.pause();
          this.audioPlayShow = true;
          clearInterval(this.timer);
        }
      }
    },
  },
};
</script>

<style>
.rong-circle-control {
  width: 0.56rem;
  height: 0.56rem;
  margin-left: 0.46rem;
  float: left;
  /*background-color: red;*/
  border-radius: 50%;
}
.time-font {
  margin-top: 0.1rem;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 0.34rem;
  float: left;
  margin-left: 0rem;
}
.audio-box {
  height: 0.56rem;
  width: 6.1rem;
  padding: 0.2rem 0.3rem;
  margin: 0.4rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 14px 30px 0px rgba(154, 159, 182, 0.1);
  border-radius: 0.2rem;
}
</style>