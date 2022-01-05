/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconFenxiang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M744.712378 0a186.178095 186.178095 0 1 1-145.218913 302.725582l-160.671696 101.001616C455.81052 436.122187 465.445237 472.89236 465.445237 511.98976c0 32.906978-6.842045 64.231443-19.176344 92.623602l237.37707 128.742153a186.178095 186.178095 0 1 1-28.531793 68.420449L406.333692 666.889935a232.722618 232.722618 0 0 1-406.194058-144.800013L0 511.98976v-2.047959l0.046545-2.792671A232.722618 232.722618 0 0 1 394.27866 344.429475l171.237302-107.610939A186.317728 186.317728 0 0 1 744.712378 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFenxiang.defaultProps = {
  size: 18,
};

IconFenxiang = React.memo ? React.memo(IconFenxiang) : IconFenxiang;

export default IconFenxiang;
