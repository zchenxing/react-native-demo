import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {useLanguage} from '../../../language';
import dayjs from 'dayjs';
import {shareAnimalDetail} from './config';
import {ShareAnimalProps} from './type';
import {screenWidth} from '../../../config/contant';
import { themeColor } from "../../../assets/styles";
import AnimalMorePicture from './more-picture';

interface IProps {
    animalInfo: ShareAnimalProps;
}


const AnimalCardShareMore: React.FC<IProps> = (props: IProps) => {


    return (
        <>
            <View style={{backgroundColor: '#FFF'}}>

                <AnimalMorePicture imageUrls={props.animalInfo?.imageUrls} />

                {
                    // 释放信息
                    props.animalInfo?.biological_release && (
                        <View style={{paddingTop: 40}}>

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
                                        <Text style={styles.title}>
                                            {useLanguage.release_position}
                                        </Text>
                                        <Text  style={styles.text}>
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
                                        <Text style={styles.title}>{useLanguage.longitude}</Text>
                                        <Text style={styles.text}>
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
                                        <Text style={styles.title}>{useLanguage.latitude}</Text>
                                        <Text style={styles.text}>
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
                                    <Text style={styles.title}>{useLanguage.release_date}</Text>
                                    <Text style={styles.text}>
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
                    <View style={{paddingTop: 40}}>

                        <Text style={styles.mainTitleBase}>
                            <Text style={styles.mainTitle}>
                                {useLanguage.detail_info}
                            </Text>
                        </Text>


                        {Object.keys(shareAnimalDetail).map((key, index) => {
                            if (
                                // @ts-ignore
                                props.animalInfo?.biological_detail[key] !==
                                undefined
                            ) {
                                return (
                                    <View style={styles.moreInfoItem} key={`${key}-${index}`}>
                                        <Text style={styles.title}>
                                            {
                                                // @ts-ignore
                                                shareAnimalDetail[key].title
                                            }
                                        </Text>
                                        <View style={styles.moreUnitText}>
                                            <Text style={styles.text}>
                                                {
                                                    // @ts-ignore
                                                    props.animalInfo
                                                        ?.biological_detail[key]
                                                }
                                            </Text>
                                            <Text style={styles.text}>cm</Text>
                                        </View>
                                    </View>
                                );
                            } else {
                                return <Text key={key} />;
                            }
                        })}

                        <View style={styles.clearView} />
                    </View>
                )}
            </View>


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
        top: 15,
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
        paddingTop: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    moreUnitText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        paddingBottom: 5,
        fontSize: 12
    },
    text: {
        color: '#333'
    },
    clearView: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        height: 3
    }
});

export default AnimalCardShareMore;
