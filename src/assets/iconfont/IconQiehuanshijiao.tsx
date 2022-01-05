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

let IconQiehuanshijiao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M676.977778 119.466667L910.222222 352.711111l-68.266666 68.266667-164.977778-164.977778V1024H568.888889V0l108.088889 119.466667zM347.022222 910.222222L113.777778 676.977778l68.266666-68.266667 164.977778 164.977778V0H455.111111v1024l-108.088889-113.777778z"
        fill={getIconColor(color, 0, '#69F2FF')}
      />
    </Svg>
  );
};

IconQiehuanshijiao.defaultProps = {
  size: 18,
};

IconQiehuanshijiao = React.memo ? React.memo(IconQiehuanshijiao) : IconQiehuanshijiao;

export default IconQiehuanshijiao;
