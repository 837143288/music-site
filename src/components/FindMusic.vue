<template>
  <div class="bg">
    <div class="find-music">
      <!-- 轮播图 -->
      <div class="carousel">
        <!-- 图片地址从后台拿时，要动态的初始化swiper，否则loop无效  在swiper上添加v-if="musicImgs.length" -->
        <swiper
          class="swiper"
          :options="swiperOption"
          v-if="swiperBanners.length"
        >
          <swiper-slide
            v-for="item in swiperBanners"
            :key="item.scm"
            class="swiper-slide"
            ><img :src="item.imageUrl" alt=""
          /></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="m">
        <!-- 推荐歌单 -->
        <div class="re-musiclist">
          <h2 class="re-musiclist-h2">推荐歌单</h2>
          <ul>
            <li v-for="item in ReMusicLists" :key="item.id">
              <div class="playlist">
                <img :src="item.picUrl" alt="" @click="MusicList(item.id)" />
                <h2>{{ item.name }}</h2>
              </div>
            </li>
          </ul>
        </div>
        <!-- 推荐单曲 -->
        <div class="re-music">
          <h2 class="re-music-h2">推荐单曲</h2>
          <ul>
            <div class="musics" ref="musics">
              <li
                v-for="(item, index) in ReMusics"
                :key="index"
                :data-musicid="item.id"
                :data-index="index"
                ref="remusic"
              >
                <div class="re-music-once">
                  <div class="re-music-once-number">
                    {{ index + 1 >= 10 ? index + 1 : "0" + (index + 1) }}
                  </div>
                  <div
                    class="re-music-once-picurl"
                    @click="getMusic(item.id, index)"
                  >
                    <!-- 遮挡 -->
                    <div class="keepOut"></div>
                    <img :src="item.picUrl" alt="" />
                  </div>
                  <div class="re-music-once-name">
                    <p :title="item.name">{{ item.name }}</p>
                    <p :title="item.song.album.artists[0].name">{{ item.song.album.artists[0].name }}</p>
                  </div>
                  <div class="re-music-once-album">
                    <p :title="item.song.album.name">{{ "《" + item.song.album.name + "》" }}</p>
                  </div>
                  <div class="re-music-once-time">
                    <p>
                      {{
                        Math.floor(
                          (item.song.duration % ("1000" * "60" * "60")) /
                            ("1000" * "60")
                        ) +
                        ":" +
                        (Math.floor(
                          (item.song.duration % ("1000" * "60")) / "1000"
                        ) >= 10
                          ? Math.floor(
                              (item.song.duration % ("1000" * "60")) / "1000"
                            )
                          : "0" +
                            Math.floor(
                              (item.song.duration % ("1000" * "60")) / "1000"
                            ))
                      }}
                    </p>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <!-- <button @click="getWangyi">获取热门歌单</button> -->
      </div>
    </div>
  </div>
</template>



<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
import axios from "@/plugins/axios.js";

export default {
  name: "FindMusic",
  data() {
    return {
      isplay: true,
      /* 后台数据 */
      swiperBanners: [],
      ReMusicLists: [],
      ReMusics: [],
      second: [],
      musicId: "",
      /* swiper轮播图 */
      swiperOption: {
        observer: true,
        observeParents: true,
        spaceBetween: 30,
        slidesPerView: 3,
        centeredSlides: true,
        /* 回到第一页 */
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // Some Swiper option/callback...
      },
    };
  },
  methods: {
    //点击歌单跳转
    MusicList(e) {
      this.$store.state.musicListId = e;
      if (this.$route.path !== "/MusicList") {
        this.$router.push({ path: "/MusicList" });
      }
    },
    /* 点击事件获得歌曲url */
    getMusic(Id, index) {
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
    /* axios接口获取数据 */
    //推荐单曲
    ReMusic() {
      var that = this;
      axios({
        url: "/personalized/newsong",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.result);
          that.ReMusics = res.data.result;
          let minutes = Math.floor(
            (res.data.result[0].song.duration % (1000 * 60 * 60)) / (1000 * 60)
          );
          let seconds = Math.round(
            (res.data.result[0].song.duration % (1000 * 60)) / 1000
          );
          if (seconds < 10) {
            that.second = "0" + seconds;
          } else {
            that.second = seconds;
          }
          //console.log(that.second);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //推荐歌单
    ReMusicList() {
      var that = this;
      axios({
        url: "/personalized?limit=18",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.result);
          that.ReMusicLists = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    swiperBanner() {
      var that = this;
      axios({
        url: "/banner",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data.banners);
          that.swiperBanners = res.data.banners;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {},
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
  /* 直接调用 */
  created() {
    this.swiperBanner();
    this.ReMusicList();
    this.ReMusic();
  },

  updated: function () {
    //下一首的点击上限
    this.$store.state.reMusics = this.$refs.musics.children.length - 1;
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
.m {
  width: 1200px;
  margin: 0 auto;
}

.swiper {
  position: relative;
  height: 100%;
  width: 1200px;
  margin: 0px auto;
  padding: 20px 0;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.8);
}
.swiper .swiper-slide img {
  height: 100%;
  width: 420px;
  border-radius: 8px;
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}
.swiper-pagination {
  position: absolute;
  top: 178px;
  color: #ff4e4e;
}
.re-musiclist {
  position: relative;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  margin: 30px 0;
}

.re-musiclist ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.re-musiclist-h2 {
  position: absolute;
  top: 10px;
  left: 35px;
  font-size: 16px;
}

.playlist {
  width: 172px;
  height: 212px;
  position: relative;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 13.5px;
}
.playlist img {
  margin-bottom: 10px;
  width: 132.5px;
  height: 132.5px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  /* 鼠标移开恢复特效 */
  transition: all 0.4s ease 0s;
  cursor: pointer;
}

.playlist img:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.15);
  transition: all 0.5s;
  border-radius: 25%;
}

.playlist h2 {
  display: block;
  width: 140px;
  margin: 0 auto;
  font-size: 14px;
}

.re-music {
  width: 1200px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding: 25px 0;
}
.re-music-h2 {
  margin-left: 36px;
  font-size: 16px;
}
.musics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.re-music-once {
  position: relative;
  display: flex;
  color: #4a4a4a;
  width: 535px;
  height: 80px;
  margin-top: 25px;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  transition: all 0.4s ease 0s;
}

.re-music-once:hover {
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.2);
  transition: all 0.4s;
  transform: scale(0.99);
}

.re-music-once-number {
  line-height: 80px;
  text-align: center;
  margin: 0 30px;
  font-weight: 700;
  font-size: 15px;
}
/* 遮挡 */
.re-music-once-picurl .keepOut {
  font-family: "icomoon";
  font-size: 50px;
  position: absolute;
  margin-top: 12.5px;
  width: 55px;
  height: 55px;
  cursor: pointer;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.2);
  visibility: hidden;

}
.re-music-once:hover .keepOut {
  visibility: visible;
  transition: all 0.1s;
}
.re-music-once-picurl img {
  margin-top: 12.5px;
  width: 55px;
  height: 55px;
}

.re-music-once-name {
  margin-top: 15px;
  margin-left: 18px;
}

.re-music-once-name p {
  font-weight: 700;
  margin-bottom: 16px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.re-music-once-album {
  width: 160px;
  margin-left: 40px;
  line-height: 80px;
  font-weight: 700;
  display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 1;
 overflow: hidden;
}

.re-music-once-time {
  line-height: 80px;
  position: absolute;
  right: 18px;
  font-weight: 700;
}
</style>