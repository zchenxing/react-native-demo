import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Header} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {screenWidth} from "../../../config/contant";
import AnimalCard from "./animalCard";

const EntrustDetail: React.FC<any> = (props: any) => {
    return (
        <>
            <Header
                backgroundColor='#AAE3E9'
                leftComponent={
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.navigation.goBack}>
                        <View style={{width: 100, paddingLeft: 10}}>
                            <Icon
                                name={'angle-left'}
                                style={{fontSize: 30, color: '#aaa'}}
                            />
                        </View>
                    </TouchableHighlight>
                }
                centerComponent={
                    <View>
                        <Text style={styles.pageTitle}>11111</Text>
                    </View>
                }
                rightComponent={
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.navigation.goBack}>
                        <View style={{width: 100, paddingLeft: 10, justifyContent: "flex-end", flexDirection: "row"}}>
                            <Icon
                                name={'angle-left'}
                                style={{fontSize: 30, color: '#aaa'}}
                            />
                        </View>
                    </TouchableHighlight>
                }
            >
            </Header>
            <ScrollView style={{flex: 1,backgroundColor:'#F0F2F5',paddingTop:10,paddingBottom:20}}>
                <View style={styles.deviceBox}>
                    <View style={styles.deviceImg}></View>
                    <View style={{flex:1,justifyContent:"space-between"}}>
                        <View><Text style={styles.deviceType}>LOGO</Text></View>
                        <View><Text style={styles.uuid}>UUID: ecde2809d9e5</Text></View>
                    </View>
                </View>
                <AnimalCard navigation={props.navigation}/>
                <View style={styles.mapBox}>
                    <View style={styles.mapImg}></View>
                    <View style={styles.mapInfo}>
                        <Text style={styles.localText}>Lost contact 22 dey</Text>
                        <Text style={styles.localText}>17:42   2021/03/03</Text>
                    </View>
                </View>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={props.navigation.goBack}>
                    <View style={styles.accept}>
                        <View>
                            <Text style={styles.acceptText}>Accepted (3)</Text>
                        </View>
                        <View>
                            <Text>图片</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{height:15}}/>
            </ScrollView>
            <SafeAreaView style={styles.pageFoot}>
                <View style={styles.time}>
                    <Text style={{textAlign:"center"}}>Validity period：356 day 14h 45min 32s</Text>
                </View>
                <View style={styles.footBtnBox}>
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.navigation.goBack}>
                        <View style={styles.deleteBtn}>
                            <Text style={styles.deleteBtnText}>ENDED</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.navigation.goBack}>
                        <View style={styles.creaturesBtn}>
                            <Text style={styles.creaturesBtnText}>Looking for creatures</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </SafeAreaView>


        </>
    );
}

const styles = StyleSheet.create({
    pageTitle:{
        color:'#333333',
        fontSize:17,
        marginTop:4
    },
    deviceBox:{
        flexDirection:"row",
        // borderWidth:2,
        // borderColor:'#000000',
        borderRadius:8,
        marginLeft:16,
        marginRight:16,
        paddingLeft:18,
        paddingRight:18,
        paddingTop:10,
        paddingBottom:10,
        shadowColor:'#000000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        backgroundColor:'white',
        shadowOpacity: 0.3,
        marginBottom:10
    },
    pageFoot:{
        // height:20,
        backgroundColor:'#fff'
    },
    time:{
        width:screenWidth - 32,
        borderRadius:5.5,
        borderWidth:0.5,
        borderColor:'#DEDEDE',
        paddingTop:2,
        paddingBottom:2,
        marginLeft:15,
        marginRight:15,
        marginTop:5
    },
    deleteBtn:{
        width:(screenWidth - 41.5)/2.3,
        borderWidth:1,
        borderColor:'#FF5B5B',
        paddingTop:10.5,
        paddingBottom:10.5,
        borderRadius:6,
    },
    footBtnBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:15,
        marginRight:15,
        marginTop:10
    },
    deleteBtnText:{
        fontSize:14,
        color:'#FF787F',
        textAlign:"center"
    },
    creaturesBtn:{
        width:(screenWidth - 41.5) / 1.8,
        borderWidth:1,
        borderColor:'#69BECB',
        paddingTop:10.5,
        paddingBottom:10.5,
        borderRadius:6,
        backgroundColor:'#69BECB'
    },
    creaturesBtnText:{
        fontSize:14,
        color:'#ffffff',
        textAlign:"center"
    },
    deviceType:{
        color:'#6FC1CE',
        fontSize:18,
    },
    deviceImg:{
        width:44,
        height:44,
        backgroundColor:'green',
        borderRadius:50,
        marginRight:12,
    },
    uuid:{
        color:'#999999',
        fontSize:12
    },
    mapBox:{
        height:229,
        marginLeft:16,
        marginRight:16,
        backgroundColor:'green',
        marginTop:10,
        borderRadius:8,
        flex:1,
        justifyContent:"space-between"
    },
    mapImg:{
        // height:199
    },
    mapInfo:{
        height:30,
        backgroundColor:'#000',
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
    },
    localText:{
        color:'#fff'
    },
    accept:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:16,
        marginRight:16,
        backgroundColor:'#fff',
        height:50,
        alignItems:"center",
        marginTop:10,
        borderRadius:8,
        paddingLeft:12,
        paddingRight:12,
    },
    acceptText:{
        color:'#333333',
        fontSize:14
    }
});

export default EntrustDetail;
