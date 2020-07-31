import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Spin, Menu, Dropdown } from 'antd';
import { actions } from '@/models/global';

const mapStateToProps = ({ global }: ConnectState) => {
  return {
    ...global,
    ...actions
  };
};
type StateProps = ReturnType<typeof mapStateToProps>;
export interface GlobalHeaderRightProps extends StateProps {
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: any) => {
    const { key } = event;
    if (key === 'logout') {
      // todo
      return;
    }
  };
  render() {
    const { user, menu } = this.props;
    if (!user || !user.name) {
      return <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />;
    }
    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <span className={styles.name}>{user.name}</span>
        </span>
      );
    }
    const menuHeaderDropdown = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        <Menu.Item key="logout">
          <LogoutOutlined />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <UserOutlined />
          <span className={styles.userName}>{user.name}</span>
        </span>
      </Dropdown>
    );
  }
}

export default connect(mapStateToProps)(AvatarDropdown);
