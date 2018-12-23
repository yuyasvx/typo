import { ipcMain, Event } from 'electron';
import { is } from 'electron-util';
import Platform from '../../common/enum/Platform';
import {
  getDarkAppearance,
  subscribeDarkAppearance
} from './SystemPreferencesResource';
import { getWindowStatus } from '../window-activator';
// @ts-ignore
import * as FontResource from './FontResource.js';

const state = {
  prepared: false,
  preparedSend: false
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
    event.sender.send('reply-get-darkappearance', getDarkAppearance());
  });

  ipcMain.on('get-fontfamilylist', (event: Event) => {
    const fontList: FontManagerItem[] = FontResource.getFontList();
    const fontFamilyList: string[] = fontList
      .map((item: FontManagerItem) => {
        return item.family || '';
      })
      .sort()
      .filter((x, i, self) => {
        return self.indexOf(x) === i;
      });
    event.sender.send('reply-get-fontfamilylist', fontFamilyList);
  });

  return true;
};

export const prepareSend = (): boolean => {
  if (state.preparedSend) {
    return true;
  }

  const mainWindowInstance = getWindowStatus().filter(
    w => w.window.name === 'main'
  )[0].instance.webContents;
  if (!mainWindowInstance) {
    return false;
  }

  subscribeDarkAppearance((isEnabled: boolean) => {
    mainWindowInstance.send('reply-get-darkappearance', isEnabled);
  });
  return true;
};
