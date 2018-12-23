<template>
  <div class="home-sidebar">Sidebar Here.</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
.home-sidebar {
  width: 300px;
  border-left: 2px solid #000000;
  padding: 20px;
}
</style>
