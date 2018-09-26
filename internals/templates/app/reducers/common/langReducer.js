import { merge } from 'teasim-tools';
import { DEFAULT_LOCALE, CHANGE_LOCALE } from 'app/actions/common/lang/types';

const initialState = {
  locale: DEFAULT_LOCALE,
};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return merge({}, state, {locale: action.payload});
    default:
      return state;
  }
};

export default langReducer;
