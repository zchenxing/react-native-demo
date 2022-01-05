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

let IconShouqi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1575 1024" width={size} height={size} {...rest}>
      <Path
        d="M785.644308 7.483077a64.590769 64.590769 0 0 0-26.151385 5.513846L67.347692 318.227692A64.905846 64.905846 0 0 0 119.729231 437.169231l665.915077-293.809231 665.993846 293.809231a64.905846 64.905846 0 0 0 52.381538-118.705231L811.874462 12.996923a65.063385 65.063385 0 0 0-26.230154-5.513846z m0 508.849231a64.748308 64.748308 0 0 0-26.151385 5.513846L67.347692 827.313231a64.905846 64.905846 0 0 0 52.381539 118.784l665.915077-293.809231 665.993846 293.809231a64.905846 64.905846 0 0 0 52.381538-118.705231l-692.14523-305.388308a64.433231 64.433231 0 0 0-26.230154-5.513846z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShouqi.defaultProps = {
  size: 18,
};

IconShouqi = React.memo ? React.memo(IconShouqi) : IconShouqi;

export default IconShouqi;
