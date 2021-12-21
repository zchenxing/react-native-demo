/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconBianjitouxiang from './IconBianjitouxiang';
import IconBianjiziliao from './IconBianjiziliao';
import IconWeishoucang from './IconWeishoucang';
import IconLiangqi from './IconLiangqi';
import IconYu from './IconYu';
import IconXiong from './IconXiong';
import IconPahang from './IconPahang';
import IconNiao from './IconNiao';
import IconFenxiang from './IconFenxiang';
import IconFawen from './IconFawen';
import IconHuati from './IconHuati';
import IconJiaoliu from './IconJiaoliu';
import IconPinglun from './IconPinglun';
import IconYishoucang from './IconYishoucang';
export { default as IconBianjitouxiang } from './IconBianjitouxiang';
export { default as IconBianjiziliao } from './IconBianjiziliao';
export { default as IconWeishoucang } from './IconWeishoucang';
export { default as IconLiangqi } from './IconLiangqi';
export { default as IconYu } from './IconYu';
export { default as IconXiong } from './IconXiong';
export { default as IconPahang } from './IconPahang';
export { default as IconNiao } from './IconNiao';
export { default as IconFenxiang } from './IconFenxiang';
export { default as IconFawen } from './IconFawen';
export { default as IconHuati } from './IconHuati';
export { default as IconJiaoliu } from './IconJiaoliu';
export { default as IconPinglun } from './IconPinglun';
export { default as IconYishoucang } from './IconYishoucang';

export type IconNames = 'bianjitouxiang' | 'bianjiziliao' | 'weishoucang' | 'liangqi' | 'yu' | 'xiong' | 'pahang' | 'niao' | 'fenxiang' | 'fawen' | 'huati' | 'jiaoliu' | 'pinglun' | 'yishoucang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'bianjitouxiang':
      return <IconBianjitouxiang key="1" {...rest} />;
    case 'bianjiziliao':
      return <IconBianjiziliao key="2" {...rest} />;
    case 'weishoucang':
      return <IconWeishoucang key="3" {...rest} />;
    case 'liangqi':
      return <IconLiangqi key="4" {...rest} />;
    case 'yu':
      return <IconYu key="5" {...rest} />;
    case 'xiong':
      return <IconXiong key="6" {...rest} />;
    case 'pahang':
      return <IconPahang key="7" {...rest} />;
    case 'niao':
      return <IconNiao key="8" {...rest} />;
    case 'fenxiang':
      return <IconFenxiang key="9" {...rest} />;
    case 'fawen':
      return <IconFawen key="10" {...rest} />;
    case 'huati':
      return <IconHuati key="11" {...rest} />;
    case 'jiaoliu':
      return <IconJiaoliu key="12" {...rest} />;
    case 'pinglun':
      return <IconPinglun key="13" {...rest} />;
    case 'yishoucang':
      return <IconYishoucang key="14" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
