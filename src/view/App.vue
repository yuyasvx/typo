<template>
  <div id="app" class="appearance-normal">
    <!--<div id="sidebar">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link> |-->
    <!--<router-link to="/test">Test Page</router-link>-->
    <!--</div>-->
    <div class="titlebar">
      <div class="titlebar-control-padding-mac"></div>
      <span class="titlebar-text" :style="titlebarTextStyle">
        {{ pageTitle }}
      </span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as IpcRenderResource from './resources/IpcRendererResource';
import { homeWindowStore } from '@/view/store/HomeWindow';
import { systemStatusStore } from '@/view/store/SystemStatus';
import Platform from '@/common/enum/Platform';

@Component
export default class Home extends Vue {
  appElement: Element | null = null;

  titlebarTextStyle: StyleInterface = {
    width: '100%'
  };

  resizeTitlebarTextWidth(): void {
    if (this.platform === Platform.MACOS) {
      this.titlebarTextStyle.width = `${window.innerWidth - 81 * 2}px`;
    }
  }

  beforeCreate(): void {
    IpcRenderResource.prepare();
  }

  mounted(): void {
    this.appElement = document.querySelector('#app');
    this.$nextTick(() => {
      this.resizeTitlebarTextWidth();
      this.changeAppearance();
    });
    window.addEventListener('resize', this.resizeTitlebarTextWidth);
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.resizeTitlebarTextWidth);
  }

  get platform(): Platform {
    return systemStatusStore.platform;
  }

  get pageTitle(): string | null {
    return homeWindowStore.pageTitle;
  }

  get darkAppearance(): boolean {
    return systemStatusStore.darkAppearance;
  }

  @Watch('darkAppearance')
  changeAppearance(): void {
    if (!this.appElement) {
      return;
    }
    // console.log('ダークモード変更していません');
    const classList = this.appElement.classList;

    if (
      this.darkAppearance === true &&
      classList.contains('appearance-normal')
    ) {
      classList.remove('appearance-normal');
      classList.add('appearance-dark');
    } else if (
      this.darkAppearance === false &&
      classList.contains('appearance-dark')
    ) {
      classList.remove('appearance-dark');
      classList.add('appearance-normal');
    }
  }

  @Watch('platform')
  adjustTitlebar(): void {
    this.resizeTitlebarTextWidth();
  }
}
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
}

.appearance-normal {
  background-color: $base-light-background;
  color: black;
}

.appearance-dark {
  background-color: #333333;
  color: #ffffff;
}

.titlebar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #000000;
  display: flex;
  -webkit-app-region: drag;

  .titlebar-control-padding-mac {
    width: 81px;
    height: 40px;
  }

  .titlebar-text {
    display: block;
    text-align: center;
  }
}

// Set your colors
$primary: #000000;
// primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
</style>
