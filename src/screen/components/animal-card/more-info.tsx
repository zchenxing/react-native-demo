import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useLanguage} from '../../../language';
import dayjs from 'dayjs';
import {shareAnimalDetail} from './config';
import {ShareAnimalProps} from './type';
import {screenWidth} from '../../../config/contant';
import {useSetState} from 'ahooks';
import AwePicturePreview from '../../../components/awe-picture-preview';
import { themeColor } from "../../../assets/styles";

interface IProps {
    animalInfo: ShareAnimalProps;
}

interface IState {
    pictureVisible: boolean;
    pictureIndex: number;
}

const AnimalCardMore: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useSetState<IState>({
        pictureVisible: false,
        pictureIndex: 0,
    });

    const onPressPicture = (index: number) => {
        setState({
            pictureIndex: index,
            pictureVisible: true,
        });
    };

    return (
        <>
            <View style={{backgroundColor: '#FFF'}}>
                <View style={styles.pictures}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}>
                        {props.animalInfo?.imageUrls.map((picture, index) => (
                            <TouchableHighlight
                                key={picture}
                                underlayColor={'none'}
                                onPress={() => onPressPicture(index)}>
                                <FastImage
                                    source={{uri: picture}}
                                    style={styles.pictureItem}
                                />
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </View>

                {
                    // 释放信息
                    props.animalInfo?.biological_release && (
                        <View style={{paddingTop: 50}}>

                            <Text style={styles.mainTitleBase}>
                                <Text style={styles.mainTitle}>
                                    {useLanguage.installation_info}
                                </Text>
                            </Text>

                            {
                                // 释放位置
                                props.animalInfo.biological_release
                                    .location && (
                                    <View style={styles.moreInfoItem}>
                                        <Text>
                                            {useLanguage.release_position}
                                        </Text>
                                        <Text>
                                            {
                                                props.animalInfo
                                                    .biological_release.location
                                            }
                                        </Text>
                                    </View>
                                )
                            }
                            {
                                // 经度
                                props.animalInfo.biological_release
                                    .longitude && (
                                    <View style={styles.moreInfoItem}>
                                        <Text>{useLanguage.longitude}</Text>
                                        <Text>
                                            {
                                                props.animalInfo
                                                    .biological_release
                                                    .longitude
                                            }{' '}
                                            °
                                        </Text>
                                    </View>
                                )
                            }
                            {
                                // 纬度
                                props.animalInfo.biological_release
                                    .latitude && (
                                    <View style={styles.moreInfoItem}>
                                        <Text>{useLanguage.latitude}</Text>
                                        <Text>
                                            {
                                                props.animalInfo
                                                    .biological_release.latitude
                                            }{' '}
                                            °
                                        </Text>
                                    </View>
                                )
                            }
                            {props.animalInfo.biological_release.timestamp && (
                                <View style={[styles.moreInfoItem, {borderBottomWidth: 0}]}>
                                    <Text>{useLanguage.release_date}</Text>
                                    <Text>
                                        {dayjs(
                                            props.animalInfo.biological_release
                                                .timestamp,
                                        ).format('YYYY-MM-DD')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )
                }

                {props.animalInfo?.biological_detail && (
                    <View style={{paddingTop: 50}}>

                        <Text style={styles.mainTitleBase}>
                            <Text style={styles.mainTitle}>
                                {useLanguage.detail_info}
                            </Text>
                        </Text>


                        {Object.keys(shareAnimalDetail).map(key => {
                            if (
                                // @ts-ignore
                                props.animalInfo?.biological_detail[key] !==
                                undefined
                            ) {
                                return (
                                    <View style={styles.moreInfoItem} key={key}>
                                        <Text>
                                            {
                                                // @ts-ignore
                                                shareAnimalDetail[key].title
                                            }
                                        </Text>
                                        <View style={styles.moreUnitText}>
                                            <Text>
                                                {
                                                    // @ts-ignore
                                                    props.animalInfo
                                                        ?.biological_detail[key]
                                                }
                                            </Text>
                                            <Text>cm</Text>
                                        </View>
                                    </View>
                                );
                            } else {
                                return <></>;
                            }
                        })}
                    </View>
                )}
            </View>

            {props.animalInfo && (
                <AwePicturePreview
                    startIndex={state.pictureIndex}
                    visible={state.pictureVisible}
                    imageUrls={props.animalInfo?.imageUrls.map(url => url)}
                    onClick={() => setState({pictureVisible: false})}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 6,
        width: (screenWidth - 30) / 3.2,
        height: (screenWidth - 30) / 3.2,
    },
    mainTitleBase: {
        position: 'absolute',
        left: 3,
        top: 13,
        padding: 6,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: themeColor,
        borderRadius: 20
    },
    mainTitle: {
        color: '#fff',
        fontSize: 12,
    },
    moreInfoItem: {
        padding: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    moreUnitText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AnimalCardMore;
