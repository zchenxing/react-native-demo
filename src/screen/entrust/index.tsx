import React from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    StyleSheet
} from "react-native";
import {Header} from 'react-native-elements';
import { NavigateProps } from "../../interface";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test3 from "../test/test3";
import Icon from "react-native-vector-icons/FontAwesome";
import {useSetState} from "ahooks";
import {EventEmitterName, screenWidth} from "../../config/contant";
import Test4 from "../test/test4";
import EntrustAll from "./myEntrust/all";
import EntrustPending from "./myEntrust/pending";
import EntrustOngoing from "./myEntrust/Ongoing";
import EntrustEnded from "./myEntrust/ended";
import {localImages} from "../../assets/images";
import FastImage from "react-native-fast-image";
import AcceptEntrustQuest from "./acceptedEntrust/quest";
import AcceptEntrustEnded from "./acceptedEntrust/ended";
const Tab = createMaterialTopTabNavigator();



const EntrustListScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [state, setState] = useSetState<any>({
        entrustType: 'accepted',
        loading: false,
    });

    const changeEntrustType = (type:string) => {
        setState({entrustType:type})

    }

    const setLoading = () => {
        setState({loading:true})
    }

    console.log(state.entrustType)

    return (
        <View style={{flex: 1}}>



            <Header
                backgroundColor='#92D0D9'
                centerComponent={
                    <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",}}>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {changeEntrustType('accepted')}}
                        >
                            <View style={{...styles.entrustTypeBtnLeft,borderColor: state.entrustType === 'accepted' ? '#71C3CF' : 'white',borderWidth:2,marginRight:5}}>
                                <FastImage
                                    style={styles.questForMe}
                                    source={localImages.questForMe}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text style={{color: state.entrustType === 'accepted' ? '#5ABFCB' : '#B3B3B3',fontSize:15}}>Quest for me</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {changeEntrustType('me')}}
                        >
                            <View style={{...styles.entrustTypeBtnRight,borderColor:state.entrustType === 'me' ? '#71C3CF' : 'white',borderWidth:2,marginLeft:5}}>
                                <FastImage
                                    style={styles.questFromMe}
                                    source={localImages.questFromMe}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text style={{color: state.entrustType === 'me' ? '#5ABFCB' : '#B3B3B3',fontSize:15}}>Quest from me</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
            >
            </Header>
            {
                state.entrustType === 'accepted'
                ? <Tab.Navigator tabBarPosition="top" screenOptions={{tabBarActiveTintColor:'#92D0D9',tabBarInactiveTintColor:'black',tabBarIndicatorStyle: {backgroundColor:'#92D0D9',height:2},tabBarLabelStyle:{textTransform:"capitalize",fontSize:15}}}>
                        <Tab.Screen name="Quest" component={AcceptEntrustQuest}/>
                        <Tab.Screen name="Ended" component={AcceptEntrustEnded}  />
                    </Tab.Navigator>
                    : <Tab.Navigator tabBarPosition="top" screenOptions={{tabBarActiveTintColor:'#92D0D9',tabBarInactiveTintColor:'black',tabBarIndicatorStyle: {backgroundColor:'#92D0D9',height:2},tabBarLabelStyle:{textTransform:"capitalize",fontSize:15}}}>
                        <Tab.Screen name="All" component={EntrustAll}/>
                        <Tab.Screen name="Pending" component={EntrustPending}  />
                        <Tab.Screen name="Ongoing" component={EntrustOngoing} />
                        <Tab.Screen name="Ended" component={EntrustEnded} />
                    </Tab.Navigator>
            }



        </View>

    );
};

const styles = StyleSheet.create({
    entrustTypeBtnLeft:{
        backgroundColor:'white',
        paddingLeft:8.5,
        paddingRight:8.5,
        paddingTop:6,
        paddingBottom:6,
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center"
    },
    questForMe:{
        width:41,
        height:37.5
    },
    questFromMe:{
        width:41,
        height:37.5
    },
    entrustTypeBtnRight:{
        backgroundColor:'white',
        paddingLeft:5.5,
        paddingRight:5.5,
        paddingTop:6,
        paddingBottom:6,
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center"
    }
});

export default EntrustListScreen;
