import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import IconFont from '../../../assets/iconfont';
import FastImage from 'react-native-fast-image';
import {useLanguage} from '../../../language';
import LinearGradient from 'react-native-linear-gradient';
import {themeColor} from '../../../assets/styles';
import {screenWidth} from '../../../config/contant';
import {AnimalAge, AnimalCardProps, AnimalCardType} from './type';
import {useSetState} from 'ahooks';
import {localImages} from '../../../assets/images';
import AnimalCardShareMore from './more-info';
import AnimalMorePicture from './more-picture';
import Utils from '../../../help';
import {shareSpeciesTags} from '../../../config/type';
import AweProgressiveImage from "../../../components/awe-progressive-image";

interface IState {
    showMoreInfo: boolean;
    mapLoading: boolean;
}

const AnimalCard: React.FC<AnimalCardProps> = (props: AnimalCardProps) => {
    const [state, setState] = useSetState<IState>({
        showMoreInfo: false,
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
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.card,
                    props.showLocation
                        ? {
                              borderBottomRightRadius: 10,
                              borderBottomLeftRadius: 10,
                          }
                        : {},
                ]}>
                <View>
                    <Image
                        source={require('../../../assets/images/card_header.png')}
                        style={styles.cardHeader}
                    />

                    <Text style={styles.speciesName}>
                        {props.animalInfo?.biological_base.species || ''}
                    </Text>
                    <Text style={styles.nicknameName}>
                        {props.animalInfo?.biological_base.name}
                    </Text>

                    {props.speciesType && (
                        <View style={styles.labelBase}>
                            <IconFont
                                name={shareSpeciesTags[props.speciesType].icon}
                                color={'#fff'}
                                size={26}
                            />
                            <Text style={styles.labelText}>
                                {shareSpeciesTags[props.speciesType].name}
                            </Text>
                        </View>
                    )}
                </View>

                <AweProgressiveImage
                    source={
                        props.animalInfo
                            ? {uri: props.animalInfo?.imageUrls[0]}
                            : localImages.defaultPicture
                    }
                    height={styles.animalPic.height}
                />

                <View style={styles.infoBase}>
                    {/* 生物信息 */}
                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.age}
                        </Text>
                        <Text style={styles.infoItemValue}>
                            {props.animalInfo?.biological_base.age ===
                            AnimalAge.Adult
                                ? useLanguage.adult
                                : useLanguage.child}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.gender}
                        </Text>
                        <Text style={styles.infoItemValue}>
                            {props.animalInfo?.biological_base.gender}
                        </Text>
                    </View>

                    <View style={[styles.infoItem, {borderRightWidth: 0}]}>
                        <Text style={styles.infoItemTitle}>
                            {useLanguage.weight}
                        </Text>
                        <Text style={styles.infoItemValue}>
                            {props.animalInfo?.biological_base.weight}
                        </Text>
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

            {props.showOtherInfo && (
                <>
                    {props.animalType === AnimalCardType.ShareType ? (
                        state.showMoreInfo &&
                        props.animalInfo && (
                            <AnimalCardShareMore
                                animalInfo={props.animalInfo}
                            />
                        )
                    ) : (
                        <AnimalMorePicture
                            imageUrls={props.animalInfo?.imageUrls || []}
                        />
                    )}

                    {props.animalType === AnimalCardType.ShareType && (
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
                                    <IconFont
                                        name={state.showMoreInfo ? 'shouqi' : 'shouqi-copy'}
                                        color={'#999'}
                                        size={16}
                                        style={styles.showMoreAngle}/>

                                </View>
                            </View>
                        </TouchableHighlight>
                    )}

                    {
                        // 委托就要显示设备信息
                        props.animalType === AnimalCardType.QuestType && (
                            <View style={styles.deviceBase}>
                                <Text style={styles.deviceType}>
                                    {props.shareData?.product_model || ''}
                                </Text>
                                <Text style={styles.deviceUUId}>
                                    UUID: {props.shareData?.uuid || ''}
                                </Text>
                            </View>
                        )
                    }

                    {/*<View style={styles.mapBase}>*/}
                    {/*    {!state.mapLoading && (*/}
                    {/*        <WebView*/}
                    {/*            automaticallyAdjustContentInsets={false}*/}
                    {/*            source={{*/}
                    {/*                uri: 'https://bird.coolhei.com/appmap/en/#/',*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</View>*/}

                    {
                        // 发布委托 -> Google地图截图
                        props.googleMapPic ?
                            <Image
                                source={{uri: props.googleMapPic}}
                                style={styles.mapBase}
                            /> : <></>

                    }

                    {
                        // 显示地理位置的有效期
                        props.shareData?.expiry_date && (
                            <View style={styles.expiryBase}>
                                <Text style={styles.expiryText}>
                                    {useLanguage.expiry_in}
                                    {Utils.getExpireTime(
                                        props.shareData.expiry_date,
                                    )}
                                </Text>
                            </View>
                        )
                    }
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
        borderTopColor: themeColor,
        borderTopWidth: 1
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
        marginTop: 5,
    },

    deviceBase: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    deviceType: {
        color: themeColor,
        fontSize: 18,
        fontWeight: '600',
    },
    deviceUUId: {
        fontSize: 12,
        color: '#999',
    },
    mapBase: {
        marginTop: 10,
        height: screenWidth * 0.7,
        borderRadius: 10,
        overflow: 'hidden',
    },
    expiryBase: {
        marginTop: 10,
        padding: 3,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    expiryText: {
        color: '#333',
        fontSize: 12,
    },
});
