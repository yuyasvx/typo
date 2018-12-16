import { app } from 'electron';

/**
 * 各種リソースに簡単にアクセスするためのクラス。使いでがあるのか微妙だけど。
 */
export default class ResourcePath {
  public static getUserData(): string {
    return app.getPath('userData');
  }
  public static getUserMusic(): string {
    return app.getPath('music');
  }
  public static getDefaultLibraryPath(): string {
    return app.getPath('music');
  }
}
