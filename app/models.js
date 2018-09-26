import { fromJS } from "immutable";

export default {
  namespace: 'digit',
  state: fromJS({
    count: 0
  }),
  reducers: {
    add(state, action) {
      return state.set("count", action.payload + 1);
    },
    minus(state, action) {
      return state.set("count", action.payload - 1);
    },
  },
}