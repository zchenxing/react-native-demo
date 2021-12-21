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

let IconLiangqi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1536 1024" width={size} height={size} {...rest}>
      <Path
        d="M1148.158565 0.959999c-30.975961-6.143992-68.223915 17.247978-111.711861 70.143912-65.279918 79.359901-416.38348 174.335782-485.439393 174.335782-69.055914 0-197.439753 51.295936-264.03167 111.071861-66.623917 59.839925-119.039851 111.583861-163.839795 199.359751-44.767944 87.77589-72.12791 161.215798-112.22386 180.031775-40.12795 18.815976 33.727958 102.495872 166.591792 154.079808 132.895834 51.583936 308.575614 81.375898 434.463457 81.375898 125.887843 0 338.879576 70.239912 338.879576 48.447939 0-14.527982-28.767964-30.687962-86.303892-48.447939 93.631883-5.247993 140.479824-11.615985 140.479825-19.135976s-46.847941-15.96798-140.479825-25.375969c57.535928-6.239992 86.303892-15.135981 86.303892-26.655966 0-17.343978-53.599933 0-119.42385 0-65.823918 0-267.775665-0.16-289.023639-20.479975-21.247973-20.319975 253.119684-11.679985 330.815586-22.815971 77.631903-11.135986 104.22387-29.407963 104.22387-81.343898 0-34.623957-24.03197-57.919928-72.12791-69.759913 12.639984-32.19196 27.839965-53.343933 45.535943-63.359921 26.591967-15.071981 54.143932-14.527982 54.143933 24.415969s1.663998 91.967885 31.45596 108.703865c29.791963 16.703979 144.31982 83.679895 218.015728 104.159869 73.663908 20.479974 244.127695 34.655957 248.895689 23.263971 3.199996-7.583991-22.879971-17.919978-78.207902-30.943961 73.919908-5.055994 110.847861-13.311983 110.847861-24.767969 0-11.487986-38.271952-14.719982-114.815856-9.727988 27.519966-18.527977 54.911931-27.775965 82.175897-27.775965 40.863949 0-22.719972-34.239957-82.175897-14.367982s-112.607859 10.495987-147.007817 0c-34.431957-10.463987-111.423861-21.855973-126.015842-111.391861-14.591982-89.535888 2.815996-98.271877 71.87191-171.999785s296.735629-304.447619 278.175652-385.279518c-18.559977-80.863899-113.599858-31.90396-206.015742-78.847902C1230.558462 16.639979 1182.558522 0.959999 1148.190565 0.959999z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLiangqi.defaultProps = {
  size: 18,
};

IconLiangqi = React.memo ? React.memo(IconLiangqi) : IconLiangqi;

export default IconLiangqi;
