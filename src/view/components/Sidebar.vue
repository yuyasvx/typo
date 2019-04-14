<template>
  <div class="home-sidebar"><slot /></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
.home-sidebar {
  width: 300px;
  padding: 20px;
}
</style>
