<template>
  <div class="home-textform">
    <div
      class="inputbox"
      contenteditable="true"
      @keydown="handleKeypress"
      @input="mutateTypedText"
    >
      Type something.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import components from '../references/AllComponents';
import Platform from '../../common/enum/Platform';
import { systemStatusStore } from '@/view/store/SystemStatus';

@Component({
  components
})
export default class HomeTextform extends Vue {
  typedText: string | null = 'Type something.';
  inputbox: Element | null = null;

  get platform(): Platform | null {
    return systemStatusStore.platform;
  }

  mounted(): void {
    this.inputbox = document.querySelector('.home-textform .inputbox');
    if (!this.inputbox) {
      return;
    }
    this.inputbox.addEventListener('paste', (event: Event) => {
      this.pasteAsPlainText(event);
    });
  }

  handleKeypress(event: KeyboardEvent): void {
    const ctrlOrCommandKey =
      this.platform === Platform.MACOS ? event.metaKey : event.ctrlKey;
    if (ctrlOrCommandKey && event.code === 'KeyV') {
      // event.preventDefault();
    }
    if (ctrlOrCommandKey && event.code === 'KeyC') {
      // event.preventDefault();
    }
  }

  /**
   * プレーンなテキストとして貼り付ける処理
   * @param {Event} event チェック対象のオブジェクト
   * @return {void}
   */
  pasteAsPlainText(event: Event): void {
    event.preventDefault();
    if (!this.isClipboardEvent(event)) {
      return;
    }
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  mutateTypedText(event: Event): void {
    if (this.typedText && this.inputbox) {
      this.typedText = this.inputbox.textContent;
    }
  }

  // @Watch('typedText')
  // mutateInputbox() {
  //   this.inputbox.innerHTML = this.typedText;
  // }

  /**
   * 引数の型がClipboardEventであることを判定
   *
   * @param {*} event チェック対象のオブジェクト
   * @return {boolean} ClipboardEventオブジェクトであれば true
   */
  private isClipboardEvent(event: any): event is ClipboardEvent {
    return !!event.clipboardData;
  }
}
</script>

<style lang="scss" scoped>
.home-textform {
  height: calc(100vh - 80px);
  overflow: scroll;
  display: flex;
  align-items: center; // TODO ウィンドウ枠を超えるようであればこのオプションを消す
  width: calc(100vw - 300px);

  .inputbox {
    font-size: 72px;
    cursor: auto;
    margin-left: 80px;
    margin-right: 80px;
    min-width: 1em;

    &:focus {
      outline: 0;
    }
  }
}
</style>
