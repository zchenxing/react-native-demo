import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import IconFont from '../../../iconfont';
import FastImage from 'react-native-fast-image';
import {birdCard} from '../../../mock';
import {useLanguage} from '../../../language';
import LinearGradient from 'react-native-linear-gradient';
import {themeColor} from '../../../assets/styles';
import {screenWidth} from '../../../config/contant';
import {AnimalCardProps} from './type';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSetState} from 'ahooks';
import {WebView} from 'react-native-webview';

interface IState {
    showMoreInfo: boolean;
    pictureVisible: boolean;
    pictureIndex: number;
    mapLoading: boolean;
}

const AnimalCard: React.FC<AnimalCardProps> = (props: AnimalCardProps) => {
    const [state, setState] = useSetState<IState>({
        showMoreInfo: false,
        pictureVisible: false,
        pictureIndex: 0,
        mapLoading: true,
    });

    React.useEffect(() => {
        setTimeout(() => {
            setState({
                mapLoading: false,
            });
        }, 800);
    }, []);

    const onPressMore = () => {
        setState({
            showMoreInfo: !state.showMoreInfo,
        });
        // props.onPressMore(positionY.current, !state.showMoreInfo)
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View>
                    <Image
                        source={require('../../../assets/images/card_header.png')}
                        style={styles.cardHeader}
                    />

                    <Text style={styles.speciesName}>animal name</Text>
                    <Text style={styles.nicknameName}>nickname</Text>

                    <View style={styles.labelBase}>
                        <IconFont name={'niao'} color={'#fff'} size={26} />
                        <Text style={styles.labelText}>Birds</Text>
                    </View>
                </View>

                <FastImage style={styles.animalPic} source={{uri: birdCard}} />

                <View style={styles.infoBase}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.age}
                        </Text>
                        <Text style={styles.infoItemValue}>12 d902</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.gender}
                        </Text>
                        <Text style={styles.infoItemValue}>12 d902</Text>
                    </View>

                    <View style={[styles.infoItem, {borderRightWidth: 0}]}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.weight}
                        </Text>
                        <Text style={styles.infoItemValue}>12 d902</Text>
                    </View>
                </View>

                {props.showLocation && (
                    <LinearGradient
                        colors={['#96dce3', '#6fd1df']}
                        start={{x: 0.2, y: 0.2}}
                        end={{x: 0.5, y: 1}}
                        style={styles.location}>
                        <Text style={styles.locationText}>
                            {useLanguage.latest_location}
                        </Text>
                    </LinearGradient>
                )}
            </View>

            {props.showMoreInfo && (
                <>
                    {state.showMoreInfo && (
                        <View style={{backgroundColor: '#FFF', height: 300}}>
                            <View style={styles.pictures}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.scrollView}>
                                    {[1, 2, 3, 4, 5, 6, 7].map(picture => (
                                        <FastImage
                                            key={picture}
                                            source={{uri: birdCard}}
                                            style={[styles.pictureItem, {}]}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}

                    <TouchableHighlight
                        onPress={onPressMore}
                        underlayColor={'none'}>
                        <View style={styles.moreButton}>
                            <View style={styles.divider} />

                            <View style={styles.moreButtonText}>
                                <Text style={{color: '#999'}}>
                                    {state.showMoreInfo
                                        ? useLanguage.show_less
                                        : useLanguage.show_more}
                                </Text>
                                <Icon
                                    name={
                                        state.showMoreInfo
                                            ? 'angle-double-up'
                                            : 'angle-double-down'
                                    }
                                    style={styles.showMoreAngle}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>

                    <View style={{height: 300}}>
                        {!state.mapLoading && (
                            <WebView
                                automaticallyAdjustContentInsets={false}
                                source={{
                                    uri: 'https://www.google.com/maps',
                                }}
                            />
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

export default AnimalCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    card: {
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: themeColor,
        position: 'relative',
        marginBottom: 6,
    },
    cardHeader: {
        width: '100%',
        height: 69,
    },
    speciesName: {
        position: 'absolute',
        top: 13,
        left: 15,
        right: 0,
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    nicknameName: {
        position: 'absolute',
        top: 35,
        left: 15,
        right: 0,
        fontSize: 15,
        color: '#333',
    },
    labelBase: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    labelText: {
        color: '#fff',
        fontSize: 12,
    },
    animalPic: {
        height: screenWidth * 0.45,
        borderColor: '#fff',
    },
    infoBase: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoItem: {
        alignItems: 'center',
        padding: 12,
        width: '33%',
        borderRightColor: themeColor,
        borderRightWidth: 1,
    },
    infoItemTitle: {
        fontSize: 13,
        color: '#333',
        marginBottom: 1,
    },
    infoItemValue: {
        color: '#333',
        fontWeight: '600',
    },
    location: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationText: {
        color: '#fff',
    },

    moreButton: {
        marginTop: 10,
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    divider: {
        position: 'absolute',
        height: 1,
        backgroundColor: '#ddd',
        top: 10,
        left: 10,
        right: 10,
    },
    moreButtonText: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    showMoreAngle: {
        fontSize: 16,
        marginTop: 5,
        color: '#999',
    },

    pictures: {
        flexDirection: 'row',
        width: screenWidth,
        left: -20,
        paddingRight: 35,
    },
    scrollView: {
        paddingLeft: 20,
        paddingRight: 140,
        overflow: 'visible',
    },
    pictureItem: {
        borderWidth: 1,
        borderColor: '#f8f8f8',
        marginRight: 5,
        width: (screenWidth - 30) / 3.2,
        height: (screenWidth - 30) / 3.2,
    },
});
