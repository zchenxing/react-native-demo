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

let IconMore: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M160 512a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0zM428.8 512a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0zM697.6 512a1.3 1.3 0 1 0 166.4 0 1.3 1.3 0 1 0-166.4 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMore.defaultProps = {
  size: 18,
};

IconMore = React.memo ? React.memo(IconMore) : IconMore;

export default IconMore;
