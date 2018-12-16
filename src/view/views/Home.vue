<template>
  <div class="home">
    <div class="home-textform">
      <div class="inputbox" contenteditable="true">Type something.</div>
    </div>
    <div class="home-sidebar"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.inputbox {
  font-size: 72px;
  cursor: auto;
  margin-left: 80px;

  &:focus {
    outline: 0;
  }
}

.home-textform {
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}
</style>
