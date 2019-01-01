<template>
  <div id="app" class="appearance-normal">
    <!--<div id="sidebar">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link> |-->
    <!--<router-link to="/test">Test Page</router-link>-->
    <!--</div>-->
    <titlebar></titlebar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as IpcRenderResource from './resources/IpcRendererResource';
import { systemStatusStore } from '@/view/store/SystemStatus';
import components from './references/AllComponents';

@Component({
  components
})
export default class Home extends Vue {
  appElement: Element | null = null;

  beforeCreate(): void {
    IpcRenderResource.prepare();
  }

  mounted(): void {
    this.appElement = document.querySelector('#app');
    this.$nextTick(() => {
      this.changeAppearance();
    });
  }

  get darkAppearance(): boolean {
    return systemStatusStore.darkAppearance;
  }

  @Watch('darkAppearance')
  changeAppearance(): void {
    if (!this.appElement) {
      return;
    }
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

  .home-sidebar {
    border-left: 2px solid #000000;
  }
}

.appearance-dark {
  background-color: #333333;
  color: #ffffff;

  .home-sidebar {
    border-left: 2px solid #ffffff;
  }

  .input {
    background-color: #444444;
    color: #ffffff;
  }

  .autocomplete {
    .dropdown-menu {
      .dropdown-content {
        /*outline: solid 1px rgba(255, 255, 255, 0.5);*/
        box-shadow: 0 0px 1px rgba(255, 255, 255, 0.7);
        background-color: #333333;

        .dropdown-item {
          color: #ffffff;

          &:hover {
            background-color: #777777;
          }
        }
      }
    }
  }
}

// primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
