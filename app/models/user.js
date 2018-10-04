import { query as queryUsers } from 'services/user';
import Immutable, { fromJS } from 'immutable';

export default {
  namespace: 'user',

  state: {
    list: [],
  },

  state: fromJS({
    list: [],
  }),

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return state.set('list', action.payload);
    },
  },
};
