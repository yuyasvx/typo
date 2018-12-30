import en from './en';
import ja from './ja';
import LocaleDictionary from './LocaleDictionary';
import Language from '../../common/enum/Language';

export const useDictionary = (language: Language): LocaleDictionary => {
  let dictionary: LocaleDictionary = Object.assign({}, en);

  if (language === Language.JA) {
    dictionary = Object.assign({}, dictionary, ja);
  }
  return dictionary;
};
