import { MenuDataItem as _MenuDataItem } from '@ant-design/pro-layout';
export { MenuDataItem };

interface MenuDataItem extends _MenuDataItem {
  component: string;
  authority: string;
  children?: MenuDataItem[];
}

const config: MenuDataItem[] = [
  {
    name: '菜单1',
    path: '',
    icon: 'control',
    authority: '',
    component: '',
    children: [
      {
        name: '子菜单',
        path: '/',
        authority: '',
        component: ''
      },
      {
        name: '子菜单2',
        path: '/list',
        authority: '',
        component: ''
      }
    ]
  }
];

export default config;
