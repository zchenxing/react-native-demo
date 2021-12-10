import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {birdCard} from '../../../mock';

const PostAnimalCard: React.FC = props => {
    return (
        <View style={styles.card}>
            <Image
                source={require('../../../assets/images/card_header.png')}
                style={styles.cardHeader}
            />

            <LinearGradient
                colors={['#fff', '#def5f7']}
                start={{x: 0.3, y: 0.3}}
                end={{x: 0.4, y: 1}}
                style={styles.gradient}>
                <View style={styles.animalInfo}>
                    {Array.from(new Array(20).keys()).map(i => (
                        <View key={i} style={styles.animalInfoItem}>
                            <Text style={styles.animalInfoItemText}>wdwa</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>

            <Text style={styles.animalName}>animal name</Text>

            <FastImage style={styles.animalBase} source={{uri: birdCard}} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        position: 'relative',
    },
    cardHeader: {
        width: '100%',
        height: 69,
    },
    gradient: {
        height: 140,
        justifyContent: 'flex-end',
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
});

export default PostAnimalCard;
