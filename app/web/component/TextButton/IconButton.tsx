import * as React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tooltip } from 'antd';
import styles from './style.less'

interface Props {
  icon: string
  text?: string
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export default class IconButton extends React.PureComponent<Props> {
  render() {
    const { props } = this
    const icon = (
      <LegacyIcon
        className={styles.minorIconBtn}
        type={props.icon}
        onClick={props.onClick}
        style={props.style}
      />
    )
    return props.text ? <Tooltip title={props.text}>{icon}</Tooltip> : icon
  }
}
