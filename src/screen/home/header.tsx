import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from "../../config/contant";


interface HomeHeaderProps {
    onSearch: () => void;
    onPublish: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = (props: HomeHeaderProps) => {
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
            <Header
                backgroundColor={'#fff'}
                centerComponent={
                    <TouchableHighlight
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
                rightComponent={
                    <TouchableHighlight
                        onPress={props.onPublish}
                        underlayColor="none">
                        <View style={styles.publishBase}>
                            <Image
                                style={styles.publishPlus}
                                source={require('../../assets/images/icons/add.png')}
                            />
                        </View>
                    </TouchableHighlight>
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    searchBase: {
        height: 35,
        width: screenWidth - 70,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 40,
        backgroundColor: '#f8f8f8',
    },
    searchInput: {
        fontSize: 14,
        marginLeft: 10,
        color: '#999',
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

export default React.memo(HomeHeader);
