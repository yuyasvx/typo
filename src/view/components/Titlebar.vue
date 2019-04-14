<template>
  <div class="titlebar">
    <div class="titlebar-control-padding-mac"></div>
    <span class="titlebar-text" :style="titlebarTextStyle">
      {{ pageTitle }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Platform from '../../common/enum/Platform';
import { systemStatusStore } from '../store/SystemStatus';
import { homeWindowStore } from '@/view/store/HomeWindow';

const DEFAULT_APP_NAME = 'Typo';

@Component
export default class Titlebar extends Vue {
  titlebarTextStyle: StyleInterface = {
    fontFamily: 'inherit',
    width: 'auto'
  };
  documentTitle: string = '';

  resizeTitlebarTextWidth(): void {
    if (this.platform === Platform.MACOS) {
      this.titlebarTextStyle.width = `${window.innerWidth - 81 * 2}px`;
    }
  }

  mounted(): void {
    window.addEventListener('resize', this.resizeTitlebarTextWidth);
    document.title = DEFAULT_APP_NAME;
    this.updateTitlebarText();
    this.resizeTitlebarTextWidth();
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.resizeTitlebarTextWidth);
  }

  get pageTitle(): string {
    return homeWindowStore.pageTitle;
  }

  get platform(): Platform {
    return systemStatusStore.platform;
  }

  get currentFontFamily(): string | undefined {
    return homeWindowStore.currentStyle.fontFamily;
  }

  get currentFontSize(): string | undefined {
    return homeWindowStore.currentStyle.fontSize;
  }

  @Watch('currentFontFamily')
  updateTitlebarText(): void {
    if (!this.currentFontFamily) {
      homeWindowStore.mutatePageTitle(DEFAULT_APP_NAME);
      this.titlebarTextStyle.fontFamily = 'inherit';
      this.documentTitle = `${DEFAULT_APP_NAME}`;
    } else {
      homeWindowStore.mutatePageTitle(
        `${this.currentFontFamily} — ${this.currentFontSize}`
      );
      this.titlebarTextStyle.fontFamily = this.currentFontFamily;
      this.documentTitle = `${DEFAULT_APP_NAME} — ${this.pageTitle}`;
    }
  }

  @Watch('platform')
  adjustTitlebar(): void {
    this.resizeTitlebarTextWidth();
  }

  @Watch('documentTitle')
  updateDocumentTitle(): void {
    document.title = this.documentTitle;
  }
}
</script>

<style lang="scss" scoped>
.titlebar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
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
</style>
