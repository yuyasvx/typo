import path from 'path';
import { app } from 'electron';
import { is } from 'electron-util';

export const HOME_URL: string = path.normalize(`${__dirname}/../.`);
export const BUILT_HTML_PATH: string =
  process.env.NODE_ENV === 'production'
    ? `file://${HOME_URL}/view/index.html#/`
    : 'http://localhost:8080/#/';
export const PATH_SEPARATOR = is.windows ? '\\' : '/';

/** デフォルトのリソースへのパス */
export const defaultResourcePath = {
  preferences: app.getPath('userData'),
  musicLibrary: app.getPath('music'),
  cache: path.join(app.getPath('userData'), `${PATH_SEPARATOR}Cache`)
};

/**
 * デフォルトのステート。これ読み込んでから、環境設定とかを読み込んで上書きする想定
 * @returns {Object} Vuexステート
 */
export const defaultState = () => {
  const state = {
    preferncesPath: '',
    preferences: {
      loadedFromSavedFile: false
    },
    organizer: {}
  };
  return Object.assign({}, state);
};
