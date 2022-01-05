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

let IconFawen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M546.909091 0v477.090909H1024v69.818182H546.885818L546.909091 1024h-69.818182l-0.023273-477.090909H0v-69.818182h477.090909V0h69.818182z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFawen.defaultProps = {
  size: 18,
};

IconFawen = React.memo ? React.memo(IconFawen) : IconFawen;

export default IconFawen;
