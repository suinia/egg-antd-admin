import * as React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Popconfirm, Divider } from 'antd';
import styles from './style.less'

interface Props {
  type?: 'default' | 'danger' | 'link'
  link?: string
  icon?: string
  iconStyle?: any
  text?: string
  /** type === danger 操作提示 */
  alert?: string
  disabled?: boolean
  operation?: () => void
  overlayStyle?: any
  getPopupContainer: any
}

interface GroupProps extends React.Props<{}> {}
function Group(props: React.Props<GroupProps>) {
  const children: React.ReactNode[] = []
  const notNullchildren = React.Children.toArray(props.children).filter(
    child => child !== undefined && child !== null
  )
  notNullchildren.forEach((child, idx) => {
    children.push(child)
    if (idx < notNullchildren.length - 1) {
      children.push(<Divider key={2 * idx} type="vertical" />)
    }
  })
  return <span>{children}</span>
}

export default class TextButton extends React.PureComponent<Props> {
  static Group = Group

  render() {
    const { props } = this
    switch (this.props.type) {
      case 'danger':
        return (
          <Popconfirm
            title={props.alert || '确认执行操作吗？'}
            onConfirm={props.operation}
            okText="确认"
            cancelText="取消"
            overlayStyle={this.props.overlayStyle}
            getPopupContainer={this.props.getPopupContainer}
          >
            <a className={styles.dangerIconBtn}>
              {props.icon && (
                <LegacyIcon style={{ marginRight: 5, ...props.iconStyle }} type={props.icon} />
              )}
              {props.text}
            </a>
          </Popconfirm>
        );
      case 'link':
        return (
          <a className={styles.iconBtn} href={props.link} target="blank">
            {props.icon && (
              <LegacyIcon style={{ marginRight: 5 }} type={props.icon} />
            )}
            {props.text}
          </a>
        );
      default:
        return (
          <a className={styles.iconBtn} onClick={props.operation}>
            {props.icon && (
              <LegacyIcon style={{ marginRight: 5 }} type={props.icon} />
            )}
            {props.text}
          </a>
        );
    }
  }
}

export { default as IconButton } from './IconButton'
