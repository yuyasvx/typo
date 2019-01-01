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

export const getMessage = (
  message: string = '',
  ...params: string[]
): string => {
  const splitMessage: string[] = message.split('{}');

  return splitMessage.reduce(
    (prevValue: string, currValue: string, i: number): string => {
      // if() {
      //
      // }
      return prevValue + params[i - 1] + currValue;
    }
  );
};
