import { ipcMain, Event } from 'electron';
// @ts-ignore
import { is, darkMode } from 'electron-util';
import Platform from '../../common/enum/Platform';

const state = {
  prepared: false
};

export const prepare = () => {
  if (state.prepared) {
    return true;
  }

  ipcMain.on('get-platform', (event: Event) => {
    // console.log('Detected: getSystemPlatform');
    let platform = Platform.UNKNOWN;
    if (is.macos) {
      platform = Platform.MACOS;
    } else if (is.windows) {
      platform = Platform.WINDOWS;
    } else if (is.linux) {
      platform = Platform.LINUX;
    }
    event.sender.send('reply-get-platform', platform);
  });

  ipcMain.on('get-fontlist', (event: Event) => {
    event.sender.send('reply-get-fontlist', null);
  });

  ipcMain.on('get-darkappearance', (event: Event) => {
    console.log('Detected: darkappearance');
    event.sender.send('reply-get-darkappearance', darkMode.isEnabled);
  });

  return true;
};
