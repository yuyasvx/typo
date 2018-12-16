// import { app } from 'electron';
import ElectronStore from 'electron-store';
import PreferencesNotAvailable from '../../utilities/errors/preferences-not-available';

const asyncStub = async () => '未実装です！';
const asyncRejectStub = async () => {
  throw new Error('エラーです！');
};

/**
 * アプリの設定ファイルを取得し、それを返すだけの関数
 * @returns {Object} ストアオブジェクト まるごと
 * @throws {PreferencesNotAvailable} 設定ファイルが存在しないか読み込めなかった場合
 */
const getPreferences = async () => {
  const store = new ElectronStore();
  if (typeof store.get('loadedFromSavedFile') === 'undefined') {
    throw new PreferencesNotAvailable();
  }
  return store.store;
};

const overwritePreferences = async () => {};

// TODO こういった関数は、preferences-resourceとして別ファイルにうつしたい。

/**
 * 正直なんのために作ったか わすれた
 * @deprecated
 */
const activateStore = async () => asyncStub();

export default async () => {
  // await activateStore();
  try {
    return await getPreferences();
  } catch (err) {
    if (err.constructor.name === 'PreferencesNotAvailable') {
      // TODO 初回起動時の動作をここに書く。
      // console.log('初回起動です。');

      // TODO からオブジェクト返すの、良くない。
      return {};
    }
    throw err;
  }
};
/*
前提：storeが全部読み込まれていること
 */
/* ここですること
 * ・初回起動の判定：
 *  ・初回起動であれば、イントロダクション画面を開く
 *  ・初回起動でなければ、次に進む
 * ・ライブラリのパスが記録されているはずなので、ライブラリを読み込む
 * ・ライブラリの読み込みができたら、"main" ウィンドウを読み込む
 * */

/*
# 初回起動かどうか判定する
  初回起動とみなす条件 設定ファイルがあるかどうか
  設定ファイルのばしょ？
 */
