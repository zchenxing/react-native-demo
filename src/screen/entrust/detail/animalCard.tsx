import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {screenWidth} from "../../../config/contant";

const AnimalCard = (props: any) => {
    return <TouchableHighlight
        underlayColor={'none'}
        onPress={props.navigation.goBack}>
        <View style={styles.cardBox}>
            <View style={styles.backgroundImg}></View>
            <View style={styles.nameBox}>
                <View style={styles.animalImg}></View>
                <View style={styles.infoContent}>
                    <View style={styles.infoLeft}>
                        <Text style={styles.speciesName}>Species name</Text>
                        <Text style={styles.birdName}>Bird name</Text>
                    </View>
                    <View>
                        <Text>图片</Text>
                    </View>
                </View>
            </View>
            <View style={styles.animalInfoBox}>
                <View style={styles.infoBox}>
                    <Text>Age</Text>
                    <Text>10 mos </Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>Age</Text>
                    <Text>10 mos </Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>Age</Text>
                    <Text>10 mos </Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>
}

const styles = StyleSheet.create({
    backgroundImg:{
        height:38,
        backgroundColor:'#A2E0E7',
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
        height:52.5,
        borderTopColor:'#E3E3E3',
        borderTopWidth:0.5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
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
    }
})

export default AnimalCard;