import React from 'react';
import { connect } from 'dva';
import NavLink from 'umi/navlink';
import menu from '../menu';
import 'antd/dist/antd.css';
import ProLayout, {
  BasicLayoutProps as ProLayoutComponentsProps,
  MenuDataItem,
  Settings
} from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import RightContent from '../component/GlobalHeader/RightContent';
import { ConnectState } from '../models/connect';
import { actions } from '../models/global';
import { Spin, ConfigProvider } from 'antd';
import _ from 'lodash';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import {
  ControlOutlined,
  SettingOutlined,
  CodeOutlined,
  BarsOutlined
} from '@ant-design/icons';
const IconMap = {
  control: <ControlOutlined />,
  setting: <SettingOutlined />,
  code: <CodeOutlined />,
  bars: <BarsOutlined />
};

// 固定配置，不要修改
const LOCKED_SETTING: Partial<ProLayoutComponentsProps> = {
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true
};

const menuDataRender = (props: any): MenuDataItem[] => {
  const newMenu = _.cloneDeep(menu);
  const { permissions } = props;

  const updateMenu = (list: any) => {
    const newList: any = [];
    list.forEach(item => {
      let newItem;
      if (
        !item.children &&
        (!item.authority ||
          (permissions && item.authority.some(c => permissions.includes(c))))
      ) {
        newItem = {
          ...item,
          icon: item.icon && IconMap[item.icon as string]
        };
      } else if (
        !item.authority ||
        (permissions && item.authority.some(c => permissions.includes(c)))
      ) {
        newItem = {
          ...item,
          icon: item.icon && IconMap[item.icon as string]
        };
        newItem.children = updateMenu(item.children);
      }
      if (newItem) {
        newList.push(newItem);
      }
    });
    return newList;
  };
  const permissionsMenu = updateMenu(newMenu);
  return permissionsMenu;
};

const mapStateToProps = ({ global, settings, loading }: ConnectState) => {
  return {
    settings,
    ...global,
    loading
  };
};

export interface BasicLayoutProps extends ProLayoutComponentsProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutComponentsProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
export type Props = StateProps & DispatchProps;

const BasicLayout: React.FC<Props> = props => {
  const { children, settings } = props;
  const handleMenuCollapse = (): void => {
    props.toggleCollapsed();
  };
  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout
        style={{ minHeight: '100vh' }}
        title="egg-antd-admin"
        logo={
          <img
            alt="egg-antd-admin"
            src="https://gw.alipayobjects.com/zos/rmsportal/pDpbAUNmzLkdLShFvBdE.svg"
          />
        }
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => (
          <NavLink to={menuItemProps.path + '' || ''}>{defaultDom}</NavLink>
        )}
        menuDataRender={() => menuDataRender(props)}
        location={(props as any).location}
        footerRender={() => null}
        rightContentRender={rightProps => (
          <RightContent {...(rightProps as any)} />
        )}
        {...props}
        {...settings}
        {...LOCKED_SETTING}
        loading={false}
      >
        <Spin spinning={!!props.loading.global}> {children} </Spin>
      </ProLayout>
    </ConfigProvider>
  );
};

export default connect(
  mapStateToProps,
  actions
)(BasicLayout);
