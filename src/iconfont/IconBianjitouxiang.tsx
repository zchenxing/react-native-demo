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

let IconBianjitouxiang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m230.0672 249.7792a78.6432 78.6432 0 0 0-111.2064 0L244.1984 623.4368a29.4912 29.4912 0 0 0-8.9856 21.1968v144.3328c0 16.2816 13.184 29.4912 29.4912 29.4912h497.7664a29.4912 29.4912 0 0 0 0-58.9824v0.0256H294.1952V657.152L672.1792 291.84a19.7888 19.7888 0 0 1 28.16-0.3584l41.2672 41.2672a19.6608 19.6608 0 0 1 0 27.8016l-318.3104 315.904a29.4912 29.4912 0 1 0 41.5744 41.8816l318.3872-316.0064a78.6688 78.6688 0 0 0 0.0768-111.2576z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBianjitouxiang.defaultProps = {
  size: 18,
};

IconBianjitouxiang = React.memo ? React.memo(IconBianjitouxiang) : IconBianjitouxiang;

export default IconBianjitouxiang;
