import { app, Menu } from 'electron';
import * as windowActivator from './services/window-activator';
import main from './windows/main';
import * as ipcConnector from '@/main/resources/IpcMainResource';
import {
  getPlatform,
  getLanguage
} from './resources/SystemPreferencesResource';
import Platform from '../common/enum/Platform';
import * as HomeWindowMenuBar from './menu/menubar/HomeWindowMenuBar';

app.on('ready', () => {
  // TODO 言語別辞書の取得もここでまとめてやっちゃいたい。新しいサービスとして作成？
  ipcConnector.prepare();
  windowActivator.execute(main);
  ipcConnector.prepareSend();
  if (getPlatform() === Platform.MACOS) {
    Menu.setApplicationMenu(
      HomeWindowMenuBar.getHomeWindowMenuBar(getLanguage())
    );
  }
});

app.on('window-all-closed', () => {});

app.on('activate', () => {
  if (windowActivator.openWindowCount <= 1) {
    windowActivator.showPrimaryWindow();
  }
});

app.on('before-quit', () => {
  // console.log('before-quit');
  // 最後に、ウィンドウを閉じた時のイベントの阻止を止めないと一生アプリが終了しない
  windowActivator.setDestroyable();
});
//
// const testDB = async () => {
//   try {
//     await dbTest.execute();
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
