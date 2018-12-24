import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import store from '@/view/store';

export interface HomeWindowInterface {
  pageTitle: string | null;
  currentStyle: StyleInterface;
}

/*
@Module デコレータで、dynamic: true かつ store: で export default new Vuex.Store しているモジュールを渡すと、
なんと動的にStoreを追加してくれる。
 */

/**
 * ホーム画面に関するステート
 */
@Module({ namespaced: true, name: 'HomeWindow', dynamic: true, store })
export default class HomeWindow extends VuexModule {
  pageTitle: string = 'Typo';
  currentStyle: StyleInterface = {
    fontSize: '72px',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400'
  };

  @Mutation
  public mutatePageTitle(text: string): void {
    this.pageTitle = text;
  }

  @Mutation
  public mutateCurrentStyle(value: StyleInterface): void {
    this.currentStyle = value;
  }

  @Mutation
  public mutateCurrentStyleByMerging(value: StyleInterface): void {
    if (typeof value !== 'undefined') {
      this.currentStyle = Object.assign({}, this.currentStyle, value);
    }
  }
}

export const homeWindowStore = getModule(HomeWindow);
