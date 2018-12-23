// @ts-ignore
import { darkMode } from 'electron-util';
import { systemPreferences } from 'electron';

const state = {
  subscribed: {
    darkAppearnce: false
  }
};

export const getDarkAppearance = (): boolean => {
  return darkMode.isEnabled;
};

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
