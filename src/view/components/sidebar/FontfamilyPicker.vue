<template>
  <div class="parameter-box font-family-picker">
    <div class="parameter-box-title">Font Family</div>
    <div class="parameter-box-content">
      <b-autocomplete
        v-model="fontFamilyValue"
        placeholder="font-family"
        :open-on-focus="true"
        :data="filteredDataObj"
        @select="option => (selected = option)"
      >
      </b-autocomplete>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { homeWindowStore } from '../../store/HomeWindow';
import { systemStatusStore } from '../../store/SystemStatus';

@Component
export default class FontfamilyPicker extends Vue {
  fontFamilyValue: string = homeWindowStore.currentStyle.fontFamily || '';
  datalist: string[] = ['Helvetica Neue', 'Gill Sans', 'hoge'];

  // chooseFromDropdownList(option: string | number | object): void {
  //   // もとはoption => (selected = option)だった
  //   this.fontFamilyValue = `${this.fontFamilyValue}, '${option || ''}'`;
  //   console.log(this.fontFamilyValue);
  // }

  get filteredDataObj(): string[] {
    return this.fontFamilyList.filter((option: string) => {
      return option.indexOf(this.fontFamilyValue) > -1 || false;
    });
  }

  get fontFamilyList(): string[] {
    return systemStatusStore.fontFamilyList;
  }

  @Watch('fontFamilyValue')
  setFontFamily(): void {
    const filterResult: string[] = this.fontFamilyList.filter(
      (font: string) => {
        return font === this.fontFamilyValue;
      }
    );
    if (filterResult.length > 0) {
      homeWindowStore.mutateCurrentStyleByMerging({
        fontFamily: this.fontFamilyValue
      });
    }
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
