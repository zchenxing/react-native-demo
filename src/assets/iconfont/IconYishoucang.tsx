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

let IconYishoucang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1052 1024" width={size} height={size} {...rest}>
      <Path
        d="M573.098507 30.407103l149.475515 255.288818 284.700365 65.877315c45.226654 10.439108 59.477317 55.26754 29.013325 90.737752l-192.312835 223.63016 26.595548 296.135029c4.209777 46.990209-33.279991 74.69509-75.918201 56.063985L526.222076 900.977528l-268.31637 117.0773c-42.63821 18.602661-80.099533-9.10222-75.918201-56.092429l26.453326-296.021251-192.284391-223.63016c-30.52088-35.470212-15.985773-80.355533 28.984881-90.737752l284.671921-65.877315L479.288756 30.435547c23.72266-40.561767 70.115536-40.533322 93.809751 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYishoucang.defaultProps = {
  size: 18,
};

IconYishoucang = React.memo ? React.memo(IconYishoucang) : IconYishoucang;

export default IconYishoucang;
