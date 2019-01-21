import { Menu, BrowserWindow } from 'electron';
import { window, windowStatus } from '../interfaces/window';

/** singleがtrueに指定されたBrowserWindowインスタンスの情報を格納する */
let singleWindowStatuses: windowStatus[] = [];
// TODO: singleがtrue ではなく、destroyWhenClosedがtrueのものを管理すべき？

/** ウィンドウが破棄可能かどうか。 */
let isDestroyable: boolean = false;

/** 開いてるウィンドウの数 */
export let openWindowCount: number = 0;

/**
 * ウィンドウの生成と表示。基本的にアクティベータの実行の時のみ呼ばれる。
 * @param window 開くウィンドウのオブジェクト
 */
const createWindow = (window: window) => {
  let browserWindow: BrowserWindow | null;
  browserWindow = new BrowserWindow(window.option);

  if (window.single === true) {
    singleWindowStatuses.push({
      window: window,
      instance: browserWindow
    });
  }

  browserWindow.loadURL(window.url);

  // TODO: ウィンドウイベントもwindowオブジェクトで定義できたらすっきり？

  browserWindow.on('ready-to-show', () => {
    if (browserWindow !== null) {
      browserWindow.show();
      openWindowCount++;
    }
  });

  browserWindow.on('closed', () => {
    browserWindow = null;
    openWindowCount--;
    singleWindowStatuses = singleWindowStatuses.filter(status => {
      return status.instance !== null && typeof status.instance !== 'undefined';
    });
  });

  if (window.destroyImmediatelyWhenClosed === false) {
    browserWindow.on('close', event => {
      if (browserWindow !== null) {
        browserWindow.hide();
      }
      if (isDestroyable === false) {
        event.preventDefault();
        return;
      }
    });
  }

  browserWindow.on('blur', () => {});

  browserWindow.on('focus', () => {});
};

/**
 * アクティベータの実行。
 * window オブジェクトの属性によって、ウィンドウを新規に作るのか、すでに作られたウィンドウを
 * 再表示するだけなのか、などの処理を実行する。
 * @param window
 */
export const execute = (window: window) => {
  // let browserWindow: BrowserWindow | null;
  // let currentStatus: windowStatus | null;

  /*
   * ここでやること：
   * 引数で渡されたwindowがsingle == true であるか確認する
   *   ×：ウィンドウをつくる
   * 引数で渡されたwindowのBrowserWindowインスタンスが、すでに作られたか確認する
   *  作られていたら、それをshowする → おしまい
   * 作られていなかったら、ウィンドウをつくる処理
   *  ・new する（windowActivator.optionを渡す）
   *  ・URLを渡す
   *  ・ready-to-show：showする
   *  ・closed：nullにする
   *  ・destroyWhenClosedがfalseのときだけ、ウィンドウを閉じたときのイベントをなしにしたうえで、
   *    ウィンドウを隠す処理に代替する
   */

  // まず、windowStatusを引っ張って、該当のものをcurrentStatusにしまう
  let alreadyCreated: boolean = false;
  if (window.single === true) {
    singleWindowStatuses.forEach(status => {
      if (status.window === window) {
        status.instance.show();
        alreadyCreated = true;
      }
    });
  }
  if (alreadyCreated === false) {
    createWindow(window);
  }
};

export const getWindowStatus = () => {
  return singleWindowStatuses;
};

/**
 * primary: true にされたウィンドウをすべて再表示する。
 * すべてのウィンドウが閉じられた状態でアプリがアクティベートされた時呼ばれる想定。
 */
export const showPrimaryWindow = () => {
  singleWindowStatuses.forEach(status => {
    if (status.window.primary === true) {
      status.instance.show();
    }
  });
};

/**
 * 閉じただけでは破棄不可能にされたウィンドウを破棄可能にする。アプリ終了直前に呼ばれる想定。
 */
export const setDestroyable = () => {
  isDestroyable = true;
};
