import React from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight, Text } from "react-native";
import {AweNavigatorProps} from './data';
import {isIOS} from '../../config/page-name';

const AweNavigator: React.FC<AweNavigatorProps> = (
    props: AweNavigatorProps,
) => {

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder={'搜点你感兴趣的内容吧....'}
                />
            </View>
            <TouchableHighlight
                onPress={() => props.actionRight && props.actionRight()}
                underlayColor={'none'}
            >
                <View style={styles.action}>
                    <Text>{'取消'}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: isIOS ? '#f0f0f0' : '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    search: {
        flex: 1,
        backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 20,
        height: 36,
        paddingLeft: 15,
    },
    input: {
        height: 36
    },
    action: {
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AweNavigator;
