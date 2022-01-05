import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { Header } from 'react-native-elements';
import { screenWidth } from "../../config/contant";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from '../../assets/iconfont';

interface HomeNavigatorProps {
    onSearch: () => void;
    onPublish: () => void;
}


const searchWidth = screenWidth - 80

const HomeNavigator: React.FC<HomeNavigatorProps> = (props: HomeNavigatorProps) => {
    return (
        <>

            <Header
                backgroundColor={'#fff'}
                leftComponent={
                    <TouchableHighlight
                        style={{width: searchWidth}}
                        onPress={props.onSearch}
                        underlayColor="none">
                        <View style={styles.searchBase}>
                            <Icon
                                name={'search'}
                                style={{color: '#979797', fontSize: 16}}
                            />
                            <Text style={styles.searchInput}>Find content</Text>
                        </View>
                    </TouchableHighlight>
                }
                centerContainerStyle={{
                    display: 'none'
                }}
                rightComponent={
                    <TouchableHighlight
                        onPress={props.onPublish}
                        underlayColor="none">
                        <View style={styles.publishBase}>
                            <IconFont name={'fawen'} />
                        </View>
                    </TouchableHighlight>
                }
            />

            <StatusBar
                animated={true}
                // @ts-ignore
                androidtranslucent={true}
                barStyle="dark-content"
                translucent={true}
                backgroundColor={'rgba(1, 1, 1, 0)'}
            />
        </>
    );
};

const styles = StyleSheet.create({
    searchBase: {
        height: 35,
        width: searchWidth,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 5,
        backgroundColor: '#f8f8f8',
    },
    searchInput: {
        fontSize: 14,
        marginLeft: 10,
        color: '#999',
    },
    publishBase: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    publishPlus: {
        height: 24,
        width: 24,
    },
});

export default React.memo(HomeNavigator);
