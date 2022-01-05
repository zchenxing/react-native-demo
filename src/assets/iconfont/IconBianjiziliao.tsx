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

let IconBianjiziliao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M897.0752 0A126.9248 126.9248 0 0 1 1024 126.9248v770.1504A126.9248 126.9248 0 0 1 897.0752 1024H126.9248A126.9248 126.9248 0 0 1 0 897.0752V126.9248A126.9248 126.9248 0 0 1 126.9248 0z m0 51.2H126.9248A75.7248 75.7248 0 0 0 51.2 126.9248v770.1504A75.7248 75.7248 0 0 0 126.9248 972.8h770.1504A75.7248 75.7248 0 0 0 972.8 897.0752V126.9248A75.7248 75.7248 0 0 0 897.0752 51.2zM819.2 806.4a25.6 25.6 0 0 1 2.9952 51.0208L819.2 857.6H204.8a25.6 25.6 0 0 1-2.9952-51.0208L204.8 806.4h614.4zM668.1088 153.7536a25.6 25.6 0 0 1 36.1984-0.64l107.8784 104.192a25.6 25.6 0 0 1 0.64 36.1984L390.2464 731.1104a25.6 25.6 0 0 1-18.432 7.808l-104.832-0.0768a25.6 25.6 0 0 1-25.5744-24.832l-3.1232-104.0384a25.6 25.6 0 0 1 7.168-18.56z m19.0464 53.9392L289.792 619.2128l2.0736 68.4288 69.1456 0.0512 397.2352-411.3664-71.0656-68.608z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBianjiziliao.defaultProps = {
  size: 18,
};

IconBianjiziliao = React.memo ? React.memo(IconBianjiziliao) : IconBianjiziliao;

export default IconBianjiziliao;
