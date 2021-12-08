import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {screenWidth} from '../../../config/contant';

enum NetworkStatus {
    // 未知类型
    Unknown,
    // 有网
    Working,
    // 没有网
    None,
}

interface ScreenBaseProps {
    children?: React.ReactNode;
    nothingPage?: {
        picture: any;
        title?: string;
    };
}

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

    }, [netInfo]);

    return (
        <View style={styles.container}>
            {networking === NetworkStatus.None ? (
                <View style={styles.noNetwork}>
                    <Image
                        style={styles.noNetworkImg}
                        resizeMode={'contain'}
                        source={require('../../../assets/images/status/no_network.png')}
                    />
                    <Text style={styles.noNetworkText}>
                        Abnormal network connection
                    </Text>
                </View>
            ) : props.nothingPage ? (
                <View style={styles.noNetwork}>
                    <Image
                        style={styles.noNetworkImg}
                        resizeMode={'contain'}
                        source={props.nothingPage.picture}
                    />
                    <Text style={styles.noNetworkText}>
                        {props.nothingPage.title || ''}
                    </Text>
                </View>
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
        transform: [
            {translateY: -40}
        ],
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
