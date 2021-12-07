import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';
import {Header} from 'react-native-elements';
import {AweSearchNavigatorProps} from './type';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from "../../config/contant";


const AweSearchNavigator: React.FC<AweSearchNavigatorProps> = (
    props: AweSearchNavigatorProps,
) => {
    const [searchValue, setSearchValue] = React.useState<string>('');

    const cleanSearch = () => {
        console.log('清空');
        setSearchValue('');
    };

    const onChangeText = (text: string) => {
        setSearchValue(text);
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
            <Header
                backgroundColor={'#fff'}
                leftComponent={
                    <TouchableHighlight underlayColor={'none'} onPress={props.onRightPress}>
                        <View style={{width: 100, paddingLeft: 10}}>
                            <Icon name={'angle-left'} style={{fontSize: 30, color: '#aaa'}} />
                        </View>
                    </TouchableHighlight>
                }
                centerComponent={
                    <View style={styles.searchBase}>
                        <TextInput
                            style={styles.searchInput}
                            value={searchValue}
                            onChangeText={onChangeText}
                            placeholder={'Find content'}
                        />
                        {searchValue ? (
                            <TouchableHighlight
                                underlayColor="none"
                                onPress={cleanSearch}>
                                <View style={styles.cleanBase}>
                                    <Text style={{color: '#fff'}}>×</Text>
                                </View>
                            </TouchableHighlight>
                        ) : (
                            <React.Fragment />
                        )}
                    </View>
                }
                rightContainerStyle={{
                    display: 'none'
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    searchBase: {
        height: 35,
        width: screenWidth - 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 20,
        // marginLeft: 30,
        marginRight: 50,
        paddingLeft: 5,
        paddingRight: 10,
        backgroundColor: '#f8f8f8',
    },
    searchInput: {
        flex: 1,
        height: 35,
        fontSize: 14,
        textAlignVertical: 'center',
        paddingVertical: 5,
        marginLeft: 10,
    },
    cleanBase: {
        marginLeft: 10,
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#d8d8d8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    publishBase: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    publishPlus: {
        height: 24,
        width: 24,
    },
});

export default AweSearchNavigator;
