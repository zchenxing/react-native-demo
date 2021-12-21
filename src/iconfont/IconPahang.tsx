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

let IconPahang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1807 1024" width={size} height={size} {...rest}>
      <Path
        d="M882.326588 966.324706c1.686588-1.505882 0.722824-4.336941-1.505882-4.547765-22.226824-2.258824-44.393412-5.511529-66.650353-6.023529-106.315294-2.409412-212.781176-1.716706-318.976-6.415059a1003.52 1003.52 0 0 1-281.871059-53.368471c-3.041882-1.054118-6.113882-2.048-9.125647-3.162353-17.769412-6.625882-36.201412-13.522824-36.111059-36.98447 0.120471-23.190588 13.703529-40.116706 34.394353-45.266824 36.442353-9.125647 73.728-16.655059 111.104-19.847529 34.334118-2.921412 69.210353 1.084235 103.875765 1.355294 43.008 0.331294 85.232941-4.517647 125.379765-21.775059 45.477647-19.546353 92.581647-19.064471 140.649411-6.505412 29.424941 7.68 59.151059 14.034824 89.268706 17.829647 26.503529 3.312941 45.025882 13.010824 51.712 39.454118 6.144 24.154353 22.829176 40.026353 46.049883 45.839059 25.6 6.445176 51.952941 11.233882 78.245647 13.432471 44.182588 3.674353 80.564706 17.016471 94.569411 65.566117 18.130824 0 26.081882-11.474824 28.400942-25.359059 4.758588-28.190118-16.685176-39.544471-39.333647-52.615529 32.496941-8.794353 61.289412-11.896471 85.865411 11.324235 18.371765 17.347765 17.167059 38.430118 4.668236 61.470118 23.220706 2.349176 36.201412-9.667765 43.098353-26.684235 17.980235-44.272941-13.071059-69.330824-40.056471-95.533177 18.672941-7.439059 19.516235-7.168 44.935529 13.673412 21.473882-27.768471 10.541176-61.259294-22.889411-68.547765-11.444706-2.499765-23.642353-3.072-31.081412-11.113412a28.581647 28.581647 0 0 0-26.654118-8.643764c-30.960941 6.324706-60.687059 12.408471-90.383059 18.371764-1.385412 0.301176-3.011765-0.783059-6.896941-1.897411v-63.909647c77.914353 17.829647 152.395294 6.866824 222.900706-36.141177 11.143529 36.653176 38.550588 54.151529 67.734588 71.318588 28.400941 16.715294 54.422588 37.496471 82.070589 55.657412 20.088471 13.221647 39.905882 28.611765 62.102588 36.321882 16.986353 5.903059 40.026353 7.017412 55.92847 0 28.310588-12.559059 47.284706 7.107765 75.294118 7.107765 20.118588 0 31.472941 29.696 31.472941 29.696 15.962353 0 1.054118-39.454118 1.054118-39.454117a6.987294 6.987294 0 0 1 5.812706-6.866824c29.876706-4.156235 46.712471 40.869647 53.217882 36.743529 17.829647-11.354353-1.475765-45.899294 1.264941-49.27247 6.836706-8.463059 33.129412 0.752941 38.189177 6.987294 3.855059 4.758588 5.421176 10.962824 6.535529 17.016471 0.090353 0.391529 10.059294-7.920941 10.842353-8.975059a21.263059 21.263059 0 0 0 4.818824-11.565177c0.662588-9.637647-6.475294-17.317647-13.944471-22.196706-15.36-9.999059-33.490824-15.510588-50.356706-23.130353-10.24-4.608-22.407529-7.258353-30.087529-14.667294-21.443765-20.600471-46.320941-24.425412-73.908706-21.082353-18.371765 2.228706-36.833882 5.12-55.235765 4.939294-6.384941-0.060235-15.450353-7.077647-18.522353-13.312-13.221647-26.895059-22.287059-56.109176-37.436235-81.709176-14.757647-24.877176-35.056941-46.381176-54.723765-71.740235 36.141176-17.016471 52.073412-49.874824 58.578824-89.6 1.234824-7.469176 9.697882-14.155294 15.751529-20.239059 3.222588-3.282824 8.252235-5.150118 12.8-6.625882 26.112-8.432941 30.268235-30.930824 61.530353-37.104942 31.563294-6.234353 22.226824-53.910588 28.400941-78.396235 9.697882-38.550588 34.816-59.873882 81.498353-65.475765 32.135529-3.855059 63.186824-14.155294 90.232471-32.105411 25.509647-16.865882 76.950588-15.872 71.017412-63.608471-0.180706-1.415529-2.108235-2.981647-1.445648-4.427294 15.751529-34.725647 16.865882-41.351529-16.022588-60.777412C1682.311529 45.808941 1578.074353 11.354353 1462.844235 18.100706c-18.371765 1.084235-30.870588 1.505882-49.27247 0.692706-4.005647-0.180706-14.456471-8.944941-18.070589-11.324236C1384.026353 0 1378.695529 0 1365.955765 0l22.558117 32.496941c-1.234824 1.445647-26.051765-23.130353-44.66447-18.823529-2.168471 0.361412 19.004235 32.707765 19.004235 32.707764-15.390118-3.373176-41.472-16.956235-47.887059-10.480941l18.462118 31.864471c-10.842353-1.656471-19.877647-4.065882-28.912941-4.156235-9.065412-0.090353-18.191059 2.108235-31.292236 3.824941l20.178824 21.895529c-12.107294-1.385412-21.112471-4.999529-29.334588-4.879059-8.372706 0.150588-16.745412 0.301176-29.394824 5.872942l30.991059 24.274823c-0.542118 2.078118-37.315765-8.643765-45.296941-0.572235-0.993882 1.024 8.824471 18.944 14.275765 30.689882-16.414118-1.867294-35.960471-13.191529-47.043765-1.987765-0.813176 0.843294 12.197647 17.167059 17.950117 29.424942 0 0-42.496-10.571294-48.579764 0.060235l12.559059 22.13647s-31.171765-10.480941-31.171765-2.590117c0 5.029647 5.903059 54.452706-14.546824 66.048-25.208471 14.305882-79.932235 16.474353-107.791058 24.395294-191.849412 54.543059-300.875294 146.672941-457.788236 218.834823-27.316706 12.528941-52.736 31.744-75.113412 52.254118-42.857412 39.303529-91.557647 65.656471-146.672941 81.859765-82.763294 24.335059-165.345882 49.212235-247.747764 74.691765-38.249412 11.776-66.861176 35.719529-80.504471 74.902588-16.143059 46.381176-8.944941 88.425412 25.389176 124.355764 42.255059 44.272941 95.352471 70.866824 153.178353 83.877648 61.078588 13.763765 123.542588 24.726588 185.916236 28.370823 167.514353 9.758118 333.191529-7.68 496.519529-46.802823 3.523765-0.843294 9.456941-4.879059 13.101177-8.222118"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPahang.defaultProps = {
  size: 18,
};

IconPahang = React.memo ? React.memo(IconPahang) : IconPahang;

export default IconPahang;
