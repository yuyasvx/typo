<template>
  <div id="app">
    <!--<div id="sidebar">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link> |-->
    <!--<router-link to="/test">Test Page</router-link>-->
    <!--</div>-->
    <div class="titlebar">
      <div class="titlebar-control-padding-mac"></div>
      <span class="titlebar-text">Typo</span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default class Home extends Vue {}
</script>

<style lang="scss">
@import 'assets/scss/global';
@import 'assets/scss/variables/colors';
@import '~bulma/sass/utilities/_all';

#app {
  // TODO 以下2つ、設定やシステムの環境に応じて変更可能にできること
  font-size: 14px;
  font-family: -apple-system, 'BlinkMacSystemFont', sans-serif;
  min-height: 100vh;
  /////////////////////////////////////

  display: block;
  /*flex-direction: row;*/
  background-color: $base-light-background;
}

.titlebar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #000000;
  display: flex;

  .titlebar-control-padding-mac {
    width: 81px;
    height: 40px;
  }

  .titlebar-text {
    display: block;
  }
}

// Set your colors
$primary: #000000;
// primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
</style>
