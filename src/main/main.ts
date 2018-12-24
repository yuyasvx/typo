import { app } from 'electron';
import * as windowActivator from './services/window-activator';
import main from './windows/main';
import * as ipcConnector from './resources/IpcMainResource';

app.on('ready', () => {
  ipcConnector.prepare();
  windowActivator.execute(main);
  ipcConnector.prepareSend();
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
