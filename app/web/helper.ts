import { ConnectState } from './models/connect';

interface Action<T extends string> {
  type: T;
}
interface ActionWidthPayload<T extends string, P> extends Action<T> {
  payload: P;
}
export type ActionUnion<
  AC extends Record<string, (...args: any[]) => any>
> = ReturnType<AC[keyof AC]>;
export type ActionMap<T extends Record<string, (...args: any[]) => any>> = {
  [key in keyof T]: ReturnType<T[key]>;
};

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWidthPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

interface Call {
  <T extends (...args: any[]) => any>(fn: T, ...p: Parameters<T>): any;

  <T extends (...args: any[]) => any>(
    [context, fn]: [any, T],
    ...p: Parameters<T>
  ): any;
}

interface SagaEffect {
  put: (action: {}) => any;
  call: Call;
  select: (fn: (state: ConnectState) => any) => any;
}

type Effects<T> = {
  [key in keyof T]?: (action: T[key], effect: SagaEffect) => any;
};
type Reducers<S, T> = {
  [key in keyof T]?: (state: S, action: T[key]) => S;
};

export type Model<State, ActionMap> = {
  namespace?: string;
  state: State;
  effects?: Effects<ActionMap>;
  reducers?: Reducers<State, ActionMap>;
  subscriptions?: {};
};
