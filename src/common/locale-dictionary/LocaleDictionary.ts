export default interface LocaleDictionary {
  common: {};
  HomeWindowMenuBar: {
    appMenuMac: {
      submenu: {
        ABOUT?: string;
        SERVICES?: string;
        HIDE?: string;
        HIDE_OTHERS?: string;
        UNHIDE?: string;
        QUIT?: string;
      };
    };

    editMenuItem: {
      LABEL?: string;
      submenu: {
        UNDO?: string;
        REDO?: string;
        CUT?: string;
        COPY?: string;
        PASTE?: string;
        DELETE?: string;
        SELECT_ALL?: string;
      };
    };

    viewMenuItem: {
      LABEL?: string;
      submenu?: {
        RELOAD?: string;
        TOGGLE_FULLSCREEN?: string;
      };
    };

    windowMenuItemMac: {
      LABEL?: string;
      submenu: {
        MINIMIZE?: string;
        CLOSE?: string;
      };
    };

    helpMenuItemMac?: {
      LABEL?: string;
      submenu: {};
    };
  };
}
