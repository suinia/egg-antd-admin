import { ActionMap, ActionUnion, Model, createAction } from '../helper';

export interface State {
  collapsed: boolean;
  user?: User;
}

export const actions = {
  set: (state: Partial<State>) => createAction('global/set', state),
  toggleCollapsed: () => createAction('global/toggleCollapsed')
};

type Actions = ActionMap<typeof actions>;
export type Action = ActionUnion<typeof actions>;

const model: Model<State, Actions> = {
  state: {
    collapsed: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const { location } = history;
      // todo
    }
  },
  effects: {},
  reducers: {
    set(state, { payload }) {
      return { ...state, ...payload };
    },
    toggleCollapsed(state) {
      return { ...state, collapsed: !state.collapsed };
    }
  }
};

export default model;
