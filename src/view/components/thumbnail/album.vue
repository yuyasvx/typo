<template>
  <div class="albumThumbnail">
    <div class="artwork"></div>
    <div class="description">
      アルバム名
    </div>
  </div>
</template>

<script>
export default {
  name: 'album'
};
</script>

<style scoped lang="scss">
.albumThumbnail {
  width: 180px;
  text-align: left;

  .artwork {
    width: 160px;
    height: 160px;
    background-color: #cccccc;
  }
}
</style>
