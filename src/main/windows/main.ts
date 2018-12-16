import { window, windowStatus } from '../interfaces/window';
import * as constants from '../utilities/constants';

/**
 * オーガナイザ・ウィンドウ
 */
const main: window = {
  option: {
    width: 1200,
    height: 720,
    minWidth: 1200,
    minHeight: 720,
    useContentSize: true,
    fullscreenable: true,
    show: false,
    titleBarStyle: 'hiddenInset',
    title: 'Typo',
    webPreferences: { scrollBounce: false }
  },
  url: constants.BUILT_HTML_PATH,
  menubarTemplate: null,
  single: true,
  destroyImmediatelyWhenClosed: false,
  primary: true
};

export default main;
