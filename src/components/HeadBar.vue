<template>
  <div class="HeadBar">
    <div class="bar">
      <div class="logo">
        <img src="../assets/img/logo1.jpg" alt="" />
        <h2>icmusic</h2>
      </div>
      <div class="head">
        <div>
          <router-link to="/FindMusic" class="findmusic"
            ><h4>发现音乐</h4></router-link
          >
        </div>
        <div>
          <router-link to="/Top" class="top"><h4>排行榜</h4></router-link>
        </div>
        <div>
          <router-link to="/SongList" class="song-list"
            ><h4>歌单</h4></router-link
          >
        </div>
        <div>
          <router-link to="/MyMusic" class="my-music"
            ><h4>我的音乐</h4></router-link
          >
        </div>
      </div>
      <div class="search">
        <span @click="SearchSong"></span>
        <input @keyup.enter="SearchSong" ref="search" type="text" />
      </div>
      <el-popover
        class="portrait"
        placement="bottom"
        trigger="hover"
        :disabled="this.loginState"
      >
        <ul class="portraitUl">
          <li @click="login">我的歌单</li>
          <li @click="edit">退出</li>
        </ul>
        <el-button slot="reference" circle class="avatarBtn" @click="login">
          <el-avatar
            icon="el-icon-user-solid"
            :src="this.portraitUrl"
            class="avatar"
          ></el-avatar>
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  name: "HeadBar",
  inject:['reload'],
  data() {
    return {
      portraitUrl: "",
      loginState: true,
    };
  },
  mounted() {
    this.portrait();
  },
  methods: {
    login() {
      let url = window.location.pathname
      if(url != "/MyMusic") {
        this.$router.push({path: '/MyMusic'})
      }
    },
    edit() {
      axios({
        url: "/logout",
        method: "post",
      }).then((res) => {
        sessionStorage.removeItem("myId");
        this.$store.state.music = true
        this.reload();
      });
    },
    portrait() {
      if (JSON.parse(sessionStorage.getItem("myId")) != null) {
        this.loginState = false
        let id = JSON.parse(sessionStorage.getItem("myId"));
        axios({
          url: "/user/detail?uid=" + id,
          method: "post",
        }).then((res) => {
          this.portraitUrl = res.data.profile.avatarUrl;
        });
      } else {
        this.loginState = true
      }
    },
    SearchSong() {
      this.$store.state.searchName = this.$refs.search.value;
      this.$store.commit("SearchSong");
      if (this.$route.path !== "/SearchSong/Song") {
        this.$router.push({ path: "/SearchSong/Song" });
      }
    },
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
.router-link-active {
  color: #fa2800;
  transition: all 0.3s;
}
.HeadBar {
  position: fixed;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  box-shadow: 0 5px 40px -1px rgb(2 10 18 / 10%);
}
.bar {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.head div {
  line-height: 74px;
  float: left;
  padding: 0 19px;
  font-size: 14px;
  color: #161e27;
}
.logo {
  display: flex;
}
.logo img {
  width: 50px;
  height: 50px;
  margin: auto 0;
}
.logo h2 {
  line-height: 74px;
  margin-right: 10px;
}
.search {
  height: 70px;
  position: relative;
}
.search span {
  font-family: "icomoon";
  position: absolute;
  top: 25px;
  left: 636px;
  z-index: 99;
}
.search input {
  height: 32px;
  width: 300px;
  border-radius: 32px;
  padding-left: 14px;
  padding-right: 32px;
  outline: none;
  border: none;
  position: absolute;
  top: 18px;
  left: 365px;
  font-size: 14px;
  color: #333;
  background-color: #fafafa;
}
.portrait {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 17px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
}
.portraitUl li {
  padding: 4px 0 4px 30px;
}
.portraitUl li:hover {
  background-color: #fafafa;
  transition: all 0.2s;
}
.avatarBtn {
  padding: 0;
  border: none;
}
.avatar {
  width: 32px;
  height: 32px;
}
</style>