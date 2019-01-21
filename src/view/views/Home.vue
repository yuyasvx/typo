<template>
  <div class="home">
    <home-textform></home-textform>
    <sidebar>
      <fontfamily-picker />
      <font-weight-picker />
    </sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import components from '../references/AllComponents';

@Component({
  components
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
</style>

<style lang="scss">
.parameter-box {
  margin-bottom: 20px;

  .parameter-box-title {
    font-size: 12px;
    text-transform: uppercase;
    padding-bottom: 5px;
  }
}
</style>
