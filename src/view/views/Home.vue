<template>
  <div class="home">
    <home-textform></home-textform>
    <sidebar></sidebar>
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
