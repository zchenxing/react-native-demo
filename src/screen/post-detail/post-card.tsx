import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from 'react-native-fast-image';
import {birdCard, pictureList} from '../../mock';
import {screenWidth} from '../../config/contant';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBoolean } from "ahooks";

const PastCard: React.FC = props => {

    const [showMore, {toggle}] = useBoolean(false)

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../../assets/images/card_header.png')}
                    style={styles.cardHeader}
                />

                <View style={styles.gradient}>
                    <View style={styles.animalPicture}>
                        {[...pictureList].splice(0, 2).map(picture => (
                            <FastImage
                                key={picture.uri}
                                style={[
                                    styles.animalPictureItem,
                                    {
                                        width: (screenWidth - 50) / 2,
                                    },
                                ]}
                                source={{uri: picture.uri}}
                            />
                        ))}
                    </View>

                    <View style={styles.animalInfo}>
                        {Array.from(new Array(20).keys()).map(i => (
                            <View key={i} style={styles.animalInfoItem}>
                                <Text style={styles.animalInfoItemText}>
                                    wdwa
                                </Text>
                            </View>
                        ))}
                    </View>



                    <View style={styles.moreBase}>
                        <View style={styles.moreInfo}>
                            {
                                [1, 2, 3, 4, 5, 6, 7].map(i => (
                                    <View key={i}>
                                        <Text>特征</Text>
                                        <Text>222</Text>
                                    </View>
                                ))
                            }
                        </View>

                    </View>

                    {/*<TouchableHighlight>*/}
                    {/*    <View style={styles.moreButton}>*/}
                    {/*        <View style={styles.divider} />*/}
                    {/*        <Text style={styles.seeInfo}>*/}
                    {/*            See all information*/}
                    {/*        </Text>*/}
                    {/*        <Icon*/}
                    {/*            name={showMore ? 'angle-double-up' : 'angle-double-down'}*/}
                    {/*            style={{fontSize: 16}}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</TouchableHighlight>*/}

                </View>

                <Text style={styles.animalName}>animal name</Text>

                <FastImage style={styles.animalBase} source={{uri: birdCard}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    card: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'relative',
    },
    cardHeader: {
        width: '100%',
        height: 69,
    },
    gradient: {
        justifyContent: 'flex-end',
    },
    animalPicture: {
        flexDirection: 'row',
        paddingTop: 70,
        paddingLeft: 4,
        paddingBottom: 20,
    },
    animalPictureItem: {
        height: (screenWidth - 50) / 2,
        marginLeft: 3,
        borderRadius: 5,
    },
    animalName: {
        position: 'absolute',
        top: 13,
        left: 0,
        right: 0,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
    animalBase: {
        width: 78,
        height: 78,
        borderRadius: 78,
        position: 'absolute',
        borderColor: '#fff',
        borderWidth: 3,
        left: '50%',
        top: 40,
        transform: [{translateX: -39}],
    },
    animalInfo: {
        paddingTop: 10,
        paddingLeft: 10,
        height: 65,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        transform: [{translateY: -10}],
    },
    animalInfoItem: {
        marginRight: 13,
        backgroundColor: '#c1e3e6',
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 8,
        borderRadius: 15,
    },
    animalInfoItemText: {
        fontSize: 12,
        color: '#666',
    },

    moreBase: {
        padding: 15
    },
    moreInfo: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10
    }
    // moreButton: {
    //     alignItems: 'center',
    //     paddingBottom: 10
    // },
    // seeInfo: {
    //     backgroundColor: '#fff',
    //     paddingLeft: 5,
    //     paddingRight: 5
    // },
    // divider: {
    //     width: screenWidth - 50,
    //     height: 1,
    //     backgroundColor: '#ddd',
    //     transform: [
    //         {translateY: 12}
    //     ]
    // }
});

export default PastCard;
