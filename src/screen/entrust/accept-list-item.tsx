import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../routes/screen-name";
import {screenWidth} from "../../config/contant";
import {localImages} from "../../assets/images";

const AcceptListItem: React.FC<any> = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'none'}
            onPress={() => {props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_DETAIL)}}
        >
            {/*<View style={styles.list}>*/}
            {/*    <View style={styles.content}>*/}
            {/*        <View style={styles.contentLeft}>*/}
            {/*            <View style={styles.userImg}></View>*/}
            {/*            <View><Text style={styles.userName}>Jacky-Forco</Text></View>*/}
            {/*        </View>*/}
            {/*        <View style={styles.contentRight}>*/}
            {/*            <View style={styles.contactBox}>*/}
            {/*                <Text style={styles.text}>Ongoing</Text>*/}
            {/*                <Text>图片</Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.infoBox}>*/}
            {/*        <View style={styles.animalBox}>*/}
            {/*            <View style={styles.avatars}></View>*/}
            {/*            <View>*/}
            {/*                <Text style={styles.speciesName}>Species name</Text>*/}
            {/*                <Text style={styles.birdName}>Bird name</Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*        <View style={styles.deviceBox}>*/}
            {/*            <Text style={styles.deviceName}>FEXL</Text>*/}
            {/*            <Text style={styles.uuid}>UUID: ecde2809d9e5</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}

            {/*<View style={styles.list}>*/}
            {/*    <View style={styles.content}>*/}
            {/*        <View style={styles.deleteContentLeft}>*/}
            {/*            <View style={styles.userImg}></View>*/}
            {/*            <View><Text style={styles.deleteUserName}>Jacky-Forco</Text></View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.deleteInfoBox}>*/}
            {/*        <View style={styles.animalBox}>*/}
            {/*            <View style={styles.avatars}></View>*/}
            {/*            <View>*/}
            {/*                <Text style={styles.speciesName}>Species name</Text>*/}
            {/*                <Text style={styles.birdName}>Bird name</Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*        <View style={styles.deviceBox}>*/}
            {/*            <Text style={styles.deleteDeviceName}>FEXL</Text>*/}
            {/*            <Text style={styles.uuid}>UUID: ecde2809d9e5</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.deleteCover}>*/}
            {/*        <View style={styles.deleteBox}>*/}
            {/*            <Text style={styles.deleteText}>This post is deleted</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}

            {/*</View>*/}

            <View style={styles.list}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <View style={styles.userImg}></View>
                        <View><Text style={styles.userName}>Jacky-Forco</Text></View>
                    </View>
                    <Image
                        style={styles.endEdImg}
                        resizeMode={'cover'}
                        source={localImages.endEdImg}
                    />
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.animalBox}>
                        <View style={styles.avatars}></View>
                        <View>
                            <Text style={styles.speciesName}>Species name</Text>
                            <Text style={styles.birdName}>Bird name</Text>
                        </View>
                    </View>
                    <View style={styles.deviceBox}>
                        <Text style={styles.deviceName}>FEXL</Text>
                        <Text style={styles.uuid}>UUID: ecde2809d9e5</Text>
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
        marginTop:5,
        flex:1,
        // flexDirection: 'row',
    },
    userName:{
        fontSize:12,
        color:'#0A141E'
    },
    userImg:{
        width:33,
        height:33,
        backgroundColor:'green',
        borderRadius:5.5,
        marginRight:5
    },
    animalBox:{
        flexDirection:"row",
        alignItems:"center",
    },
    deleteBox:{
        width:screenWidth-144,
        height:38.5,
        backgroundColor:'#000000',
        borderRadius:19.25,
        position:"absolute",
        opacity:0.5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    deleteText:{
        color:'#FFFFFF',
        fontSize:18
    },
    deleteCover:{
        borderRadius:19.25,
        position:"absolute",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    infoBox:{
        height:93.5,
        padding:5,
        borderWidth:0.5,
        borderColor:'#E0E0E0',
        backgroundColor:'#DDF5F8',
        borderRadius:8,
    },
    deleteInfoBox:{
        height:93.5,
        padding:5,
        borderWidth:0.5,
        borderColor:'#E0E0E0',
        backgroundColor:'#F9F9F9',
        borderRadius:8,
    },
    animalInfoBox:{
        paddingLeft:14,
        paddingRight:14,
        backgroundColor:'#fff',
        paddingBottom:5,
    },
    deviceBox:{
        backgroundColor:'#FFFFFF',
        height:40,
        marginTop:10.5,
        borderRadius:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:22,
        paddingRight:22

    },
    speciesName:{
        color:'#0A141E',
        fontSize:12,
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
        alignItems:"center"
    },
    contentLeft:{
        // backgroundColor:'red',
        flexDirection:"row",
        alignItems:"center",
        padding:5,
        borderWidth:0.5,
        borderColor:'#E0E0E0',
        borderRadius:8,
        width:screenWidth - 32 - 82 - 5,
        marginBottom:5
    },
    deleteContentLeft:{
        flexDirection:"row",
        alignItems:"center",
        padding:5,
        borderWidth:0.5,
        borderColor:'#E0E0E0',
        borderRadius:8,
        width:screenWidth - 32 - 82 - 5,
        marginBottom:5,
        backgroundColor:'#F9F9F9'
    },
    deleteUserName:{
        fontSize:12,
        color:'#999999'
    },
    contentRight:{
        paddingBottom:5
    },
    deviceName:{
        fontSize:18,
        color:'#6FC1CE',
    },
    uuid:{
        color:'#666666',
        fontSize:12
    },
    text:{
        color:'#999999',
        fontSize:12
    },
    contactBox:{
        flex:1,
        flexDirection: 'row',
        alignItems:"center",
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
        width:64,
        height:38,
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
    animal:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#ECECEC',
        borderRadius:3,
        flexDirection:"row",
        alignItems:"center",
    },
    reasonTitle:{
        color:'#999999',
        fontSize:11
    },
    reasonText:{
        color:'#0A141E',
        fontSize:11
    },
    deleteDeviceName:{
        fontSize:18,
        color:'#999999',
    }
});

export default AcceptListItem;
