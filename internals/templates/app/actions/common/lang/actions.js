import { CHANGE_LOCALE } from './types';

export function changeLocaleLanguage(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};
