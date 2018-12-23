import { ipcRenderer } from 'electron';
import Platform from '../../common/enum/Platform';
import { systemStatusStore } from '@/view/store/SystemStatus';

const state = {
  prepared: false
};

export const prepare = () => {
  if (state.prepared) {
    return;
  }

  ipcRenderer.on('reply-get-platform', (event: any, arg: Platform) => {
    systemStatusStore.mutatePlatformValue(arg);
  });

  ipcRenderer.on('reply-get-darkappearance', (event: any, arg: boolean) => {
    console.log('darkmode? :' + arg);
    systemStatusStore.mutateDarkAppearance(arg);
  });

  getSystemPlatform();
  getSystemLanguage();
  state.prepared = true;
};

export const getSystemPlatform = (): void => {
  ipcRenderer.send('get-platform');
};

export const getSystemLanguage = (): void => {
  systemStatusStore.mutateLanguage(navigator.language);
};

export const getDarkAppearance = (): void => {
  ipcRenderer.send('get-darkappearance');
};
