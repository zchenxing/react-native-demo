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

let IconShouqiCopy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1575 1024" width={size} height={size} {...rest}>
      <Path
        d="M793.02235858 1016.516923a64.590769 64.590769 0 0 0 26.151385-5.513846L1511.31897458 705.772308A64.905846 64.905846 0 0 0 1458.93743558 586.830769l-665.915077 293.809231-665.993846-293.80923099a64.905846 64.905846 0 0 0-52.381538 118.70523099L766.79220458 1011.00307699a65.063385 65.063385 0 0 0 26.230154 5.51384601z m1e-8-508.849231a64.748308 64.748308 0 0 0 26.15138499-5.513846L1511.31897458 196.686769a64.905846 64.905846 0 0 0-52.38153899-118.784l-665.91507701 293.809231-665.993846-293.809231a64.905846 64.905846 0 0 0-52.381538 118.705231l692.14523001 305.388308a64.433231 64.433231 0 0 0 26.23015399 5.513846z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShouqiCopy.defaultProps = {
  size: 18,
};

IconShouqiCopy = React.memo ? React.memo(IconShouqiCopy) : IconShouqiCopy;

export default IconShouqiCopy;
