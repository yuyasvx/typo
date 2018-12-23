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
  typedText: string = 'Type something.';
  inputbox: Element | null;

  get platform(): Platform {
    return systemStatusStore.platform;
  }

  mounted(): void {
    this.inputbox = document.querySelector('.home-textform .inputbox');
    this.inputbox.addEventListener('paste', (evt: ClipboardEvent) => {
      this.pasteAsPlainText(evt);
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

  pasteAsPlainText(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  mutateTypedText(event): void {
    this.typedText = this.inputbox.textContent;
  }

  // @Watch('typedText')
  // mutateInputbox() {
  //   this.inputbox.innerHTML = this.typedText;
  // }
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
