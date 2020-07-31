
import React from 'react';
import { Tooltip } from 'antd';

interface Props {
  text: string;
  length?: number;
  tail?: string;
  placement?: any;
}
const getSubStr = (str: string, len: number, tail: string) => {
  const subLen = Math.floor((len - tail.length) / 2);
  const startStr = str.substr(0, subLen);
  const endStr = str.substr(str.length - subLen, subLen);
  return `${startStr}...${endStr}`;
}
const EllipsisText = (props: Props) => {
  const length = props?.length || 10;
  const tail = props.tail || '...';
  if (!props.text) {
     return null;
  }
  if (props.text.length <= length) {
    return <Tooltip placement={props.placement} title={props.text}><span>{props.text}</span></Tooltip>;
  }
  return (<Tooltip placement={props.placement} title={props.text}><span>{ getSubStr(props.text, length, tail) }</span></Tooltip>);
}
export default EllipsisText;