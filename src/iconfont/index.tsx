/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconDruidStarS from './IconDruidStarS';
import IconDruidStarNormal from './IconDruidStarNormal';
export { default as IconDruidStarS } from './IconDruidStarS';
export { default as IconDruidStarNormal } from './IconDruidStarNormal';

export type IconNames = 'druid_star_s' | 'druid_star_normal';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'druid_star_s':
      return <IconDruidStarS key="1" {...rest} />;
    case 'druid_star_normal':
      return <IconDruidStarNormal key="2" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
