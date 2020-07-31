declare module '*.less';
declare module 'dva' {
  import { Connect } from 'react-redux';
  export const connect: Connect;
}
interface Game {
  id: number;
  name: string;
}
interface User {
  jobnumber: string
  name: string
  acl?: Record<string, { [nsp: string]: string[] | '__ALL__' }>
  gameList?: UserGameInfoDto[]
}
interface Window {
  __CONFIG__: any;
}