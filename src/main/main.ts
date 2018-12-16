import { app } from 'electron';
import * as windowActivator from './window-activator';
import main from './windows/main';

app.on('ready',  () => {
  windowActivator.execute(main);
});

app.on('window-all-closed', () => {});

app.on('activate', () => {
  // console.log('activated');
  if (windowActivator.countOfOpenWindow <= 1) {
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
