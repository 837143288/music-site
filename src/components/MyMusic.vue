<template>
  <div class="bg">
    <!-- 登录后的页面 -->
    <div class="MyMusic" v-if="!this.$store.state.music">
      <!-- 歌单列表 左侧列 -->
      <div class="music-top">
        <div class="feature-top">
          <p class="top-p">创建的歌单</p>
          <ul class="top-ul">
            <li
              v-for="(item, index) in this.$store.state.songList.slice(
                0,
                this.$store.state.myLength
              )"
              :key="index"
              @click="userSong(item.id)"
            >
              <img :src="item.coverImgUrl" class="top-img" alt="" />
              <div>
                <p class="top-name">{{ item.name }}</p>
                <p class="top-update">{{ item.trackCount }}首</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="media-top">
          <p class="top-p">收藏的歌单</p>
          <ul class="top-ul">
            <li
              v-for="(item, index) in this.$store.state.songList.slice(
                this.$store.state.myLength,
                this.$store.state.lengths
              )"
              :key="index"
              @click="userSong(item.id)"
            >
              <img :src="item.coverImgUrl" class="top-img" alt="" />
              <div>
                <p class="top-name">{{ item.name }}</p>
                <p class="top-update">{{ item.trackCount }}首</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 排行榜详情 右侧列 -->
      <div class="musics">
        <!-- 当数据加载完成时渲染 -->
        <div class="top-right" v-if="this.$store.state.myMusicList">
          <!-- 排行榜信息 -->
          <div class="music-message">
            <img
              :src="this.$store.state.myMusicList.playlist.coverImgUrl"
              alt=""
            />
            <div>
              <h2>{{ this.$store.state.myMusicList.playlist.name }}</h2>
              <p class="music-message-update">
                {{
                  ctime(this.$store.state.myMusicList.playlist.createTime)
                }}创建
              </p>
              <p
                class="music-message-explain"
                :title="this.$store.state.myMusicList.playlist.description"
              >
                {{ this.$store.state.myMusicList.playlist.description }}
              </p>
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
                class="music-list-li"
                v-for="(item, index) in this.$store.state.mySongDetails"
                :key="index"
                :data-musicid="item.id"
                :data-index="index"
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
    <!-- 登录前的页面 -->
    <div class="MyLogin" v-if="this.$store.state.music">
      <div class="pic">
        <div class="btn">
          <button class="login" @click="openLogin()">登录</button>
        </div>
      </div>
      <div class="screen" v-if="screen">
        <div class="return">
          <p>登录</p>
          <a href="#" @click="closeLogin()"></a>
        </div>
        <div class="logo">
          <img src="../assets/img/logo1.jpg" alt="" />
          <h2>icmusic</h2>
        </div>
        <div class="QRCode" v-if="qrCode">
          <div>
            <p>扫码登录</p>
            <div class="qr"><img src="" alt="" /></div>
            <div class="switch" @click="qr()"><a href="#">使用手机登录</a></div>
          </div>
        </div>
        <div class="number">
          <div class="account">
            <input
              type="text"
              v-model="accounts"
              placeholder="请输入手机号"
              @keyup.enter="phone"
            />
          </div>
          <div class="password">
            <input
              type="password"
              v-model="passwords"
              placeholder="请输入密码"
              @keyup.enter="phone"
            />
          </div>
          <p v-show="isLoginErr">{{ this.loginErr }}</p>
          <div class="Nlogin">
            <button ref="Nlogin" @click="phone">登录</button>
          </div>
        </div>
        <div class="musicImg"></div>
      </div>
    </div>
    <div class="canva" v-if="canvas"></div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  name: "MyMusic",
  inject:['reload'],
  components: {

  },
  data() {
    return {
      screen: false, //登录界面
      qrCode: false,
      qrKey: "",
      qrImg: "",
      accounts: "", //账号
      passwords: "", //密码
      myLength: 0, //创建的歌单数
      lengths: 0, //歌单总数
      isLoginErr: false, //登录失败
      loginErr: "", //登录失败的提示
      canvas: false, //帆布
    };
  },
  created() {},
  mounted() {
    if (JSON.parse(sessionStorage.getItem("myId")) != null) {
      this.$store.state.songListId = JSON.parse(sessionStorage.getItem("myId"));
      this.$store.state.music = false;
      this.user();
    }
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
    /* 打开登录界面 */
    openLogin() {
      this.screen = true;
      document.documentElement.style.overflow = "hidden";
      this.canvas = true; //帆布
      this.accounts = "";
      this.passwords = "";
      this.isLoginErr = false;
    },
    /* 关闭登录界面 */
    closeLogin() {
      this.screen = false;
      document.documentElement.style.overflow = "visible";
      this.canvas = false;
    },
    qr() {
      this.qrCode = false;
    },
    /* 手机登录 */
    phone() {
      axios({
        url:
          "/login/cellphone?phone=" +
          this.accounts +
          "&password=" +
          this.passwords,
        method: "post",
      })
        .then((res) => {
          //console.log(res);
          if (res.data.code === 200) {
            this.$store.state.songListId = res.data.account.id;
            sessionStorage.setItem("myId", JSON.stringify(res.data.account.id));
            this.closeLogin();
            this.user();
            this.$store.state.music = false;
            location.reload();
          } else if (res.data.code === 502) {
            this.isLoginErr = true;
            this.loginErr = "密码错误！";
          } else {
            this.isLoginErr = true;
            this.loginErr = "手机号或密码错误！";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 获取用户歌单 */
    user() {
      axios({
        url: "/user/playlist?uid=" + this.$store.state.songListId,
        method: "post",
      })
        .then((res) => {
          //console.log(res);
          this.$store.state.songList = res.data.playlist;
          this.$store.state.lengths = res.data.playlist.length;
          for (let i = 0; i < res.data.playlist.length; i++) {
            if (res.data.playlist[i].subscribed === false) {
              this.$store.state.myLength += 1;
            }
          }
          this.userSong(res.data.playlist[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 获取歌单详情 */
    userSong(id) {
      axios({
        url: "/playlist/detail?id=" + id,
        method: "post",
      })
        .then((res) => {
          //console.log(res);
          this.$store.state.myMusicList = res.data;
          //获取歌单的所有歌曲
          let Id = res.data.privileges[0].id;
          for (let i = 1; i <= res.data.privileges.length - 1; i++) {
            Id += "," + res.data.privileges[i].id;
          }
          //console.log(musicListId);
          axios({
            url: "/song/detail?ids=" + [Id],
            method: "post",
          })
            .then((res) => {
              console.log(res);
              this.$store.state.mySongDetails = res.data.songs;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 创建时间 毫秒转化为年月日 */
    ctime(e) {
      let d = new Date(e);
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let updateTime = year + "-" + month + "-" + day + "-";
      return updateTime;
    },
    /* 生成二维码 */
    generateQR() {
      axios({
        url: "/login/qr/key",
        method: "post",
      })
        .then((res) => {
          this.qrKey = res.data.data.unikey;
          console.log(this.qrKey);
          axios({
            url: "/login/qr/create/qrimg?key=" + this.qrKey,
            method: "post",
          })
            .then((res) => {
              this.qrImg = res;
              //console.log(this.qrImg);
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
    //下一首的点击上限 当有值时执行 不然会报错
    if (this.$refs.musicListTop) {
      this.$store.state.reMusics = this.$refs.musicListTop.children.length - 2;
      //console.log(this.$store.state.reMusics);
    }
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
  padding: 90px 0 30px 0;
  background-color: rgb(250, 250, 250);
}
.MyLogin {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding-bottom: 20px;
  width: 1200px;
  margin: 0 auto;
  height: 800px;
  overflow: hidden;
}
.pic {
  width: 807px;
  height: 268px;
  margin: 200px auto;
  background: url(../assets/img/mymusic.png) no-repeat;
}
.btn button {
  background-color: #fff;
  color: #555;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  outline: none;
  border: 2px solid #555555;
  width: 200px;
  height: 50px;
  margin: 190px 0 0 480px;
}
.btn button:hover {
  background-color: #555;
  color: #fff;
}
.btn button:active {
}
.screen {
  width: 400px;
  height: 480px;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.3);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 999;
}
.return {
  width: 100%;
  height: 25px;
  line-height: 25px;
  color: #fff;
  background-color: #555;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  border-radius: 8px 8px 0 0;
}
.return a {
  font-family: "icomoon";
  color: #fff;
  font-size: 18px;
}
.logo {
  display: flex;
  position: relative;
  top: 45px;
  left: 118px;
}
.logo img {
  width: 60px;
  height: 60px;
}
.logo h2 {
  line-height: 60px;
}
.QRCode,
.number {
  width: 100%;
  height: 50%;
  background-color: white;
  position: absolute;
  top: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.number p {
  font-size: 12px;
  color: red;
  position: absolute;
  top: 130px;
  left: 53px;
}
.qr {
  width: 180px;
  height: 180px;
  background-color: #555;
}
.switch {
  width: 160px;
  height: 30px;
  margin: 0 10px;
  background-color: aqua;
}
.number input,
.number button {
  outline: none;
  width: 300px;
  height: 35px;
  margin-bottom: 20px;
  border: 1px solid #e3e7ed;
  border-radius: 3px;
}
.number input {
  padding-left: 35px;
  color: #555;
  font-size: 14px;
}
.number button {
  margin-top: 10px;
}
.account::after {
  font-family: "icomoon";
  content: "\e905"; /*打开字体包的css文件，根据图标名称搜索，可以找到*/
  font-size: 20px;
  position: absolute;
  top: 38px;
  left: 60px;
}
.password::after {
  font-family: "icomoon";
  content: "\e907"; /*打开字体包的css文件，根据图标名称搜索，可以找到*/
  font-size: 20px;
  position: absolute;
  top: 94px;
  left: 60px;
}
.musicImg {
  position: relative;
  top: 247px;
  height: 148px;
  border-radius: 0 0 8px 8px;
  /* 渐变 */
  background: no-repeat center top / 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 1) 1%,
      rgba(255, 255, 255, 0)
    ),
    url(../assets/img/753615.jpg);
}
.canva {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.1;
  z-index: 100;
}

/* top copy */
.MyMusic {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}
.music-top {
  width: 280px;
  background-color: #fff;
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
  margin: 0 0 0 20px;
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
  font-size: 14px;
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