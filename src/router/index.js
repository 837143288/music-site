import Vue from 'vue'
import Router from 'vue-router'

/* 懒加载 */
const FindMusic = () => import('../components/FindMusic')
const Top = () => import('../components/Top')
const SongList = () => import('../components/SongList')
const MyMusic = () => import('../components/MyMusic')
const SearchSong = () => import('../components/SearchSong')

const Song = () => import('../components/SearchSong/Song')
const Singer = () => import('../components/SearchSong/Singer')

const MusicList = () => import('../components/MusicList')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/FindMusic'
    },
    {
      path: '/FindMusic',
      component: FindMusic
    },
    {
      path: '/Top',
      component: Top,
    },
    {
      path: '/SongList',
      component: SongList
    },
    {
      path: '/MusicList',
      component: MusicList
    },
    {
      path: '/MyMusic',
      component: MyMusic
    },
    {
      path: '/SearchSong',
      component: SearchSong,
      children: [
        {
          path: '',
          redirect: 'song'
        },
        {
          path: 'song',
          component: Song
        },
        {
          path: 'singer',
          component: Singer
        }
      ]
    },
  ],
  //mode 模式
  mode: 'history',
})
