// @ts-ignore
import { darkMode, is } from 'electron-util';
import { systemPreferences, app } from 'electron';
import Platform from '../../common/enum/Platform';
import Language from '../../common/enum/Language';

const state = {
  subscribed: {
    darkAppearnce: false
  }
};

/**
 * OSの種類を取得する。
 * @return {Platform} Platform
 */
export const getPlatform = (): Platform => {
  let platform = Platform.UNKNOWN;
  if (is.macos) {
    platform = Platform.MACOS;
  } else if (is.windows) {
    platform = Platform.WINDOWS;
  } else if (is.linux) {
    platform = Platform.LINUX;
  }
  return platform;
};

/**
 * (Macのみ)ダーク/ライト表示の切り替えを検知する。
 * 注意：Windowsでこのメソッドを呼んだときの挙動が不明。
 * @return {Platform} Platform
 */
export const getDarkAppearance = (): boolean => {
  return darkMode.isEnabled;
};

/**
 * (Macのみ)ダーク/ライト表示の切り替えを検知する。
 * 今の所このメソッドは最初の1回の呼び出しだけが有効になる。
 * @param {Function} callback (darkMode.isEnabled: boolean) 表示の切り替えを検知したときのコールバック関数
 */
export const subscribeDarkAppearance = (callback: Function): void => {
  if (state.subscribed.darkAppearnce) {
    return;
  }
  systemPreferences.subscribeNotification(
    'AppleInterfaceThemeChangedNotification',
    () => {
      callback(darkMode.isEnabled);
    }
  );
  state.subscribed.darkAppearnce = true;
};

export const getLanguage = (): Language => {
  return Language.toEnum(app.getLocale());
};
