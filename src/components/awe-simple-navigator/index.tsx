import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import {AweSimpleNavigatorProps} from './type';
import {themeColor, themeLightColor} from '../../assets/styles';

const AweSimpleNavigator: React.FC<AweSimpleNavigatorProps> = (
    props: AweSimpleNavigatorProps,
) => {
    return (
        <Header
            backgroundColor="#fff"
            leftComponent={
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={props.goBack}>
                    <View style={{width: 100, paddingLeft: 10}}>
                        <Icon
                            name={'angle-left'}
                            style={{fontSize: 30, color: '#aaa'}}
                        />
                    </View>
                </TouchableHighlight>
            }
            centerContainerStyle={{
                justifyContent: 'center',
            }}
            centerComponent={
                <Text style={styles.title}>{props.centerTitle}</Text>
            }
            rightContainerStyle={{
                justifyContent: 'center',
            }}
            rightComponent={
                props.rightActionTitle ? (
                    <TouchableHighlight
                        disabled={!props.rightActionEditable}
                        underlayColor={'none'}
                        onPress={props.rightActionEvent}>
                        <View>
                            <Text
                                style={[
                                    styles.post,
                                    {
                                        color: props.rightActionEditable
                                            ? themeColor
                                            : themeLightColor,
                                    },
                                ]}>
                                {props.rightActionTitle}
                            </Text>
                        </View>
                    </TouchableHighlight>
                ) : (
                    <React.Fragment />
                )
            }
        />
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: '#333',
    },
    post: {
        padding: 5,
        color: themeColor,
    },
});

export default AweSimpleNavigator;
