import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {birdCard} from '../../../mock';
import IconFont from '../../../iconfont';
import {screenWidth} from '../../../config/contant';
import {themeColor} from '../../../assets/styles';
import {useLanguage} from '../../../language';

interface IProps {
    showLocation?: boolean
}

const PostAnimalCard: React.FC<IProps> = (props: IProps) => {
    return (
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
                    <Text style={styles.infoItemTitle}>{useLanguage.age}</Text>
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

            {
                props.showLocation &&
                <LinearGradient
                    colors={['#96dce3', '#6fd1df']}
                    start={{x: 0.2, y: 0.2}}
                    end={{x: 0.5, y: 1}}
                    style={styles.location}>
                    <Text style={styles.locationText}>
                        {useLanguage.latest_location}
                    </Text>
                </LinearGradient>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: themeColor,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 6
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
});

export default PostAnimalCard;
