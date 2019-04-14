enum Language {
  DEFAULT,
  EN,
  JA
}

namespace Language {
  export function value(val: Language): string {
    switch (val) {
      case Language.DEFAULT:
        return 'default';
      case Language.EN:
        return 'en';
      case Language.JA:
        return 'ja';
      default:
        return 'unknown';
    }
  }

  export function toEnum(val: string): Language {
    switch (val) {
      case 'default':
        return Language.DEFAULT;
      case 'en':
        return Language.EN;
      case 'ja':
        return Language.JA;
      default:
        return Language.DEFAULT;
    }
  }
}

export default Language;
