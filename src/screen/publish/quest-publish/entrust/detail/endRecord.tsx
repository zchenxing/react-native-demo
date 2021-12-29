import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {screenWidth} from "../../../../../config/contant";
import {localImages} from "../../../../../assets/images";
import {INTELINK_SCREEN_NAME} from "../../../../../routes/screen-name";

const EndRecord = (props: any) => {
    return <TouchableHighlight
           underlayColor={'none'}
           onPress={()=>{props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_SHARING)}}>
    <View style={styles.endRecordBox}>
        <View style={styles.li}>
            <Text style={styles.title}>End Time</Text>
            <Text style={styles.content}>17:42   2021/03/03</Text>
        </View>
        <View style={styles.li}>
            <Text style={styles.title}>End Time</Text>
            <Text style={styles.content}>17:42   2021/03/03</Text>
        </View>
        <View style={styles.lastLi}>
            <Text style={styles.title}>End Time</Text>
            <Text style={styles.content}>17:42   2021/03/03</Text>
        </View>
        <Image
            style={styles.backgroundImg}
            resizeMode={'cover'}
            source={localImages.endEdImg}
        />
        </View>
    </TouchableHighlight>
}

const styles = StyleSheet.create({
    endRecordBox:{
        marginLeft:16,
        marginRight:16,
        backgroundColor:'#fff',
        borderRadius:8,
        padding:10,
        marginTop:13,
        paddingTop:0,
    },
    li:{
        borderBottomWidth:0.5,
        borderBottomColor:'#F0F2F5',
        paddingBottom:10,
        paddingTop:10
    },
    lastLi:{
        paddingBottom:10,
        paddingTop:10
    },
    title:{
        color:'#C4C4C4',
        fontSize:14,
        marginBottom:2
    },
    content:{
        color:'#333333',
        fontSize:14
    },
    backgroundImg:{
        width:64,
        height:38,
        position:"absolute",
        right:10,
        top:-3
    }
})

export default EndRecord;