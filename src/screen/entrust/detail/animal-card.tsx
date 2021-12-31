import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {screenWidth} from "../../../config/contant";
import {localImages} from "../../../assets/images";
import LinearGradient from "react-native-linear-gradient";

const AnimalCard = (props: any) => {
    return <TouchableHighlight
        underlayColor={'none'}
        onPress={props.navigation.goBack}>
        <View style={styles.cardBox}>
            <Image
                style={styles.backgroundImg}
                resizeMode={'stretch'}
                source={localImages.animalCardTop}
            />
            <View style={styles.nameBox}>
                <View style={styles.animalImg}></View>
                <View style={styles.infoContent}>
                    <View>
                        <Text style={styles.speciesName}>Species name</Text>
                        <Text style={styles.birdName}>Bird name</Text>
                    </View>
                </View>
            </View>
            <LinearGradient
                colors={['#6FC1CE', '#A8E2E9']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.animalInfoBox}>
                <Text style={styles.deviceType}>Age</Text>
                <Text style={styles.uuid}>UUID: ecde2809d9e5</Text>
            </LinearGradient>

        </View>
    </TouchableHighlight>
}

const styles = StyleSheet.create({
    backgroundImg:{
        height:38,
        width:screenWidth - 32
        // backgroundColor:'#A2E0E7',
    },
    nameBox:{
      flexDirection:"row",
        height:55.5
    },
    infoBox:{
        width: (screenWidth - 32) * 0.3,
        justifyContent:"center",
        alignItems:"center"
    },
    animalInfoBox:{
        height:40,
        borderTopColor:'#E3E3E3',
        borderTopWidth:0.5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:15,
        paddingRight:15,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    cardBox:{
        borderRadius:8,
        marginLeft:16,
        marginRight:16,
        backgroundColor:'white',
        flex:1,
    },
    animalImg:{
        width:78.5,
        height:78.5,
        backgroundColor:'green',
        borderRadius:50,
        borderWidth:2,
        borderColor:'#fff',
        top:-25,
        left:18
        // position:"absolute"
    },
    infoContent:{
        flexDirection:"row",
        flex:1,
        justifyContent:"space-between",
        // backgroundColor:'red',
        alignItems:"center",
        height:55,
        marginLeft:25
    },
    speciesName:{
        color:'#6FC1CE',
        fontSize:15
    },
    birdName:{
        color:'#333333',
        fontSize:15
    },
    deviceType:{
        color:'#1A3539',
        fontSize:18
    },
    uuid:{
        color:'#1A3539',
        fontSize:12
    }
})

export default AnimalCard;