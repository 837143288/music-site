<template>
  <div class="bg">
    <div class="m">
      <div class="song-list">
        <div class="song-list-top">
          <h2>{{ SongListName }}</h2>
          <!-- 菜单隐藏页 -->
          <div class="song-list-menu">
            <button class="btn" @click="isMenu = !isMenu">选择分类</button>
            <div class="song-menu" :class="{ menu: isMenu }">
              <!-- 菜单大分类 -->
              <div
                class="song-big"
                v-for="(item, index) in songMenus"
                :key="index"
              >
                <h2>{{ item }}</h2>
                <ul>
                  <li v-for="(i, y) in songListMenus" :key="y">
                    <!-- 这里v-if使用=或===都不行 菜单小分类 -->
                    <a
                      href="javascript:;"
                      @click="littleMenuSorf(i.name)"
                      v-if="i.category == index"
                      >{{ i.name }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <button @click="SongListHot()">热门</button>
            <button @click="SongListNew()">最新</button>
          </div>
        </div>
        <div class="song-list-main">
          <ul>
            <li v-for="item in SongLists" :key="item.id">
              <div class="song-playlist">
                <img :src="item.coverImgUrl" alt="" />
                <h2>{{ item.name }}</h2>
              </div>
            </li>
          </ul>
        </div>
        <div class="song-list-page">
          <template>
            <v-pagination
              @page-change="pageChange"
              :total="pages"
              :pageSize="42"
              :pageIndex="refresh"
              :layout="['total', 'prev', 'pager', 'next']"
            ></v-pagination>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
import "vue-easytable/libs/themes-base/index.css";
import { VTable, VPagination } from "vue-easytable";
export default {
  name: "SongList",
  components: {
    VTable,
    VPagination,
  },
  data() {
    return {
      SongListName: "全部",
      SongLists: "", //显示的42个歌单
      pages: 0,
      SongListUrl: "", //存储的歌单url
      isMenu: true, //分类按钮的style
      songMenus: "", //分类
      songListMenus: "", //具体分类数据
      refresh: 0,
    };
  },
  created() {
    this.SongList();
    this.songMenu();
  },
  methods: {
    /* 菜单点击事件 */
    littleMenuSorf(name) {
      this.refresh = 1;
      //console.log(name);
      axios({
        url: "/top/playlist?limit=42&cat=" + name,
        method: "post",
      })
        .then((res) => {
          //console.log(res.data);
          this.SongLists = res.data.playlists;
          this.pages = res.data.total;
          this.SongListUrl = "/top/playlist?limit=42&cat=" + name;
        })
        .catch((err) => {
          console.log(err);
        });
      this.isMenu = true;
    },
    /* 选择分类 */
    songMenu() {
      axios({
        url: "/playlist/catlist",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data);
          this.songMenus = res.data.categories;
          this.songListMenus = res.data.sub;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 分页器 */
    pageChange(pageIndex) {
      axios({
        url: this.SongListUrl + "&offset=" + (pageIndex - 1) * 42,
        method: "post",
      })
        .then((res) => {
          //console.log(res.data);
          this.SongLists = res.data.playlists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 最热 */
    SongListHot() {
      this.refresh = 1;
      axios({
        url: this.SongListUrl + "&order=hot",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data);
          this.SongLists = res.data.playlists;
          this.pages = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 最新 */
    SongListNew() {
      this.refresh = 1;
      axios({
        url: this.SongListUrl + "&order=new",
        method: "post",
      })
        .then((res) => {
          //console.log(res.data);
          this.SongLists = res.data.playlists;
          this.pages = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 默认 */
    SongList() {
      var that = this;
      axios({
        url: "/top/playlist?limit=42",
        method: "post",
      })
        .then((res) => {
          //console.log(res);
          this.SongLists = res.data.playlists;
          this.pages = res.data.total;
          this.SongListUrl = "/top/playlist?limit=42";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.bg {
  padding: 90px 0 30px 0;
  background-color: rgb(250, 250, 250);
}
.m {
  width: 1200px;
  margin: 0 auto;
}
.song-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding-bottom: 20px;
}
.song-list-top {
  display: flex;
  line-height: 80px;
}
.song-list-top h2 {
  font-size: 20px;
  margin: 0 20px;
  margin-left: 50px;
}
.song-list-menu {
  position: relative;
}

button {
  padding: 10px 10px;
  font-size: 14px;
  cursor: pointer;
  border: 0;
  background: transparent;
  position: relative;
  transition: all 0.25s ease;
}
.btn {
  overflow: hidden;
  color: #fff;
  border-radius: 30px;
  box-shadow: 0 0px 0 0 rgba(143, 64, 248, 0.5),
    0px 0 0 0 rgba(39, 200, 255, 0.5);
}
.btn:hover {
  transform: translate(0, -2px);
  box-shadow: 5px -5px 12px 0 rgba(143, 64, 248, 0.25),
    -5px 5px 12px 0 rgba(39, 200, 255, 0.25);
}
.btn::after {
  content: "";
  width: 400px;
  height: 400px;
  position: absolute;
  top: -50px;
  left: -100px;
  background-color: #ff3cac;
  background-image: linear-gradient(
    225deg,
    #27d86c 0,
    #26caf8 50%,
    #c625d0 100%
  );
  z-index: -1;
  transition: all 0.5s ease;
}
.btn:hover::after {
  transform: rotate(150deg);
}

.song-menu {
  position: absolute;
  top: 75px;
  left: -62px;
  width: 720px;
  height: 400px;
  padding-bottom: 30px;
  background-color: #fff;
  overflow-y: scroll;
  z-index: 999;
  transition: all 0.5s;
  border-radius: 5px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
}
/* 隐藏滚动条的同时具有滚动效果 */
.song-menu::-webkit-scrollbar {
  display: none;
}
/* .menu分类的过度效果 display没有过度效果一般用opacity */
.menu {
  transform: translateY(20px);
  transition: all 0.5s;
  z-index: -10;
  opacity: 0;
}

.song-big h2 {
  font-size: 16px;
  font-weight: 650;
  height: 35px;
}
.song-big ul {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  margin-left: 20px;
}
.song-big ul li {
  height: 50px;
}
.song-big ul li a {
  font-size: 12px;
  margin: 0 5px;
  background-color: #f7f7f7;
  padding: 6px 18px;
  border-radius: 16px;
  transition: all 0.4s;
}
.song-big ul li a:hover {
  background-color: #fa2800;
  color: #fff;
  transition: all 0.4s;
}

.song-list-main {
  position: relative;
  padding-left: 22px;
}
.song-list-main ul {
  display: flex;
  flex-wrap: wrap;
}
.song-playlist {
  width: 172px;
  height: 212px;
  position: relative;
  text-align: center;
  margin: 0 auto;
  font-size: 13.5px;
  margin: 0 10px;
}
.song-playlist img {
  margin-bottom: 10px;
  width: 132.5px;
  height: 132.5px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  /* 鼠标移开恢复特效 */
  transition: all 0.4s ease 0s;
}
.song-playlist img:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.2);
  transition: all 0.5s;
  border-radius: 25%;
}
.song-playlist h2 {
  display: block;
  width: 140px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 520;
}
.song-list-page {
  display: flex;
  justify-content: center;
  transform: translateX(-20px);
}
.song-list-page ul {
  display: flex;
}
</style>

