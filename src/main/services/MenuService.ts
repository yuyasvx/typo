import { dialog } from 'electron';

export const openAbout = (): void => {
  dialog.showMessageBox({
    title: 'ABOUT TYPO',
    message: 'メッセージです。',
    detail: '詳細です',
    buttons: []
  });
};
