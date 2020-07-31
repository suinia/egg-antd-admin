import React from 'react';
import style from './index.less';
const classNames = require('classnames/bind');

const cx = classNames.bind(style);

interface Props {
  title?: string | JSX.Element;
  lhsToolbar?: JSX.Element | JSX.Element[];
  rhsToolbar?: JSX.Element | JSX.Element[];
  children: React.ReactNode;
  style?: React.CSSProperties;
  // 为层叠的 view 提升层级
  ifLiftUp?: boolean;
}

export default function ToolbarView(props: Props) {
  const { title, lhsToolbar, rhsToolbar, ifLiftUp, children } = props;
  const hasToolbar = title || lhsToolbar || rhsToolbar;

  return (
    <div
      className={cx({
        view: true,
        toolbarView: hasToolbar,
        liftUp: !!ifLiftUp,
      })}
    >
      {hasToolbar && (
        <div className={style.toolbar}>
          {title && <h3 className={style.title}>{title}</h3>}
          {lhsToolbar}
          {rhsToolbar && <div className={style.right}>{rhsToolbar}</div>}
        </div>
      )}
      <div style={props.style} className={style.content}>
        {children}
      </div>
    </div>
  );
}
