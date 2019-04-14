<template>
  <div class="parameter-box font-weight-picker">
    <div class="parameter-box-title">Font Weight</div>
    <div class="parameter-box-content">
      <b-autocomplete
        v-model="fontWeightValue"
        placeholder="font-weight"
        :open-on-focus="true"
        :data="datalist"
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
export default class FontweightPicker extends Vue {
  fontWeightValue: string = homeWindowStore.currentStyle.fontWeight || '';
  datalist: string[] = [
    'normal',
    'bold',
    'lighter',
    'bolder',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ];

  get filteredDataObj(): string[] {
    return this.datalist.filter((option: string) => {
      return option.indexOf(this.fontWeightValue) > -1 || false;
    });
  }

  @Watch('fontWeightValue')
  setFontWeight(): void {
    const filterResult: string[] = this.datalist.filter((value: string) => {
      return value === this.fontWeightValue;
    });
    if (filterResult.length > 0) {
      homeWindowStore.mutateCurrentStyleByMerging({
        fontWeight: this.fontWeightValue
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
