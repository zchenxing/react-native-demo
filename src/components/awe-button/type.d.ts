import {TouchableHighlightProps} from 'react-native';
import React from 'react';

export default interface AweButtonProps extends TouchableHighlightProps {
    children?: React.FC | string;
    onPress?: () => void;
    color?: string;
    backgroundColor?: string;
    style?: any;
}
