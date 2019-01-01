import * as LocaleDictionaryService from '../../../common/locale-dictionary/LocaleDictionaryService';
import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions
} from 'electron';
import LocaleDictionary from '../../../common/locale-dictionary/LocaleDictionary';
import * as SystemPreferencesResource from '../../../main/resources/SystemPreferencesResource';
import Platform from '../../../common/enum/Platform';
import Language from '../../../common/enum/Language';
import * as MenuService from '@/main/services/MenuService';
import * as LocaleService from '@/common/locale-dictionary/LocaleDictionaryService';

class HomeWindowMenuBar {
  private dictionary: LocaleDictionary;
  private appMenuMac: MenuItemConstructorOptions;
  private editMenuItem: MenuItemConstructorOptions;
  private viewMenuItem: MenuItemConstructorOptions;
  private windowMenuItemMac: MenuItemConstructorOptions;
  private helpMenuItemMac: MenuItemConstructorOptions;
  private devMenu: MenuItemConstructorOptions = {
    label: '開発',
    submenu: [
      {
        role: 'toggleDevTools'
      }
    ]
  };

  public generateMenuItem(): MenuItemConstructorOptions[] {
    const menu: MenuItemConstructorOptions[] = [];

    if (SystemPreferencesResource.getPlatform() === Platform.MACOS) {
      menu.push(this.appMenuMac);
    }

    menu.push(this.editMenuItem, this.viewMenuItem);

    if (SystemPreferencesResource.getPlatform() === Platform.MACOS) {
      menu.push(this.windowMenuItemMac, this.helpMenuItemMac);
    }

    if (process.env.NODE_ENV !== 'production') {
      menu.push(this.devMenu);
    }
    return menu;
  }

  public get menu(): Menu {
    return Menu.buildFromTemplate(this.generateMenuItem());
  }

  constructor(language: Language) {
    this.dictionary = LocaleDictionaryService.useDictionary(language);

    this.appMenuMac = {
      label: app.getName(),
      submenu: [
        {
          label: LocaleService.getMessage(
            this.dictionary.HomeWindowMenuBar.appMenuMac.submenu.ABOUT,
            'Typo'
          ),
          // role: 'about',
          click(): void {
            MenuService.openAbout();
          }
        },
        { type: 'separator' },
        {
          label: this.dictionary.HomeWindowMenuBar.appMenuMac.submenu.SERVICES,
          role: 'services'
        },
        { type: 'separator' },
        {
          label: LocaleService.getMessage(
            this.dictionary.HomeWindowMenuBar.appMenuMac.submenu.HIDE,
            'Typo'
          ),
          role: 'hide'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.appMenuMac.submenu
            .HIDE_OTHERS,
          role: 'hideothers'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.appMenuMac.submenu.UNHIDE,
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: LocaleService.getMessage(
            this.dictionary.HomeWindowMenuBar.appMenuMac.submenu.QUIT,
            'Typo'
          ),
          role: 'quit'
        }
      ]
    };
    this.editMenuItem = {
      label: this.dictionary.HomeWindowMenuBar.editMenuItem.LABEL,
      submenu: [
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.UNDO,
          role: 'undo'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.REDO,
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.CUT,
          role: 'cut'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.COPY,
          role: 'copy'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.PASTE,
          role: 'paste'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu.DELETE,
          role: 'delete'
        },
        {
          label: this.dictionary.HomeWindowMenuBar.editMenuItem.submenu
            .SELECT_ALL,
          role: 'selectall'
        }
      ]
    };
    this.viewMenuItem = {
      label: 'VIEW',
      submenu: [
        {
          label: 'RELOAD',
          accelerator: 'CmdOrCtrl+R',
          click(item: MenuItem, focusedWindow: BrowserWindow): void {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          type: 'separator'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    };
    this.windowMenuItemMac = {
      label: 'WINDOW',
      role: 'window',
      submenu: [
        {
          // label: 'Minimize',
          // accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          // label: 'Close',
          // accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    };
    this.helpMenuItemMac = {
      label: 'HELP',
      role: 'help',
      submenu: [{ label: 'JUMP_TO_WEBSITE', click(): void {} }]
    };
    return;
  }
}

// TODO 引数を language にするんじゃなくて、LocaleDictionaryからHomeWindowMenuBarを切り出して渡すほうが合理的な気が
export const getHomeWindowMenuBar = (language: Language): Menu => {
  return new HomeWindowMenuBar(language).menu;
};
