import LocaleDictionary from './LocaleDictionary';

export default {
  HomeWindowMenuBar: {
    appMenuMac: {
      submenu: {
        ABOUT: '{}について',
        SERVICES: 'サービス',
        HIDE: '{}を隠す',
        HIDE_OTHERS: 'ほかを隠す',
        UNHIDE: 'すべてを表示',
        QUIT: '{}を終了'
      }
    },

    editMenuItem: {
      LABEL: '編集',
      submenu: {
        UNDO: '元に戻す',
        REDO: 'やり直す',
        CUT: 'カット',
        COPY: 'コピー',
        PASTE: 'ペースト',
        DELETE: '削除',
        SELECT_ALL: 'すべて選択'
      }
    }
  }
} as LocaleDictionary;
