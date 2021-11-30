import React from 'react';
import {
    View,
    StatusBar,
    ActivityIndicator,
    TextInput,
    Dimensions, Text,
} from 'react-native';
import { Button, Header, SearchBar } from "react-native-elements";
import {SafeAreaProvider} from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;

const MyNavigation = ({navigation}) => {

    const [loading, setLoading] = React.useState(true);
    const [searchText, setSearchText] = React.useState('')

    React.useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const goBack = () => {
        navigation.goBack();
    };


    const Search = () => {
        return (
            <View
                style={{
                    height: 35,
                    width: width - 30,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                <TextInput
                    placeholder="搜索。。。"
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#e1e1e1',
                        borderRadius: 10,
                        height: 35,
                        fontSize: 16,
                        textAlignVertical: 'bottom',
                        marginRight: 50,
                        paddingVertical: 5,
                    }}
                />

            </View>
        );
    };

    return (
        <SafeAreaProvider style={{flex: 1}}>
            {loading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <>
                    <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#fff"
                    />
                    <Header
                        backgroundColor={'#FFF'}
                        centerComponent={Search}
                        rightComponent={() => (
                            <Button
                                title={'取消'}
                                type={'solid'}
                                style={{height: 35}}
                                titleStyle={{fontSize: 12}}
                                onPress={goBack}
                            />
                        )}
                    />
                    <Button
                        title={'返回'}
                        type={'solid'}
                        onPress={() => goBack()}
                    />
                    <SearchBar
                        lightTheme={true}
                        round={true}
                        showCancel={true}
                        cancelButtonTitle={'取消'}
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                        containerStyle={{
                            height: 50
                        }}
                        inputContainerStyle={{
                            height: 34
                        }}
                    />
                </>
            )}
        </SafeAreaProvider>
    );
};

export default MyNavigation;
