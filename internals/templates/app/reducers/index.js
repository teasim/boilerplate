import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import langReducer from './common/langReducer';

export const rootReducer = combineReducers({
  routing: routerReducer,
  lang: langReducer,
});