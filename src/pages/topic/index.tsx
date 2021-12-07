import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView, TouchableHighlight, Text, TextInput
} from 'react-native';
import WeiboItem from '../square/category/weibo-item';
import AweKeyboard from '../../components/awe-keyboard';
import { NavigateProps } from "../../interface";

const Topic: React.FC<NavigateProps> = (props: NavigateProps) => {

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerMode: 'screen',
            headerLeft: () => (
                <TouchableHighlight onPress={() => props.navigation.goBack()}>
                    <View>
                        <Text>返回</Text>
                    </View>
                </TouchableHighlight>
            ),
        });
    }, [props.navigation]);



    return (
        <SafeAreaView style={{flex: 1,  position: 'relative'}}>
            <View
                style={{flex: 1}}>

                <ScrollView style={styles.container}>
                    <WeiboItem />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputView: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'relative',
    },
    textInput: {
        flex: 1,
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#CCC',
        fontSize: 16,
        textAlignVertical: 'top',
    },
    textInputButton: {
        width: 'auto',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'green'
    },
});

export default Topic;
