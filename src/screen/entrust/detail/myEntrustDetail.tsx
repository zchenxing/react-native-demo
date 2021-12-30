import React,{ useCallback, useMemo, useRef } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { screenWidth} from "../../../config/contant";
import AnimalCard from "./animalCard";
import {useSetState} from "ahooks";
import {INTELINK_SCREEN_NAME} from "../../../routes/screen-name";
import IconFont from "../../../iconfont";
import EndRecord from "./endRecord";
import AweSimpleNavigator from "../../../components/awe-simple-navigator";

const EntrustMyDetailScreen: React.FC<any> = (props: any) => {
    const [state, setState] = useSetState<any>({

    });

    return (
        <>
            <AweSimpleNavigator
                centerTitle={'11111'}
                goBack={props.navigation.goBack}
                rightActionEvent={() => {
                    props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_ACCEPTED)
                }}
                rightActionIcon={<Icon
                    name={'angle-left'}
                    style={{fontSize: 30, color: '#aaa'}}
                />}
                rightActionEditable={true}
            />
            <ScrollView style={{flex: 1, backgroundColor: '#F0F2F5', paddingTop: 10, paddingBottom: 20}}>
                <AnimalCard navigation={props.navigation}/>
                {/*<EndAnimalCard navigation={props.navigation}/>*/}
                <View style={styles.mapBox}>
                    <View style={styles.mapImg}></View>
                    <View style={styles.mapInfo}>
                        <Text style={styles.localText}>Lost contact 22 dey</Text>
                        <Text style={styles.localText}>17:42 2021/03/03</Text>
                    </View>
                </View>
                <EndRecord navigation={props.navigation}/>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => {
                        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_RECORDING)
                    }}>
                    <View style={styles.accept}>
                        <View>
                            <Text style={styles.acceptText}>Sync record</Text>
                        </View>
                        <View>
                            <IconFont name={'arrow-right'} size={15} color={'#979797'}/>
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{height: 15}}/>
            </ScrollView>
            <SafeAreaView style={styles.pageFoot}>
                <View style={styles.time}>
                    <Text style={{textAlign: "center"}}>Validity period：356 day 14h 45min 32s</Text>
                </View>
                <View style={styles.footBtnBox}>
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={() => {
                            setState({isVisible: true})
                        }}>
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

export default EntrustMyDetailScreen;
