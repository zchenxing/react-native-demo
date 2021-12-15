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

let IconDruidStarS: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M996.352 388.19a94.208 94.208 0 0 0-75.497-63.489l-223.278-34.164-99.933-212.713A94.115 94.115 0 0 0 512 23.366a94.208 94.208 0 0 0-85.644 54.458l-99.933 212.713L103.145 324.7a94.208 94.208 0 0 0-75.497 63.488 94.208 94.208 0 0 0 22.016 96.116L214.063 652.8l-38.82 237.847a94.72 94.72 0 0 0 139.311 98.072L512 879.616l197.446 109.242a94.72 94.72 0 0 0 139.31-98.071L809.937 652.94l164.399-168.541c24.855-25.507 33.28-62.371 22.016-96.21z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDruidStarS.defaultProps = {
  size: 18,
};

IconDruidStarS = React.memo ? React.memo(IconDruidStarS) : IconDruidStarS;

export default IconDruidStarS;
