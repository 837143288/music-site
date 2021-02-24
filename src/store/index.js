import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/plugins/axios.js";

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
    state: {
        /* MusicPlayer */
        isPlayMusic: false,  //歌曲播放,是否播放
        mDuration: 0,  //音乐当前播放时长
        reMusicUrl: '',  //推荐单曲数据 通用
        reMusicId: '',  //歌曲id  歌曲通用id
        reMusicIndex: '0',  //歌曲编号 只用来切换上或下一首歌
        reMusics: '',  //获取子元素的个数 用于按钮下一首的最终值
        reMusicImg: '',
        reMusicName: '',
        reMusicSonger: '',
        reMusicDuration: '',
        musicLyric: [],  //歌词
        /* SearchSong */
        searchName: '',  //搜索歌曲数据
        searchSongs: "",
        /* MusicList */
        musicListId: "",  //歌单id
        /* MyMusic */
        music: true,  //界面
        songList: "",  //用户歌单
        songListId: "",
        myLength: 0, //创建的歌单数
        lengths: 0,  //总歌单数
        myMusicList: "",  //歌单详情
        mySongDetails: "",  //歌曲详情
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
            /* 获取歌曲url */
            axios({
                url: "/song/url?id=" + state.reMusicId,
                method: "post",
            }).then((res) => {
                state.reMusicUrl = res.data.data[0].url;
                //console.log(res);
            }).catch((err) => {
                console.log(err);
            });
            /* 获取歌曲信息 */
            axios({
                url: "/song/detail?ids=" + state.reMusicId,
                method: "post",
            }).then((res) => {
                //console.log(res.data.songs[0].dt);
                state.reMusicImg = res.data.songs[0].al.picUrl;
                state.reMusicName = res.data.songs[0].name;
                state.reMusicSonger = res.data.songs[0].ar[0].name;
                state.reMusicDuration = res.data.songs[0].dt;
            }).catch((err) => {
                console.log(err);
            })
            /* 获取歌曲歌词 */
            axios({
                url: "/lyric?id=" + state.reMusicId,
                method: "post",
            }).then((res) => {
                //console.log(res);
                let lyric = res.data.lrc.lyric
                let arr = lyric.split("\n")
                let row = arr.length
                for (let i = 0; i < row; i++) {
                    let temp_row = arr[i]
                    let temp_arr = temp_row.split("]")
                    let text = temp_arr.pop()
                    temp_arr.forEach(element => {
                        let obj = {}
                        let time_arr = element.substr(1, element.length - 1).split(":");
                        let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1])
                        obj.time = s
                        obj.text = text
                        state.musicLyric.push(obj);
                    });
                }
                //console.log(state.musicLyric);
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