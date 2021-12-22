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

let IconArrowRight: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M317.847 957.297a24.5 24.5 0 0 0 17.376-7.197L728.16 557.163c25.55-25.55 25.55-67.122 0-92.672-0.124-0.124-0.25-0.247-0.376-0.368L320.482 73.902c-9.8-9.388-25.355-9.056-34.744 0.744s-9.057 25.356 0.744 34.745l407.071 390a16.272 16.272 0 0 1 4.653 11.437c0 4.375-1.705 8.49-4.8 11.583L300.47 915.347c-9.595 9.597-9.595 25.155 0 34.752a24.5 24.5 0 0 0 17.377 7.198z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconArrowRight.defaultProps = {
  size: 18,
};

IconArrowRight = React.memo ? React.memo(IconArrowRight) : IconArrowRight;

export default IconArrowRight;
