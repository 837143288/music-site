<template>
  <div class="search-song">
    <h2>SearchSong</h2>
    <p>{{ $store.state.searchName }}</p>
    <div class="bg-search">
      <input type="text" />
    </div>
    <div class="m">
      <div class="search-select">
        <h2>搜索结果</h2>
        <router-link to="/SearchSong/Song">单曲</router-link>
        <router-link to="/SearchSong/Singer">歌手</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchSong",
};
</script>

<style scoped>
.bg-search {
  height: 250px;
  background-color: bisque;
  position: relative;
}
.bg-search input {
  height: 32px;
  width: 300px;
  border-radius: 32px;
  outline: none;
  border: none;
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.m {
  width: 1200px;
  margin: 0 auto;
}
.search-select {
    display: flex;
    align-items: flex-end;
    background-color: burlywood;
    margin: 20px 0;
}
.search-select h2 {
    margin-right: 30px;
}
</style>