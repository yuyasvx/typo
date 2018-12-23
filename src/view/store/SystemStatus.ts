import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import Platform from '../../common/enum/Platform';
import store from '@/view/store';

@Module({ namespaced: true, store, name: 'SystemStatus', dynamic: true })
export default class SystemStatus extends VuexModule {
  /** このStoreが初期化済みかどうか */
  initialized: boolean = false;

  /** このアプリを立ち上げているOSの種類。 */
  platform: Platform | null = null;

  /** PCの使用言語 */
  language: string | null = null;

  /** ダークモードかどうか */
  darkAppearance: boolean = false;

  @Mutation
  public mutatePlatformValue(platform: Platform): void {
    this.platform = platform;
  }

  @Mutation
  public mutateLanguage(language: string): void {
    this.language = language;
  }

  @Mutation
  public mutateDarkAppearance(value: boolean): void {
    this.darkAppearance = value;
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
