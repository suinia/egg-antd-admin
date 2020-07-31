import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import * as Global from './global';
import { DefaultSettings as SettingModelState } from '../config/defaultSettings';

export type Action =
  | Global.Action;

export interface Loading {
  global: boolean;
  effects: { [key in Action['type']]?: boolean };
  models: {
    global?: boolean;
    setting?: boolean;
  };
}

export interface ConnectState {
  settings: SettingModelState;
  loading: Loading;
  global: Global.State;
}

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}
