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

let IconPinglun: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.311111 0 512 229.688889 512 512 0 279.182222-224.597333 506.88-502.613333 511.914667L512 1024H38.542222a38.599111 38.599111 0 0 1-38.371555-34.844444L0 985.457778V512C0 229.688889 229.688889 0 512 0z m0 56.888889C264.078222 56.888889 61.724444 256.284444 56.974222 503.068444L56.888889 512v455.111111h455.111111c247.921778 0 450.247111-199.395556 455.025778-446.151111L967.111111 512c0-250.88-204.231111-455.111111-455.111111-455.111111z m-142.222222 398.222222a56.888889 56.888889 0 1 1 0 113.777778 56.888889 56.888889 0 0 1 0-113.777778z m284.444444 0a56.888889 56.888889 0 1 1 0 113.777778 56.888889 56.888889 0 0 1 0-113.777778z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPinglun.defaultProps = {
  size: 18,
};

IconPinglun = React.memo ? React.memo(IconPinglun) : IconPinglun;

export default IconPinglun;
