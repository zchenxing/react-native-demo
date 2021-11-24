import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import AweButtonProps from './type';

const AweButton: React.FC<AweButtonProps> = (props: AweButtonProps) => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor="none">
            <View
                style={[
                    styles.button,
                    {backgroundColor: props.backgroundColor, ...props.style},
                ]}>
                <Text style={{color: props.color}}>{props.children}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AweButton;
