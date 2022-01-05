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

let IconYu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1920 1024" width={size} height={size} {...rest}>
      <Path
        d="M387.296 577.92C178.592 410.784 52.32 334.432 8.512 348.8c-65.76 21.504 271.52 307.04 271.52 362.976 0 37.28-22.976 141.344-68.96 312.224 90.656-19.136 155.36-123.2 194.08-312.224h140.672v124.352l104.544-124.352h135.552c28.704 0 53.44 124.352 79.712 124.352 17.536 0 31.584-29.024 42.208-87.04 238.752 23.68 388.8 35.52 450.208 35.52 92.032 0 8.16 183.36 50.112 183.36 27.936 0 63.776-61.12 107.52-183.36 197.504-7.392 328.416-45.056 392.704-113.024 64.32-67.968-138.368-175.552-608-322.784C1163.392 116.256 1082.368 0 1057.312 0c-37.6 0 53.28 280.96 0 314.88-53.312 33.92-353.568 113.376-406.944 113.376 0-11.648-29.216-38.144-87.68-79.456v145.504l-175.36 83.584z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYu.defaultProps = {
  size: 18,
};

IconYu = React.memo ? React.memo(IconYu) : IconYu;

export default IconYu;
