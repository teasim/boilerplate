import { fromJS } from "immutable";

export default {
  namespace: 'localization',
  state: fromJS({
    language: 0
  }),
  reducers: {
    add(state, action) {
      const language = action.payload;
      return state.set("language", language + 1);
    },
    minus(state, action) {
      const language = action.payload;
      return state.set("language", language - 1);
    },
  },
}