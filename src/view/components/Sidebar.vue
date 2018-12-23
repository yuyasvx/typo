<template>
  <div class="home-sidebar">
    <div class="parameter-box">
      <div class="parameter-box-title">Font Family</div>
      <div class="parameter-box-content">
        <b-autocomplete
          v-model="fontFamilyValue"
          placeholder="font-family"
          :open-on-focus="true"
          :data="datalist"
          @select="option => (selected = option)"
        >
        </b-autocomplete>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { homeWindowStore } from '../store/HomeWindow';

@Component
export default class Sidebar extends Vue {
  fontFamilyValue: string = homeWindowStore.currentStyle.fontFamily || '';
  datalist: string[] = ['Helvetica Neue', 'Gill Sans', 'hoge'];

  // chooseFromDropdownList(option: string | number | object): void {
  //   // もとはoption => (selected = option)だった
  //   this.fontFamilyValue = `${this.fontFamilyValue}, '${option || ''}'`;
  //   console.log(this.fontFamilyValue);
  // }

  get filteredDataObj(): string[] {
    return this.datalist.filter((option: string) => {
      return option.indexOf(this.fontFamilyValue) > -1 || false;
    });
  }

  @Watch('fontFamilyValue')
  setFontFamily(): void {
    homeWindowStore.mutateCurrentStyleByMerging({
      fontFamily: this.fontFamilyValue
    });
  }
}
</script>

<style lang="scss" scoped>
.home-sidebar {
  width: 300px;
  border-left: 2px solid #000000;
  padding: 20px;
}
</style>
