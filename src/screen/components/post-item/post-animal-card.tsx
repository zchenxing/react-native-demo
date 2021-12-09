import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import { themeColor, themeLightColor } from "../../../assets/styles";
import FastImage from 'react-native-fast-image';
import { birdCard } from "../../../mock";

const PostAnimalCard: React.FC = (props) => {
    return (
        <View style={styles.card}>

            <Image
                source={require('../../../assets/images/card_header.png')}
                style={styles.cardHeader}
            />

            <LinearGradient
                colors={['#fff',  '#def5f7']}
                start={{x: 0.3, y: 0.3}}
                end={{x: 0.4, y: 1}}
                style={styles.gradient} >

                <View style={styles.birdInfo}>
                    {
                        Array.from(new Array(20).keys()).map((i) => (
                            <Text key={i} style={styles.birdInfoItem}>wddwa</Text>
                        ))
                    }

                </View>
            </LinearGradient>


            <Text style={styles.birdName}>bird name</Text>

            <FastImage
                style={styles.birdBase}
                source={{uri: birdCard}}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        position: 'relative'
    },
    cardHeader: {
        width: '100%',
        height: 69
    },
    gradient: {
        height: 140,
        justifyContent: 'flex-end'
    },
    birdName: {
        position: 'absolute',
        top: 13,
        left: 0,
        right: 0,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
    birdBase: {
        width: 78,
        height: 78,
        borderRadius: 78,
        position: 'absolute',
        borderColor: '#fff',
        borderWidth: 3,
        left: '50%',
        top: 40,
        transform: [
            {translateX: -39}
        ]
    },
    birdInfo: {
        paddingTop: 10,
        paddingLeft: 3,
        height: 70,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        transform: [
            {translateY: -10}
        ],
    },
    birdInfoItem: {
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: themeLightColor,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 8,
        fontSize: 12,
        borderRadius: 15
    }

})

export default PostAnimalCard;
