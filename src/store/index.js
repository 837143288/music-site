import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/plugins/axios.js";

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
    state: {
        /* 歌曲播放 */
        isPlayMusic: false,  //是否播放
        mDuration: 0,  //音乐当前播放时长
        /* 推荐单曲数据 通用 */
        reMusicUrl: '',  
        reMusicId: '',  //歌曲id  歌曲通用id
        reMusicIndex: '0',  //歌曲编号 只用来切换上或下一首歌
        reMusics: '',  //获取子元素的个数 用于按钮下一首的最终值
        reMusicImg: '',
        reMusicName: '',
        reMusicSonger: '',
        reMusicDuration: '',
        /* 搜索歌曲数据 */
        searchName: '',
        searchSongs: "",
    },
    mutations: {
        /* 搜索歌曲 */
        SearchSong(state) {
            axios({
                url: "/search?keywords= " + state.searchName,
                method: "post",
              })
                .then((res) => {
                  //console.log(res.data.result.songs);
                  state.searchSongs = res.data.result.songs;
                })
                .catch((err) => {
                  console.log(err);
                });
        },
        /* 推荐单曲 点击播放 */
        getMusic(state) {
            axios({
                url: "/song/url?id=" + state.reMusicId,
                method: "post",
            }).then((res) => {
                state.reMusicUrl = res.data.data[0].url;
                //console.log(res);
            }).catch((err) => {
                console.log(err);
            });
            axios({
                url: "/song/detail?ids=" + state.reMusicId,
                method: "post",
            }).then((res) => {
                console.log(res.data.songs[0].dt);
                state.reMusicImg = res.data.songs[0].al.picUrl;
                state.reMusicName = res.data.songs[0].name;
                state.reMusicSonger = res.data.songs[0].ar[0].name;
                state.reMusicDuration = res.data.songs[0].dt;
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})

//导出
export default store