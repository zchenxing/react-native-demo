import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../../routes/screen-name";

const ListItem: React.FC<any> = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'none'}
            onPress={() => {props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_DETAIL)}}
        >
            <View style={styles.list}>
                <View style={styles.content}>
                    <View>
                        <View><Text style={styles.deviceName}>223,999 data</Text></View>
                        <View><Text style={styles.uuid}>17:42   2021/03/03</Text></View>
                    </View>
                    <View>
                        <View style={styles.contactBox}>
                            {/*<Text style={styles.text}>Waiting for upload</Text>*/}
                            {/*<Text style={styles.uploadText}>upload</Text>*/}
                            <Text style={styles.completedText}>upload completed</Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    list:{
        paddingTop:11,
        paddingBottom:11,
        paddingLeft:14,
        paddingRight:14,
        backgroundColor:'white',
        marginBottom:5,
        flex:1,
        flexDirection: 'row',
        marginLeft:16,
        marginRight:16,
        borderRadius:8
    },
    content:{
        // backgroundColor:'red',
        flex:1,
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingLeft:6,
    },
    uploadText:{
        color:'#69BECB',
        fontSize:12
    },
    deviceName:{
        fontSize:18,
        color:'#0A141E',
        marginBottom:7
    },
    uuid:{
        color:'#999999',
        fontSize:12
    },
    text:{
        color:'#999999',
        fontSize:12
    },
    contactBox:{
        flex:1,
        flexDirection: 'row',
        alignItems:"center"
    },
    timeBox:{
        flex:1,
        flexDirection: 'row',
        justifyContent:"flex-end",
        alignItems:"center"
    },
    hour:{
        color:'#B3B3B3',
        fontSize:12,
        marginRight:10
    },
    date:{
        color:'#B3B3B3',
        fontSize:12
    },
    status:{
        width:8,
        height:8,
        borderRadius:50,
        backgroundColor:'#44DE45',
        marginRight:5
    },
    endEdImg:{
        width:30,
        height:30,
        backgroundColor:'green',
        position:"absolute",
        right:0,
        top:-15
    },
    completedText:{
        color:'#05C429',
        fontSize:12
    }
});

export default ListItem;
