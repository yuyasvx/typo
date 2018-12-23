import fontManager from 'font-manager';

export const getFontList = () => {
  return fontManager.getAvailableFontsSync();
};
