/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconGengduo from './IconGengduo';
import IconRenwubiaoqian from './IconRenwubiaoqian';
import IconClose from './IconClose';
import IconMore from './IconMore';
import IconQiehuanshijiao from './IconQiehuanshijiao';
import IconA2Xtuwenxiangqing from './IconA2Xtuwenxiangqing';
import IconShouqi from './IconShouqi';
import IconShouqiCopy from './IconShouqiCopy';
import IconArrowRight from './IconArrowRight';
import IconSousuo from './IconSousuo';
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
export { default as IconGengduo } from './IconGengduo';
export { default as IconRenwubiaoqian } from './IconRenwubiaoqian';
export { default as IconClose } from './IconClose';
export { default as IconMore } from './IconMore';
export { default as IconQiehuanshijiao } from './IconQiehuanshijiao';
export { default as IconA2Xtuwenxiangqing } from './IconA2Xtuwenxiangqing';
export { default as IconShouqi } from './IconShouqi';
export { default as IconShouqiCopy } from './IconShouqiCopy';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconSousuo } from './IconSousuo';
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

export type IconNames = 'gengduo' | 'renwubiaoqian' | 'close' | 'more' | 'qiehuanshijiao' | 'a-2xtuwenxiangqing' | 'shouqi' | 'shouqi-copy' | 'arrow-right' | 'sousuo' | 'bianjitouxiang' | 'bianjiziliao' | 'weishoucang' | 'liangqi' | 'yu' | 'xiong' | 'pahang' | 'niao' | 'fenxiang' | 'fawen' | 'huati' | 'jiaoliu' | 'pinglun' | 'yishoucang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'gengduo':
      return <IconGengduo key="1" {...rest} />;
    case 'renwubiaoqian':
      return <IconRenwubiaoqian key="2" {...rest} />;
    case 'close':
      return <IconClose key="3" {...rest} />;
    case 'more':
      return <IconMore key="4" {...rest} />;
    case 'qiehuanshijiao':
      return <IconQiehuanshijiao key="5" {...rest} />;
    case 'a-2xtuwenxiangqing':
      return <IconA2Xtuwenxiangqing key="6" {...rest} />;
    case 'shouqi':
      return <IconShouqi key="7" {...rest} />;
    case 'shouqi-copy':
      return <IconShouqiCopy key="8" {...rest} />;
    case 'arrow-right':
      return <IconArrowRight key="9" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="10" {...rest} />;
    case 'bianjitouxiang':
      return <IconBianjitouxiang key="11" {...rest} />;
    case 'bianjiziliao':
      return <IconBianjiziliao key="12" {...rest} />;
    case 'weishoucang':
      return <IconWeishoucang key="13" {...rest} />;
    case 'liangqi':
      return <IconLiangqi key="14" {...rest} />;
    case 'yu':
      return <IconYu key="15" {...rest} />;
    case 'xiong':
      return <IconXiong key="16" {...rest} />;
    case 'pahang':
      return <IconPahang key="17" {...rest} />;
    case 'niao':
      return <IconNiao key="18" {...rest} />;
    case 'fenxiang':
      return <IconFenxiang key="19" {...rest} />;
    case 'fawen':
      return <IconFawen key="20" {...rest} />;
    case 'huati':
      return <IconHuati key="21" {...rest} />;
    case 'jiaoliu':
      return <IconJiaoliu key="22" {...rest} />;
    case 'pinglun':
      return <IconPinglun key="23" {...rest} />;
    case 'yishoucang':
      return <IconYishoucang key="24" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
