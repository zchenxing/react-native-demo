import React from 'react';
import {NavigateProps} from '../../../interface';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSmartDataStore } from "../../../store/provider";
import { themeColor } from "../../../assets/styles";

const PublishTagScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {setPublishTagId} = useSmartDataStore()

    const onSelectTag = () => {
        setPublishTagId(`${Math.random()}`)
        props.navigation.goBack()
    }

    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Choose label'}
                goBack={props.navigation.goBack}
            />

            <ScrollView style={styles.container}>
                {Array.from(new Array(7).keys()).map(i => (
                    <TouchableHighlight
                        key={i}
                        style={styles.listItem}
                        onPress={onSelectTag}
                        underlayColor={'#efefef'}>
                        <>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon
                                    name={'bookmark'}
                                    style={{marginRight: 10, color: themeColor}}
                                />
                                <Text style={{fontSize: 15}}>qwd</Text>
                            </View>

                            <Icon name={'angle-right'} style={{fontSize: 16}} />
                        </>
                    </TouchableHighlight>
                ))}
            </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    listItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingLeft: 20,
        paddingRight: 20
    }
});

export default PublishTagScreen;
