<template>
  <div class="foot">
    <div class="footer">
      <div class="musicName">
        <div></div>
        <h3>icmusic</h3>
        <small>icmusic</small>
      </div>
      <div class="mine">
        <div class="blog">
          <a href="https://blog.csdn.net/stm870581942"></a>
        </div>
        <div class="gitHub">
          <a href="https://github.com/837143288/music-site"></a>
        </div>
      </div>
    </div>
    <div class="line">
      <div>837143288@qq.com</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot",
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
.foot {
  height: 300px;
  width: 100%;
  background-color: #161e27;
  position: relative;
}
.footer {
  width: 1200px;
  height: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.footer .musicName {
  margin: 40px 0 0 40px;
  letter-spacing: 1px;
  font-size: 14px;
  color: #fff;
}
.musicName {
  position: relative;
}
.musicName div {
  width: 4px;
  height: 15px;
  background-color: #fa2800;
  position: absolute;
  top: 1px;
  left: -16px;
}
.musicName small {
  color: #6d7685;
}
.mine {
  display: flex;
  margin: 30px 0 0 30px;
}
.mine div a {
  font-family: "icomoon";
  background-color: #232a31;
  color: #6d7685;
  padding: 8px;
  border-radius: 50%;
  margin: 0 5px;
  transition: all 0.3s;
}
.mine .blog a {
  font-size: 14px;
  padding: 9px;
}
.mine div a:hover {
  color: #fff;
  background-color: #11181f;
  transition: all 0.3s;
}
.line {
  width: 100%;
  height: 50px;
  border-top: 1px solid #232a31;
  position: absolute;
  top: 250px;
}
.line div {
  width: 1200px;
  line-height: 50px;
  margin: 0 auto;
  font-size: 14px;
  padding-left: 40px;
}
</style>