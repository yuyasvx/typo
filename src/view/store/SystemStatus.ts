import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';
import Platform from '../../common/enum/Platform';
import store from '@/view/store';
import Language from '../../common/enum/Language';

@Module({ namespaced: true, store, name: 'SystemStatus', dynamic: true })
export default class SystemStatus extends VuexModule {
  /** このStoreが初期化済みかどうか */
  initialized: boolean = false;

  /** このアプリを立ち上げているOSの種類。 */
  platform: Platform = Platform.UNKNOWN;

  /** OSのバージョン。 */
  platformVersion: string | null = null;

  /** PCの使用言語 */
  language: Language = Language.DEFAULT;

  /** ダークモードかどうか */
  darkAppearance: boolean = false;

  /** PCにインストール済みのフォントのうち、フォントファミリだけを一覧にしたもの */
  fontFamilyList: string[] = [];

  @Mutation
  public mutatePlatformValue(platform: Platform): void {
    this.platform = platform;
  }

  @Mutation
  public mutateLanguage(language: Language): void {
    this.language = language;
  }

  @Mutation
  public mutateDarkAppearance(value: boolean): void {
    this.darkAppearance = value;
  }

  @Mutation
  public mutateFontFamilyList(value: string[]): void {
    this.fontFamilyList = value;
  }

  private hasInitialized(): void {}

  // @Mutation
  // increment(delta: number) {
  //   this.count += delta;
  // }
  // @Mutation
  // decrement(delta: number) {
  //   this.count -= delta;
  // }
  //
  // // action 'incr' commits mutation 'increment' when done with return value as payload
  // @Action({ commit: 'increment' })
  // incr() {
  //   return 5;
  // }
  // // action 'decr' commits mutation 'decrement' when done with return value as payload
  // @Action({ commit: 'decrement' })
  // decr() {
  //   return 5;
  // }
}

export const systemStatusStore = getModule(SystemStatus);
