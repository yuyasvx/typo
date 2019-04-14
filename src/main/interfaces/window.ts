import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

/**
 * ウィンドウオブジェクトの抽象化
 */
export interface window {
  /** ウィンドウオブジェクトの識別子 */
  name: string;

  /** ウィンドウの詳細オプション */
  option: BrowserWindowConstructorOptions;

  /** ビルド済みのHTMLのURL */
  url: string;

  /** メニューバーの定義データ（Macでは無視の予定） */
  menubarTemplate: object | null;

  /** 同じウィンドウを複数個表示できるようにする = そのBrowserWindowインスタンスが存在していいのは1つだけである */
  single: boolean;

  /** ウィンドウを閉じたとき、ウィンドウを即破棄するか？ falseの場合、赤い閉じるボタンを押してもウィンドウが隠れるだけになる */
  destroyImmediatelyWhenClosed: boolean;
  // TODO: 破棄する前にレンダラ側で前処理ができるようになるといろいろ都合がいいかもね
  // これが false かつ single===false だと閉じたウィンドウが一生破棄できなくなる危険

  /** 全ウィンドウが閉じた状態 かつ アプリがactivateされた時開くウィンドウであれば true。あまりたくさんのウィンドウで使わない方がいい。 */
  primary?: boolean;
}

/**
 * ウィンドウステータスの定義
 */
export interface windowStatus {
  /** ウィンドウインタフェース */
  window: window;

  /** 生成したインタフェース */
  instance: BrowserWindow;
}
