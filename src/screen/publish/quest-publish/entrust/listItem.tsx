import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../../../routes/screen-name";

const ListItem: React.FC<any> = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'none'}
            onPress={() => {props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_DETAIL)}}
        >
            {/*<View style={styles.list}>*/}
            {/*    /!*<View style={styles.avatars}></View>*!/*/}
            {/*    <View style={styles.content}>*/}
            {/*        <View style={styles.contentLeft}>*/}
            {/*            <View><Text style={styles.deviceName}>Mini-2G-Lite</Text></View>*/}
            {/*            <View><Text style={styles.uuid}>UUID: ecde2809d9e5</Text></View>*/}
            {/*        </View>*/}
            {/*        <View style={styles.contentRight}>*/}
            {/*            <View style={styles.contactBox}>*/}
            {/*                <Text style={styles.text}>Lost contact 22 dey</Text>*/}
            {/*                <Text>图片</Text>*/}
            {/*            </View>*/}
            {/*            <View style={styles.timeBox}>*/}
            {/*                <Text style={styles.hour}>17:42</Text>*/}
            {/*                <Text style={styles.date}>2021/03/03</Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.animalBox}>*/}
            {/*        <View style={styles.avatars}></View>*/}
            {/*        <View>*/}
            {/*            <Text style={styles.speciesName}>Species name</Text>*/}
            {/*            <Text style={styles.birdName}>Bird name</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={styles.list}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <View><Text style={styles.deviceName}>Mini-2G-Lite</Text></View>
                        <View><Text style={styles.uuid}>UUID: ecde2809d9e5</Text></View>
                    </View>
                    <View style={styles.contentRight}>
                        <View style={styles.contactBox}>
                            <View style={styles.status}></View>
                            <Text style={styles.text}>Lost contact 22 dey</Text>
                            <Text>图片</Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.hour}>17:42</Text>
                            <Text style={styles.date}>2021/03/03</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.animalBox}>
                    <View style={styles.avatars}></View>
                    <View>
                        <Text style={styles.speciesName}>Species name</Text>
                        <Text style={styles.birdName}>Bird name</Text>
                    </View>
                </View>
            </View>
            {/*<View>*/}
            {/*    <View style={styles.list}>*/}
            {/*        <View style={styles.avatars}></View>*/}
            {/*        <View style={styles.content}>*/}
            {/*            <View style={styles.contentLeft}>*/}
            {/*                <View><Text style={styles.deviceName}>Mini-2G-Lite</Text></View>*/}
            {/*                <View><Text style={styles.uuid}>UUID: ecde2809d9e5</Text></View>*/}
            {/*            </View>*/}
            {/*            <View style={styles.contentRight}>*/}
            {/*                <View style={styles.endEdImg}>*/}

            {/*                </View>*/}
            {/*                <View style={styles.endTimeBox}>*/}
            {/*                    <Text style={styles.hour}>17:42</Text>*/}
            {/*                    <Text style={styles.date}>2021/03/03</Text>*/}
            {/*                </View>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.reasonBox}>*/}
            {/*        <View style={styles.reason}>*/}
            {/*            <Text style={styles.reasonTitle}>End reason:</Text>*/}
            {/*            <Text style={styles.reasonText}>Reason for ending Reason for ending Reason for ending</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}

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
        marginTop:5,
        flex:1,
        // flexDirection: 'row',
    },
    animalBox:{
        height:43,
        padding:5,
        borderWidth:0.5,
        borderColor:'#E0E0E0',
        flexDirection:"row",
        alignItems:"center"
    },
    speciesName:{
        color:'#999999',
        fontSize:12
    },
    birdName:{
        color:'#999999',
        fontSize:12,
        marginTop:3
    },
    avatars:{
        width:33,
        height:33,
        borderRadius:4,
        backgroundColor:'green',
        marginRight:5
    },
    content:{
        // backgroundColor:'red',
        flex:1,
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingLeft:6,
    },
    contentLeft:{
        // backgroundColor:'green',
    },
    contentRight:{
        // backgroundColor:'blue',
        // paddingTop:3
    },
    deviceName:{
        fontSize:18,
        color:'#6FC1CE',
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
    endTimeBox:{
        flex:1,
        flexDirection: 'row',
        justifyContent:"flex-end",
        alignItems:"flex-end",
        paddingBottom:3
    },
    reasonBox:{
        // paddingTop:11,
        paddingBottom:11,
        paddingLeft:14,
        paddingRight:14,
        backgroundColor:'white'
    },
    reason:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#ECECEC',
        borderRadius:3
    },
    reasonTitle:{
        color:'#999999',
        fontSize:11
    },
    reasonText:{
        color:'#0A141E',
        fontSize:11
    }
});

export default ListItem;
