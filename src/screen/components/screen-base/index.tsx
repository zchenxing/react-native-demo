import React from 'react';
import { Image, Text, StyleSheet, View, TouchableHighlight, ScrollView, ActivityIndicator } from "react-native";
import {useNetInfo} from '@react-native-community/netinfo';
import {screenWidth} from '../../../config/contant';
import {NetworkStatus} from '../../../enum';
import {useLanguage} from '../../../language';
import {localImages} from '../../../assets/images';
import {ScreenBaseProps} from './type';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
} from 'rn-placeholder';

const ScreenBase: React.FC<ScreenBaseProps> = (props: ScreenBaseProps) => {
    const netInfo = useNetInfo();
    const [networking, setNetworking] = React.useState<NetworkStatus>(
        NetworkStatus.Unknown,
    );

    React.useEffect(() => {
        // 没有网络
        if (netInfo.type === 'none') {
            setNetworking(NetworkStatus.None);
        } else {
            setNetworking(NetworkStatus.Working);
        }
    }, []);

    return (
        <View style={styles.container}>
            {networking === NetworkStatus.None ? (
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => props.onReload && props.onReload}>
                    <View style={styles.noNetwork}>
                        <Image
                            style={styles.noNetworkImg}
                            resizeMode={'contain'}
                            source={localImages.network}
                        />
                        <Text style={styles.noNetworkText}>
                            {useLanguage.check_connection}
                        </Text>
                    </View>
                </TouchableHighlight>
            ) : props.showPlaceholder ? (

                props.placeholderComponent ||
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            ) : props.nothingPage ? (
                <TouchableHighlight
                    style={styles.noNetwork}
                    underlayColor={'none'}
                    onPress={() => props.onReload && props.onReload}>
                    <>
                        <Image
                            style={styles.noNetworkImg}
                            resizeMode={'contain'}
                            source={props.nothingPage.picture}
                        />
                        <Text style={styles.noNetworkText}>
                            {props.nothingPage.title || ''}
                        </Text>
                    </>
                </TouchableHighlight>
            ) : (
                props.children
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopColor: '#eee',
        borderTopWidth: 2,
    },
    noNetwork: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
    },
    noNetworkImg: {
        height: screenWidth / 2.8,
        transform: [{translateY: -40}],
    },
    noNetworkText: {
        color: '#999',
        fontSize: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScreenBase;
