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

let IconSousuo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M140.689823 149.766884c184.298219-184.298219 483.124056-184.298219 667.422275 0 174.977119 175.016448 183.826265 453.154947 26.626098 638.593723l1.179886 1.061898 166.875234 166.835904a39.329539 39.329539 0 0 1-52.190298 58.679672l-3.42167-3.028375-166.875234-166.875233-1.101227-1.179886c-185.438776 157.200167-463.577275 148.311691-638.515064-26.626098-184.337549-184.298219-184.337549-483.124056 0-667.422275z m55.611968 55.651298c-153.581849 153.581849-153.581849 402.57716 0 556.198339 153.581849 153.581849 402.61649 153.581849 556.198339 0 153.581849-153.621179 153.581849-402.61649 0-556.198339-153.581849-153.621179-402.61649-153.621179-556.198339 0z"
        fill={getIconColor(color, 0, '#979797')}
      />
    </Svg>
  );
};

IconSousuo.defaultProps = {
  size: 18,
};

IconSousuo = React.memo ? React.memo(IconSousuo) : IconSousuo;

export default IconSousuo;
