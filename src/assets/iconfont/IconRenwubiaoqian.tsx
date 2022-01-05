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

let IconRenwubiaoqian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 0a85.333333 85.333333 0 0 1 85.333334 85.333333v853.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V85.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h682.666666zM341.333333 597.333333H256a42.666667 42.666667 0 0 0-42.368 37.674667L213.333333 640v85.333333a42.666667 42.666667 0 0 0 37.674667 42.368L256 768h85.333333a42.666667 42.666667 0 0 0 42.368-37.674667L384 725.333333v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667z m426.666667 42.666667h-256a42.666667 42.666667 0 1 0 0 85.333333h256a42.666667 42.666667 0 1 0 0-85.333333zM341.333333 256H256a42.666667 42.666667 0 0 0-42.368 37.674667L213.333333 298.666667v85.333333a42.666667 42.666667 0 0 0 37.674667 42.368L256 426.666667h85.333333a42.666667 42.666667 0 0 0 42.368-37.674667L384 384V298.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z m426.666667 42.666667h-256a42.666667 42.666667 0 1 0 0 85.333333h256a42.666667 42.666667 0 1 0 0-85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRenwubiaoqian.defaultProps = {
  size: 18,
};

IconRenwubiaoqian = React.memo ? React.memo(IconRenwubiaoqian) : IconRenwubiaoqian;

export default IconRenwubiaoqian;
