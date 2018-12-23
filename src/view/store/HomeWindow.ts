import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import store from '@/view/store';

export interface HomeWindowInterface {
  pageTitle: string | null;
}

/*
@Module デコレータで、dynamic: true かつ store: で export default new Vuex.Store しているモジュールを渡すと、
なんと動的にStoreを追加してくれる。
 */

/**
 * ホーム画面に関するステート
 */
@Module({ namespaced: true, name: 'HomeWindow', dynamic: true, store })
export default class HomeWindow extends VuexModule
  implements HomeWindowInterface {
  pageTitle: string | null = 'Typo';

  @Mutation
  public mutatePageTitle(text: string): void {
    this.pageTitle = text;
  }
}

export const getHomeWindow = getModule(HomeWindow);
