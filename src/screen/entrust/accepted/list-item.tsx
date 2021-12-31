import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../../routes/screen-name";
import {useSetState} from "ahooks";
import {screenWidth} from "../../../config/contant";

const ListItem: React.FC<any> = (props: any) => {


    return (
            <View style={styles.list}>
                <View style={styles.content}>
                    <View style={styles.useInfoBox}>
                        <View style={styles.avatar}></View>
                        <Text style={styles.userName}>Jacky-Forco</Text>
                    </View>
                    <View style={styles.timelineBox}>
                        {
                            props.data && props.data.map((item: any,index:number) => {
                                return <View style={styles.timePlugBox} key={index}>
                                    <View style={styles.timePoint}></View>
                                    <View style={(props.data.length === 1 || index === props.data.length - 1 ) ?styles.timeContentLastBox : styles.timeContentBox}>
                                        <View>
                                            <Text style={styles.timeText}>{item.title}</Text>
                                            <Text style={styles.dataText}>{item.description}</Text>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </View>
            </View>

    );
};

const styles = StyleSheet.create({
    list:{
        backgroundColor:'white',
        marginTop:5,
        flex:1,
        flexDirection: 'row',
        marginLeft:16,
        marginRight:16,
        borderRadius:8
    },
    timelineBox:{
        marginTop:21,
        paddingLeft:10,
        width:screenWidth
    },
    timePlugBox:{
        paddingLeft:16
    },
    timePoint:{
        width:10,
        height:10,
        backgroundColor:'#74D4E3',
        borderRadius:50,
    },
    timeText:{
        color:'#999999',
        fontSize:11,
        position:"absolute",
        top:-11
    },
    dataText:{
        color:'#0A141E',
        fontSize:15,
        marginTop:6
    },
    timeContentBox:{
        borderLeftWidth:1,
        borderLeftColor:'#74D4E3',
        height:43,
        marginLeft:4.5,
        paddingLeft:12
    },
    timeContentLastBox:{
        height:43,
        marginLeft:4.5,
        paddingLeft:12
    },
    content:{
        paddingTop:16,
        paddingBottom:0,
    },
    useInfoBox:{
        paddingLeft:16,
        paddingRight:16,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    avatar:{
        backgroundColor:'green',
        borderRadius:50,
        width:32,
        height:32,
        marginRight:7
    },
    userName:{
        color:'#0A141E',
        fontSize:15
    },
    descriptionStyle:{
        color:'#0A141E',
        fontSize:15
    },
    titleStyle:{
        position:'absolute',
        top:-11,
        color:'#999999',
        fontSize:11,
    }
});

export default ListItem;
