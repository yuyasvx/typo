import LocaleDictionary from './LocaleDictionary';

export default {
  HomeWindowMenuBar: {
    appMenuMac: {
      submenu: {
        ABOUT: 'About {}',
        SERVICES: 'Services',
        HIDE: 'Hide {}',
        HIDE_OTHERS: 'Hide Others',
        UNHIDE: 'Show All',
        QUIT: 'Quit {}'
      }
    },

    editMenuItem: {
      LABEL: 'Edit',
      submenu: {
        UNDO: 'Undo',
        REDO: 'Redo',
        CUT: 'Cut',
        COPY: 'Copy',
        PASTE: 'Paste',
        DELETE: 'Delete',
        SELECT_ALL: 'Select All'
      }
    }
  }
} as LocaleDictionary;
