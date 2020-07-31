import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '../../models/connect';
import styles from './index.less';
import AvatarDropdown from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <div className={styles.control}>
        <AvatarDropdown menu />
      </div>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout
}))(GlobalHeaderRight);
