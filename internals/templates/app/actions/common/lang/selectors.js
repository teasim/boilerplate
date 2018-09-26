import { createSelector } from 'reselect';

export const selectLanguage = (state) => state.lang;

export const selectLocaleLanguage = () => createSelector(
  selectLanguage,
  (lang) => lang.locale
);